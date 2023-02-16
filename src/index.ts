/* eslint-disable @typescript-eslint/ban-ts-comment */
import Pino, {LevelWithSilent} from 'pino';

interface EmailInformation {
  email: string;
  name?: string;
}

type MailOptions = {
  to: EmailInformation[];
  cc?: EmailInformation[];
  bcc?: EmailInformation[];

  sender: EmailInformation;
  reply?: EmailInformation;
};

export interface TransactionalMailOptions extends MailOptions {
  params?: Record<string, unknown>;
  templateId: string;
}

export interface RawMailOptions extends MailOptions {
  textContent: string;
  htmlContent: string;
  subject: string;
}

export abstract class SendiTransportInterface {
  providerName!: string;

  constructor(_config: object) {}

  isHealthy!: () => Promise<boolean>;

  sendRawMail!: (options: RawMailOptions) => Promise<void>;
  sendTransactionalMail!: (options: TransactionalMailOptions) => Promise<void>;
}


export class Sendi {
  transports: Record<string, unknown> = {};
  logger: Pino.BaseLogger;

  constructor(log?: LevelWithSilent){
    this.logger = Pino({ level: log || 'info' });
  }

  async addTransport<T>(transport: new (...args: any[]) => SendiTransportInterface, config: T) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const newTransport: SendiTransportInterface = new transport(config);

    if (!(await newTransport.isHealthy())) {
      this.logger.error(`[SENDI] Transport ${newTransport.providerName} is not healthy !`);
      return;
    }

    this.transports[newTransport.providerName] = newTransport;
  }

  async sendRawMail(options: RawMailOptions, transportName?: string) {
    const transportKeys = Object.keys(this.transports);

    let transport: SendiTransportInterface;

    if (transportName && this.transports[transportName]) {
      transport = this.transports[transportName] as SendiTransportInterface;
    }

    //@ts-ignore
    if (!transport && transportKeys?.length > 0) {
      transport = this.transports[0] as SendiTransportInterface;
    }

    //@ts-ignore
    if (!transport) {
      this.logger.debug(`[SENDI] Send raw email`, options);
    }else {
      this.logger.debug(`[SENDI] Send raw email  (Transport: ${transport.providerName}) `, options);
      await transport.sendRawMail(options);
    }

  }

  async sendTransactionalMail(
    options: TransactionalMailOptions,
    transportName?: string,
  ) {
    const transportKeys = Object.keys(this.transports);

    let transport: SendiTransportInterface;

    if (transportName && this.transports[transportName]) {
      transport = this.transports[transportName] as SendiTransportInterface;
    }

    //@ts-ignore
    if (!transport && transportKeys?.length > 0) {
      transport = this.transports[0] as SendiTransportInterface;
    }

    //@ts-ignore
    if (!transport) {
      this.logger.debug(`[SENDI] Send transactional email (Template: ${options.templateId})`, options);
    }else {
      this.logger.debug(`[SENDI] Send transactional email (Template: ${options.templateId} / Transport: ${transport.providerName}) `, options);
      await transport.sendTransactionalMail(options);
    }

  }
}
