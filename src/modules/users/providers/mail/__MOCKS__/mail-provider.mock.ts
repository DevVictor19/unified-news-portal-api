/* eslint-disable @typescript-eslint/no-unused-vars */

import { IMailProvider, IMessage } from '../mail-provider.interface';

export class MailProviderMock implements IMailProvider {
  async sendMail(message: IMessage): Promise<void> {
    return Promise.resolve();
  }
}
