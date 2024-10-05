import sgMail from '@sendgrid/mail'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const emailTemplate = `
    <div>
      <h1>Someone has contacted you through your portfolio website!</h1>
      <p><strong>From (email):</strong> ${body.email}</p>
      <p><strong>Phone:</strong> ${body.phone ?? 'Not provided'}</p>
      <hr>
      <p><strong>Subject:</strong> ${body.subject}</p>
      <p><strong>Message:</strong> ${body.message}</p>
      <hr>
      <p><strong>Sent at:</strong> ${new Date().toLocaleString('sr-Latn-RS', { timeZone: 'Europe/Belgrade' })}</p>
    </div>
  `;

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: process.env.SENDGRID_EMAIL_TO,
      from: process.env.SENDGRID_SENDER,
      subject: `Portfolio Website Contact - ${body.email}`,
      html: emailTemplate,
    }

    const res = await sgMail.send(msg);
    return {data: res};
  }
  catch (error) {
    return { error: error.message };
  }
});
