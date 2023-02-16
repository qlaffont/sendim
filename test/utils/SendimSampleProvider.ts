import {
  RawMailOptions,
  SendimTransportInterface,
  TransactionalMailOptions,
} from '../../src';

export interface SendimSampleProviderConfig {
  test: string;
}
export class SendimSampleProvider implements SendimTransportInterface {
  providerName = 'sample';

  constructor(public config: SendimSampleProviderConfig) {}

  async isHealthy() {
    return true;
  }

  async sendRawMail(options: RawMailOptions) {
    console.log(options);
  }

  async sendTransactionalMail(options: TransactionalMailOptions) {
    console.log(options);
  }
}

export class SendimSampleProviderNotHealthy
  implements SendimTransportInterface
{
  providerName = 'sample';

  constructor(public config: SendimSampleProviderConfig) {}

  async isHealthy() {
    return false;
  }

  async sendRawMail(options: RawMailOptions) {
    console.log(options);
  }

  async sendTransactionalMail(options: TransactionalMailOptions) {
    console.log(options);
  }
}
