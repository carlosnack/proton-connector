import { transporter } from "../config/nodemailer";

interface SendMailProps {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export default class MailService {
  static async sendMail({ from, to, subject, text }: SendMailProps) {
    return await transporter.sendMail({ from, to, subject, text });
  }
}
