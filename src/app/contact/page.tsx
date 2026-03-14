import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT_HERO } from "@/config/images";

export const metadata: Metadata = {
  title: "Contact | Get a Quote | Slane Meath | Fennor Developments",
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
            <ContactForm />
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
