"use client";

import { useState, useMemo, useCallback } from "react";
import { generateEstimatePdf } from "@/lib/estimate-pdf";
import { getSeaiGrantAmount } from "@/lib/seai-grant";
import { brand } from "@/config/brand";
import { PANEL_KW } from "@/config/solar";

function getLogoDataUri(): Promise<string | null> {
  return fetch(brand.logoPath)
    .then((r) => (r.ok ? r.blob() : Promise.reject(new Error("Logo not found"))))
    .then(
      (blob) =>
        new Promise<string | null>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Failed to read logo"));
          reader.readAsDataURL(blob);
        })
    )
    .catch(() => null);
}

const SYSTEM_QUOTES: Record<number, number> = {
  8: 6000,
  10: 6800,
  12: 7650,
  14: 8475,
  16: 9300,
  18: 10200,
};

const PANEL_OPTIONS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const BATTERY_PRICE = 1975;
const EDDI_PRICE = 700;
const EV_CHARGER_PRICE = 750;
const KWH_PER_KWP_YEAR = 900;
const DEFAULT_UNIT_RATE = 0.35;

function getSystemPrice(panels: number): number {
  if (panels in SYSTEM_QUOTES) return SYSTEM_QUOTES[panels];
  const low = Math.floor(panels / 2) * 2;
  const high = low + 2;
  if (low < 8) return SYSTEM_QUOTES[8];
  if (high > 18) return SYSTEM_QUOTES[18];
  const pLow = SYSTEM_QUOTES[low as keyof typeof SYSTEM_QUOTES] ?? SYSTEM_QUOTES[8];
  const pHigh = SYSTEM_QUOTES[high as keyof typeof SYSTEM_QUOTES] ?? SYSTEM_QUOTES[18];
  return Math.round(pLow + ((panels - low) / 2) * (pHigh - pLow));
}

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-slate focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors";

