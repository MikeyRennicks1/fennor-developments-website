import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CONTACT_HERO } from "@/config/images";

export const metadata: Metadata = {
  title: "Contact | Get a Quote | Book Consultation | Slane, Meath | Fennor Developments",
  description:
    "Contact Fennor Developments for solar, electrical or build quotes. Slane, Co. Meath. North & East Leinster, Ireland.",
};

const EMAIL = "fennordevelopments@gmail.com";
const PHONE = "083 858 5498";
const PHONE_ALT = "086 192 1591";
const WHATSAPP = "353838585498";
const LOCATION = "Slane, Co. Meath, Ireland";

export default function ContactPage() {
  return (
    <>
      <PageHero
        imageSrc={CONTACT_HERO}
        imageAlt="Fennor Developments – Slane, Meath"
        headline="Contact"
        objectPosition="center center"
        subline="We primarily serve North & East Leinster, operating throughout Ireland."
      />

      <section className="py-20 sm:py-28 bg-off-white bg-texture-fine-lines">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="rounded-2xl border border-gray-200/80 bg-white bg-gold/5 p-8 sm:p-10 shadow-card hover:shadow-card-hover hover:border-gold/50 transition-all duration-300">
              <h2 className="text-xl font-light text-slate tracking-wide mb-4">Get in touch</h2>
              <p className="text-gray-600 text-sm mb-8">
                Send us a message and we&apos;ll get back to you as soon as we can.
              </p>
              <form
                action={`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID || "your-form-id"}`}
                method="POST"
                className="space-y-5"
              >
                <input type="hidden" name="_subject" value="Fennor website enquiry" />
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate mb-1">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-slate focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate mb-1">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-slate focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate mb-1">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-slate focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-slate focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-xl bg-graphite px-8 py-3.5 text-sm font-medium text-white hover:bg-slate transition-colors"
                >
                  Send message
                </button>
              </form>
            </div>
            <div className="rounded-2xl border border-gray-200/80 bg-white p-8 shadow-md">
              <h2 className="text-xl font-light text-slate tracking-wide mb-5">Contact details</h2>
              <p className="text-slate font-medium">{LOCATION}</p>
              <p className="mt-5">
                <a href={`mailto:${EMAIL}`} className="text-accent hover:text-accent-light font-medium text-sm">
                  {EMAIL}
                </a>
              </p>
              <p className="mt-3">
                <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="text-accent hover:text-accent-light font-medium text-sm">
                  {PHONE}
                </a>
                {" · "}
                <a href={`tel:${PHONE_ALT.replace(/\s/g, "")}`} className="text-accent hover:text-accent-light font-medium text-sm">
                  {PHONE_ALT}
                </a>
              </p>
              <p className="mt-3">
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-light font-medium text-sm"
                >
                  WhatsApp
                </a>
              </p>
              <p className="mt-6 text-gray-500 text-sm">
                We primarily serve North & East Leinster, operating throughout Ireland.
              </p>
              <Link
                href="/"
                className="mt-8 inline-block text-sm text-slate hover:text-accent transition-colors"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
