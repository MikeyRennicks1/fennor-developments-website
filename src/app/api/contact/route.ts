import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/config/company";
import { generateContactPdf } from "@/lib/contact-pdf";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const enquiry = {
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone != null ? String(phone).trim() : "",
      message: String(message).trim(),
    };

    const pdfBytes = generateContactPdf(enquiry);
    const pdfBuffer = Buffer.from(pdfBytes);
    const safeName = enquiry.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "");
    const filename = `Enquiry-${safeName || "contact"}-${Date.now()}.pdf`;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email is not configured. Set RESEND_API_KEY." },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    // Resend does not allow sending "from" @gmail.com – use a verified domain or Resend's default
    const fromEnv = process.env.RESEND_FROM ?? "";
    const from =
      fromEnv && !fromEnv.toLowerCase().includes("@gmail") ? fromEnv : "Fennor Developments <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to: company.email,
      replyTo: enquiry.email,
      subject: `Website enquiry from ${enquiry.name}`,
      html: `
        <p><strong>New contact form submission</strong></p>
        <p><strong>Customer email (reply to this):</strong> <a href="mailto:${enquiry.email}">${enquiry.email}</a><br/>
        <strong>Name:</strong> ${enquiry.name}<br/>
        <strong>Phone:</strong> ${enquiry.phone || "—"}</p>
        <p><strong>Message:</strong></p>
        <p>${enquiry.message.replace(/\n/g, "<br/>")}</p>
        <p><em>PDF attached for CRM.</em></p>
      `,
      attachments: [{ filename, content: pdfBuffer }],
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to send message";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
