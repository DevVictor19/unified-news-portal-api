import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { IMailProvider, IMessage } from '../mail-provider.interface';

export class NodeMailerMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor(
    private mailUser: string,
    private mailName: string,
    private mailPassword: string,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: this.mailUser,
        pass: this.mailPassword,
      },
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: this.mailName,
        address: this.mailUser,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}
