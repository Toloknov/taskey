import nodemailer from "nodemailer";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  async passMail(to, link) {
    const info = await this.transporter.sendMail({
      from: "toloknovvita24@gmail.com",
      to,
      subject: "Activation account",
      text: "Перейдите по ссылке",
      html: `<a href="${link}">Пдтвердите свой аккаунт: ${link}</a>`,
    });

    console.log("Message sent: %s", info.messageId);
  }
}

export default new MailService();