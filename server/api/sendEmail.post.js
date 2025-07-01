import Mailgun from 'mailgun.js';
import formData from "form-data";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY});

  try {
    const emailTemplate = `
      <div>
        <h1>Someone has contacted you through your personal website!</h1>
        <p><strong>From (email):</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone ?? 'Not provided'}</p>
        <hr>
        <p><strong>Subject:</strong> ${body.subject}</p>
        <p><strong>Message:</strong> ${body.message}</p>
        <hr>
        <p><strong>Sent at:</strong> ${new Date().toLocaleString('sr-Latn-RS', { timeZone: 'Europe/Belgrade' })}</p>
      </div>
    `;

    const res = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `${process.env.MAILGUN_SENDER}`,
      to: `${process.env.MAILGUN_EMAIL_TO}`,
      subject: `Personal Website Contact - ${body.email}`,
      html: emailTemplate,
    });

    return { data: res }
  } catch (error) {
    return { error: error.message };
  }
});
