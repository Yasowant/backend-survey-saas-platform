import nodemailer from "nodemailer";

import { env } from "../../../config/env";

export class MailService {
  private transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASSWORD,
    },
  });

  async sendEmail(to: string, subject: string, html: string) {
    await this.transporter.sendMail({
      from: env.EMAIL_USER,
      to,
      subject,
      html,
    });
  }
}
