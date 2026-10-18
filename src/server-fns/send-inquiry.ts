import { createServerFn } from "@tanstack/react-start";

/**
 * Contact-form delivery — Resend is the ONLY automatic path.
 *
 * The Resend API key is a secret: unlike Web3Forms keys it must never reach
 * the browser, so it lives in the server-only RESEND_API_KEY env var (no
 * VITE_ prefix — those are shipped to every visitor). The form calls this
 * server function instead of Resend directly. When the key is absent the
 * form falls back to opening the visitor's mail app.
 *
 * Env (see .env.example):
 *   RESEND_API_KEY    — required for automatic delivery; https://resend.com/api-keys
 *   RESEND_FROM       — optional sender; defaults to "Aimen Ansari <info@aimenansari.com>"
 *   RESEND_TEST_MODE  — while your sending domain is unverified, set BOTH of
 *   RESEND_TEST_INBOX    these: Resend only delivers from onboarding@resend.dev
 *                        to the address that owns the account.
 */

/** Every inquiry is addressed to this mailbox. */
export const RECIPIENT = "info@aimenansari.com";

export interface InquiryInput {
  name: string;
  email: string;
  type: string;
  message: string;
  /** Honeypot — real visitors never see or fill this field. */
  company?: string;
}

export type SendInquiryResult =
  | { status: "sent" }
  | { status: "not-configured" }
  | { status: "error" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

/**
 * Send one portfolio inquiry through Resend. The visitor's email is set as
 * Reply-To, so replying from the inbox answers the visitor directly.
 */
export const sendInquiry = createServerFn({ method: "POST" })
  .validator((input: unknown): InquiryInput => {
    const data = (input ?? {}) as Record<string, unknown>;
    const inquiry: InquiryInput = {
      name: clean(data["name"], 200),
      email: clean(data["email"], 320),
      type: clean(data["type"], 100),
      message: clean(data["message"], 5000),
      company: clean(data["company"], 200),
    };
    if (!inquiry.name || !inquiry.message) {
      throw new Error("Name and message are required");
    }
    if (!EMAIL_RE.test(inquiry.email)) {
      throw new Error("A valid email address is required");
    }
    return inquiry;
  })
  .handler(async ({ data }): Promise<SendInquiryResult> => {
    const apiKey = process.env["RESEND_API_KEY"]?.trim();
    if (!apiKey) return { status: "not-configured" };

    // Honeypot tripped — pretend success so bots learn nothing.
    if (data.company) return { status: "sent" };

    const testInbox = process.env["RESEND_TEST_INBOX"]?.trim();
    const testMode = Boolean(process.env["RESEND_TEST_MODE"]?.trim() && testInbox);

    // Resend only accepts onboarding@resend.dev while the domain is unverified.
    const from = testMode
      ? "Aimen Ansari <onboarding@resend.dev>"
      : process.env["RESEND_FROM"]?.trim() || `Aimen Ansari <${RECIPIENT}>`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [testMode ? (testInbox as string) : RECIPIENT],
        reply_to: data.email,
        subject: `Project inquiry — ${data.name}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Project type: ${data.type || "Not specified"}`,
          "",
          data.message,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      console.error(
        `Resend responded with ${response.status}:`,
        await response.text().catch(() => ""),
      );
      return { status: "error" };
    }
    return { status: "sent" };
  });
