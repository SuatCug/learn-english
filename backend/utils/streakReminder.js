const { User } = require('../models');
const { dayKey } = require('./badgeEngine');
const { sendStreakReminderEmail } = require('./mail.util');

// Seri hatırlatma maili: serisi süren (dün çalışmış) ama bugün henüz çalışmamış kullanıcılara akşam bir hatırlatma.
// Sunucu saat başı kontrol eder; gönderim saati STREAK_REMINDER_HOUR_UTC (varsayılan 15 UTC = 18:00 Türkiye).
// Kullanıcı başına günde en fazla bir mail (lastStreakReminderAt). Profil düzenleme sayfasından kapatılabilir.
// Kapatmak için: STREAK_REMINDERS=off. Not: sunucu uykuya geçen bir barındırıcıdaysa (ücretsiz planlar) o saatte
// uyanık değilse mail gitmez.
const CHECK_INTERVAL_MS = 60 * 60 * 1000;
const reminderHourUtc = () => Number(process.env.STREAK_REMINDER_HOUR_UTC ?? 15);

const previousDay = (key) => {
  const d = new Date(`${key}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return dayKey(d);
};

// Bu kullanıcıya şimdi hatırlatma gitmeli mi? Gidecekse seri uzunluğunu, yoksa 0 döner. (Veritabanına dokunmaz.)
const streakToRemind = (user, now = new Date()) => {
  if (user.emailReminders === false || user.emailVerified === false) return 0;
  if (now.getUTCHours() < reminderHourUtc()) return 0;

  const today = dayKey(now);
  if (user.lastStreakReminderAt && dayKey(user.lastStreakReminderAt) === today) return 0;

  const days = new Set((user.progress ?? []).map((p) => dayKey(p.completedAt)));
  if (days.has(today)) return 0; // bugün zaten çalışmış

  let streak = 0;
  for (let key = previousDay(today); days.has(key); key = previousDay(key)) streak += 1;
  return streak; // dün çalışmadıysa 0 → seri zaten bitmiş, hatırlatma yok
};

const sendDueReminders = async (now = new Date()) => {
  if (now.getUTCHours() < reminderHourUtc()) return 0;
  const users = await User.find(
    { emailReminders: { $ne: false }, emailVerified: { $ne: false }, 'progress.0': { $exists: true } },
    'name email language emailReminders emailVerified lastStreakReminderAt progress.completedAt'
  );
  let sent = 0;
  for (const user of users) {
    const streak = streakToRemind(user, now);
    if (!streak) continue;
    try {
      await sendStreakReminderEmail(user, { streak });
      await User.updateOne({ _id: user._id }, { lastStreakReminderAt: now });
      sent += 1;
    } catch (err) {
      console.error('Seri hatırlatma maili gönderilemedi:', user.email, err.message);
    }
  }
  if (sent) console.log(`🔥 ${sent} seri hatırlatma maili gönderildi.`);
  return sent;
};

const startStreakReminders = () => {
  if (process.env.STREAK_REMINDERS === 'off' || process.env.NODE_ENV === 'test') return;
  const run = () => sendDueReminders().catch((err) => console.error('Seri hatırlatma hatası:', err.message));
  setTimeout(run, 60 * 1000); // sunucu açıldıktan 1 dakika sonra bir kez, sonra saat başı
  setInterval(run, CHECK_INTERVAL_MS);
};

module.exports = { streakToRemind, sendDueReminders, startStreakReminders };
