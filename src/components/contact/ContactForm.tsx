"use client";

import { useState } from "react";
import Link from "next/link";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
      name: (form.querySelector('[name="name"]') as HTMLInputElement).value.trim(),
      email: (form.querySelector('[name="email"]') as HTMLInputElement).value.trim(),
      phone: (form.querySelector('[name="phone"]') as HTMLInputElement).value.trim(),
      message: (form.querySelector('[name="message"]') as HTMLTextAreaElement).value.trim(),
    };
    setStatus("sending");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gray-200/80 bg-white bg-gold/5 p-8 sm:p-10 shadow-card border-gold/30 transition-all duration-300">
        <div className="flex flex-col items-center text-center max-w-md mx-auto">
          <div
            className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6"
            aria-hidden
          >
            <svg
              className="w-8 h-8 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-slate tracking-tight">
            Message sent!
          </h2>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            Thanks for reaching out — we&apos;ll be in touch shortly. You&apos;ve taken the first step and we&apos;re looking forward to helping you.
          </p>
          <p className="mt-2 text-slate font-medium text-sm">
            We&apos;ll get back to you as soon as we can.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-graphite px-8 py-3.5 text-sm font-medium text-white hover:bg-slate transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white bg-gold/5 p-8 sm:p-10 shadow-card hover:shadow-card-hover hover:border-gold/50 transition-all duration-300">
      <h2 className="text-xl font-light text-slate tracking-wide mb-4">Get in touch</h2>
      <p className="text-gray-600 text-sm mb-8">
        Send us a message and we&apos;ll get back to you as soon as we can.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="hidden" name="_subject" value="Fennor website enquiry" />
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={status === "sending"}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-slate focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors disabled:opacity-60"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={status === "sending"}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-slate focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors disabled:opacity-60"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate mb-1">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            disabled={status === "sending"}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-slate focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors disabled:opacity-60"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            disabled={status === "sending"}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-slate focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors disabled:opacity-60"
          />
        </div>
        {status === "error" && (
          <p className="text-sm text-red-600">
            {errorMessage || "Something went wrong. Please try again or email us directly."}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex justify-center rounded-xl bg-graphite px-8 py-3.5 text-sm font-medium text-white hover:bg-slate transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}
