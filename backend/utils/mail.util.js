const ApiError = require('./apiError');

const BREVO_URL = 'https://api.brevo.com/v3/smtp/email';

// Brevo transactional e-mail API'si üzerinden tek bir mail gönderir.
const sendMail = async ({ to, subject, html }) => {
  const res = await fetch(BREVO_URL, {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { email: process.env.BREVO_SENDER_EMAIL, name: process.env.BREVO_SENDER_NAME || 'learn_english' },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error(`Brevo mail hatası (${res.status}):`, detail);
    throw new ApiError(502, 'Doğrulama e-postası gönderilemedi. Lütfen daha sonra tekrar deneyin.');
  }
};

// CLIENT_URL virgülle ayrılmış birden fazla origin içerebilir; linkler için ilki kullanılır.
const clientUrl = () => (process.env.CLIENT_URL || 'http://localhost:5173').split(',')[0].trim().replace(/\/$/, '');

// 6 haneli kod öne çıkarılır (web'de kayıt ekranına, mobilde uygulamaya girilir); yedek olarak link de bulunur.
// Renkler sitenin marka yeşili (#50af31) ve navbar grisiyle uyumludur.
const sendVerificationEmail = (user, { token, code }) => {
  const link = `${clientUrl()}/verify-email?token=${token}`;
  return sendMail({
    to: user.email,
    subject: `Doğrulama kodun: ${code}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;color:#111827">
        <h2 style="color:#111827">Merhaba ${escapeHtml(user.name)},</h2>
        <p>learnenglish hesabını etkinleştirmek için bu kodu doğrulama ekranına gir:</p>
        <p style="text-align:center;margin:28px 0">
          <span style="display:inline-block;background:#f2f9ef;border:2px solid #50af31;border-radius:14px;padding:14px 22px;font-size:32px;font-weight:bold;letter-spacing:10px;color:#111827">${code}</span>
        </p>
        <p style="font-size:13px;color:#6b7280">Kod 30 dakika geçerlidir.</p>
        <p style="font-size:13px;color:#6b7280">Kod girmek yerine bu bağlantıya da tıklayabilirsin (24 saat geçerli):<br>
          <a href="${link}" style="color:#367823">${link}</a>
        </p>
        <p style="font-size:13px;color:#6b7280">Bu kaydı sen yapmadıysan bu e-postayı yok sayabilirsin.</p>
      </div>
    `,
  });
};

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

module.exports = { sendVerificationEmail };
