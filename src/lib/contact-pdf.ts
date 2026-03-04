/**
 * Generates a simple PDF for contact form submissions (name, email, phone, message)
 * so you can save or import into a CRM.
 */

import { jsPDF } from "jspdf";
import { company } from "@/config/company";

export type ContactEnquiry = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

const NAVY = "#0f172a";
const GRAY = "#64748b";

export function generateContactPdf(data: ContactEnquiry): Uint8Array {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 18;
  const pageW = 210;
  let y = margin;

  doc.setFontSize(18).setFont("helvetica", "bold").setTextColor(NAVY);
  doc.text(company.name, margin, y + 10);
  doc.setFontSize(9).setFont("helvetica", "normal").setTextColor(GRAY);
  doc.text("Website enquiry", margin, y + 16);
  y += 28;

  doc.setFontSize(11).setFont("helvetica", "bold").setTextColor(NAVY);
  doc.text("Contact details", margin, y);
  y += 8;

  doc.setFontSize(10).setFont("helvetica", "normal").setTextColor(NAVY);
  doc.text(`Name: ${data.name}`, margin, y);
  y += 7;
  doc.text(`Email: ${data.email}`, margin, y);
  y += 7;
  doc.text(`Phone: ${data.phone?.trim() || "—"}`, margin, y);
  y += 10;

  doc.setFontSize(11).setFont("helvetica", "bold").setTextColor(NAVY);
  doc.text("Message", margin, y);
  y += 8;

  doc.setFontSize(10).setFont("helvetica", "normal").setTextColor(GRAY);
  const messageLines = doc.splitTextToSize(data.message || "—", pageW - 2 * margin);
  doc.text(messageLines, margin, y);
  y += messageLines.length * 6 + 12;

  doc.setFontSize(8).setTextColor(GRAY);
  doc.text(
    `Received ${new Date().toLocaleString("en-IE", { dateStyle: "medium", timeStyle: "short" })}`,
    margin,
    y
  );

  return new Uint8Array(doc.output("arraybuffer"));
}

/** Calculator step 1 lead – name, email, phone, address, budget (for CRM). */
export type CalculatorLead = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  budget?: string;
};

export function generateCalculatorLeadPdf(data: CalculatorLead): Uint8Array {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 18;
  let y = margin;

  doc.setFontSize(18).setFont("helvetica", "bold").setTextColor(NAVY);
  doc.text(company.name, margin, y + 10);
  doc.setFontSize(9).setFont("helvetica", "normal").setTextColor(GRAY);
  doc.text("Solar calculator lead", margin, y + 16);
  y += 28;

  doc.setFontSize(11).setFont("helvetica", "bold").setTextColor(NAVY);
  doc.text("Contact details", margin, y);
  y += 8;

  doc.setFontSize(10).setFont("helvetica", "normal").setTextColor(NAVY);
  doc.text(`Name: ${data.name}`, margin, y);
  y += 7;
  doc.text(`Email: ${data.email}`, margin, y);
  y += 7;
  doc.text(`Phone: ${data.phone?.trim() || "—"}`, margin, y);
  y += 7;
  doc.text(`Address: ${data.address?.trim() || "—"}`, margin, y);
  y += 7;
  doc.text(`Budget: ${data.budget?.trim() || "—"}`, margin, y);
  y += 12;

  doc.setFontSize(8).setTextColor(GRAY);
  doc.text(
    `Received ${new Date().toLocaleString("en-IE", { dateStyle: "medium", timeStyle: "short" })}`,
    margin,
    y
  );

  return new Uint8Array(doc.output("arraybuffer"));
}
