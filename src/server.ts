import express, { Application, Request, Response } from "express";
import nodemailer from "nodemailer";
import type { ApiResponse, EmailOptions, SMTPConfig } from "./types";

const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true, message: "email-SDK server running." })
})

app.post("/api/send-email", async (req: Request, res: Response) => {
  try {
    const body = req.body as { smtp: SMTPConfig } & EmailOptions;

    const transporter = nodemailer.createTransport({
      host: body.smtp.host,
      port: body.smtp.port,
      secure: body.smtp.secure ?? false,
      auth: body.smtp.auth,
    });

    const result = await transporter.sendMail({
      from: body.from || body.smtp.auth.user,
      to: body.to,
      subject: body.subject,
      html: body.html,
      text: body.text,
    });

    const response: ApiResponse = { success: true, ...result };
    res.status(200).json(response);
  } catch (err: any) {
    const response: ApiResponse = { success: false, message: err.message };
    res.status(500).json(response);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Email SDK server running on port ${PORT}`);
});

export default app;