"use client";

import { useEffect, useRef, useState } from "react";
import { useLocalChat } from "@/lib/useLocalChat";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type Message = { role: "user" | "assistant"; content: string };
type Step = "form" | "chat";
type Mode = "new" | "existing";

export function SupportChat() {
  const { init, ask, loading, ready, error } = useLocalChat();
  const [mode, setMode] = useState<Mode>("existing");
  const [contactType, setContactType] = useState<"phone" | "email">("phone");
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [leadId, setLeadId] = useState<number | null>(null);

  // form
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (step === "chat" && open) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [step, open]);

  function startChat(id: number, greetingName: string) {
    setLeadId(id);
    setStep("chat");
    setMessages([{
      role: "assistant",
      content: `Hi ${greetingName.split(" ")[0]} 👋 I'm OrbitFX Assistant. Ask me anything about trading strategies, platform features, or your docs!`,
    }]);
  }

  async function handleFormSubmit() {
    setFormError("");

    if (mode === "new" && !name.trim()) {
      return setFormError("Please enter your name.");
    }
    if (!contact.trim()) {
      return setFormError("Please enter your phone or email.");
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "new"
            ? { action: "createLead", name: name.trim(), contact: contact.trim() }
            : { action: "verifyAccount", contact: contact.trim() }
        ),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      startChat(data.id, data.name ?? name.trim());
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  async function send() {
    if (!input.trim() || loading || !ready) return;
    const question = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", content: question }]);

    const answer = await ask(question);
    setMessages((m) => [...m, { role: "assistant", content: answer }]);

    if (leadId) {
      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "saveMessages",
          leadId,
          userMessage: question,
          assistantMessage: answer,
        }),
      }).catch(() => { });
    }
  }

  return (
    <>
      {/* ── Floating toggle ── */}
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          aria-label="Open OrbitFX assistant"
          className="
            fab-btn
            fixed bottom-6 right-6 z-50
            h-10 rounded-full px-0
            bg-gradient-to-br from-blue-200 to-emerald-400
            dark:from-blue-100 dark:to-emerald-300
            border-0 cursor-pointer
            flex items-center justify-center gap-0
            shadow-[0_8px_32px_rgba(16,185,129,.4)]
            hover:shadow-[0_12px_40px_rgba(16,185,129,.5)]
            transition-all duration-300
          "
        >
          <span className="btn-label text-xs font-medium pl-2">Ask</span>
          <img
            src="/Orbit1.png"
            alt="OrbitFX"
            width={48}
            height={48}
            className="rounded-full object-contain mx-1 shrink-0"
          />
          <span className="btn-label text-xs font-medium pr-2">OrbitFX</span>
        </Button>
      )}

      {/* ── Chat panel ── */}
      {open && (
        <div className="
          chat-panel
          fixed bottom-6 right-6 z-50
          w-[360px] max-h-[580px]
          flex flex-col
          rounded-2xl overflow-hidden
          shadow-[0_24px_64px_rgba(0,0,0,.18),0_2px_8px_rgba(0,0,0,.08)]
          border border-slate-200 dark:border-slate-700
          bg-white dark:bg-slate-900
        ">
          {/* Header with close button */}
          <div className="
            bg-gradient-to-br from-blue-700 via-teal-600 to-emerald-500
            px-4 py-3.5 flex items-center gap-3 shrink-0
          ">
            <div className="
              w-9 h-9 rounded-full overflow-hidden bg-white/90
              flex items-center justify-center shrink-0
            ">
              <img src="/Orbit1.png" alt="OrbitFX" width={36} height={36} className="object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="m-0 text-white font-semibold text-sm leading-tight">
                OrbitFX Assistant
              </p>
              <p className="m-0 text-emerald-100 text-[0.7rem] mt-0.5">
                {error ? `Error: ${error}` : ready ? "Online · Powered by your docs" : "Warming up…"}
              </p>
            </div>
            {ready && (
              <span className="
                w-2 h-2 rounded-full bg-emerald-300 shrink-0
                shadow-[0_0_0_3px_rgba(110,231,183,.35)]
              "/>
            )}
            {/* Close button inside header */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="
                w-7 h-7 rounded-full
                bg-white/10 hover:bg-white/25
                flex items-center justify-center
                border-0 cursor-pointer
                transition-colors duration-150 shrink-0 ml-1
              "
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ── STEP 1: New user / existing user form ── */}
          {step === "form" && (
            <div className="
              flex-1 overflow-y-auto
              flex flex-col justify-center
              px-5 py-6 gap-4
              bg-slate-50 dark:bg-slate-900
            ">
              <div className="text-center mb-1">
                <div className="
                  w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950
                  flex items-center justify-center mx-auto mb-3
                ">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke="#0d9488" strokeWidth="1.8">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <p className="m-0 font-semibold text-[.95rem] text-slate-800 dark:text-slate-100">
                  Before we start
                </p>
                <p className="m-0 mt-1 text-[.8rem] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {mode === "new"
                    ? "Share your details so we can personalise your experience."
                    : "Enter your registered phone or email to continue."}
                </p>
              </div>

              {/* Mode toggle */}
              <div className="
                flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1
              ">
                <button
                  type="button"
                  onClick={() => { setMode("existing"); setFormError(""); }}
                  className={`
                    flex-1 text-xs font-semibold py-2 rounded-lg cursor-pointer
                    transition-all duration-150 border-0
                    ${mode === "existing"
                      ? "bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm"
                      : "bg-transparent text-slate-500 dark:text-slate-400"
                    }
                  `}
                >
                  Already have an account
                </button>
                <button
                  type="button"
                  onClick={() => { setMode("new"); setFormError(""); }}
                  className={`
                    flex-1 text-xs font-semibold py-2 rounded-lg cursor-pointer
                    transition-all duration-150 border-0
                    ${mode === "new"
                      ? "bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm"
                      : "bg-transparent text-slate-500 dark:text-slate-400"
                    }
                  `}
                >
                  New user
                </button>
              </div>

              {mode === "new" && (
                <div className="flex flex-col gap-1.5">
                  <Label className="text-semibold text-xs text-slate-600 dark:text-slate-400 tracking-wide uppercase">Full Name</Label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleFormSubmit()}
                    placeholder="John Doe"
                    className="
                      bg-white dark:bg-slate-800
                      border border-slate-200 dark:border-slate-700
                      rounded-xl px-3 py-2.5 text-[.85rem]
                      text-slate-800 dark:text-slate-100
                      placeholder-slate-400
                      focus:outline-none focus:border-teal-500
                      focus:ring-2 focus:ring-teal-500/20
                      transition-all duration-150
                    "
                  />
                </div>
              )}

              <div className="space-y-3">
                <Label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                  Contact Method
                </Label>

                <div className="flex gap-6">
                  <label htmlFor="phone" className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      id="phone"
                      name="contactType"
                      value="phone"
                      checked={contactType === "phone"}
                      onChange={() => setContactType("phone")}
                      className="size-4 accent-teal-600 cursor-pointer"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-200">
                      Phone Number
                    </span>
                  </label>

                  <label htmlFor="email" className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      id="email"
                      name="contactType"
                      value="email"
                      checked={contactType === "email"}
                      onChange={() => setContactType("email")}
                      className="size-4 accent-teal-600 cursor-pointer"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-200">
                      Email
                    </span>
                  </label>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                    {contactType === "phone" ? "Phone Number" : "Email Address"}
                  </Label>

                  <Input
                    type={contactType === "phone" ? "tel" : "email"}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleFormSubmit()}
                    placeholder={
                      contactType === "phone"
                        ? "+1 555 000 0000"
                        : "you@example.com"
                    }
                  />
                </div>
              </div>

              {formError && (
                <p className="
                  m-0 text-[.78rem] text-red-600 dark:text-red-400
                  bg-red-50 dark:bg-red-950/50
                  border border-red-200 dark:border-red-800
                  rounded-lg px-3 py-2
                ">
                  {formError}
                </p>
              )}

              <button
                onClick={handleFormSubmit}
                disabled={submitting}
                className="
                  bg-gradient-to-br from-blue-600 to-emerald-500
                  hover:from-blue-700 hover:to-emerald-600
                  disabled:opacity-60 disabled:cursor-not-allowed
                  text-white font-semibold text-[.875rem]
                  rounded-xl py-2.5 mt-1
                  flex items-center justify-center gap-2
                  transition-all duration-150 cursor-pointer border-0
                  shadow-[0_2px_12px_rgba(16,185,129,.3)]
                "
              >
                {submitting ? (
                  <span className="flex gap-1.5 items-center">
                    <span className="cdot w-1.5 h-1.5 rounded-full bg-white/70 inline-block" />
                    <span className="cdot w-1.5 h-1.5 rounded-full bg-white/70 inline-block" />
                    <span className="cdot w-1.5 h-1.5 rounded-full bg-white/70 inline-block" />
                  </span>
                ) : mode === "new" ? "Start chatting →" : "Verify & continue →"}
              </button>
            </div>
          )}

          {/* ── STEP 2: Chat ── */}
          {step === "chat" && (
            <>
              <div className="
                flex-1 overflow-y-auto px-4 py-4
                flex flex-col gap-2.5
                bg-slate-50 dark:bg-slate-900
              ">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`
                      max-w-[82%] px-3 py-2 text-[.84rem] leading-relaxed break-words
                      ${m.role === "user"
                        ? "bg-gradient-to-br from-blue-600 to-emerald-500 text-white rounded-2xl rounded-br-sm shadow-sm"
                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-sm shadow-sm"
                      }
                    `}>
                      {m.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="
                      bg-white dark:bg-slate-800
                      border border-slate-200 dark:border-slate-700
                      rounded-2xl rounded-bl-sm shadow-sm
                      px-3.5 py-3 flex gap-1.5 items-center
                    ">
                      <span className="cdot w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
                      <span className="cdot w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
                      <span className="cdot w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="
                px-3 py-3 shrink-0
                bg-white dark:bg-slate-900
                border-t border-slate-200 dark:border-slate-700
                flex gap-2 items-center
              ">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !loading && ready && send()}
                  placeholder="Ask about trading strategies…"
                  className="
    flex-1
    bg-slate-100 dark:bg-slate-800
    border border-transparent
    rounded-xl px-3 py-2 text-[.84rem]
    text-slate-800 dark:text-slate-100
    placeholder-slate-400
    focus:outline-none focus:border-teal-500
    focus:ring-2 focus:ring-teal-500/20
    transition-all duration-150
  "
                />
                <button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  aria-label="Send"
                  className="
    w-9 h-9 rounded-xl shrink-0
    bg-gradient-to-br from-blue-600 to-emerald-500
    hover:from-blue-700 hover:to-emerald-600
    disabled:opacity-40 disabled:cursor-not-allowed
    text-white border-0 cursor-pointer
    flex items-center justify-center
    transition-all duration-150
  "
                >
                  {loading ? (
                    <svg className="spin-icon" width="15" height="15" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 2a10 10 0 0 1 10 10" opacity=".9" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}