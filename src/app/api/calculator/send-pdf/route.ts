import { NextResponse } from "next/server";
import { Resend } from "resend";
import { readFileSync, existsSync } from "fs";
import path from "path";
import { generateEstimatePdf, type EstimatePdfData, type EstimateResult } from "@/lib/estimate-pdf";
import { generateCalculatorLeadPdf } from "@/lib/contact-pdf";
import { getSeaiGrantAmount } from "@/lib/seai-grant";
import { PANEL_KW } from "@/config/solar";
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
      result: (() => {
        const panelsNum = Number(panels) || 12;
        const kWp = panelsNum * PANEL_KW;
        const grantAmount = result?.grantAmount != null ? Number(result.grantAmount) : getSeaiGrantAmount(kWp);
        const totalPrice = Number(result?.totalPrice) ?? 0;
        const afterGrant = Number(result?.afterGrant) ?? (Boolean(applyGrant) ? Math.max(0, totalPrice - grantAmount) : totalPrice);
        return {
          totalPrice,
          afterGrant,
          grantAmount,
          yearlySavings: Number(result?.yearlySavings) ?? 0,
          paybackYears: Number(result?.paybackYears) ?? 0,
          twentyYearSavings: Number(result?.twentyYearSavings) ?? 0,
          co2Kg: Number(result?.co2Kg) ?? 0,
          monthlySavings: Number(result?.monthlySavings) ?? 0,
          savings5y: Number(result?.savings5y) ?? 0,
          savings10y: Number(result?.savings10y) ?? 0,
          savings30y: Number(result?.savings30y) ?? 0,
        };
      })(),
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
    const fromEnv = process.env.RESEND_FROM ?? "";
    const from =
      fromEnv && !fromEnv.toLowerCase().includes("@gmail") ? fromEnv : "Fennor Developments <onboarding@resend.dev>";

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

    // 2. Email 1 to you: full estimate PDF (they clicked "Email me this estimate")
    const safeName = contact.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "");
    const { error: ownerEstimateError } = await resend.emails.send({
      from,
      to: company.email,
      subject: `Estimate requested by ${contact.name}`,
      html: `
        <p>Customer requested their estimate by email (calculator).</p>
        <p><strong>${contact.name}</strong><br/>${contact.email} · ${contact.phone}</p>
        <p>Full estimate PDF attached.</p>
      `,
      attachments: [
        { filename: `Estimate-${safeName || "customer"}.pdf`, content: pdfBuffer },
      ],
    });

    if (ownerEstimateError) {
      return NextResponse.json({ error: ownerEstimateError.message }, { status: 500 });
    }

    // 3. Email 2 to you: lead details (name, email, phone, address, budget) for CRM
    const leadPdfBytes = generateCalculatorLeadPdf({
      name: contact.name,
      email: contact.email,
      phone: contact.phone ?? "",
      address: contact.address ?? "",
      budget: contact.budget ?? "",
    });
    const leadPdfBuffer = Buffer.from(leadPdfBytes);
    const { error: ownerLeadError } = await resend.emails.send({
      from,
      to: company.email,
      subject: `Calculator lead: ${contact.name}`,
      html: `
        <p>Lead details (from calculator – for CRM).</p>
        <p><strong>${contact.name}</strong><br/>${contact.email} · ${contact.phone}<br/>${contact.address}</p>
        <p>Budget: ${contact.budget || "—"}.</p>
        <p>PDF attached.</p>
      `,
      attachments: [
        { filename: `Lead-${safeName || "lead"}.pdf`, content: leadPdfBuffer },
      ],
    });

    if (ownerLeadError) {
      return NextResponse.json({ error: ownerLeadError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to send estimate";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
