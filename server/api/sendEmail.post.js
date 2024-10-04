import formData from 'form-data';
import Mailgun from 'mailgun.js';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

  const emailTemplateData = {
    from: body.from,
    to: body.to,
    text: body.message,
    sender: body.from,
    phone: body.phone,
    sentAt: new Date().toLocaleDateString(),
  };

  const data = {
    from: body.from,
  	to: [body.to],
  	subject: body.subject,
  	html: '<h1>Hello</h1>',
  	// html: emailTemplate,
  };

  try {
    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    console.log(response);
    return { data: response };
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
});
