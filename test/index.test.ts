import { Sendi } from '../src';
import { describe, expect, it } from '@jest/globals';
import { SendiSampleProviderConfig,SendiSampleProvider, SendiSampleProviderNotHealthy } from './utils/SendiSampleProvider';

describe('Sendi', () => {
  it('should be Defined', () => {
    expect(Sendi).toBeDefined()
  });

  it('should be able to define log',  () => {
    expect(new Sendi('debug')).toBeDefined();
  })

  it('should be able to add transport',  async () => {
    let sendi = new Sendi();

    await sendi.addTransport<SendiSampleProviderConfig>(SendiSampleProvider, {test: ""});

    expect(sendi).toBeDefined();
    expect(sendi.transports).toBeDefined();
    expect(Object.keys(sendi.transports)).toHaveLength(1);

    sendi = new Sendi();

    await sendi.addTransport<SendiSampleProviderConfig>(SendiSampleProviderNotHealthy, {test: ""});

    expect(sendi).toBeDefined();
    expect(sendi.transports).toBeDefined();
    expect(Object.keys(sendi.transports)).toHaveLength(0);
  });

  it('should be able to send raw email',  async () => {
    const sendi = new Sendi();

    expect(sendi.sendRawMail).toBeDefined();

    await sendi.sendRawMail({
      textContent: '',
      htmlContent: '',
      subject: '',
      to: [{
        email: 'test@test.fr'
      }],
      sender: {
        email: 'test@test.fr'
      }
    });

    await sendi.addTransport<SendiSampleProviderConfig>(SendiSampleProvider, {test: ""});

    await sendi.sendRawMail({
      textContent: '',
      htmlContent: '',
      subject: '',
      to: [{
        email: 'test@test.fr'
      }],
      sender: {
        email: 'test@test.fr'
      }
    });

    await sendi.sendRawMail({
      textContent: '',
      htmlContent: '',
      subject: '',
      to: [{
        email: 'test@test.fr'
      }],
      sender: {
        email: 'test@test.fr'
      }
    }, 'sample');
  });

  it('should be able to send transactional email',  async () => {
    const sendi = new Sendi();

    expect(sendi.sendTransactionalMail).toBeDefined();

    await sendi.sendTransactionalMail({
      templateId: 'test',
      to: [{
        email: 'test@test.fr'
      }],
      sender: {
        email: 'test@test.fr'
      }
    });

    await sendi.addTransport<SendiSampleProviderConfig>(SendiSampleProvider, {test: ""});

    await sendi.sendTransactionalMail({
      templateId: 'test',
      to: [{
        email: 'test@test.fr'
      }],
      sender: {
        email: 'test@test.fr'
      }
    });

    await sendi.sendTransactionalMail({
      templateId: 'test',
      to: [{
        email: 'test@test.fr'
      }],
      sender: {
        email: 'test@test.fr'
      }
    }, 'sample');
  });
});
