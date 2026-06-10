import { Resend } from "resend";
import { env } from "../../../config/env";

export class MailService {
  private resend = new Resend(env.RESEND_API_KEY);

  async sendEmail(to: string, subject: string, html: string) {
    const { data, error } = await this.resend.emails.send({
      from: env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
