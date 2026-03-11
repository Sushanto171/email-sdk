import express, { Application, Request, Response } from "express";
import nodemailer from "nodemailer";
import type { ApiResponse, EmailOptions, SMTPConfig } from "./types";

const app: Application = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Email SDK server is running" });
});

app.post("/api/send-email", async (req: Request, res: Response) => {
  try {
    const { smtp, from, to, subject, html, text } = req.body as { smtp: SMTPConfig } & EmailOptions;

    if (!smtp || !from || (!to && !subject)) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters: from, smtp, and at least one of to or subject"
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure ?? false,
      auth: smtp.auth,
    });

    const result = await transporter.sendMail({
      from: from || smtp.auth.user,
      to: to,
      subject: subject,
      ...(html && { html }),
      ...(text && { text }),
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