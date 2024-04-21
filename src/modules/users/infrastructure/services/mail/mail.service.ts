import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { IEnvConfigProvider } from '@/modules/common/env-config/application/providers/env-config-provider.interface';
import {
  IMailService,
  IMessage,
} from '@/modules/users/application/services/mail-service.interface';

@Injectable()
export class MailService implements IMailService {
  private transporter: Mail;
  private mailUser: string;
  private mailName: string;
  private mailPassword: string;

  constructor(private envConfigProvider: IEnvConfigProvider) {
    this.mailUser = this.envConfigProvider.getMailEmail();
    this.mailName = this.envConfigProvider.getMailName();
    this.mailPassword = this.envConfigProvider.getMailPwd();

    this.transporter = createTransport({
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
