// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    // ── Action 1: Create lead on form submit ─────────────────────────────
    if (action === "createLead") {
      const { name, contact } = body;

      if (!name?.trim() || !contact?.trim()) {
        return NextResponse.json(
          { error: "Name and contact are required." },
          { status: 400 }
        );
      }

      const lead = await prisma.chatLead.create({
        data: { name: name.trim(), contact: contact.trim() },
      });

      return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
    }

    // ── Action 2: Save message pair after each exchange ───────────────────
    if (action === "saveMessages") {
      const { leadId, userMessage, assistantMessage } = body;

      if (!leadId || !userMessage?.trim() || !assistantMessage?.trim()) {
        return NextResponse.json(
          { error: "leadId, userMessage, and assistantMessage are required." },
          { status: 400 }
        );
      }

      await prisma.chatMessage.createMany({
        data: [
          { leadId: Number(leadId), role: "user",      content: userMessage.trim() },
          { leadId: Number(leadId), role: "assistant", content: assistantMessage.trim() },
        ],
      });

      return NextResponse.json({ success: true }, { status: 201 });
    }

    return NextResponse.json({ error: "Unknown action." }, { status: 400 });

  } catch (err) {
    console.error("[/api/chat] error:", err);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}