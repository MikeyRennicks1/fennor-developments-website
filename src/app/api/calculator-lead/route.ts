import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/config/company";
import { generateCalculatorLeadPdf, type CalculatorLead } from "@/lib/contact-pdf";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address, budget } = body as {
      name?: string;
      email?: string;
      phone?: string;
      address?: string;
      budget?: string;
    };

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const lead: CalculatorLead = {
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone != null ? String(phone).trim() : "",
      address: address != null ? String(address).trim() : "",
      budget: budget != null ? String(budget).trim() : "",
    };

    const pdfBytes = generateCalculatorLeadPdf(lead);
    const pdfBuffer = Buffer.from(pdfBytes);
    const safeName = lead.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "");
    const filename = `Calculator-lead-${safeName || "lead"}-${Date.now()}.pdf`;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email is not configured. Set RESEND_API_KEY." },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const fromEnv = process.env.RESEND_FROM ?? "";
    const from =
      fromEnv && !fromEnv.toLowerCase().includes("@gmail") ? fromEnv : "Fennor Developments <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to: company.email,
      subject: `Solar calculator lead: ${lead.name}`,
      html: `
        <p><strong>New solar calculator lead</strong> (details captured when they clicked Continue to calculator).</p>
        <p><strong>Name:</strong> ${lead.name}<br/>
        <strong>Email:</strong> ${lead.email}<br/>
        <strong>Phone:</strong> ${lead.phone || "—"}<br/>
        <strong>Address:</strong> ${lead.address || "—"}<br/>
        <strong>Budget:</strong> ${lead.budget || "—"}</p>
        <p><em>PDF attached for CRM.</em></p>
      `,
      attachments: [{ filename, content: pdfBuffer }],
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to send lead";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