export function SolarCalculatorClient() {
  const [step, setStep] = useState<"contact" | "calculator">("contact");
  const [contact, setContact] = useState({
    budget: "",
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [panels, setPanels] = useState(12);
  const [battery, setBattery] = useState(false);
  const [eddi, setEddi] = useState(false);
  const [evCharger, setEvCharger] = useState(false);
  const [applyGrant, setApplyGrant] = useState(true);
  const [unitRate, setUnitRate] = useState(DEFAULT_UNIT_RATE);

  const canProceed =
    contact.budget.trim() !== "" &&
    contact.name.trim() !== "" &&
    contact.email.trim() !== "" &&
    contact.address.trim() !== "" &&
    contact.phone.trim() !== "";

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed) return;
    // Send lead to your email in the background (PDF); user continues to calculator without delay
    fetch("/api/calculator-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: contact.name.trim(),
        email: contact.email.trim(),
        phone: contact.phone.trim(),
        address: contact.address.trim(),
        budget: contact.budget.trim(),
      }),
    })
      .then((res) => {
        if (!res.ok && process.env.NODE_ENV === "development") {
          res.json().then((d) => console.warn("[Calculator lead] API error:", d?.error || res.status));
        }
      })
      .catch(() => {});
    setStep("calculator");
  };

  const result = useMemo(() => {
    const systemPrice = getSystemPrice(panels);
    const addOns = (battery ? BATTERY_PRICE : 0) + (eddi ? EDDI_PRICE : 0) + (evCharger ? EV_CHARGER_PRICE : 0);
    const totalPrice = systemPrice + addOns;
    const systemKw = panels * PANEL_KW;
    const grantAmount = getSeaiGrantAmount(systemKw);
    const afterGrant = applyGrant ? Math.max(0, totalPrice - grantAmount) : totalPrice;
    const yearlyKwh = systemKw * KWH_PER_KWP_YEAR;
    const yearlySavings = Math.round(yearlyKwh * unitRate);
    const paybackYears = yearlySavings > 0 ? afterGrant / yearlySavings : 0;
    const twentyYearSavings = yearlySavings * 20;
    const co2Kg = Math.round(yearlyKwh * 0.3);
    const monthlySavings = Math.round(yearlySavings / 12);
    const savings5y = yearlySavings * 5;
    const savings10y = yearlySavings * 10;
    const savings30y = yearlySavings * 30;

    return {
      totalPrice,
      afterGrant,
      grantAmount,
      yearlySavings,
      paybackYears,
      twentyYearSavings,
      co2Kg,
      monthlySavings,
      savings5y,
      savings10y,
      savings30y,
    };
  }, [panels, battery, eddi, evCharger, applyGrant, unitRate]);

  const [pdfStatus, setPdfStatus] = useState<"idle" | "downloading" | "sending" | "sent" | "error">("idle");

  const getPdfData = useCallback(() => ({
    contact: { budget: contact.budget, name: contact.name, email: contact.email, address: contact.address, phone: contact.phone },
    panels,
    battery,
    eddi,
    evCharger,
    applyGrant,
    unitRate,
    result,
  }), [contact, panels, battery, eddi, evCharger, applyGrant, unitRate, result]);

  const handleDownloadPdf = useCallback(async () => {
    setPdfStatus("downloading");
    try {
      const logoDataUri = await getLogoDataUri();
      const data = getPdfData();
      const buf = generateEstimatePdf({ ...data, logoDataUri: logoDataUri ?? undefined });
      const bytes = buf instanceof ArrayBuffer ? new Uint8Array(buf) : new Uint8Array(buf);
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Fennor-Solar-Estimate.pdf";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 200);
      setPdfStatus("idle");
    } catch {
      setPdfStatus("error");
    }
  }, [getPdfData]);

  const handleEmailPdf = useCallback(async () => {
    setPdfStatus("sending");
    try {
      const res = await fetch("/api/calculator/send-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getPdfData()),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Failed to send email");
      setPdfStatus("sent");
    } catch {
      setPdfStatus("error");
    }
  }, [getPdfData]);

  return (
    <div className="space-y-8">
      {step === "contact" && (
        <div className="rounded-2xl border-2 border-accent/20 bg-white p-6 sm:p-8 shadow-card-3d">
          <h2 className="text-xl font-semibold text-slate mb-2">Your details</h2>
          <p className="text-gray-600 text-sm mb-6">
            Please fill in your contact details and budget so we can tailor your estimate. Then you&apos;ll use the calculator below.
          </p>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
                <label htmlFor="calc-budget" className="block text-sm font-medium text-slate mb-1">
                Approximate budget (€)
              </label>
              <input
                id="calc-budget"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 8000"
                value={contact.budget}
                onChange={(e) => setContact((c) => ({ ...c, budget: e.target.value }))}
                className={inputClass}
                required
              />
            </div>
            <div>
                <label htmlFor="calc-name" className="block text-sm font-medium text-slate mb-1">Name</label>
              <input
                id="calc-name"
                type="text"
                value={contact.name}
                onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                className={inputClass}
                required
              />
            </div>
            <div>
                <label htmlFor="calc-email" className="block text-sm font-medium text-slate mb-1">Email</label>
              <input
                id="calc-email"
                type="email"
                value={contact.email}
                onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                className={inputClass}
                required
              />
            </div>
            <div>
                <label htmlFor="calc-address" className="block text-sm font-medium text-slate mb-1">Address</label>
              <input
                id="calc-address"
                type="text"
                value={contact.address}
                onChange={(e) => setContact((c) => ({ ...c, address: e.target.value }))}
                className={inputClass}
                placeholder="Town, county or full address"
                required
              />
            </div>
            <div>
                <label htmlFor="calc-phone" className="block text-sm font-medium text-slate mb-1">Phone number</label>
              <input
                id="calc-phone"
                type="tel"
                value={contact.phone}
                onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                className={inputClass}
                required
              />
            </div>
            <button
              type="submit"
              disabled={!canProceed}
              className="w-full sm:w-auto inline-flex justify-center rounded-xl bg-gradient-to-r from-solar-orange to-solar-orange-light px-6 py-3 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-glow transition-all"
            >
              Continue to calculator
            </button>
          </form>
        </div>
      )}

      {step === "calculator" && (
        <>
        <div className="rounded-2xl border-2 border-accent/20 bg-white p-6 shadow-card-3d">
          <h2 className="text-lg font-semibold text-slate mb-4">Your system</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate mb-1">Number of panels</label>
            <select
              value={panels}
              onChange={(e) => setPanels(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate focus:border-accent focus:ring-2 focus:ring-accent/20"
            >
              {PANEL_OPTIONS.map((n) => (
                <option key={n} value={n}>{n} panels</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate mb-1">Electricity rate (€/kWh)</label>
            <input
              type="number"
              min="0.2"
              max="0.6"
              step="0.01"
              value={unitRate}
              onChange={(e) => setUnitRate(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm font-medium text-slate mb-2">Add-ons</p>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={battery} onChange={(e) => setBattery(e.target.checked)} className="rounded border-gray-300 text-accent focus:ring-accent" />
                <span className="text-sm text-slate">5.12 kWh Dyness battery</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={eddi} onChange={(e) => setEddi(e.target.checked)} className="rounded border-gray-300 text-accent focus:ring-accent" />
                <span className="text-sm text-slate">EDDI hot water diverter</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={evCharger} onChange={(e) => setEvCharger(e.target.checked)} className="rounded border-gray-300 text-accent focus:ring-accent" />
                <span className="text-sm text-slate">EV charger (Ohme Home Pro 5m tethered)</span>
              </label>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={applyGrant} onChange={(e) => setApplyGrant(e.target.checked)} className="rounded border-gray-300 text-accent focus:ring-accent" />
              <span className="text-sm text-slate">
                Apply SEAI grant (€{result.grantAmount.toLocaleString("ie-IE")} for {(panels * PANEL_KW).toFixed(1)} kWp{result.grantAmount >= 1800 ? ", max" : ""})
              </span>
            </label>
          </div>
        </div>
      </div>

      <div id="calculator-results" className="rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-white to-accent/5 p-6 shadow-card-3d">
        <h2 className="text-lg font-semibold text-slate mb-4">Estimated results</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="bg-white/90 rounded-lg p-4 border border-accent/20">
            <p className="text-xs text-gray-500 uppercase tracking-wider">System price (est.)</p>
            <p className="text-xl font-semibold text-accent-dark mt-1">€{result.totalPrice.toLocaleString("ie-IE")}</p>
          </div>
          <div className="bg-white/90 rounded-lg p-4 border border-accent/20">
            <p className="text-xs text-gray-500 uppercase tracking-wider">SEAI grant (est.)</p>
            <p className="text-xl font-semibold text-slate mt-1">
              {applyGrant ? `€${result.grantAmount.toLocaleString("ie-IE")}` : "—"}
            </p>
          </div>
          <div className="bg-white/90 rounded-lg p-4 border border-accent/20">
            <p className="text-xs text-gray-500 uppercase tracking-wider">After SEAI grant</p>
            <p className="text-xl font-semibold text-slate mt-1">€{result.afterGrant.toLocaleString("ie-IE")}</p>
          </div>
          <div className="bg-white/90 rounded-lg p-4 border border-accent/20">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Yearly savings</p>
            <p className="text-xl font-semibold text-accent-dark mt-1">€{result.yearlySavings.toLocaleString("ie-IE")}</p>
          </div>
          <div className="bg-white/90 rounded-lg p-4 border border-accent/20">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Payback</p>
            <p className="text-xl font-semibold text-slate mt-1">
              {result.paybackYears > 0 && result.paybackYears < 50 ? `${result.paybackYears.toFixed(1)} years` : "—"}
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-white/90 rounded-lg p-4 border border-accent/20">
            <p className="text-xs text-gray-500 uppercase tracking-wider">20-year savings</p>
            <p className="text-lg font-semibold text-accent-dark mt-1">€{result.twentyYearSavings.toLocaleString("ie-IE")}</p>
          </div>
          <div className="bg-white/90 rounded-lg p-4 border border-accent/20">
            <p className="text-xs text-gray-500 uppercase tracking-wider">CO₂ reduction/year</p>
            <p className="text-lg font-semibold text-slate mt-1">{(result.co2Kg / 1000).toFixed(1)} t</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">Estimates only. Actual savings depend on orientation, shading and usage.</p>

        <div className="mt-6 pt-6 border-t border-accent/20 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={pdfStatus === "downloading"}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate px-5 py-3 text-sm font-semibold text-white hover:bg-graphite transition-colors disabled:opacity-70"
          >
            {pdfStatus === "downloading" ? "Preparing…" : "Download PDF"}
          </button>
          <button
            type="button"
            onClick={handleEmailPdf}
            disabled={pdfStatus === "sending"}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-solar-orange to-solar-orange-light px-5 py-3 text-sm font-semibold text-white hover:opacity-95 transition-colors disabled:opacity-70"
          >
            {pdfStatus === "sending" ? "Sending…" : pdfStatus === "sent" ? "Sent to your email" : "Email me this estimate"}
          </button>
          {pdfStatus === "error" && (
            <p className="text-sm text-red-600 self-center sm:self-auto">Something went wrong. Try again or download the PDF.</p>
          )}
        </div>
      </div>
        </>
      )}
    </div>
  );
}
