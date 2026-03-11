import nodemailer from "nodemailer";
import { SentMessageInfo } from "nodemailer/lib/smtp-transport";
import { ApiResponse, EmailOptions, SMTPConfig } from "../../src/types";

export const runtime = "edge";


export async function POST(req: Request): Promise<Response> {
  try {
    const { smtp, html, from, to, text, subject } = (await req.json()) as { smtp: SMTPConfig } & EmailOptions

    // Validate required fields first
    if (!smtp || !from || (!to && !subject)) {
      const resBody: ApiResponse = {
        success: false,
        message: "Missing required parameters: from, smtp, and at least one of to or subject"
      };
      return new Response(JSON.stringify(resBody), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure ?? false,
      auth: smtp.auth
    })

    const res: SentMessageInfo = await transporter.sendMail({
      from: from || smtp.auth.user,
      to: to,
      subject: subject,
      ...(html && { html }),
      ...(text && { text }),
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