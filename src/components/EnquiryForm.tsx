'use client';

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { enquiryEmailHref } from '@/config/contact';
import { ENQUIRY_LIMITS, ENQUIRY_UNAVAILABLE, validateEnquiry, type EnquiryPayload } from '@/lib/enquiry';
import './enquiry-form.css';

type SubmissionState = { status: 'idle' | 'sending' | 'success' | 'error'; message: string };

export function useEnquirySubmission() {
  const [state, setState] = useState<SubmissionState>({ status: 'idle', message: '' });
  const active = useRef(false);
  const attempt = useRef<{ fingerprint: string; id: string } | null>(null);

  function clear() {
    if (active.current) return;
    setState({ status: 'idle', message: '' });
    attempt.current = null;
  }

  async function submit(fields: Omit<EnquiryPayload, 'requestId'>) {
    if (active.current) return;
    const fingerprint = JSON.stringify(fields);
    if (attempt.current?.fingerprint !== fingerprint) attempt.current = { fingerprint, id: crypto.randomUUID() };
    const payload = { ...fields, requestId: attempt.current.id };
    const validation = validateEnquiry(payload);
    if (!validation.ok) { setState({ status: 'error', message: validation.error }); return; }
    active.current = true;
    setState({ status: 'sending', message: 'Sending your enquiry…' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), signal: AbortSignal.timeout(20000),
      });
      const result = await response.json().catch(() => null) as { success?: unknown; error?: unknown; message?: unknown } | null;
      if (response.ok && result?.success === true) {
        setState({ status: 'success', message: 'Your enquiry has been accepted for delivery to Fennor. We will review your plans and contact you to agree the next step.' });
      } else {
        setState({ status: 'error', message: typeof result?.error === 'string' ? result.error : ENQUIRY_UNAVAILABLE });
      }
    } catch { setState({ status: 'error', message: ENQUIRY_UNAVAILABLE }); }
    finally { active.current = false; }
  }
  return { ...state, submit, clear };
}

type EnquiryFormProps = {
  topic: string;
  children?: ReactNode;
  context?: string;
  className?: string;
  buttonClassName?: string;
  buttonLabel?: string;
};

export default function EnquiryForm({ topic, children, context = '', className = '', buttonClassName = '', buttonLabel = 'Send my enquiry' }: EnquiryFormProps) {
  const id = useId();
  const [ready, setReady] = useState(false);
  const submission = useEnquirySubmission();
  const status = useRef<HTMLDivElement>(null);
  const submittedContext = useRef('');
  useEffect(() => setReady(true), []);
  useEffect(() => { submission.clear(); }, [topic, context]); // Changes outside the form also begin a fresh enquiry.
  useEffect(() => { if (submission.status === 'success' || submission.status === 'error') status.current?.focus(); }, [submission.status]);

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => typeof data.get(key) === 'string' ? String(data.get(key)) : '';
    submittedContext.current = `${topic}\n${context}`;
    void submission.submit({ name: value('name'), contact: value('contact'), area: value('area'), details: value('details'), website: value('website'), topic, context, page: window.location.pathname });
  }

  const changedDuringSend = submittedContext.current !== `${topic}\n${context}`;
  return <form className={`enquiry-form ${className}`} method="post" onSubmit={send} onChange={submission.clear} aria-busy={submission.status === 'sending'}>
    <fieldset className="enquiry-fields" disabled={!ready || submission.status === 'sending'} aria-label="Send an enquiry">
      <label htmlFor={`${id}-name`}>Your name<input id={`${id}-name`} name="name" required minLength={2} maxLength={ENQUIRY_LIMITS.name} autoComplete="name" /></label>
      <label htmlFor={`${id}-contact`}>How should we contact you?<input id={`${id}-contact`} name="contact" required maxLength={ENQUIRY_LIMITS.contact} placeholder="Email address or phone number" aria-describedby={`${id}-contact-note`} /></label>
      <p id={`${id}-contact-note`} className="enquiry-note">An email address or phone number is enough.</p>
      <div className="enquiry-trap" aria-hidden="true"><label htmlFor={`${id}-website`}>Website — leave this blank</label><input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" maxLength={ENQUIRY_LIMITS.website} /></div>
      {children}
      <button className={buttonClassName} type="submit" disabled={submission.status === 'success' && !changedDuringSend}>{submission.status === 'sending' ? 'Sending…' : submission.status === 'success' && !changedDuringSend ? 'Enquiry sent' : buttonLabel} <span aria-hidden="true">↗</span></button>
      <p className="enquiry-note">Send your details to the Fennor team so we can respond to your enquiry. No files are uploaded here. Please leave out bank details, welfare documents and other sensitive information. <a href="/privacy">How we use your information</a>.</p>
    </fieldset>
    {submission.status !== 'idle' && <div ref={status} tabIndex={-1} className={`enquiry-status enquiry-status-${submission.status}`} role={submission.status === 'error' ? 'alert' : 'status'} aria-live={submission.status === 'error' ? 'assertive' : 'polite'}><p>{submission.message}</p>{submission.status === 'success' && changedDuringSend && <p>This confirmation is for the choices you submitted. Your newer selections have not been sent.</p>}{submission.status === 'error' && <p><a href={enquiryEmailHref({ subject: topic })}>Email info@fennor.ie and mikey@fennor.ie</a> or <a href="tel:+353894032737">call 089 403 2737</a>.</p>}</div>}
    <noscript><p className="enquiry-note">To enquire without JavaScript, <a href={enquiryEmailHref({ subject: topic })}>email info@fennor.ie and mikey@fennor.ie</a> or <a href="tel:+353894032737">call 089 403 2737</a>. Nothing has been submitted.</p></noscript>
  </form>;
}
