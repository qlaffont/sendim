/* eslint-disable @typescript-eslint/ban-ts-comment */
import Pino, { LevelWithSilent } from 'pino';

interface EmailInformation {
  email: string;
  name?: string;
}

interface EmailAttachment {
  name: string;
  contentType: string;
  content: string;
}

type MailOptions = {
  to: EmailInformation[];
  cc?: EmailInformation[];
  bcc?: EmailInformation[];

  sender: EmailInformation;
  reply?: EmailInformation;
  attachments?: EmailAttachment[];
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

export abstract class SendimTransportInterface {
  providerName!: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  constructor(_config: object) {}

  isHealthy!: () => Promise<boolean>;

  sendRawMail!: (options: RawMailOptions) => Promise<void>;
  sendTransactionalMail!: (options: TransactionalMailOptions) => Promise<void>;
}

export class Sendim {
  transports: Record<string, unknown> = {};
  logger: Pino.BaseLogger;

  constructor(log?: LevelWithSilent) {
    this.logger = Pino({ level: log || 'info' });
  }

  async addTransport<T>(
    transport: new (...args: any[]) => SendimTransportInterface,
    config: T,
    transportName?: string,
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const newTransport: SendimTransportInterface = new transport(config);

    if (!(await newTransport.isHealthy())) {
      this.logger.error(
        `[SENDIM] Transport ${newTransport.providerName} is not healthy !`,
      );
      throw 'Transport is not healthy !';
    }

    if (this.transports[transportName || newTransport.providerName]) {
      this.logger.error(
        `[SAVIM] Provider ${
          transportName || newTransport.providerName
        } is not healthy !`,
      );
      throw 'Provider already exist !';
    }

    this.transports[newTransport.providerName] = newTransport;
  }

  async removeTransport(transportName: string) {
    if (this.transports[transportName]) {
      delete this.transports[transportName];
    }
  }

  async sendRawMail(options: RawMailOptions, transportName?: string) {
    const transportKeys = Object.keys(this.transports);

    let transport: SendimTransportInterface;

    if (transportName && this.transports[transportName]) {
      transport = this.transports[transportName] as SendimTransportInterface;
    }

    //@ts-ignore
    if (!transport && transportKeys?.length > 0) {
      transport = this.transports[transportKeys[0]] as SendimTransportInterface;
    }

    //@ts-ignore
    if (!transport) {
      this.logger.debug(`[SENDIM] Send raw email`);
      this.logger.debug(options);
    } else {
      this.logger.debug(
        `[SENDIM] Send raw email  (Transport: ${transport.providerName}) `,
      );
      this.logger.debug(options);

      await transport.sendRawMail(options);
    }
  }

  async sendTransactionalMail(
    options: TransactionalMailOptions,
    transportName?: string,
  ) {
    const transportKeys = Object.keys(this.transports);

    let transport: SendimTransportInterface;

    if (transportName && this.transports[transportName]) {
      transport = this.transports[transportName] as SendimTransportInterface;
    }

    //@ts-ignore
    if (!transport && transportKeys?.length > 0) {
      transport = this.transports[transportKeys[0]] as SendimTransportInterface;
    }

    //@ts-ignore
    if (!transport) {
      this.logger.debug(
        `[SENDIM] Send transactional email (Template: ${options.templateId})`,
      );
      this.logger.debug(options);
    } else {
      this.logger.debug(
        `[SENDIM] Send transactional email (Template: ${options.templateId} / Transport: ${transport.providerName}) `,
      );
      this.logger.debug(options);

      await transport.sendTransactionalMail(options);
    }
  }
}
