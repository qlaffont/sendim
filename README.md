[![Test Coverage](https://api.codeclimate.com/v1/badges/6be8e53efc66aabc6a5e/test_coverage)](https://codeclimate.com/github/flexper/sendi/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/6be8e53efc66aabc6a5e/maintainability)](https://codeclimate.com/github/flexper/sendi/maintainability) ![npm](https://img.shields.io/npm/v/sendi) ![npm](https://img.shields.io/npm/dm/sendi) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/sendi) ![NPM](https://img.shields.io/npm/l/sendi)

# Sendi

A simple library to send email cross providers.

## Usage

```typescript
import { Sendi } from 'sendi';

const sendi = new Sendi();

await sendi.addTransport<SendiSampleProviderConfig>(SendiSampleProvider, {});

await sendi.sendTransactionalMail({
      templateId: 'test',
      to: [{
        email: 'test@test.fr'
      }],
      sender: {
        email: 'test@test.fr'
      }
    });
```

### addTransport(sendiProvider, config?)

Add transport to sendi

***Params***

| Field Name    | Type                                     | Default  | Description         |
| ------------- | ---------------------------------------- | -------- | ------------------- |
| sendiProvider | Class implements SendiTransportInterface | required | Provider to use     |
| config        | object                                   | {}       | Config for provider |

### sendRawEmail(options)

Send raw email

***Params***

| Field Name | Type           | Default  | Description           |
| ---------- | -------------- | -------- | --------------------- |
| options    | RawMailOptions | required | options to send email |

### sendTransactionalEmail(options)

Send transactional email

***Params***

| Field Name | Type                     | Default  | Description           |
| ---------- | ------------------------ | -------- | --------------------- |
| options    | TransactionalMailOptions | required | options to send email |

## Tests

To execute jest tests (all errors, type integrity test)

```
pnpm test
```

## Maintain

This package use [TSdx](https://github.com/jaredpalmer/tsdx). Please check documentation to update this package.
