[![Test Coverage](https://api.codeclimate.com/v1/badges/0505e350e23c43359432/test_coverage)](https://codeclimate.com/github/flexper/sendim/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/0505e350e23c43359432/maintainability)](https://codeclimate.com/github/flexper/sendim/maintainability) ![npm](https://img.shields.io/npm/v/sendim) ![npm](https://img.shields.io/npm/dm/sendim) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/sendim) ![NPM](https://img.shields.io/npm/l/sendim)

# Sendim

A simple library to send email cross providers.

## Usage

```typescript
import { Sendim } from 'sendim';

const sendim = new Sendim();

await sendim.addTransport<SendimSampleProviderConfig>(SendimSampleProvider, {});

await sendim.sendTransactionalMail({
      templateId: 'test',
      to: [{
        email: 'test@test.fr'
      }],
      sender: {
        email: 'test@test.fr'
      }
    });
```

### addTransport(sendimProvider, config?)

Add transport to sendim

***Params***

| Field Name    | Type                                     | Default  | Description         |
| ------------- | ---------------------------------------- | -------- | ------------------- |
| sendimProvider | Class implements SendimTransportInterface | required | Provider to use     |
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
