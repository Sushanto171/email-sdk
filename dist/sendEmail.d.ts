interface SMTPConfig {
    /**
     * SMTP server hostname.
     *
     * Examples:
     * - "smtp.gmail.com"
     * - "smtp.office365.com"
     * - "smtp.zoho.com"
     * - "smtp.mail.yahoo.com"
     */
    host: string;
    /**
     * SMTP server port.
     *
     * Common ports:
     * - 587 → TLS (recommended)
     * - 465 → SSL
     * - 25  → Unsecured (rarely used)
     *
     * Examples:
     * - 587
     * - 465
     */
    port: number;
    /**
     * Whether to use a secure SSL connection.
     *
     * Examples:
     * - true  → when using port 465
     * - false → when using port 587
     *
     * Default: false
     */
    secure?: boolean;
    /**
     * SMTP authentication credentials.
     */
    auth: {
        /**
         * SMTP username (usually your email address).
         *
         * Examples:
         * - "yourname@gmail.com"
         * - "support@yourdomain.com"
         * - "noreply@company.com"
         */
        user: string;
        /**
         * SMTP password or app password.
         *
         * Examples:
         * - Gmail App Password
         * - SMTP service password
         * - Mail server authentication token
         *
         * ⚠️ Never expose this in client-side code.
         */
        pass: string;
    };
}
interface Address {
    name: string;
    address: string;
}
type EmailAddress = string | Address[];
interface EmailOptions {
    /**
     * Sender email address.
     *
     * Examples:
     * - `"Company" <youremail@gmail.com>`
     * - `{ name: "Company", address: "youremail@gmail.com" }`
     * - `youremail@gmail.com`
     *
     * If not provided, the SDK will fallback to `smtp.auth.user`.
     */
    from?: EmailAddress;
    /**
     * Recipient email address.
     *
     * Examples:
     * - `"user@example.com"`
     * - `["user1@example.com", "user2@example.com"]`
     * - `{ name: "John", address: "john@example.com" }`
     * - `[{ name: "John", address: "john@example.com" }]`
     */
    to: EmailAddress;
    /**
   * Email subject line.
   *
   * Examples:
   * - "Welcome to our platform"
   * - "Reset your password"
   * - "Your order #10231 has shipped"
   * - "Verify your email address"
   */
    subject: string;
    /**
     * HTML body of the email.
     * Supports full HTML markup.
     *
     * Examples:
     * ```html
     * "<h1>Welcome</h1>
     * <p>Thanks for joining our platform.</p>"
     * ```
     *
     * ```html
     * `
     * <div style="font-family:sans-serif">
     *   <h2>Hello John</h2>
     *   <p>Your account has been successfully created.</p>
     * </div>
     * `
     * ```
     */
    html: string;
    /**
     * Optional plain text fallback.
     * Recommended for email clients that block HTML.
     *
     * Examples:
     * - "Welcome to our platform. Thanks for joining."
     * - "Click the link below to reset your password."
     * - "Your verification code is 483920"
     *
     * If not provided, some email clients may generate a fallback from HTML.
     */
    text?: string;
}
interface StaticMethods {
    /**
     * SMTP username (usually your email address).
     *
     * Examples:
     * - "yourname@gmail.com"
     * - "support@yourdomain.com"
     * - "noreply@company.com"
     */
    user: string;
    /**
     * SMTP password or app password.
     *
     * Examples:
     * - Gmail App Password
     * - SMTP service password
     * - Mail server authentication token
     *
     * ⚠️ Never expose this in client-side code.
     */
    pass: string;
}

/**
 * Minimal class-based SDK
 * Automatically picks API URL from environment or default
 */
declare class SendEmailSDK {
    private apiUrl;
    private smtp;
    constructor(smtp: SMTPConfig);
    send({ from, to, subject, html }: EmailOptions): Promise<any>;
    static createGmail({ user, pass }: StaticMethods): SendEmailSDK;
    static createOutlook({ user, pass }: StaticMethods): SendEmailSDK;
}

export { SendEmailSDK };
