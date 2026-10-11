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

const sendVerificationEmail = (user, token) => {
  const link = `${clientUrl()}/verify-email?token=${token}`;
  return sendMail({
    to: user.email,
    subject: 'E-posta adresini doğrula',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;color:#111827">
        <h2 style="color:#059669">Merhaba ${escapeHtml(user.name)},</h2>
        <p>Hesabını etkinleştirmek için aşağıdaki butona tıklayarak e-posta adresini doğrula.</p>
        <p style="text-align:center;margin:32px 0">
          <a href="${link}" style="background:#059669;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">
            E-postamı Doğrula
          </a>
        </p>
        <p style="font-size:13px;color:#6b7280">Buton çalışmazsa bu linki tarayıcına yapıştır:<br>${link}</p>
        <p style="font-size:13px;color:#6b7280">Link 24 saat geçerlidir. Bu kaydı sen yapmadıysan bu e-postayı yok sayabilirsin.</p>
      </div>
    `,
  });
};

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

module.exports = { sendVerificationEmail };
