// Seri hatırlatma maili: kime, ne zaman gider? (utils/streakReminder.js#streakToRemind — veritabanı yok)
const test = require('node:test');
const assert = require('node:assert/strict');
const { streakToRemind } = require('../utils/streakReminder');

// Gönderim saati 15:00 UTC (18:00 Türkiye). "Şimdi": 20 Kasım 2026, 16:00 UTC.
const NOW = new Date('2026-11-20T16:00:00Z');
const day = (offset, hour = 10) => {
  const d = new Date(Date.UTC(2026, 10, 20 + offset, hour));
  return { completedAt: d };
};
const user = (progress, extra = {}) => ({ progress, emailReminders: true, lastStreakReminderAt: null, ...extra });

test('dün ve önceki günler çalışmış, bugün çalışmamış → seri uzunluğu kadar hatırlatma', () => {
  assert.equal(streakToRemind(user([day(-1), day(-2), day(-3)]), NOW), 3);
  assert.equal(streakToRemind(user([day(-1)]), NOW), 1);
});

test('bugün zaten çalışmışsa hatırlatma yok', () => {
  assert.equal(streakToRemind(user([day(-1), day(0, 9)]), NOW), 0);
});

test('dün çalışmadıysa seri bitmiş → hatırlatma yok', () => {
  assert.equal(streakToRemind(user([day(-2), day(-3)]), NOW), 0);
  assert.equal(streakToRemind(user([]), NOW), 0);
});

test('gönderim saatinden önce gönderilmez', () => {
  assert.equal(streakToRemind(user([day(-1)]), new Date('2026-11-20T14:59:00Z')), 0);
});

test('aynı gün ikinci kez gönderilmez; dünkü gönderim engel değil', () => {
  assert.equal(streakToRemind(user([day(-1)], { lastStreakReminderAt: new Date('2026-11-20T15:00:00Z') }), NOW), 0);
  assert.equal(streakToRemind(user([day(-1)], { lastStreakReminderAt: new Date('2026-11-19T15:00:00Z') }), NOW), 1);
});

test('hatırlatmaları kapatan veya e-postası doğrulanmamış kullanıcıya gönderilmez', () => {
  assert.equal(streakToRemind(user([day(-1)], { emailReminders: false }), NOW), 0);
  assert.equal(streakToRemind(user([day(-1)], { emailVerified: false }), NOW), 0);
});
