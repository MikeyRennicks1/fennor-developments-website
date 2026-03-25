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
const MARGIN = 18;

// Brand colours (RGB for jsPDF) — aligned with estimate-pdf + site teal accent
const NAVY = { r: 15, g: 23, b: 42 };
const GOLD = { r: 184, g: 146, b: 63 };
const ACCENT = { r: 180, g: 83, b: 9 };
const TEAL = { r: 13, g: 148, b: 136 };
const GRAY = { r: 100, g: 116, b: 139 };
const LIGHT_BG = { r: 248, g: 247, b: 245 };

const LINE_H = 5.2;
const FOOTER_RESERVE_MM = 32;

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
}

function drawPageHeaderBand(doc: jsPDF, pageW: number, margin: number, logoDataUri: string | null | undefined) {
  doc.setFillColor(NAVY.r, NAVY.g, NAVY.b);
  doc.rect(0, 0, pageW, 32, "F");
  if (logoDataUri) {
    try {
      doc.addImage(logoDataUri, "PNG", margin, 8, 44, 16);
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
}

function drawContinuationHeader(doc: jsPDF, pageW: number, margin: number) {
  doc.setDrawColor(TEAL.r, TEAL.g, TEAL.b);
  doc.setLineWidth(0.8);
  doc.line(margin, 12, pageW - margin, 12);
  doc.setFontSize(9).setFont("helvetica", "bold");
  setNavy(doc);
  doc.text("Referral partner programme (continued)", margin, 20);
}

function ensureSpace(doc: jsPDF, y: number, neededMm: number, pageW: number, margin: number): number {
  const footerTop = A4_HEIGHT_MM - FOOTER_RESERVE_MM;
  if (y + neededMm > footerTop) {
    doc.addPage();
    drawContinuationHeader(doc, pageW, margin);
    return 28;
  }
  return y;
}

function sectionHeading(doc: jsPDF, margin: number, y: number, title: string): number {
  doc.setFontSize(11.5).setFont("helvetica", "bold");
  setNavy(doc);
  doc.text(title, margin, y);
  doc.setDrawColor(TEAL.r, TEAL.g, TEAL.b);
  doc.setLineWidth(0.45);
  const w = Math.min(doc.getTextWidth(title) + 2, 120);
  doc.line(margin, y + 1.5, margin + w, y + 1.5);
  return y + 9;
}

function bodyParagraph(doc: jsPDF, pageW: number, margin: number, y: number, text: string): number {
  doc.setFontSize(10).setFont("helvetica", "normal");
  setGray(doc);
  const lines = doc.splitTextToSize(text, pageW - 2 * margin);
  let yy = y;
  for (const line of lines) {
    yy = ensureSpace(doc, yy, LINE_H + 2, pageW, margin);
    doc.text(line, margin, yy);
    yy += LINE_H;
  }
  return yy + 4;
}

export function generateReferralSchemePdf(data: ReferralSchemePdfData): Uint8Array {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = A4_WIDTH_MM;
  const margin = MARGIN;
  const logoDataUri = data.logoDataUri;

  drawPageHeaderBand(doc, pageW, margin, logoDataUri);

  let y = 42;
  doc.setFontSize(17).setFont("helvetica", "bold");
  setNavy(doc);
  doc.text("Referral partner programme", margin, y);
  y += 6;
  doc.setFontSize(11).setFont("helvetica", "normal");
  setGray(doc);
  doc.text("How we operate", margin, y);
  y += 10;

  const dateStr = new Date().toLocaleDateString("en-IE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  doc.setFontSize(9);
  doc.text(`Overview · ${dateStr}`, margin, y);
  y += 10;

  y = sectionHeading(doc, margin, y, "Partnership");
  y = bodyParagraph(
    doc,
    pageW,
    margin,
    y,
    "This overview applies when you — whether a private customer, business, or professional partner — accept a partnership with us under our referral scheme. The sections below set out how we track referrals, pay rewards, and handle larger or commercial opportunities.",
  );

  y = ensureSpace(doc, y, 40, pageW, margin);
  y = sectionHeading(doc, margin, y, "Domestic reward");
  const domesticCopy =
    "For each domestic house referred to us that we complete: once the installation work is finished and we have received payment from the end customer, the referrer receives €200 per completed domestic house. Example: five completed domestic jobs would result in €1,000 in referral fees.";
  const domesticLines = doc.splitTextToSize(domesticCopy, pageW - 2 * margin - 8);
  const boxPadTop = 4;
  const summaryLineH = 6;
  const boxInnerH = boxPadTop + domesticLines.length * LINE_H + summaryLineH + 3;
  y = ensureSpace(doc, y, boxInnerH + 6, pageW, margin);
  doc.setFillColor(LIGHT_BG.r, LIGHT_BG.g, LIGHT_BG.b);
  doc.roundedRect(margin, y - 3, pageW - 2 * margin, boxInnerH + 6, 2, 2, "F");
  doc.setDrawColor(TEAL.r, TEAL.g, TEAL.b);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y - 3, pageW - 2 * margin, boxInnerH + 6, 2, 2, "S");
  doc.setFontSize(10).setFont("helvetica", "normal");
  setGray(doc);
  let yy = y + boxPadTop + 1;
  for (const line of domesticLines) {
    doc.text(line, margin + 4, yy);
    yy += LINE_H;
  }
  doc.setFont("helvetica", "bold");
  setGold(doc);
  doc.text("€200 per completed domestic house  ·  5 jobs → €1,000", margin + 4, yy + 2);
  y = yy + summaryLineH + 8;

  y = sectionHeading(doc, margin, y, "Onboarding & tracking");
  y = bodyParagraph(
    doc,
    pageW,
    margin,
    y,
    "When a customer first contacts us, we ask who they were referred by and whether their enquiry is a referral. If it is a referral, we attach the referrer’s name and contact details to the customer’s project file in our system for the full installation journey. That way we can reach you and pay you promptly once the project is completed and paid.",
  );

  y = sectionHeading(doc, margin, y, "Multiple homes");
  y = bodyParagraph(
    doc,
    pageW,
    margin,
    y,
    "Where you refer multiple homes, we can offer larger referral amounts than the standard domestic rate. Figures are agreed on a case-by-case basis depending on scope and value.",
  );

  y = sectionHeading(doc, margin, y, "Commercial & large-scale work");
  y = bodyParagraph(
    doc,
    pageW,
    margin,
    y,
    "For businesses, commercial units, or large solar contracts — including substantial corporate partnerships in Ireland — we prefer to meet in person to discuss the opportunity. Referral fees in these cases can be very lucrative and are agreed individually to reflect the scale of the work.",
  );

  y = ensureSpace(doc, y, 20, pageW, margin);
  doc.setFontSize(8).setFont("helvetica", "normal");
  setGray(doc);
  const disclaimer =
    "Referral fees are subject to agreed partnership terms. The €200 rate applies to standard completed domestic house installations as described above. Programme details may be confirmed with you when you partner with us.";
  const discLines = doc.splitTextToSize(disclaimer, pageW - 2 * margin);
  for (const line of discLines) {
    y = ensureSpace(doc, y, LINE_H + 2, pageW, margin);
    doc.text(line, margin, y);
    y += LINE_H;
  }

  const footerY = A4_HEIGHT_MM - 26;
  if (y > footerY - FOOTER_RESERVE_MM) {
    doc.addPage();
    drawContinuationHeader(doc, pageW, margin);
  }

  drawFooter(doc, pageW, margin);

  return doc.output("arraybuffer") as unknown as Uint8Array;
}
