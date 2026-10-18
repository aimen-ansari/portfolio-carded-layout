import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2, TriangleAlert } from "lucide-react";

import { RECIPIENT, sendInquiry } from "@/server-fns/send-inquiry";

/**
 * Contact form. Submissions are delivered by Resend through a server
 * function (see src/server-fns/send-inquiry.ts) so the API key never
 * reaches the browser. When no RESEND_API_KEY is configured, the form
 * falls back to opening the visitor's mail app, pre-filled to RECIPIENT.
 */

const projectTypes = [
  "Business Website",
  "E-Commerce Store",
  "SaaS Platform",
  "Web Application",
  "AI Integration",
  "Something else",
];

/**
 * Underline fields. The label sits in the placeholder position while the field
 * is empty, then rises into a small mono caption on focus or once filled.
 */
const fieldBase =
  "peer block w-full rounded-none border-b border-border bg-transparent px-0 pb-2.5 pt-6 text-sm leading-5 text-foreground outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-transparent focus:border-accent focus:shadow-[0_1px_0_0_var(--accent)]";

const floatLabel =
  "pointer-events-none absolute left-0 top-6 text-sm leading-5 text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-mono peer-focus:tracking-[0.16em] peer-focus:uppercase peer-focus:text-accent " +
  "peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:font-mono peer-[&:not(:placeholder-shown)]:tracking-[0.16em] peer-[&:not(:placeholder-shown)]:uppercase";

interface FloatFieldProps {
  label: string;
  name: string;
  required?: boolean;
  type?: "text" | "email";
  autoComplete?: string;
  textarea?: boolean;
  rows?: number;
}

function FloatField({
  label,
  name,
  required,
  type = "text",
  autoComplete,
  textarea,
  rows,
}: FloatFieldProps) {
  return (
    <label className="relative block">
      {textarea ? (
        <textarea
          required={required}
          name={name}
          rows={rows ?? 4}
          placeholder=" "
          className={`${fieldBase} resize-none`}
        />
      ) : (
        <input
          required={required}
          name={name}
          type={type}
          autoComplete={autoComplete}
          placeholder=" "
          className={fieldBase}
        />
      )}
      <span className={floatLabel}>{label}</span>
    </label>
  );
}

/** Decorative accent hairline that crowns the panel. */
function TopHairline() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent to-transparent"
    />
  );
}

type Status = "idle" | "sending" | "sent" | "error";

function openMailClient(subject: string, body: string) {
  window.location.href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  /** How the last inquiry was delivered — drives the sent-state copy. */
  const [delivered, setDelivered] = useState<"email" | "mail-app">("email");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const type = String(data.get("type") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `Project inquiry — ${name || "Portfolio"}`;

    setStatus("sending");
    try {
      const result = await sendInquiry({
        data: { name, email, type, message, company: String(data.get("company") ?? "") },
      });

      if (result.status === "not-configured") {
        // No server-side key (local dev / misconfig): hand off to the mail app.
        const body = [`Name: ${name}`, `Email: ${email}`, `Project type: ${type}`, "", message].join(
          "\n",
        );
        openMailClient(subject, body);
        setDelivered("mail-app");
        setStatus("sent");
        return;
      }

      if (result.status === "error") {
        setStatus("error");
        return;
      }

      setDelivered("email");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="reveal relative flex h-full flex-col justify-center overflow-hidden rounded-2xl border border-border bg-background/45 p-7 backdrop-blur-sm sm:p-10">
        <TopHairline />
        <span className="grid h-12 w-12 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="label-mono mt-6 text-accent">
          {delivered === "email" ? "Message sent" : "Almost there"}
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground">
          {delivered === "email" ? (
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
        {delivered === "mail-app" && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            If nothing opened, email me directly — the address is on the left.
          </p>
        )}
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="arrow-shift mt-8 inline-flex w-fit items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-accent"
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
      className="relative overflow-hidden rounded-2xl border border-border bg-background/45 p-6 backdrop-blur-sm sm:p-8 lg:p-9"
    >
      <TopHairline />

      <div className="flex items-baseline justify-between gap-3">
        <p className="label-mono text-foreground">Project inquiry</p>
        <span className="hidden font-mono text-[10px] tracking-[0.16em] text-muted-foreground/60 uppercase sm:inline">
          {RECIPIENT}
        </span>
      </div>

      <div className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <FloatField label="Name" name="name" required autoComplete="name" />
        <FloatField label="Email" name="email" type="email" required autoComplete="email" />
      </div>

      <fieldset className="mt-8">
        <legend className="label-mono text-muted-foreground">What are you building?</legend>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {projectTypes.map((type) => (
            <label key={type} className="cursor-pointer">
              <input type="radio" name="type" value={type} required className="peer sr-only" />
              <span className="inline-flex rounded-full border border-border bg-surface/40 px-4 py-2 text-xs text-muted-foreground transition-colors duration-300 hover:border-accent/50 hover:text-foreground peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                {type}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8">
        <FloatField label="Message" name="message" required textarea rows={4} />
      </div>

      {status === "error" && (
        <p className="mt-7 flex items-start gap-2.5 rounded-r-xl border-l-2 border-destructive bg-destructive/5 px-4 py-3 text-xs leading-relaxed text-destructive">
          <TriangleAlert className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>
            Something went wrong sending the message. Please email me directly at{" "}
            <a className="underline underline-offset-2" href={`mailto:${RECIPIENT}`}>
              {RECIPIENT}
            </a>
            .
          </span>
        </p>
      )}

      {/* Honeypot — hidden from humans; bots that fill it are dropped silently. */}
      <div className="sr-only" aria-hidden="true">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="arrow-shift shine-sweep mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_18px_42px_-18px_color-mix(in_oklch,var(--accent)_85%,transparent)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
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
    </form>
  );
}
