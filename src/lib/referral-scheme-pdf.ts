/**
 * Referral partner programme overview PDF — brand colours, logo, A4.
 * Works in browser and Node (API route).
 */

import { jsPDF } from "jspdf";
import { company } from "@/config/company";

export type ReferralSchemePdfData = {
  logoDataUri?: string | null;
};

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MARGIN = 16;
const CONTENT_BOTTOM_Y = A4_HEIGHT_MM - 34;

// Brand colours (RGB for jsPDF) — aligned with estimate-pdf + site teal accent
const NAVY = { r: 15, g: 23, b: 42 };
const GOLD = { r: 184, g: 146, b: 63 };
const ACCENT = { r: 180, g: 83, b: 9 };
const TEAL = { r: 13, g: 148, b: 136 };
const GRAY = { r: 100, g: 116, b: 139 };
const LIGHT_BG = { r: 248, g: 247, b: 245 };

const LINE_H = 4.6;

function setNavy(doc: jsPDF) {
  doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
}
function setGold(doc: jsPDF) {
  doc.setTextColor(GOLD.r, GOLD.g, GOLD.b);
}
function setGray(doc: jsPDF) {
  doc.setTextColor(GRAY.r, GRAY.g, GRAY.b);
}

function drawFooter(doc: jsPDF, pageW: number, margin: number) {
  const footerYFinal = A4_HEIGHT_MM - 23;
  doc.setDrawColor(ACCENT.r, ACCENT.g, ACCENT.b);
  doc.setLineWidth(1);
  doc.line(margin, footerYFinal - 6, pageW - margin, footerYFinal - 6);
  doc.setFontSize(10).setFont("helvetica", "bold");
  setNavy(doc);
  doc.text(company.name, margin, footerYFinal + 2);
  doc.setFontSize(9).setFont("helvetica", "normal");
  setGray(doc);
  doc.text(company.address, margin, footerYFinal + 8);
  doc.text(`${company.emails.join(" · ")}  ·  ${company.phone}`, margin, footerYFinal + 14);
  doc.text(company.website, margin, footerYFinal + 20);
}

function drawPageHeaderBand(doc: jsPDF, pageW: number, margin: number, logoDataUri: string | null | undefined) {
  doc.setFillColor(NAVY.r, NAVY.g, NAVY.b);
  doc.rect(0, 0, pageW, 34, "F");
  if (logoDataUri) {
    try {
      doc.addImage(logoDataUri, "PNG", margin, 8, 46, 18);
    } catch {
      doc.setFontSize(18).setFont("helvetica", "bold").setTextColor(255, 255, 255);
      doc.text(company.name, margin, 18);
    }
  } else {
    doc.setFontSize(18).setFont("helvetica", "bold").setTextColor(255, 255, 255);
    doc.text(company.name, margin, 18);
  }
  // Move supporting header text to the right of the logo and make it clearer.
  doc.setFontSize(10).setFont("helvetica", "bold").setTextColor(232, 232, 232);
  doc.text("Referral Programme", margin + 52, 17);
  doc.setFontSize(8.5).setFont("helvetica", "normal").setTextColor(220, 220, 220);
  doc.text("Solar, Electrical & Construction", margin + 52, 23);
}

function sectionHeading(doc: jsPDF, margin: number, y: number, title: string): number {
  doc.setFontSize(11).setFont("helvetica", "bold");
  setNavy(doc);
  doc.text(title, margin, y);
  doc.setDrawColor(TEAL.r, TEAL.g, TEAL.b);
  doc.setLineWidth(0.4);
  const w = Math.min(doc.getTextWidth(title) + 1.5, 120);
  doc.line(margin, y + 1.2, margin + w, y + 1.2);
  return y + 7;
}

function bodyParagraph(doc: jsPDF, pageW: number, margin: number, y: number, text: string): number {
  doc.setFontSize(10).setFont("helvetica", "normal");
  setGray(doc);
  const lines = doc.splitTextToSize(text, pageW - 2 * margin);
  let yy = y + 0.4;
  for (const line of lines) {
    doc.text(line, margin, yy);
    yy += LINE_H;
  }
  return yy + 2.6;
}

function bulletLine(doc: jsPDF, pageW: number, margin: number, y: number, text: string): number {
  doc.setFontSize(9.6).setFont("helvetica", "normal");
  setGray(doc);
  const bullet = "•";
  const lines = doc.splitTextToSize(text, pageW - 2 * margin - 6);
  doc.text(bullet, margin, y);
  let yy = y;
  lines.forEach((line, idx) => {
    doc.text(line, margin + 4, yy);
    yy += LINE_H;
    if (idx === 0 && lines.length > 1) {
      continue;
    }
  });
  return yy + 1.8;
}

function ensurePageSpace(
  doc: jsPDF,
  y: number,
  needed: number,
  pageW: number,
  margin: number,
  logoDataUri: string | null | undefined
): number {
  if (y + needed <= CONTENT_BOTTOM_Y) return y;
  drawFooter(doc, pageW, margin);
  doc.addPage();
  drawPageHeaderBand(doc, pageW, margin, logoDataUri);
  return 44;
}

