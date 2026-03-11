import nodemailer from "nodemailer";
import { SentMessageInfo } from "nodemailer/lib/smtp-transport";
import { ApiResponse, EmailOptions, SMTPConfig } from "../../../src/types";


export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json() as { smtp: SMTPConfig } & EmailOptions

    const transporter = nodemailer.createTransport({
      host: body.smtp.host,
      port: body.smtp.port,
      secure: body.smtp.secure ?? false,
      auth: body.smtp.auth
    })

    const res: SentMessageInfo = await transporter.sendMail({
      from: body?.from || body.smtp.auth.user,
      to: body.to,
      subject: body.subject,
      html: body.html,
      text: body.text,
    })

    const resBody: ApiResponse = { success: true, ...res, }

    return new Response(JSON.stringify(resBody), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    })
  } catch (err: any) {

    const resBody: ApiResponse = {
      success: false,
      message: err.message
    }

    return new Response(JSON.stringify(resBody), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}