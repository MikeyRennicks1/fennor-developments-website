import { NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import path from "path";
import { generateReferralSchemePdf } from "@/lib/referral-scheme-pdf";

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

export async function GET() {
  const logoDataUri = getLogoDataUri();
  const pdfBytes = generateReferralSchemePdf({ logoDataUri: logoDataUri ?? undefined });

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Fennor-Developments-Referral-Programme.pdf"',
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
