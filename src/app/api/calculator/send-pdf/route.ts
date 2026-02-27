import { NextResponse } from "next/server";
import { Resend } from "resend";
import { readFileSync, existsSync } from "fs";
import path from "path";
import { generateEstimatePdf, type EstimatePdfData, type EstimateResult } from "@/lib/estimate-pdf";
import { company } from "@/config/company";

function getLogoDataUri(): string | null {
  try {
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    if (!existsSync(logoPath)) return null;
    const buf = readFileSync(logoPath);
    const base64 = Buffer.from(buf).toString("base64");
    return `data:image/png;base64,${base64}`;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      contact,
      panels,
      battery,
      eddi,
      evCharger,
      applyGrant,
      unitRate,
      result,
    } = body as {
      contact: EstimatePdfData["contact"];
      panels: number;
      battery: boolean;
      eddi: boolean;
      evCharger: boolean;
      applyGrant: boolean;
      unitRate: number;
      result: EstimateResult;
    };

    if (!contact?.email || !contact?.name) {
      return NextResponse.json({ error: "Missing contact email or name" }, { status: 400 });
    }

    const logoDataUri = getLogoDataUri();
    const pdfData: EstimatePdfData = {
      contact,
      panels: Number(panels) || 12,
      battery: Boolean(battery),
      eddi: Boolean(eddi),
      evCharger: Boolean(evCharger),
      applyGrant: Boolean(applyGrant),
      unitRate: Number(unitRate) || 0.35,
      result: {
        totalPrice: Number(result?.totalPrice) ?? 0,
        afterGrant: Number(result?.afterGrant) ?? 0,
        yearlySavings: Number(result?.yearlySavings) ?? 0,
        paybackYears: Number(result?.paybackYears) ?? 0,
        twentyYearSavings: Number(result?.twentyYearSavings) ?? 0,
        co2Kg: Number(result?.co2Kg) ?? 0,
        monthlySavings: Number(result?.monthlySavings) ?? 0,
        savings5y: Number(result?.savings5y) ?? 0,
        savings10y: Number(result?.savings10y) ?? 0,
        savings30y: Number(result?.savings30y) ?? 0,
      },
      logoDataUri: logoDataUri ?? undefined,
    };

    const pdfBytes = generateEstimatePdf(pdfData);
    const pdfBuffer = Buffer.from(pdfBytes);

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email is not configured. Set RESEND_API_KEY to send estimates." },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const from = process.env.RESEND_FROM ?? "Fennor Developments <onboarding@resend.dev>";

    // 1. Send PDF to the customer
    const { error: customerError } = await resend.emails.send({
      from,
      to: contact.email,
      subject: `Your Solar PV Estimate – ${company.name}`,
      html: `
        <p>Hi ${contact.name},</p>
        <p>Please find your Solar PV estimate attached as requested.</p>
        <p>If you have any questions or would like to book a free roof assessment, just reply to this email or give us a call.</p>
        <p>Best regards,<br/><strong>${company.name}</strong><br/>${company.phone} · ${company.email}</p>
      `,
      attachments: [
        { filename: "Fennor-Solar-Estimate.pdf", content: pdfBuffer },
      ],
    });

    if (customerError) {
      return NextResponse.json({ error: customerError.message }, { status: 500 });
    }

    // 2. Send a copy to you with subject "Custom quote for [Name]" and the PDF
    const { error: ownerError } = await resend.emails.send({
      from,
      to: company.email,
      subject: `Custom quote for ${contact.name}`,
      html: `
        <p>Custom quote request from the calculator.</p>
        <p><strong>${contact.name}</strong><br/>${contact.email} · ${contact.phone}<br/>${contact.address}</p>
        <p>Budget: ${contact.budget || "—"}. PDF estimate attached.</p>
      `,
      attachments: [
        { filename: `Custom-quote-${contact.name.replace(/\s+/g, "-")}.pdf`, content: pdfBuffer },
      ],
    });

    if (ownerError) {
      return NextResponse.json({ error: ownerError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to send estimate";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
