interface IAddress {
  email: string;
  name: string;
}

export interface IMessage {
  to: IAddress;
  subject: string;
  body: string;
}

export interface IMailService {
  sendMail(message: IMessage): Promise<void>;
}
