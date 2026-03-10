import type { EmailOptions, SMTPConfig, StaticMethods } from "./types";

/**
 * Minimal class-based SDK
 * Automatically picks API URL from environment or default
 */
export class SendEmailSDK {
  private apiUrl: string
  private smtp: SMTPConfig

  constructor(smtp: SMTPConfig) {
    this.apiUrl = "https://email-sdk.vercel.app/api/send-email";
    this.smtp = smtp
  }

  async send({ from, to, subject, html }: EmailOptions) {
    const res = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ smtp: this.smtp, from, to, subject, html })
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || "Email sending failed via API")
    }

    return res.json()
  }

  // Helper static methods for common providers
  static createGmail({ user, pass }: StaticMethods) {
    return new SendEmailSDK({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user, pass }
    })
  }

  static createOutlook({ user, pass }: StaticMethods) {
    return new SendEmailSDK({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: { user, pass }
    })
  }
}


const sendEmail = new SendEmailSDK({ auth: { pass: "", user: "" }, host: "122", port: 122, secure: false })

const gmailSender = SendEmailSDK.createGmail({ pass: "", user: "" })


