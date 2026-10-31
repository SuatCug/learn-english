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

// Mobil uygulamada girilecek 6 haneli kod öne çıkarılır; web sitesinden kayıt olanlar için link de bulunur.
const sendVerificationEmail = (user, { token, code }) => {
  const link = `${clientUrl()}/verify-email?token=${token}`;
  return sendMail({
    to: user.email,
    subject: `Doğrulama kodun: ${code}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;color:#1D1A2B">
        <h2 style="color:#C8431C">Merhaba ${escapeHtml(user.name)},</h2>
        <p>Hesabını etkinleştirmek için bu kodu uygulamaya gir:</p>
        <p style="text-align:center;margin:28px 0">
          <span style="display:inline-block;background:#FDF1EC;border:2px solid #C8431C;border-radius:14px;padding:14px 22px;font-size:32px;font-weight:bold;letter-spacing:10px;color:#1D1A2B">${code}</span>
        </p>
        <p style="font-size:13px;color:#5E5A70">Kod 30 dakika geçerlidir.</p>
        <p style="font-size:13px;color:#5E5A70">Web sitesinden kayıt olduysan bu bağlantıya tıklayabilirsin (24 saat geçerli):<br>
          <a href="${link}" style="color:#C8431C">${link}</a>
        </p>
        <p style="font-size:13px;color:#5E5A70">Bu kaydı sen yapmadıysan bu e-postayı yok sayabilirsin.</p>
      </div>
    `,
  });
};

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

module.exports = { sendVerificationEmail };
