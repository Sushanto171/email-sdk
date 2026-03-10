// src/sendEmail.ts
var SendEmailSDK = class _SendEmailSDK {
  constructor(smtp) {
    this.apiUrl = "https://email-sdk.vercel.app/api/send-email";
    this.smtp = smtp;
  }
  async send({ from, to, subject, html }) {
    const res = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ smtp: this.smtp, from, to, subject, html })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Email sending failed via API");
    }
    return res.json();
  }
  // Helper static methods for common providers
  static createGmail({ user, pass }) {
    return new _SendEmailSDK({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user, pass }
    });
  }
  static createOutlook({ user, pass }) {
    return new _SendEmailSDK({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: { user, pass }
    });
  }
};
export {
  SendEmailSDK
};
