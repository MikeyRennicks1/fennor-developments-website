import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENTS = ["mikey@fennor.ie", "info@fennor.ie"];

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = (await req.json()) as {
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

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email is not configured. Set RESEND_API_KEY." },
        { status: 503 }
      );
    }

    const fromEnv = process.env.RESEND_FROM ?? "";
    const from =
      fromEnv && !fromEnv.toLowerCase().includes("@gmail")
        ? fromEnv
        : "Fennor Developments <onboarding@resend.dev>";

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: RECIPIENTS,
      replyTo: email.trim(),
      subject: `New enquiry from ${name.trim()}`,
      html: `
        <h2>New Enquiry</h2>
        <p><strong>Name:</strong> ${name.trim()}</p>
        <p><strong>Email:</strong> ${email.trim()}</p>
        <p><strong>Phone:</strong> ${phone?.trim() || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message.trim().replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Email failed to send" }, { status: 500 });
  }
}
