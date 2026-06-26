"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { COUNTRIES, getFlagUrl } from "@/lib/countries";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface FormData {
  fullName: string;
  workEmail: string;
  phone: string;
  plan: string;
  country: string;
  companyWebsite: string;
  companyName: string;
  message: string;
  brokerTerms: boolean;
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PLANS = ["Startup Broker", "Enterprise Broker", "Institutional"];

const TRUST_ITEMS = [
  { icon: "solar:shield-check-bold-duotone", label: "14-day go-live" },
  { icon: "solar:users-group-rounded-bold-duotone", label: "400+ brokers" },
  { icon: "solar:lightning-bold-duotone", label: "Sub-ms execution" },
  { icon: "solar:clock-circle-bold-duotone", label: "24/7 support" },
];

const OFFICES = [
  {
    country: "United Arab Emirates",
    address: "International Business Tower\nAl A'amal Street, Business Bay\nDubai, UAE",
    reg: "Registration Number: 0000000",
    icon: "solar:buildings-bold-duotone",
  },
];

const CONTACT_METHODS = [
  { icon: "solar:phone-bold-duotone", label: "Sales", value: "+44-2-071-936-008" },
  { icon: "solar:phone-bold-duotone", label: "MENA", value: "+962-6-5520822" },
  { icon: "solar:letter-bold-duotone", label: "Email", value: "support@orbitfxsolution.com" },
  { icon: "solar:chat-round-dots-bold-duotone", label: "Live Chat", value: "Available 24/7" },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
type BadgeColor = "default" | "indigo" | "green" | "amber" | "rose";

function DiagBadge({ label, color = "default" }: { label: string; color?: BadgeColor }) {
  const c: Record<BadgeColor, string> = {
    default: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
    indigo: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
    green: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    amber: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    rose: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800",
  };
  return (
    <span
      className={`inline-block text-[10px] font-extrabold tracking-[2px] uppercase px-3.5 py-1 border ${c[color]}`}
      style={{ clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}
    >
      {label}
    </span>
  );
}

function InputField({
  label, required, type = "text", placeholder, value, onChange, name,
}: {
  label: string; required?: boolean; type?: string;
  placeholder?: string; value: string; onChange: (v: string) => void; name: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-[1.5px] text-gray-500 dark:text-gray-400">
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 px-4 py-3 text-[13px] outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors"
        style={{ borderRadius: 0 }}
      />
    </div>
  );
}

function SelectField({
  label, required, options, placeholder, value, onChange,
}: {
  label: string; required?: boolean; options: string[];
  placeholder?: string; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="flex flex-col gap-1.5" ref={ref}>
      <label className="text-[11px] font-bold uppercase tracking-[1.5px] text-gray-500 dark:text-gray-400">
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <div
          className="w-full flex items-center gap-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-[13px] cursor-pointer select-none hover:border-indigo-400 transition-colors"
          style={{ borderRadius: 0 }}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={value ? "text-gray-900 dark:text-white" : "text-gray-400"}>
            {value || (placeholder ?? `Select ${label}`)}
          </span>
          <Icon
            icon="solar:alt-arrow-down-bold"
            className={`ml-auto text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            width={14}
          />
        </div>

        {open && (
          <div
            className="absolute z-50 top-full left-0 right-0 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl"
            style={{ borderRadius: 0 }}
          >
            {options.map((o) => (
              <div
                key={o}
                className={`flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors text-[13px] ${value === o ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400" : "text-gray-900 dark:text-white"}`}
                onClick={() => { onChange(o); setOpen(false); }}
              >
                {o}
                {value === o && <Icon icon="solar:check-bold" className="text-indigo-500" width={12} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOAST
───────────────────────────────────────────── */
function Toast({ show, onClose }: { show: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex items-start gap-3 bg-white dark:bg-gray-900 border border-emerald-200 dark:border-emerald-800 shadow-2xl px-5 py-4 max-w-sm animate-in"
      style={{ animation: "toast-in 0.4s cubic-bezier(.22,1,.36,1) both" }}>
      <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center flex-shrink-0">
        <Icon icon="solar:check-circle-bold-duotone" className="text-emerald-500" width={18} />
      </div>
      <div className="flex-1">
        <p className="text-[13px] font-bold text-gray-900 dark:text-white">Request Submitted!</p>
        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
          Our sales team will reach out within 24 hours.
        </p>
      </div>
      <button onClick={onClose} className="text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 transition-colors mt-0.5">
        <Icon icon="solar:close-bold" width={14} />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function ContactSalesPage() {
  const router = useRouter();
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;

  const [dialCode, setDialCode] = useState({ code: "AE", dialCode: "+971" });
  const [countryOpen, setCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);

  const [cfStatus, setCfStatus] = useState<"idle" | "verifying" | "verified">("idle");

  const [form, setForm] = useState<FormData>({
    fullName: "", workEmail: "", phone: "", plan: "",
    country: "", companyWebsite: "", companyName: "",
    message: "", brokerTerms: false,
  });
  const [showToast, setShowToast] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const set = (k: keyof FormData) => (v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (!countryOpen) return;
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [countryOpen]);

  const handleCountrySelect = (c: typeof COUNTRIES[0]) => {
    set("country")(c.name);
    setDialCode({ code: c.code, dialCode: c.dialCode });
    setCountryOpen(false);

    if (cfStatus === "idle") {
      setCfStatus("verifying");
      setTimeout(() => setCfStatus("verified"), 1800);
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.workEmail.trim() || !emailRegex.test(form.workEmail.trim()))
      e.workEmail = "Valid email required";
    if (!form.companyName.trim()) e.companyName = "Required";
    if (!form.brokerTerms) e.brokerTerms = "Please accept the broker terms";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact-sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          workEmail: form.workEmail,
          phone: form.phone,
          plan: form.plan,
          country: form.country,
          companyWebsite: form.companyWebsite,
          companyName: form.companyName,
          message: form.message,
        }),
      });

      if (!res.ok) throw new Error("Submit failed");

      setForm({
        fullName: "", workEmail: "", phone: "", plan: "",
        country: "", companyWebsite: "", companyName: "",
        message: "", brokerTerms: false,
      });
      setDialCode({ code: "AE", dialCode: "+971" });
      setCfStatus("idle");
      setShowToast(true);
    } catch (err) {
      console.error(err);
      setErrors({ fullName: "Submission failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes hero-in { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        .ha { animation: hero-in 0.7s cubic-bezier(.22,1,.36,1) both; }
        .ha-1{animation-delay:0.06s}.ha-2{animation-delay:0.14s}.ha-3{animation-delay:0.22s}
        .ha-4{animation-delay:0.30s}.ha-5{animation-delay:0.38s}

        @keyframes float-y {
          0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)}
        }
        .float-slow { animation: float-y 5s ease-in-out infinite; }

        .form-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4);
        }

        @keyframes toast-in {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }

        @keyframes cf-spin {
          to { transform: rotate(360deg); }
        }
        .cf-spin { animation: cf-spin 0.9s linear infinite; }
      `}</style>

      <Toast show={showToast} onClose={() => setShowToast(false)} />

      <div ref={ref} className="bg-white dark:bg-gray-950 min-h-screen">

        {/* ── BREADCRUMB ── */}
        <div className="border-b border-gray-100 dark:border-gray-800 px-[5%] py-3 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-[1280px] mx-auto flex items-center gap-2 text-[11px] text-gray-400 font-mono">
            <button onClick={() => router.push("/")} className="hover:text-indigo-500 transition-colors">Home</button>
            <span className="text-gray-300 dark:text-gray-700">/</span>
            <span className="text-gray-600 dark:text-gray-300 font-bold">Contact Sales</span>
          </div>
        </div>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/40 to-white dark:from-gray-900 dark:via-indigo-950/10 dark:to-gray-950 border-b border-gray-200/60 dark:border-gray-800 px-[5%] py-16 sm:py-20">
          <div className="absolute inset-0 pointer-events-none opacity-[0.18] dark:opacity-[0.10]"
            style={{ backgroundImage: "linear-gradient(rgba(99,102,241,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.12) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
          <div className="absolute top-10 right-[15%] w-56 h-56 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none float-slow" />
          <div className="absolute bottom-0 left-[8%] w-40 h-40 rounded-full bg-violet-400/8 blur-2xl pointer-events-none" style={{ animation: "float-y 7s ease-in-out infinite reverse" }} />

          <div className="relative z-10 max-w-[1280px] mx-auto text-center">
            <div className="ha ha-1 flex items-center justify-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-indigo-600 dark:text-indigo-400">Sales Team · Respond within 24h</span>
            </div>
            <h1 className="ha ha-2 font-black text-[clamp(32px,5vw,56px)] leading-[1.06] tracking-[-2px] text-gray-900 dark:text-white mb-4"
              style={{ fontFamily: "'Space Mono', monospace" }}>
              Contact <span className="text-indigo-500">Sales</span>
            </h1>
            <p className="ha ha-3 text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed max-w-[500px] mx-auto mb-6">
              Got any questions? We are here to help! Fill out the form and we'll share everything you need
              to know about our platforms built for financial institutions and brokers.
            </p>
            <p className="ha ha-4 text-[12px] text-gray-400 dark:text-gray-500 max-w-[560px] mx-auto leading-relaxed">
              Note that OrbitFX is not a broker. Our platform is crafted exclusively for business clients. We stay out
              of financial roles and trading activities — leaving those decisions to you.
            </p>
            <div className="ha ha-5 flex flex-wrap justify-center gap-2 mt-8">
              {TRUST_ITEMS.map((t) => (
                <div key={t.label} className="flex items-center gap-2 text-[11px] font-bold px-3 py-1.5 border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 text-gray-600 dark:text-gray-400">
                  <Icon icon={t.icon} className="text-indigo-500" width={13} />
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MAIN GRID ── */}
        <section className="py-16 sm:py-20 px-[5%]">
          <div className="max-w-[1280px] mx-auto">

            <div className="reveal mb-12" data-dir="up" data-delay="0">
              <p className="text-[clamp(16px,2vw,21px)] font-bold text-indigo-500 dark:text-indigo-400 leading-snug max-w-[680px]">
                Just fill out the form, and we will share everything you need to know about our platforms
                and services built specifically for financial institutions and brokers.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">

              {/* ── FORM CARD ── */}
              <div className="reveal relative border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-7 sm:p-9 form-card"
                data-dir="up" data-delay="60">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[1.5px] text-gray-500 dark:text-gray-400">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text" placeholder="John Smith" value={form.fullName}
                      onChange={(e) => set("fullName")(e.target.value)}
                      className={`w-full border ${errors.fullName ? "border-rose-400" : "border-gray-200 dark:border-gray-700"} bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-400 px-4 py-3 text-[13px] outline-none focus:border-indigo-500 transition-colors`}
                      style={{ borderRadius: 0 }}
                    />
                    {errors.fullName && <span className="text-[11px] text-rose-500 font-mono">{errors.fullName}</span>}
                  </div>

                  {/* Work Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[1.5px] text-gray-500 dark:text-gray-400">
                      Work Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email" placeholder="you@brokerage.com" value={form.workEmail}
                      onChange={(e) => set("workEmail")(e.target.value)}
                      className={`w-full border ${errors.workEmail ? "border-rose-400" : "border-gray-200 dark:border-gray-700"} bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-400 px-4 py-3 text-[13px] outline-none focus:border-indigo-500 transition-colors`}
                      style={{ borderRadius: 0 }}
                    />
                    {errors.workEmail && <span className="text-[11px] text-rose-500 font-mono">{errors.workEmail}</span>}
                  </div>

                  {/* Country with flag dropdown */}
                  <div className="flex flex-col gap-1.5" ref={countryRef}>
                    <label className="text-[11px] font-bold uppercase tracking-[1.5px] text-gray-500 dark:text-gray-400">
                      Country <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div
                        className="w-full flex items-center gap-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-[13px] cursor-pointer select-none hover:border-indigo-400 transition-colors"
                        style={{ borderRadius: 0 }}
                        onClick={() => setCountryOpen((v) => !v)}
                      >
                        {form.country ? (
                          <>
                            {getFlagUrl(dialCode.code) ? (
                              <img src={getFlagUrl(dialCode.code)!} alt={dialCode.code} className="w-5 h-3.5 object-cover flex-shrink-0" />
                            ) : (
                              <span className="text-sm">🌍</span>
                            )}
                            <span className="font-mono text-gray-500 text-[11px]">{dialCode.dialCode}</span>
                            <span className="text-gray-900 dark:text-white">{form.country}</span>
                          </>
                        ) : (
                          <span className="text-gray-400">Select Country</span>
                        )}
                        <Icon
                          icon="solar:alt-arrow-down-bold"
                          className={`ml-auto text-gray-400 transition-transform duration-200 ${countryOpen ? "rotate-180" : ""}`}
                          width={14}
                        />
                      </div>

                      {countryOpen && (
                        <div
                          className="absolute z-50 top-full left-0 right-0 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl max-h-[220px] overflow-y-auto"
                          style={{ borderRadius: 0 }}
                        >
                          {COUNTRIES.map((c) => (
                            <div
                              key={c.code}
                              className={`flex items-center gap-2.5 px-4 py-2.5 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors ${form.country === c.name ? "bg-indigo-50 dark:bg-indigo-950/30" : ""}`}
                              onClick={() => handleCountrySelect(c)}
                            >
                              {getFlagUrl(c.code) ? (
                                <img src={getFlagUrl(c.code)!} alt={c.code} className="w-5 h-3.5 object-cover flex-shrink-0" />
                              ) : (
                                <span className="text-sm">🌍</span>
                              )}
                              <span className="font-mono text-[11px] text-gray-400 w-10 flex-shrink-0">{c.dialCode}</span>
                              <span className="text-[13px] text-gray-900 dark:text-white">{c.name}</span>
                              {form.country === c.name && (
                                <Icon icon="solar:check-bold" className="text-indigo-500 ml-auto" width={12} />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Phone with flag */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[1.5px] text-gray-500 dark:text-gray-400">Phone</label>
                    <div className="flex border border-gray-200 dark:border-gray-700 focus-within:border-indigo-500 transition-colors">
                      <div className="flex items-center gap-1.5 px-3 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex-shrink-0">
                        {getFlagUrl(dialCode.code) ? (
                          <img src={getFlagUrl(dialCode.code)!} alt={dialCode.code} className="w-5 h-3.5 object-cover" />
                        ) : (
                          <span className="text-sm">🌍</span>
                        )}
                        <span className="font-mono text-[11px] text-gray-500">{dialCode.dialCode}</span>
                      </div>
                      <input
                        type="tel"
                        placeholder="50 123 4567"
                        value={form.phone}
                        onChange={(e) => set("phone")(e.target.value)}
                        className="flex-1 bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-400 px-4 py-3 text-[13px] outline-none"
                        style={{ borderRadius: 0 }}
                      />
                    </div>
                  </div>

                  {/* Plan */}
                  <SelectField label="Select Plan" options={PLANS} placeholder="Select Plan" value={form.plan} onChange={set("plan")} />

                  {/* Company Website */}
                  <InputField label="Company Website" name="companyWebsite" placeholder="https://yourbrokerage.com" value={form.companyWebsite} onChange={set("companyWebsite")} />
                </div>

                {/* Company Name */}
                <div className="mb-5 flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[1.5px] text-gray-500 dark:text-gray-400">
                    Company Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text" placeholder="Enter company name" value={form.companyName}
                    onChange={(e) => set("companyName")(e.target.value)}
                    className={`w-full border ${errors.companyName ? "border-rose-400" : "border-gray-200 dark:border-gray-700"} bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-400 px-4 py-3 text-[13px] outline-none focus:border-indigo-500 transition-colors`}
                    style={{ borderRadius: 0 }}
                  />
                  {errors.companyName && <span className="text-[11px] text-rose-500 font-mono">{errors.companyName}</span>}
                </div>

                {/* Message */}
                <div className="mb-6 flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[1.5px] text-gray-500 dark:text-gray-400">Comment or Message</label>
                  <textarea
                    rows={4} placeholder="Tell us about your brokerage, trading volume, and what you're looking for..."
                    value={form.message} onChange={(e) => set("message")(e.target.value)}
                    className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-400 px-4 py-3 text-[13px] outline-none focus:border-indigo-500 transition-colors resize-none"
                    style={{ borderRadius: 0 }}
                  />
                </div>

                {/* Broker Terms */}
                <div className="mb-5">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div
                      onClick={() => set("brokerTerms")(!form.brokerTerms)}
                      className={`mt-0.5 w-4 h-4 border-2 flex-shrink-0 flex items-center justify-center transition-colors cursor-pointer ${form.brokerTerms ? "border-indigo-500 bg-indigo-500" : errors.brokerTerms ? "border-rose-400" : "border-gray-300 dark:border-gray-600 group-hover:border-indigo-400"}`}
                      style={{ borderRadius: 0 }}
                    >
                      {form.brokerTerms && <Icon icon="solar:check-bold" className="text-white" width={10} />}
                    </div>
                    <span className="text-[12px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      I've read the{" "}
                      <button type="button" className="text-indigo-500 dark:text-indigo-400 hover:underline font-semibold">Broker Terms</button>
                      <span className="text-rose-500 ml-0.5">*</span>
                    </span>
                  </label>
                  {errors.brokerTerms && <p className="text-[11px] text-rose-500 font-mono mt-1 ml-7">{errors.brokerTerms}</p>}
                </div>

                {/* Broker terms preview */}
                <div className="mb-7 border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800 text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed max-h-[120px] overflow-y-auto">
                  <div className="flex items-start gap-3 mb-2">
                    <Icon icon="solar:document-text-bold-duotone" className="text-emerald-500 flex-shrink-0 mt-0.5" width={18} />
                    <div>
                      <p className="font-semibold text-gray-700 dark:text-gray-300 text-[12px] mb-1">DocuSign Agreement</p>
                      <p>Please note that the agreement attached is for viewing purposes, as we use DocuSign officially. Once submitted
                        you will receive an email to DocuSign the agreement. Before clicking the submit button, please take a few
                        minutes to read and view the{" "}
                        <button type="button" className="text-indigo-500 hover:underline font-semibold">Broker Terms</button>.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="rounded-none w-full sm:w-auto bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-indigo-600 dark:hover:bg-indigo-100 px-12 py-3.5 font-bold tracking-widest uppercase text-[11px] transition-all disabled:opacity-60"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <Icon icon="solar:spinner-bold" className="animate-spin" width={14} />
                      Submitting…
                    </span>
                  ) : "Submit →"}
                </Button>
              </div>

              {/* ── SIDEBAR ── */}
              <div className="flex flex-col gap-4">

                <div className="reveal border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden" data-dir="right" data-delay="80">
                  <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/80">
                    <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400">Get in Touch</span>
                  </div>
                  {CONTACT_METHODS.map((c, i) => (
                    <div key={i} className={`flex items-center gap-3 px-5 py-3.5 ${i < CONTACT_METHODS.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""} hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors`}>
                      <div className="w-7 h-7 flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 flex-shrink-0">
                        <Icon icon={c.icon} className="text-indigo-500" width={14} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[1px] text-gray-400">{c.label}</div>
                        <div className="text-[13px] font-bold text-gray-900 dark:text-white font-mono">{c.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="reveal border border-indigo-200 dark:border-indigo-900 bg-indigo-50/60 dark:bg-indigo-950/20 p-5" data-dir="right" data-delay="140">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon icon="solar:question-circle-bold-duotone" className="text-indigo-500" width={16} />
                    <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-indigo-600 dark:text-indigo-400">What Happens Next</span>
                  </div>
                  {[
                    { n: "01", t: "We review your request", s: "Usually within 2–4 hours during business hours." },
                    { n: "02", t: "Sales team reaches out", s: "A dedicated rep contacts you within 24 hours." },
                    { n: "03", t: "Platform demo call", s: "We show you OrbitFX live and answer all questions." },
                    { n: "04", t: "Custom proposal", s: "Tailored quote and onboarding timeline for your brokerage." },
                  ].map((step) => (
                    <div key={step.n} className="flex gap-3 mb-3 last:mb-0">
                      <span className="text-[10px] font-black font-mono text-indigo-400 flex-shrink-0 mt-0.5 w-5">{step.n}</span>
                      <div>
                        <div className="text-[12px] font-bold text-gray-800 dark:text-white">{step.t}</div>
                        <div className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">{step.s}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="reveal border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5" data-dir="right" data-delay="200">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => <Icon key={i} icon="solar:star-bold" className="text-indigo-400" width={13} />)}
                  </div>
                  <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed italic mb-4">
                    "OrbitFX had our white-label terminal live in under 2 weeks. Execution speed is exceptional."
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-sm flex-shrink-0">🇬🇧</div>
                    <div>
                      <div className="text-[12px] font-bold text-gray-900 dark:text-white">James K.</div>
                      <div className="text-[10px] text-gray-400">CEO, AlphaFX Brokerage</div>
                    </div>
                    <Icon icon="solar:verified-check-bold-duotone" className="text-indigo-500 ml-auto" width={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OFFICES ── */}
        <section className="py-16 px-[5%] border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-[1280px] mx-auto">
            <div className="reveal mb-10 text-center" data-dir="up" data-delay="0">
              <DiagBadge label="Our Offices" color="indigo" />
            </div>
            <div className="max-w-[680px] mx-auto">
              {OFFICES.map((o, i) => (
                <div key={i} className="reveal border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-center hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                  data-dir="up" data-delay={i * 100}>
                  <div className="w-10 h-10 border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center mx-auto mb-4">
                    <Icon icon={o.icon} className="text-indigo-500" width={20} />
                  </div>
                  <h3 className="text-[14px] font-black text-gray-900 dark:text-white mb-2">{o.country}</h3>
                  <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line mb-2">{o.address}</p>
                  <p className="text-[10px] font-mono text-gray-400">{o.reg}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}