export function generateReferralSchemePdf(data: ReferralSchemePdfData): Uint8Array {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = A4_WIDTH_MM;
  const margin = MARGIN;
  const logoDataUri = data.logoDataUri;

  drawPageHeaderBand(doc, pageW, margin, logoDataUri);

  let y = 44;
  doc.setFontSize(18).setFont("helvetica", "bold");
  setNavy(doc);
  doc.text("Referral Programme", margin, y);
  y += 5.8;
  doc.setFontSize(11).setFont("helvetica", "normal");
  setGray(doc);
  doc.text("Earn for referring solar & construction projects", margin, y);
  y += 6;
  doc.setFontSize(10).setFont("helvetica", "normal");
  setGray(doc);
  doc.text("Refer a project. We deliver it. You get paid.", margin, y);
  y += 6.6;

  const topBoxY = y - 3;
  const topBoxH = 11;
  doc.setFillColor(LIGHT_BG.r, LIGHT_BG.g, LIGHT_BG.b);
  doc.roundedRect(margin, topBoxY, pageW - 2 * margin, topBoxH, 2, 2, "F");
  doc.setDrawColor(TEAL.r, TEAL.g, TEAL.b);
  doc.setLineWidth(0.35);
  doc.roundedRect(margin, topBoxY, pageW - 2 * margin, topBoxH, 2, 2, "S");
  doc.setFontSize(13).setFont("helvetica", "bold");
  setGold(doc);
  doc.text("EUR 200 per completed domestic solar installation", margin + 4, y + 4.3);
  y = topBoxY + topBoxH + 8;

  y = sectionHeading(doc, margin, y, "How It Works (3 Steps)");
  const gap = 3;
  const boxW = (pageW - 2 * margin - 2 * gap) / 3;
  const stepY = y - 2;
  const stepH = 24;
  const steps = [
    "1. Refer a client to Fennor Developments",
    "2. We design, supply, and complete the project",
    "3. You get paid once the project is completed and paid",
  ];
  steps.forEach((step, idx) => {
    const x = margin + idx * (boxW + gap);
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(TEAL.r, TEAL.g, TEAL.b);
    doc.setLineWidth(0.28);
    doc.roundedRect(x, stepY, boxW, stepH, 2, 2, "S");
    doc.setFontSize(9.2).setFont("helvetica", "normal");
    setGray(doc);
    const lines = doc.splitTextToSize(step, boxW - 4);
    doc.text(lines, x + 2, stepY + 6);
  });
  y = stepY + stepH + 8;

  y = sectionHeading(doc, margin, y, "What You Earn (Domestic)");
  y = bulletLine(doc, pageW, margin, y, "EUR 200 per completed domestic house.");
  y = bulletLine(doc, pageW, margin, y, "5 completed installs = EUR 1,000.");
  y = bulletLine(doc, pageW, margin, y, "Higher rates may be agreed for multiple or repeat referrals.");

  y = sectionHeading(doc, margin, y, "Commercial & Larger Projects");
  y = bulletLine(
    doc,
    pageW,
    margin,
    y,
    "Referral fees for commercial or large-scale projects are agreed on a case-by-case basis depending on project value."
  );
  y = bulletLine(doc, pageW, margin, y, "Potential for significantly higher earnings.");

  y = ensurePageSpace(doc, y, 36, pageW, margin, logoDataUri);
  y = sectionHeading(doc, margin, y, "Tracking & Payment Process");
  y = bulletLine(doc, pageW, margin, y, "Referrals must be declared at first contact.");
  y = bulletLine(doc, pageW, margin, y, "Fennor tracks the referral internally.");
  y = bulletLine(doc, pageW, margin, y, "Payment is only made when the project is fully completed and full payment is received.");
  y = bulletLine(doc, pageW, margin, y, "Payments are issued within 7-14 days of funds clearing.");

  y = ensurePageSpace(doc, y, 126, pageW, margin, logoDataUri);
  y = sectionHeading(doc, margin, y, "Key Terms");
  y = bulletLine(
    doc,
    pageW,
    margin,
    y,
    "Independent Introducer Status: All referrers act as independent introducers. Nothing in this programme creates employment, partnership, or agency with Fennor Developments Ltd."
  );
  y = bulletLine(
    doc,
    pageW,
    margin,
    y,
    "No Authority: Referrers are not authorised to represent the company, provide quotations, or enter into agreements on behalf of Fennor Developments Ltd."
  );
  y = bulletLine(
    doc,
    pageW,
    margin,
    y,
    "Referral Validity: A referral is only valid where the lead is new to Fennor Developments Ltd, the referral is disclosed at first contact, and the referral is recorded by the company."
  );
  y = bulletLine(
    doc,
    pageW,
    margin,
    y,
    "Payment Conditions: Referral fees are only payable where the project is fully completed, full payment has been received, and no disputes, cancellations, or refunds arise."
  );
  y = bulletLine(
    doc,
    pageW,
    margin,
    y,
    "Clawback / Withholding: Fennor Developments Ltd reserves the right to withhold or reclaim referral fees in cases of cancellation, non-payment, or dispute."
  );
  y = bulletLine(
    doc,
    pageW,
    margin,
    y,
    "Tax Responsibility: Referrers are responsible for their own tax obligations in relation to payments received."
  );
  y = bulletLine(
    doc,
    pageW,
    margin,
    y,
    "Misrepresentation Protection: Referrers must not make false, misleading, or unverified claims regarding pricing, savings, grants, or performance."
  );
  y = bulletLine(
    doc,
    pageW,
    margin,
    y,
    "Final Decision Clause: All referral tracking and payment decisions made by Fennor Developments Ltd are final."
  );
  y = bulletLine(
    doc,
    pageW,
    margin,
    y,
    "Right to Amend: Fennor Developments Ltd reserves the right to amend or withdraw this programme at any time."
  );

  y = ensurePageSpace(doc, y, 18, pageW, margin, logoDataUri);
  y = sectionHeading(doc, margin, y, "Company Footer");
  y = bodyParagraph(
    doc,
    pageW,
    margin,
    y,
    "Refer solar and construction projects. Get paid once completed. Simple, transparent, and built for long-term partnerships."
  );

  drawFooter(doc, pageW, margin);

  return doc.output("arraybuffer") as unknown as Uint8Array;
}
