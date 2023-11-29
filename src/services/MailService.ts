import Mail from "nodemailer/lib/mailer";
import { transporter } from "../config/nodemailer";

export interface SendMailProps {
  from: string;
  to: string;
  subject: string;
  text: string;
  attachments?: Mail.Attachment[];
}

export default class MailService {
  static async sendMail({
    from,
    to,
    subject,
    text,
    attachments,
  }: SendMailProps) {
    return await transporter.sendMail({ from, to, subject, text, attachments });
  }
}
