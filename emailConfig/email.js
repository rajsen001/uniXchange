const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    console.log(user);
    this.to = user.email;
    this.firstName = "folk";
    this.url = url;
    this.from = `Raj Sen`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      // port: process.env.EMAIL_PORT,
      service: "gmail",
      // secureConnection: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      // tls: {
      //   ciphers: "SSLv3",
      //   rejectUnauthorized: false,
      // },
    });
  }

  // Send the email
  async send(template, subject) {
    //1) Render HTML based on Pug
    const html = pug.renderFile(`${__dirname}/views/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    //2) Email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    // Create transport and sent email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendAccountConfirmation() {
    await this.send("accountConfirmation", "Email Confirmation");
  }
};
