import { describe, expect, it } from '@jest/globals';

import { Sendim } from '../src';
import {
  SendimSampleProvider,
  SendimSampleProviderConfig,
  SendimSampleProviderNotHealthy,
} from './utils/SendimSampleProvider';

describe('Sendim', () => {
  it('should be Defined', () => {
    expect(Sendim).toBeDefined();
  });

  it('should be able to define log', () => {
    expect(new Sendim('debug')).toBeDefined();
  });

  it('should be able to add transport', async () => {
    let sendim = new Sendim();

    await sendim.addTransport<SendimSampleProviderConfig>(
      SendimSampleProvider,
      { test: '' },
    );

    expect(sendim).toBeDefined();
    expect(sendim.transports).toBeDefined();
    expect(Object.keys(sendim.transports)).toHaveLength(1);

    sendim = new Sendim();

    await sendim.addTransport<SendimSampleProviderConfig>(
      SendimSampleProviderNotHealthy,
      { test: '' },
    );

    expect(sendim).toBeDefined();
    expect(sendim.transports).toBeDefined();
    expect(Object.keys(sendim.transports)).toHaveLength(0);
  });

  it('should be able to send raw email', async () => {
    const sendim = new Sendim();

    expect(sendim.sendRawMail).toBeDefined();

    await sendim.sendRawMail({
      textContent: '',
      htmlContent: '',
      subject: '',
      to: [
        {
          email: 'test@test.fr',
        },
      ],
      sender: {
        email: 'test@test.fr',
      },
    });

    await sendim.addTransport<SendimSampleProviderConfig>(
      SendimSampleProvider,
      { test: '' },
    );

    await sendim.sendRawMail({
      textContent: '',
      htmlContent: '',
      subject: '',
      to: [
        {
          email: 'test@test.fr',
        },
      ],
      sender: {
        email: 'test@test.fr',
      },
    });

    await sendim.sendRawMail(
      {
        textContent: '',
        htmlContent: '',
        subject: '',
        to: [
          {
            email: 'test@test.fr',
          },
        ],
        sender: {
          email: 'test@test.fr',
        },
      },
      'sample',
    );
  });

  it('should be able to send transactional email', async () => {
    const sendim = new Sendim();

    expect(sendim.sendTransactionalMail).toBeDefined();

    await sendim.sendTransactionalMail({
      templateId: 'test',
      to: [
        {
          email: 'test@test.fr',
        },
      ],
      sender: {
        email: 'test@test.fr',
      },
    });

    await sendim.addTransport<SendimSampleProviderConfig>(
      SendimSampleProvider,
      { test: '' },
    );

    await sendim.sendTransactionalMail({
      templateId: 'test',
      to: [
        {
          email: 'test@test.fr',
        },
      ],
      sender: {
        email: 'test@test.fr',
      },
    });

    await sendim.sendTransactionalMail(
      {
        templateId: 'test',
        to: [
          {
            email: 'test@test.fr',
          },
        ],
        sender: {
          email: 'test@test.fr',
        },
      },
      'sample',
    );
  });
});
