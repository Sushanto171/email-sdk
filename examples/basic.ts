import { SendEmailSDK } from "../src/sendEmail";

const sender = new SendEmailSDK({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: { user: "mygmail@gmail.com", pass: "app-password" }
})

await sender.send({
  from: "Company<info@company.com>",
  to: "user@example.com",
  subject: "Hello Minimal SDK",
  html: "<h1>Hi!</h1>"
});


const gmailSender = SendEmailSDK.createGmail({
  user: "mygmail@gmail.com",
  pass: "app-password"
});

await gmailSender.send({
  from: "Company<info@company.com>",
  to: "user@example.com",
  subject: "Hello Minimal SDK",
  html: "<h1>Hi!</h1>"
});


const gmailOutlook = SendEmailSDK.createOutlook({
  user: "mygmail@outlook.com",
  pass: "app-password"
});

await gmailOutlook.send({
  from: "Company<info@company.com>",
  to: "user@example.com",
  subject: "Hello Minimal SDK",
  html: "<h1>Hi!</h1>"
});