import type { EmailOptions, SMTPConfig, StaticMethods } from "./types";
/**
 * Minimal class-based SDK
 * Automatically picks API URL from environment or default
 */
export declare class SendEmailSDK {
    private apiUrl;
    private smtp;
    constructor(smtp: SMTPConfig);
    send({ from, to, subject, html }: EmailOptions): Promise<any>;
    static createGmail({ user, pass }: StaticMethods): SendEmailSDK;
    static createOutlook({ user, pass }: StaticMethods): SendEmailSDK;
}
