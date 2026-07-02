import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactSalesEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, workEmail, phone, plan, country, companyWebsite, companyName, message } = body;

    if (!fullName || !workEmail || !companyName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const record = await prisma.contactSalesRequest.create({
      data: { fullName, workEmail, phone, plan, country, companyWebsite, companyName, message },
    });

    // Email is best-effort — don't fail the request if it errors,
    // since the lead is already safely stored in the DB.
    try {
      await sendContactSalesEmail({
        fullName, workEmail, phone, plan, country, companyWebsite, companyName, message,
      });
    } catch (mailErr) {
      console.error("Email send failed (record still saved):", mailErr);
    }

    return NextResponse.json({ success: true, id: record.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}