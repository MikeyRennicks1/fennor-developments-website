"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { brand } from "@/config/brand";

const SCROLL_THRESHOLD = 80;

export function Header() {
  const [open, setOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = isHome && !scrolled;
  const showLogo = brand.logoPath && !logoError;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent border-b border-white/20"
          : "bg-slate/95 backdrop-blur-lg border-b border-white/10 shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20 sm:h-22 md:h-24">
        <Link
          href="/"
          className={`flex items-center gap-2 font-semibold transition-all duration-300 ${
            isTransparent ? "text-white hover:text-white/90" : "text-white hover:text-accent-light"
          }`}
        >
          {showLogo ? (
            <span
              className={`inline-block transition-all duration-300 rounded-lg ${
                isTransparent
                  ? "opacity-[0.92] drop-shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                  : "opacity-100"
              } hover:shadow-gold-glow hover:ring-2 hover:ring-gold/30`}
            >
              <Image
                src={brand.logoPath!}
                alt={brand.logoAlt}
                width={320}
                height={112}
                className="h-12 sm:h-14 md:h-[5rem] lg:h-[5.5rem] w-auto object-contain object-left"
                priority
                onError={() => setLogoError(true)}
              />
            </span>
          ) : (
            <span className={`text-xl md:text-2xl tracking-tight ${isTransparent ? "text-white" : "text-white"}`}>
              {brand.displayName}
            </span>
          )}
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/solar"
            className={`text-sm font-medium transition-colors ${
              isTransparent ? "text-white/90 hover:text-white" : "text-white/90 hover:text-accent-light"
            }`}
          >
            Solar
          </Link>
          <Link
            href="/electrical"
            className={`text-sm font-medium transition-colors ${
              isTransparent ? "text-white/90 hover:text-white" : "text-white/90 hover:text-accent-light"
            }`}
          >
            Electrical
          </Link>
          <Link
            href="/builds-renovations"
            className={`text-sm font-medium transition-colors ${
              isTransparent ? "text-white/90 hover:text-white" : "text-white/90 hover:text-accent-light"
            }`}
          >
            Builds & Renovations
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors ${
              isTransparent ? "text-white/90 hover:text-white" : "text-white/90 hover:text-accent-light"
            }`}
          >
            About
          </Link>
          <Link
            href="/referral"
            className={`text-sm font-medium transition-colors ${
              isTransparent ? "text-white/90 hover:text-white" : "text-white/90 hover:text-accent-light"
            }`}
          >
            Referral
          </Link>
          <Link
            href="/calculator"
            className={`text-sm font-medium transition-colors ${
              isTransparent ? "text-white/90 hover:text-white" : "text-white/90 hover:text-accent-light"
            }`}
          >
            Calculator
          </Link>
          <Link
            href="/contact"
            className="ml-2 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-gold to-gold-light px-5 py-2.5 text-sm font-semibold text-navy-dark shadow-lg hover:shadow-gold-glow hover:-translate-y-1 transition-all duration-300"
          >
            Get a Quote
          </Link>
        </nav>
        <button
          type="button"
          className={`md:hidden p-2 rounded-lg transition-colors ${isTransparent ? "text-white" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/20 bg-slate/98 backdrop-blur-lg px-4 py-4 animate-fade-in">
          <nav className="flex flex-col gap-1">
            <Link href="/solar" className="py-3 text-white hover:text-accent-light transition-colors" onClick={() => setOpen(false)}>Solar</Link>
            <Link href="/electrical" className="py-3 text-white hover:text-accent-light transition-colors" onClick={() => setOpen(false)}>Electrical</Link>
            <Link href="/builds-renovations" className="py-3 text-white hover:text-accent-light transition-colors" onClick={() => setOpen(false)}>Builds & Renovations</Link>
            <Link href="/about" className="py-3 text-white hover:text-accent-light transition-colors" onClick={() => setOpen(false)}>About</Link>
            <Link href="/referral" className="py-3 text-white hover:text-accent-light transition-colors" onClick={() => setOpen(false)}>Referral</Link>
            <Link href="/calculator" className="py-3 text-white hover:text-accent-light transition-colors" onClick={() => setOpen(false)}>Calculator</Link>
            <Link
              href="/contact"
              className="mt-3 inline-flex justify-center rounded-lg bg-gradient-to-r from-gold to-gold-light px-4 py-3 text-sm font-semibold text-navy-dark shadow-lg hover:shadow-gold-glow hover:-translate-y-0.5 transition-all duration-300"
              onClick={() => setOpen(false)}
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
