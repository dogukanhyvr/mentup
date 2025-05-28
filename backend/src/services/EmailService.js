// services/EmailService.js
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class EmailService {
  constructor() {
    this.from = process.env.MAIL_FROM;
  }

  async send(to, subject, html) {
    const msg = {
      to,
      from: this.from,
      subject,
      html,
    };
    return sgMail.send(msg);
  }
}

module.exports = new EmailService();
