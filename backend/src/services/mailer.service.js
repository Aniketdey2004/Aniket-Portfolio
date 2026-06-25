const nodemailer = require('nodemailer');

let transporter;
function getTransport() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter;
}

exports.sendContactMail = async ({ name, email, subject, message }) => {
  const to = process.env.CONTACT_TO || 'aniketdey2004@gmail.com';
  const t = getTransport();
  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;padding:24px;background:#fafafa">
      <h2 style="color:#1a1a1a;margin:0 0 12px">New portfolio message</h2>
      <p><b>From:</b> ${name} &lt;${email}&gt;</p>
      <p><b>Subject:</b> ${subject}</p>
      <div style="margin-top:16px;padding:16px;background:#fff;border-left:3px solid #e85d3a;white-space:pre-wrap">${message}</div>
    </div>`;
  await t.sendMail({
    from: `"Portfolio" <${process.env.SMTP_USER}>`,
    to, replyTo: email,
    subject: `[Portfolio] ${subject}`,
    html,
  });
};
