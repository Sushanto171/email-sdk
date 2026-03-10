# SendEmailSDK

A **minimal, provider-agnostic SMTP email SDK** for Node.js and serverless environments.
It supports **custom SMTP configuration** as well as quick helpers for common providers like Gmail and Outlook.

Designed for:

- minimal bundle size
- simple class-based API
- flexible SMTP providers

---

# Installation

```bash
npm install @sushanto/email-sdk
```

---

# Basic Usage (Custom SMTP)

Use any SMTP provider by supplying the connection configuration.

```ts
import { SendEmailSDK } from "@sushanto/email-sdk";

const sender = new SendEmailSDK({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "mygmail@gmail.com",
    pass: "app-password",
  },
});

await sender.send({
  from: "Company <info@company.com>",
  to: "user@example.com",
  subject: "Hello Minimal SDK",
  html: "<h1>Hi!</h1>",
});
```

---

# Gmail Helper

You can quickly create a Gmail sender using the built-in helper.

```ts
import { SendEmailSDK } from "@sushanto/email-sdk";

const gmailSender = SendEmailSDK.createGmail({
  user: "mygmail@gmail.com",
  pass: "app-password",
});

await gmailSender.send({
  from: "Company <info@company.com>",
  to: "user@example.com",
  subject: "Hello Minimal SDK",
  html: "<h1>Hi!</h1>",
});
```

### Gmail Requirements

- Enable **2-factor authentication**
- Generate a **Gmail App Password**

---

# Outlook Helper

Create an Outlook sender with the built-in helper.

```ts
import { SendEmailSDK } from "@sushanto/email-sdk";

const outlookSender = SendEmailSDK.createOutlook({
  user: "mygmail@outlook.com",
  pass: "app-password",
});

await outlookSender.send({
  from: "Company <info@company.com>",
  to: "user@example.com",
  subject: "Hello Minimal SDK",
  html: "<h1>Hi!</h1>",
});
```

---

# Email Options

```ts
interface EmailOptions {
  from?: string;
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}
```

### Example

```ts
await sender.send({
  from: "Support <support@company.com>",
  to: ["user1@email.com", "user2@email.com"],
  subject: "Welcome",
  html: "<h1>Welcome</h1>",
  text: "Welcome",
});
```

---

# SMTP Configuration

```ts
interface SMTPConfig {
  host: string;
  port: number;
  secure?: boolean;
  auth: {
    user: string;
    pass: string;
  };
}
```

### Example

```ts
const smtp = {
  host: "smtp.mailprovider.com",
  port: 587,
  secure: false,
  auth: {
    user: "no-reply@company.com",
    pass: "smtp-password",
  },
};
```

---

# Supported SMTP Providers

This SDK works with any SMTP provider including:

- Gmail
- Microsoft Outlook
- Zoho Mail
- SendGrid
- Amazon SES

---

# Best Practices

- Use **App Passwords instead of account passwords**
- Keep SMTP credentials **only on the server**
- Use **plain text fallback (`text`)** for better email compatibility
- Always include a **proper sender address**

---

# License

MIT License.
