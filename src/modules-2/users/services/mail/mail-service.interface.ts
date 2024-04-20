interface IAddress {
  email: string;
  name: string;
}

export interface IMessage {
  to: IAddress;
  subject: string;
  body: string;
}

export abstract class IMailService {
  abstract sendMail(message: IMessage): Promise<void>;
}
