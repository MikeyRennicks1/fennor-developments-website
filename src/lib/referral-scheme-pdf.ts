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
  doc.text(`${company.emails.join(" · ")}  ·  ${company.phone}`, margin, footerYFinal + 14);
  doc.text(company.tagline, margin, footerYFinal + 20);
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
  doc.text("Referral Programme Overview", margin + 52, 17);
  doc.setFontSize(8.5).setFont("helvetica", "normal").setTextColor(220, 220, 220);
  doc.text("Professional Partner Terms", margin + 52, 23);
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

export function generateReferralSchemePdf(data: ReferralSchemePdfData): Uint8Array {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = A4_WIDTH_MM;
  const margin = MARGIN;
  const logoDataUri = data.logoDataUri;

  drawPageHeaderBand(doc, pageW, margin, logoDataUri);

  let y = 44;
  doc.setFontSize(18).setFont("helvetica", "bold");
  setNavy(doc);
  doc.text("Referral partner programme", margin, y);
  y += 6.5;
  doc.setFontSize(11).setFont("helvetica", "normal");
  setGray(doc);
  doc.text("How we operate", margin, y);
  y += 7;

  y = sectionHeading(doc, margin, y, "Partnership");
  y = bodyParagraph(
    doc,
    pageW,
    margin,
    y,
    "This overview applies when you as a private customer, business, or professional partner accept a partnership with us under our referral scheme. The sections below set out how we track referrals, pay rewards, and manage larger opportunities",
  );

  y = sectionHeading(doc, margin, y, "Domestic reward");
  const domesticCopy =
    "For each domestic house referred to us that we complete, once the installation work is finished and payment is received from the end customer, the referrer receives €200 per completed domestic house";
  const domesticLines = doc.splitTextToSize(domesticCopy, pageW - 2 * margin - 8);
  const boxPadTop = 3;
  const summaryLineH = 6.2;
  const boxInnerH = boxPadTop + domesticLines.length * LINE_H + summaryLineH + 4;
  doc.setFillColor(LIGHT_BG.r, LIGHT_BG.g, LIGHT_BG.b);
  doc.roundedRect(margin, y - 3, pageW - 2 * margin, boxInnerH + 6, 2, 2, "F");
  doc.setDrawColor(TEAL.r, TEAL.g, TEAL.b);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y - 3, pageW - 2 * margin, boxInnerH + 6, 2, 2, "S");
  doc.setFontSize(10).setFont("helvetica", "normal");
  setGray(doc);
  let yy = y + boxPadTop + 0.8;
  for (const line of domesticLines) {
    doc.text(line, margin + 4, yy);
    yy += LINE_H;
  }
  doc.setFontSize(12).setFont("helvetica", "bold");
  setGold(doc);
  doc.text("EUR 200 per completed domestic house  |  5 jobs = EUR 1,000", margin + 4, yy + 2.8);
  y = yy + summaryLineH + 6;

  y = sectionHeading(doc, margin, y, "Onboarding & tracking");
  y = bodyParagraph(
    doc,
    pageW,
    margin,
    y,
    "When a customer first contacts us, we ask who referred them and whether the enquiry is a referral. If it is, we attach the referrer name and contact details to the customer project file through the installation journey so we can contact and pay the referrer promptly once the project is completed and paid",
  );

  y = sectionHeading(doc, margin, y, "Multiple homes");
  y = bodyParagraph(
    doc,
    pageW,
    margin,
    y,
    "Where you refer multiple homes, we can offer larger referral amounts than the standard domestic rate. Figures are agreed case by case depending on scope and value",
  );

  y = sectionHeading(doc, margin, y, "Commercial and large scale work");
  doc.setFontSize(10).setFont("helvetica", "normal");
  setGray(doc);
  const commercialText =
    "For businesses, commercial units, or large solar contracts including substantial corporate partnerships in Ireland, we prefer to meet in person to discuss the opportunity";
  const commercialLines = doc.splitTextToSize(commercialText, pageW - 2 * margin);
  for (const line of commercialLines) {
    doc.text(line, margin, y);
    y += LINE_H;
  }
  doc.setFontSize(10.3).setFont("helvetica", "bold");
  setNavy(doc);
  doc.text(
    "Referral fees in these cases can be very lucrative and are agreed individually to reflect the scale of the work",
    margin,
    y + 0.6
  );
  y += 5;

  doc.setFontSize(7.8).setFont("helvetica", "normal");
  setGray(doc);
  const disclaimer =
    "Referral fees are subject to agreed partnership terms and the EUR 200 rate applies to standard completed domestic house installations as described above";
  const discLines = doc.splitTextToSize(disclaimer, pageW - 2 * margin);
  for (const line of discLines) {
    doc.text(line, margin, y);
    y += 4.1;
  }

  drawFooter(doc, pageW, margin);

  return doc.output("arraybuffer") as unknown as Uint8Array;
}
