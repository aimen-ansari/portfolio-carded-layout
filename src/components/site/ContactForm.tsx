import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

/** Every inquiry from this form is addressed to this mailbox. */
const RECIPIENT = "info@aimenansari.com";

/**
 * Contact-form delivery. The form works out of the box by opening the
 * visitor's mail client (addressed to RECIPIENT). Add ONE of the following to
 * a `.env` file (see `.env.example`) to have submissions delivered to
 * RECIPIENT automatically, with no mail app involved:
 *
 *   • Web3Forms — a single key:  VITE_WEB3FORMS_ACCESS_KEY=...
 *   • EmailJS   — three values:  VITE_EMAILJS_SERVICE_ID / _TEMPLATE_ID / _PUBLIC_KEY
 *
 * Preference order: Web3Forms → EmailJS → mail client.
 */

/**
 * Web3Forms access keys are public: they are meant to be shipped in client-side
 * code (security comes from domain restrictions in the Web3Forms dashboard).
 * This default is the project's key; it can still be overridden by the env var.
 */
const DEFAULT_WEB3FORMS_KEY = "054b860c-ca1d-45b2-ad6b-1cfdc63d6a63";

const WEB3FORMS_KEY =
  (import.meta.env["VITE_WEB3FORMS_ACCESS_KEY"] as string | undefined) || DEFAULT_WEB3FORMS_KEY;
const SERVICE_ID = import.meta.env["VITE_EMAILJS_SERVICE_ID"] as string | undefined;
const TEMPLATE_ID = import.meta.env["VITE_EMAILJS_TEMPLATE_ID"] as string | undefined;
const PUBLIC_KEY = import.meta.env["VITE_EMAILJS_PUBLIC_KEY"] as string | undefined;

const EMAILJS_READY = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
const PROVIDER: "web3forms" | "emailjs" | "mailto" = WEB3FORMS_KEY
  ? "web3forms"
  : EMAILJS_READY
    ? "emailjs"
    : "mailto";
const SENDS_AUTOMATICALLY = PROVIDER !== "mailto";

const projectTypes = [
  "Business Website",
  "E-Commerce Store",
  "SaaS Platform",
  "Web Application",
  "AI Integration",
  "Something else",
];

const field =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";

type Status = "idle" | "sending" | "sent" | "error";

interface Inquiry {
  name: string;
  email: string;
  type: string;
  message: string;
  subject: string;
}

async function sendWithWeb3Forms(inquiry: Inquiry) {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: inquiry.subject,
      from_name: inquiry.name,
      email: inquiry.email,
      replyto: inquiry.email,
      project_type: inquiry.type,
      message: inquiry.message,
    }),
  });
  const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
  if (!response.ok || !result?.success) {
    throw new Error("Web3Forms request failed");
  }
}

async function sendWithEmailJS(inquiry: Inquiry) {
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: PUBLIC_KEY,
      template_params: {
        from_name: inquiry.name,
        from_email: inquiry.email,
        reply_to: inquiry.email,
        subject: inquiry.subject,
        project_type: inquiry.type,
        message: inquiry.message,
        to_email: RECIPIENT,
      },
    }),
  });
  if (!response.ok) {
    throw new Error(`EmailJS responded with ${response.status}`);
  }
}

function openMailClient(subject: string, body: string) {
  window.location.href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

/**
 * Contact form. Delivers to RECIPIENT via Web3Forms or EmailJS when configured,
 * otherwise hands a pre-filled email to the visitor's mail client.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const type = String(data.get("type") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `Project inquiry — ${name || "Portfolio"}`;

    if (PROVIDER === "mailto") {
      const body = [`Name: ${name}`, `Email: ${email}`, `Project type: ${type}`, "", message].join(
        "\n",
      );
      openMailClient(subject, body);
      setStatus("sent");
      return;
    }

    setStatus("sending");
    const inquiry: Inquiry = { name, email, type, message, subject };
    try {
      if (PROVIDER === "web3forms") {
        await sendWithWeb3Forms(inquiry);
      } else {
        await sendWithEmailJS(inquiry);
      }
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="reveal flex h-full flex-col justify-center rounded-2xl border border-accent/30 bg-accent/5 p-6 sm:p-8">
        <span className="grid h-11 w-11 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="label-mono mt-5 text-accent">
          {SENDS_AUTOMATICALLY ? "Message sent" : "Almost there"}
        </p>
        <p className="mt-4 text-lg leading-relaxed text-foreground">
          {SENDS_AUTOMATICALLY ? (
            <>
              Thanks — your inquiry is on its way to{" "}
              <span className="text-accent">{RECIPIENT}</span>. I&apos;ll get back to you within one
              working day.
            </>
          ) : (
            <>
              Your email app should now be open with the message ready to send to{" "}
              <span className="text-accent">{RECIPIENT}</span>.
            </>
          )}
        </p>
        {!SENDS_AUTOMATICALLY && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            If nothing opened, email me directly — the address is on the left.
          </p>
        )}
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="arrow-shift mt-7 inline-flex w-fit items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-accent"
        >
          Write another <ArrowRight className="arrow h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={onSubmit}
      aria-label={`Project inquiry form — sends to ${RECIPIENT}`}
      className="relative grid gap-4 rounded-2xl border border-border bg-background/40 p-5 sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="label-mono text-muted-foreground">Project inquiry</p>
        <span className="hidden font-mono text-[10px] tracking-[0.16em] text-muted-foreground/60 uppercase sm:inline">
          {SENDS_AUTOMATICALLY ? "Delivered by email" : "Opens your email app"}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            Name
          </span>
          <input
            required
            name="name"
            autoComplete="name"
            placeholder="Your name"
            className={field}
          />
        </label>
        <label className="grid gap-2">
          <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            Email
          </span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@company.com"
            className={field}
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
          Project type
        </span>
        <select required name="type" defaultValue="" className={field}>
          <option value="" disabled>
            What are you building?
          </option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2">
        <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
          Message
        </span>
        <textarea
          required
          name="message"
          rows={4}
          placeholder="A sentence or two about the project, goals or timeline."
          className={`${field} resize-none`}
        />
      </label>

      {status === "error" && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-xs leading-relaxed text-red-500">
          Something went wrong sending the message. Please email me directly at{" "}
          <a className="underline" href={`mailto:${RECIPIENT}`}>
            {RECIPIENT}
          </a>
          .
        </p>
      )}

      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="submit"
          disabled={sending}
          className="arrow-shift shine-sweep inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? (
            <>
              Sending <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            </>
          ) : (
            <>
              Send inquiry <ArrowRight className="arrow h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
        <span className="text-xs text-muted-foreground">
          Goes to <span className="text-accent">{RECIPIENT}</span>
        </span>
      </div>
    </form>
  );
}
