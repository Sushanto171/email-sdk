
export interface SMTPConfig {
  host: string
  port: number
  secure?: boolean
  auth: {
    user: string
    pass: string
  }
}

export interface EmailOptions {
  from: string,
  to: string
  subject: string
  html: string
}

interface Address {
  name: string;
  address: string;
}


export interface ApiResponse {
  success: boolean
  message?: string
  // Optional Nodemailer info
  envelope?: any
  messageId?: string
  accepted?: Array<string | Address>
  rejected?: Array<string | Address>
  pending?: Array<string | Address>
  response?: string
}