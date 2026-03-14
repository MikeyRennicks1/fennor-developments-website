/**
 * Professional Solar PV Estimate PDF with logo, brand colours, kWh detail and charts.
 * Works in browser (download) and Node (API route for email).
 */

import { jsPDF } from "jspdf";
import { company } from "@/config/company";
import { PANEL_KW, PANEL_WATTS_W } from "@/config/solar";

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
  /** SEAI grant amount in € for this system size (per SEAI tiered rules). */
  grantAmount?: number;
  yearlySavings: number;
  paybackYears: number;
  twentyYearSavings: number;
  co2Kg: number;
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
  logoDataUri?: string | null;
};

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MARGIN = 18;

// Brand colours (RGB for jsPDF)
const NAVY = { r: 15, g: 23, b: 42 };
const GOLD = { r: 184, g: 146, b: 63 };
const ACCENT = { r: 180, g: 83, b: 9 };
const GRAY = { r: 100, g: 116, b: 139 };
const LIGHT_BG = { r: 248, g: 247, b: 245 };

const KWH_PER_KWP_YEAR = 900;

function fmtEuro(n: number) {
  return "€" + n.toLocaleString("ie-IE");
}

function setNavy(doc: jsPDF) {
  doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
}
function setGold(doc: jsPDF) {
  doc.setTextColor(GOLD.r, GOLD.g, GOLD.b);
}
function setGray(doc: jsPDF) {
  doc.setTextColor(GRAY.r, GRAY.g, GRAY.b);
}

