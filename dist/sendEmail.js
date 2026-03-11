"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/sendEmail.ts
var sendEmail_exports = {};
__export(sendEmail_exports, {
  SendEmailSDK: () => SendEmailSDK
});
module.exports = __toCommonJS(sendEmail_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SendEmailSDK
});
