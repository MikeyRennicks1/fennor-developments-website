/**
 * Generates a professional Solar PV Estimate PDF.
 * Works in browser (download) and Node (API route for email).
 */

import { jsPDF } from "jspdf";
import { company } from "@/config/company";

export type EstimateContact = {
  budget: string;
  name: string;
  email: string;
  address: string;
  phone: string;
};

export type EstimateResult = {
  totalPrice: number;
  afterGrant: number;
  yearlySavings: number;
  paybackYears: number;
  twentyYearSavings: number;
  co2Kg: number;
  /** Extended for PDF */
  monthlySavings: number;
  savings5y: number;
  savings10y: number;
  savings30y: number;
};

export type EstimatePdfData = {
  contact: EstimateContact;
  panels: number;
  battery: boolean;
  eddi: boolean;
  evCharger: boolean;
  applyGrant: boolean;
  unitRate: number;
  result: EstimateResult;
  /** Optional: data URI for logo (data:image/png;base64,...) */
  logoDataUri?: string | null;
};

const NAVY = "#0f172a";
const GOLD = "#b8923f";
const GRAY = "#64748b";

function fmtEuro(n: number) {
  return "€" + n.toLocaleString("ie-IE");
}

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

export function generateEstimatePdf(data: EstimatePdfData): Uint8Array {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = A4_WIDTH_MM;
  const margin = 18;
  let y = margin;

  // ----- Header: logo or company name -----
  if (data.logoDataUri) {
    try {
      doc.addImage(data.logoDataUri, "PNG", margin, y, 40, 14);
    } catch {
      doc.setFontSize(18).setFont("helvetica", "bold").setTextColor(NAVY);
      doc.text(company.name, margin, y + 10);
    }
  } else {
    doc.setFontSize(18).setFont("helvetica", "bold").setTextColor(NAVY);
    doc.text(company.name, margin, y + 10);
  }
  doc.setFontSize(9).setFont("helvetica", "normal").setTextColor(GRAY);
  doc.text(company.tagline, margin, y + 16);
  y += 26;

  // ----- Title -----
  doc.setFontSize(22).setFont("helvetica", "bold").setTextColor(NAVY);
  doc.text("Solar PV Estimate", margin, y);
  y += 12;

  doc.setFontSize(10).setFont("helvetica", "normal").setTextColor(GRAY);
  doc.text(`Prepared for ${data.contact.name} · ${new Date().toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" })}`, margin, y);
  y += 14;

  // ----- Your details -----
  doc.setFontSize(11).setFont("helvetica", "bold").setTextColor(NAVY);
  doc.text("Your details", margin, y);
  y += 6;
  doc.setFontSize(10).setFont("helvetica", "normal").setTextColor(GRAY);
  const budgetNum = Number(String(data.contact.budget).replace(/,/g, ""));
  const budgetStr = data.contact.budget.trim() ? (!isNaN(budgetNum) && budgetNum > 0 ? fmtEuro(budgetNum) : data.contact.budget) : "—";
  doc.text(`Budget: ${budgetStr}`, margin, y);
  y += 5;
  doc.text(`Email: ${data.contact.email}  ·  Phone: ${data.contact.phone}`, margin, y);
  y += 5;
  doc.text(`Address: ${data.contact.address}`, margin, y);
  y += 12;

  // ----- System summary -----
  doc.setFontSize(11).setFont("helvetica", "bold").setTextColor(NAVY);
  doc.text("System summary", margin, y);
  y += 6;
  const addOns: string[] = [];
  if (data.battery) addOns.push("5.12 kWh Dyness battery");
  if (data.eddi) addOns.push("EDDI hot water diverter");
  if (data.evCharger) addOns.push("EV charger (Ohme Home Pro 5m tethered)");
  doc.setFontSize(10).setFont("helvetica", "normal").setTextColor(GRAY);
  doc.text(`${data.panels} panels (${(data.panels * 0.4).toFixed(1)} kWp) · Electricity rate €${data.unitRate.toFixed(2)}/kWh`, margin, y);
  y += 5;
  doc.text(`Add-ons: ${addOns.length ? addOns.join(", ") : "None"}`, margin, y);
  y += 5;
  doc.text(`SEAI grant: ${data.applyGrant ? "Applied (€1,800 max)" : "Not applied"}`, margin, y);
  y += 12;

  // ----- Investment -----
  doc.setFontSize(11).setFont("helvetica", "bold").setTextColor(NAVY);
  doc.text("Investment", margin, y);
  y += 6;
  doc.setFontSize(10).setFont("helvetica", "normal");
  doc.setTextColor(GRAY);
  doc.text(`System price (est.): ${fmtEuro(data.result.totalPrice)}`, margin, y);
  y += 5;
  doc.setFont("helvetica", "bold").setTextColor(GOLD);
  doc.text(`After SEAI grant: ${fmtEuro(data.result.afterGrant)}`, margin, y);
  y += 5;
  doc.setFont("helvetica", "normal").setTextColor(GRAY);
  doc.text(`Payback: ${data.result.paybackYears > 0 && data.result.paybackYears < 50 ? data.result.paybackYears.toFixed(1) + " years" : "—"}`, margin, y);
  y += 14;

  // ----- Savings breakdown table -----
  doc.setFontSize(11).setFont("helvetica", "bold").setTextColor(NAVY);
  doc.text("Savings breakdown", margin, y);
  y += 8;

  const tableCol1 = margin;
  const tableCol2 = pageW - margin - 35;
  doc.setFontSize(10).setFont("helvetica", "bold").setTextColor(NAVY);
  doc.text("Period", tableCol1, y);
  doc.text("Estimated savings", tableCol2, y);
  y += 6;
  doc.setDrawColor(230, 230, 230);
  doc.line(margin, y - 2, pageW - margin, y - 2);
  y += 2;

  const rows: [string, string][] = [
    ["Monthly (average)", fmtEuro(data.result.monthlySavings)],
    ["Yearly", fmtEuro(data.result.yearlySavings)],
    ["5 years", fmtEuro(data.result.savings5y)],
    ["10 years", fmtEuro(data.result.savings10y)],
    ["20 years", fmtEuro(data.result.twentyYearSavings)],
    ["30 years", fmtEuro(data.result.savings30y)],
  ];
  doc.setFont("helvetica", "normal").setTextColor(GRAY);
  for (const [period, value] of rows) {
    doc.text(period, tableCol1, y);
    doc.setFont("helvetica", "bold").setTextColor(GOLD);
    doc.text(value, tableCol2, y);
    doc.setFont("helvetica", "normal").setTextColor(GRAY);
    y += 6;
  }
  y += 10;

  // ----- Environmental -----
  doc.setFontSize(11).setFont("helvetica", "bold").setTextColor(NAVY);
  doc.text("Environmental impact", margin, y);
  y += 6;
  doc.setFontSize(10).setFont("helvetica", "normal").setTextColor(GRAY);
  doc.text(`CO₂ reduction: ${(data.result.co2Kg / 1000).toFixed(1)} tonnes per year (equivalent)`, margin, y);
  y += 14;

  // ----- Disclaimer -----
  doc.setFontSize(8).setTextColor(GRAY);
  doc.text("This estimate is for guidance only. Actual savings depend on orientation, shading, usage and system performance. Prices and grant eligibility are subject to change. Contact us for a formal quote.", margin, y, { maxWidth: pageW - 2 * margin });
  y += 16;

  // ----- Footer -----
  const footerY = A4_HEIGHT_MM - 28;
  doc.setDrawColor(220, 210, 180);
  doc.line(margin, footerY - 4, pageW - margin, footerY - 4);
  doc.setFontSize(10).setFont("helvetica", "bold").setTextColor(NAVY);
  doc.text(company.name, margin, footerY + 4);
  doc.setFontSize(9).setFont("helvetica", "normal").setTextColor(GRAY);
  doc.text(company.address, margin, footerY + 10);
  doc.text(`${company.email}  ·  ${company.phone}`, margin, footerY + 16);
  doc.text(company.tagline, margin, footerY + 22);

  return doc.output("arraybuffer") as unknown as Uint8Array;
}
