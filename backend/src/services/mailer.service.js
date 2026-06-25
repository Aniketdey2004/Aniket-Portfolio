const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendContactMail = async ({ name, email, subject, message }) => {
  await resend.emails.send({
    from:     'Portfolio <onboarding@resend.dev>',
    to:       process.env.CONTACT_TO || 'aniketdey2004@gmail.com',
    replyTo:  email,
    subject:  `[Portfolio] ${subject}`,
    html: `
      <div style="font-family:Inter,system-ui,sans-serif;padding:24px;background:#fafafa">
        <h2 style="color:#1a1a1a;margin:0 0 12px">New portfolio message</h2>
        <p><b>From:</b> ${name} &lt;${email}&gt;</p>
        <p><b>Subject:</b> ${subject}</p>
        <div style="margin-top:16px;padding:16px;background:#fff;border-left:3px solid #e85d3a;white-space:pre-wrap">${message}</div>
      </div>`,
  });
};