export function generateEstimatePdf(data: EstimatePdfData): Uint8Array {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = A4_WIDTH_MM;
  const margin = MARGIN;
  let y = margin;

  // ----- Header band (navy) -----
  doc.setFillColor(NAVY.r, NAVY.g, NAVY.b);
  doc.rect(0, 0, pageW, 32, "F");

  // ----- Logo or company name on navy -----
  if (data.logoDataUri) {
    try {
      doc.addImage(data.logoDataUri, "PNG", margin, 8, 44, 16);
    } catch {
      doc.setFontSize(18).setFont("helvetica", "bold").setTextColor(255, 255, 255);
      doc.text(company.name, margin, 18);
    }
  } else {
    doc.setFontSize(18).setFont("helvetica", "bold").setTextColor(255, 255, 255);
    doc.text(company.name, margin, 18);
  }
  doc.setFontSize(8).setFont("helvetica", "normal").setTextColor(220, 220, 220);
  doc.text(company.tagline, margin, 26);
  y = 40;

  // ----- Title -----
  doc.setFontSize(20).setFont("helvetica", "bold");
  setNavy(doc);
  doc.text("Solar PV Estimate", margin, y);
  y += 8;
  doc.setFontSize(10).setFont("helvetica", "normal");
  setGray(doc);
  doc.text(
    `Prepared for ${data.contact.name} · ${new Date().toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" })}`,
    margin,
    y
  );
  y += 14;

  // ----- Your details (light background) -----
  doc.setFillColor(LIGHT_BG.r, LIGHT_BG.g, LIGHT_BG.b);
  doc.roundedRect(margin, y - 4, pageW - 2 * margin, 28, 2, 2, "F");
  doc.setFontSize(11).setFont("helvetica", "bold");
  setNavy(doc);
  doc.text("Your details", margin + 4, y + 4);
  y += 8;
  doc.setFontSize(10).setFont("helvetica", "normal");
  setGray(doc);
  const budgetNum = Number(String(data.contact.budget).replace(/,/g, ""));
  const budgetStr = data.contact.budget.trim()
    ? !isNaN(budgetNum) && budgetNum > 0
      ? fmtEuro(budgetNum)
      : data.contact.budget
    : "—";
  doc.text(`Budget: ${budgetStr}  ·  Email: ${data.contact.email}  ·  Phone: ${data.contact.phone}`, margin + 4, y + 4);
  y += 6;
  doc.text(`Address: ${data.contact.address}`, margin + 4, y + 4);
  y += 18;

  // ----- Energy generation (kWh detail) -----
  const systemKw = data.panels * PANEL_KW;
  const yearlyKwh = data.unitRate > 0 ? data.result.yearlySavings / data.unitRate : systemKw * KWH_PER_KWP_YEAR;
  const monthlyKwh = yearlyKwh / 12;

  doc.setFontSize(11).setFont("helvetica", "bold");
  setNavy(doc);
  doc.text("Energy generation", margin, y);
  y += 7;
  doc.setDrawColor(NAVY.r, NAVY.g, NAVY.b);
  doc.setLineWidth(0.5);
  doc.line(margin, y - 2, margin + 40, y - 2);
  y += 4;
  doc.setFontSize(10).setFont("helvetica", "normal");
  setGray(doc);
  doc.text(`System size: ${systemKw.toFixed(1)} kWp (${data.panels} panels × ${PANEL_WATTS_W}W typical)`, margin, y);
  y += 6;
  doc.text(`Estimated annual generation: ${Math.round(yearlyKwh).toLocaleString("ie-IE")} kWh`, margin, y);
  y += 6;
  doc.text(`Monthly average: ~${Math.round(monthlyKwh).toLocaleString("ie-IE")} kWh`, margin, y);
  y += 6;
  doc.text(`Assumed yield: ${KWH_PER_KWP_YEAR} kWh per kWp per year (Irish typical)`, margin, y);
  y += 14;

  // ----- System summary -----
  doc.setFontSize(11).setFont("helvetica", "bold");
  setNavy(doc);
  doc.text("System summary", margin, y);
  y += 7;
  doc.setDrawColor(NAVY.r, NAVY.g, NAVY.b);
  doc.line(margin, y - 2, margin + 35, y - 2);
  y += 4;
  const addOns: string[] = [];
  if (data.battery) addOns.push("5.12 kWh Dyness battery");
  if (data.eddi) addOns.push("EDDI hot water diverter");
  if (data.evCharger) addOns.push("EV charger (Ohme Home Pro 5m tethered)");
  doc.setFontSize(10).setFont("helvetica", "normal");
  setGray(doc);
  doc.text(`Electricity rate: €${data.unitRate.toFixed(2)}/kWh`, margin, y);
  y += 5;
  doc.text(`Add-ons: ${addOns.length ? addOns.join(", ") : "None"}`, margin, y);
  y += 5;
  const grantLabel = data.applyGrant
    ? `Applied (€${(data.result.grantAmount ?? 1800).toLocaleString("ie-IE")} for ${(data.panels * PANEL_KW).toFixed(1)} kWp)`
    : "Not applied";
  doc.text(`SEAI grant: ${grantLabel}`, margin, y);
  y += 12;

  // ----- Investment -----
  doc.setFontSize(11).setFont("helvetica", "bold");
  setNavy(doc);
  doc.text("Investment", margin, y);
  y += 7;
  doc.setDrawColor(NAVY.r, NAVY.g, NAVY.b);
  doc.line(margin, y - 2, margin + 25, y - 2);
  y += 4;
  doc.setFontSize(10).setFont("helvetica", "normal");
  setGray(doc);
  doc.text(`System price (est.): ${fmtEuro(data.result.totalPrice)}`, margin, y);
  y += 6;
  doc.setFont("helvetica", "bold");
  setGold(doc);
  doc.text(`After SEAI grant: ${fmtEuro(data.result.afterGrant)}`, margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  setGray(doc);
  const paybackStr =
    data.result.paybackYears > 0 && data.result.paybackYears < 50
      ? data.result.paybackYears.toFixed(1) + " years"
      : "—";
  doc.text(`Payback (at current rate): ${paybackStr}`, margin, y);
  y += 14;

  // ----- Savings breakdown table (coloured header) -----
  doc.setFontSize(11).setFont("helvetica", "bold");
  setNavy(doc);
  doc.text("Savings breakdown", margin, y);
  y += 8;

  const tableCol1 = margin;
  const tableCol2 = pageW - margin - 38;
  const rowH = 6;
  doc.setFillColor(NAVY.r, NAVY.g, NAVY.b);
  doc.rect(tableCol1, y - 4, pageW - 2 * margin, rowH + 2, "F");
  doc.setFontSize(10).setFont("helvetica", "bold").setTextColor(255, 255, 255);
  doc.text("Period", tableCol1 + 2, y + 2);
  doc.text("Estimated savings", tableCol2, y + 2);
  y += rowH + 4;

  const rows: [string, string][] = [
    ["Monthly (average)", fmtEuro(data.result.monthlySavings)],
    ["Year 1", fmtEuro(data.result.yearlySavings)],
    ["5 years", fmtEuro(data.result.savings5y)],
    ["10 years", fmtEuro(data.result.savings10y)],
    ["20 years", fmtEuro(data.result.twentyYearSavings)],
    ["30 years", fmtEuro(data.result.savings30y)],
  ];
  doc.setFont("helvetica", "normal");
  for (let i = 0; i < rows.length; i++) {
    if (i % 2 === 1) {
      doc.setFillColor(250, 250, 250);
      doc.rect(tableCol1, y - 4, pageW - 2 * margin, rowH + 1, "F");
    }
    setGray(doc);
    doc.text(rows[i][0], tableCol1 + 2, y + 1);
    doc.setFont("helvetica", "bold");
    setGold(doc);
    doc.text(rows[i][1], tableCol2, y + 1);
    doc.setFont("helvetica", "normal");
    y += rowH + 1;
  }
  y += 12;

  // ----- Page break if needed (chart + environmental + disclaimer + footer need ~90mm) -----
  const footerY = A4_HEIGHT_MM - 26;
  if (y + 90 > footerY) {
    doc.addPage();
    y = margin;
  }

  // ----- Bar chart: Cumulative savings over time -----
  doc.setFontSize(11).setFont("helvetica", "bold");
  setNavy(doc);
  doc.text("Cumulative savings (€)", margin, y);
  y += 7;
  doc.setDrawColor(NAVY.r, NAVY.g, NAVY.b);
  doc.setLineWidth(0.5);
  doc.line(margin, y - 2, margin + 45, y - 2);
  y += 6;

  const chartLeft = margin;
  const chartW = pageW - 2 * margin;
  const chartH = 32;
  const maxSavings = data.result.savings30y;
  const years = [5, 10, 15, 20, 25, 30];
  const savingsAtYear = (n: number) => data.result.yearlySavings * n;
  const barW = Math.max(4, (chartW - 4 * (years.length - 1)) / years.length);
  const barGap = 4;

  doc.setFontSize(8).setFont("helvetica", "normal");
  setGray(doc);
  for (let i = 0; i < years.length; i++) {
    const val = savingsAtYear(years[i]);
    const barHeight = maxSavings > 0 ? (val / maxSavings) * (chartH - 10) : 0;
    const x = chartLeft + i * (barW + barGap);
    const barY = y + (chartH - 10) - barHeight;

    doc.setFillColor(GOLD.r, GOLD.g, GOLD.b);
    doc.rect(x, barY, barW, barHeight, "F");
    doc.setDrawColor(NAVY.r, NAVY.g, NAVY.b);
    doc.setLineWidth(0.2);
    doc.rect(x, barY, barW, barHeight, "S");

    doc.setTextColor(0, 0, 0);
    doc.text(`${years[i]}y`, x + barW / 2 - 2, y + chartH - 2);
    const label = val >= 1000 ? `€${(val / 1000).toFixed(0)}k` : fmtEuro(val);
    const labelW = doc.getTextWidth(label);
    doc.text(label, x + Math.max(0, (barW - labelW) / 2), barY - 1.5);
  }
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  doc.line(chartLeft, y, chartLeft + chartW, y);
  doc.line(chartLeft, y + chartH - 10, chartLeft + chartW, y + chartH - 10);
  y += chartH + 10;

  // ----- Environmental -----
  doc.setFontSize(11).setFont("helvetica", "bold");
  setNavy(doc);
  doc.text("Environmental impact", margin, y);
  y += 6;
  doc.setFontSize(10).setFont("helvetica", "normal");
  setGray(doc);
  doc.text(
    `CO₂ reduction: ${(data.result.co2Kg / 1000).toFixed(1)} tonnes per year (equivalent)`,
    margin,
    y
  );
  y += 12;

  // ----- Disclaimer -----
  doc.setFontSize(8);
  setGray(doc);
  const disclaimerText =
    "This estimate is for guidance only. Actual savings depend on orientation, shading, usage and system performance. Prices and grant eligibility are subject to change. Contact us for a formal quote.";
  const disclaimerLines = doc.splitTextToSize(disclaimerText, pageW - 2 * margin);
  doc.text(disclaimerLines, margin, y);
  y += disclaimerLines.length * 4 + 10;

  // ----- Footer (accent line + brand) -----
  if (y > footerY - 2) {
    doc.addPage();
    y = margin;
  }
  const footerYFinal = A4_HEIGHT_MM - 26;
  doc.setDrawColor(ACCENT.r, ACCENT.g, ACCENT.b);
  doc.setLineWidth(1);
  doc.line(margin, footerYFinal - 6, pageW - margin, footerYFinal - 6);
  doc.setFontSize(10).setFont("helvetica", "bold");
  setNavy(doc);
  doc.text(company.name, margin, footerYFinal + 2);
  doc.setFontSize(9).setFont("helvetica", "normal");
  setGray(doc);
  doc.text(company.address, margin, footerYFinal + 8);
  doc.text(`${company.email}  ·  ${company.phone}`, margin, footerYFinal + 14);
  doc.text(company.tagline, margin, footerYFinal + 20);

  return doc.output("arraybuffer") as unknown as Uint8Array;
}
