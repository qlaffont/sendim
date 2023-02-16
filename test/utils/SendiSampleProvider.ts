import {SendiTransportInterface,RawMailOptions,TransactionalMailOptions} from "../../src";

export interface SendiSampleProviderConfig {
  test: string;
}
export class SendiSampleProvider implements SendiTransportInterface {
  providerName = 'sample';

  constructor(public config: SendiSampleProviderConfig) {}

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

export class SendiSampleProviderNotHealthy implements SendiTransportInterface {
  providerName = 'sample';

  constructor(public config: SendiSampleProviderConfig) {}

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

