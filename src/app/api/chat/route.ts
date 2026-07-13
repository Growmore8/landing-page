// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s\-()]{7,20}$/;

function validateContactServer(contact: string, contactType?: "phone" | "email"): string | null {
  const v = contact?.trim() ?? "";
  if (!v) return "Contact is required.";

  if (contactType === "email") {
    if (!EMAIL_REGEX.test(v)) return "Please enter a valid email address.";
  } else if (contactType === "phone") {
    const digitCount = v.replace(/\D/g, "").length;
    if (!PHONE_REGEX.test(v) || digitCount < 7 || digitCount > 15) {
      return "Please enter a valid phone number.";
    }
  } else {
    // No contactType provided — accept either format
    const isEmail = EMAIL_REGEX.test(v);
    const digitCount = v.replace(/\D/g, "").length;
    const isPhone = PHONE_REGEX.test(v) && digitCount >= 7 && digitCount <= 15;
    if (!isEmail && !isPhone) return "Contact must be a valid email or phone number.";
  }
  return null;
}

function validateNameServer(name: string): string | null {
  const v = name?.trim() ?? "";
  if (!v) return "Name is required.";
  if (v.length < 2) return "Name must be at least 2 characters.";
  if (v.length > 80) return "Name is too long.";
  if (!/^[a-zA-Z\s'.-]+$/.test(v)) return "Name contains invalid characters.";
  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    // ── Action 1: Create lead for a NEW user ──────────────────────────────
    if (action === "createLead") {
      const { name, contact, contactType } = body;

      const nameErr = validateNameServer(name);
      if (nameErr) {
        return NextResponse.json({ error: nameErr }, { status: 400 });
      }

      const contactErr = validateContactServer(contact, contactType);
      if (contactErr) {
        return NextResponse.json({ error: contactErr }, { status: 400 });
      }

      const normalizedContact = contact.trim().toLowerCase();

      // Prevent duplicate accounts for the same contact
      const existing = await prisma.chatLead.findFirst({
        where: { contact: { equals: normalizedContact, mode: "insensitive" } },
      });

      if (existing) {
        return NextResponse.json(
          {
            error:
              "An account with this contact already exists. Please use 'Already have an account' instead.",
          },
          { status: 409 }
        );
      }

      const lead = await prisma.chatLead.create({
        data: { name: name.trim(), contact: normalizedContact },
      });

      return NextResponse.json(
        { success: true, id: lead.id, name: lead.name },
        { status: 201 }
      );
    }

    // ── Action 2: Verify an EXISTING user by contact ──────────────────────
    if (action === "verifyAccount") {
      const { contact, contactType } = body;

      const contactErr = validateContactServer(contact, contactType);
      if (contactErr) {
        return NextResponse.json({ error: contactErr }, { status: 400 });
      }

      const normalizedContact = contact.trim().toLowerCase();

      const lead = await prisma.chatLead.findFirst({
        where: { contact: { equals: normalizedContact, mode: "insensitive" } },
      });

      if (!lead) {
        return NextResponse.json(
          {
            error:
              "We couldn't find an account with that contact detail. Please check it or register as a new user.",
          },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { success: true, id: lead.id, name: lead.name },
        { status: 200 }
      );
    }

    // ── Action 3: Save message pair after each exchange ───────────────────
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

    // ── Action 4: Answer question using retrieved context ─────────────────
    if (action === "ask") {
      const { question, context } = body;
      if (!question?.trim() || !context?.trim()) {
        return NextResponse.json({ error: "question and context are required." }, { status: 400 });
      }

      const completion = await openai.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are OrbitFX Assistant, a helpful support agent for the OrbitFX trading platform.\n\n" +
              "RULES:\n" +
              "1. The context below is retrieved directly from official OrbitFX documentation. Treat it as authoritative fact, not a hint to reason from.\n" +
              "2. If the context contains steps, a procedure, or a direct answer to the question, state it plainly and confidently as your own answer — reproduce the steps as numbered instructions. Do not say things like 'it can be inferred', 'as mentioned', 'is not explicitly stated', or reference the context itself. The user should not know you were given a context block at all.\n" +
              "3. Only use the fallback line if the context truly contains NOTHING relevant to the question — not if the answer is merely incomplete or phrased differently than the question. Partial-but-relevant information should still be answered directly using what IS there.\n" +
              "4. Never hedge or qualify an answer that IS present in the context. Confidence matches the source: if the doc gives concrete steps, give concrete steps back.\n" +
              "5. If nothing in the context is relevant, respond with EXACTLY: 'I don't have that information in our docs. Please contact support at info@growmoresolutions.lk' — no partial guessing, no inference in this case.\n" +
              "6. Use numbered steps for procedures, short bullet points for feature lists, and plain short paragraphs otherwise. Keep answers concise.\n" +
              "7. If the context contains a numbered list of steps (Step 1, Step 2, etc.) for a procedure, reproduce ALL of those steps in your answer, each on its own line, in order. Do not condense, merge, or drop steps to save space — completeness matters more than brevity for procedures.",
          },
          {
            role: "user",
            content: `Context:\n${context}\n\nQuestion: ${question}`,
          },
        ],
        max_tokens: 600,
        temperature: 0.2,
      });

      const answer = completion.choices[0]?.message?.content?.trim() ?? "Sorry, I couldn't generate an answer.";
      return NextResponse.json({ answer }, { status: 200 });
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