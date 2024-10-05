import sgMail from '@sendgrid/mail'
import Mustache from 'mustache';
import fs from 'fs';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const emailTemplate = fs.readFileSync('./server/templates/contactForm.html', 'utf8');
  const renderedEmail = Mustache.render(emailTemplate, body);

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: process.env.SENDGRID_EMAIL_TO,
      from: process.env.SENDGRID_SENDER,
      subject: `Portfolio Website Contact - ${body.email}`,
      html: renderedEmail,
    }

    const res = await sgMail.send(msg);
    return {data: res};
  }
  catch (error) {
    return { error: error.message };
  }
});
