"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Gauge,
  Shield,
  CandlestickChart,
  Network,
  Cable,
  Scale,
  Users,
  Wrench,
  Calculator,
  Headset,
} from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "Instant Execution",
    desc: "Ultra-low latency order routing with sub-millisecond execution across all supported asset classes.",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    desc: "256-bit encryption, two-factor authentication, and ISO 27001-compliant infrastructure protecting your data.",
  },
  {
    icon: CandlestickChart,
    title: "Advanced Analytics",
    desc: "Real-time risk dashboards, P&L tracking, and customizable reporting designed for compliance teams.",
  },
  {
    icon: Network,
    title: "Multi-Asset Liquidity",
    desc: "Deep liquidity pools from 15+ tier-1 banks and ECN providers, aggregated for best execution pricing.",
  },
  {
    icon: Cable,
    title: "API Connectivity",
    desc: "FIX 4.4/5.0, REST, and WebSocket APIs with full documentation and sandbox environments for testing.",
  },
  {
    icon: Scale,
    title: "Regulatory Compliance",
    desc: "Built-in tools for ESMA, MiFID II, and ASIC compliance including automated trade reporting modules.",
  },
];

const departments = [
  {
    icon: Users,
    name: "Human Resource",
    hours: "Mon–Fri 09:00–18:00",
    ext: "Ext 1",
    desc: "Careers, hiring & HR policies",
  },
  {
    icon: Wrench,
    name: "Technical Support",
    hours: "Mon–Sat 08:00–20:00",
    ext: "Ext 2",
    desc: "Platform issues & integrations",
  },
  {
    icon: Calculator,
    name: "Accounting",
    hours: "Mon–Thu 09:00–17:00",
    ext: "Ext 3",
    desc: "Billing, invoices & finance",
  },
  {
    icon: Headset,
    name: "Customer Service",
    hours: "Mon–Sat 08:00–20:00",
    ext: "Ext 4",
    desc: "General support & onboarding",
  },
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  country: string;
  cat: string;
  msg: string;
};

/* ── Diagonal badge ── */
function DiagBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
                 text-[10px] font-extrabold tracking-[2px] uppercase px-3.5 py-1
                 border border-gray-200 dark:border-gray-700"
      style={{ clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}
    >
      {label}
    </span>
  );
}

/* ── Ticker tape ── */
function TickerTape() {
  const tickers = [
    { sym: "BTC/USD", val: "67,420.50", up: true },
    { sym: "ETH/USD", val: "3,512.80", up: true },
    { sym: "EUR/USD", val: "1.0842", up: false },
    { sym: "GBP/USD", val: "1.2703", up: true },
    { sym: "XAU/USD", val: "2,318.40", up: true },
    { sym: "S&P 500", val: "5,248.00", up: true },
    { sym: "US30", val: "39,112.0", up: false },
    { sym: "NAS100", val: "18,340.5", up: true },
    { sym: "CRUDE", val: "82.14", up: false },
    { sym: "USD/JPY", val: "149.82", up: true },
  ];
  const items = [...tickers, ...tickers];

  return (
    <div className="overflow-hidden bg-gray-900 dark:bg-black py-1.5">
      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .ticker-track { display: flex; width: max-content; animation: ticker 36s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="ticker-track">
        {items.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 px-7 border-r border-white/10 font-mono text-[11px]"
          >
            <span className="text-gray-400 font-bold">{t.sym}</span>
            <span className="text-white">{t.val}</span>
            <span className={t.up ? "text-green-400" : "text-red-400"}>
              {t.up ? "▲" : "▼"}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Stat bar ── */
function StatBar() {
  const stats = [
    { n: "150+", l: "Brokers Served" },
    { n: "24/7", l: "Live Support" },
    { n: "99.9%", l: "Uptime SLA" },
    { n: "12+", l: "Years Experience" },
    { n: "50+", l: "Asset Classes" },
  ];
  return (
    <div className="flex overflow-x-auto border-t border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      {stats.map((s) => (
        <div
          key={s.l}
          className="flex-1 min-w-[130px] py-5 px-6 border-r border-gray-200 dark:border-gray-700 last:border-r-0 text-center"
        >
          <div className="font-mono font-bold text-2xl text-gray-900 dark:text-white leading-none">
            {s.n}
          </div>
          <div className="text-[11px] text-gray-400 mt-1.5 tracking-wide">{s.l}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Input label ── */
function InputLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block mb-1.5 text-[10px] font-bold tracking-[1.5px] uppercase text-gray-400 dark:text-gray-500">
      {children}
    </label>
  );
}

/* ── Input field base classes ── */
const inputCls =
  "w-full px-3.5 py-2.5 text-sm font-[Space_Grotesk,sans-serif] rounded-md " +
  "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 " +
  "text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 " +
  "outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", country: "", cat: "", msg: "",
  });

  const handleSend = () => {
    setSent(true);
    setForm({ name: "", email: "", phone: "", country: "", cat: "", msg: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const faqs = [
    {
      q: "Where is the Orbitfx Solution head office located?",
      a: "Our head office is at International Business Tower, Al A'amal Street, Business Bay, Dubai, United Arab Emirates. We serve brokerage clients across the Middle East and Asia-Pacific region from this location.",
    },
    {
      q: "What types of enquiries can I submit through the contact form?",
      a: "You can submit inquiries related to platform demos, pricing, technical support, partnership opportunities, onboarding, compliance questions, and general business enquiries.",
    },
    {
      q: "What is the typical response time for form submissions?",
      a: "Our sales and support teams respond to all form submissions within 1 business day. For urgent technical issues, please call our direct support line for immediate assistance.",
    },
    {
      q: "Does Orbitfx Solution offer white-label trading solutions?",
      a: "Yes. We offer fully white-labeled brokerage technology that can be tailored to your brand identity, including custom UI, multi-asset liquidity access, and back-office integrations. Contact our partnership team for a demo.",
    },
    {
      q: "What asset classes does the OrbitFX platform support?",
      a: "Our platform supports 50+ asset classes including Forex, CFDs, Cryptocurrencies, Equities, Indices, Commodities, and Fixed Income products — all accessible from a single integrated trading environment.",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-950">
        {/* grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="dark:opacity-20"
          style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-[5%] py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <span className="mb-5 inline-block border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[2px] text-indigo-400">
              Get in Touch
            </span>
            <h1 className="font-bold text-[clamp(38px,5.5vw,64px)] leading-[1.06] tracking-[-2px] text-gray-900 dark:text-white mb-5">
              Let's Build<br />
              <span className="text-indigo-500">Smarter</span><br />
              Brokerages.
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-[420px] mb-9">
              Orbitfx Solution powers institutional trading desks across the Middle East and Asia-Pacific.
              Tell us your goal — we'll engineer the solution.
            </p>
            <div className="flex gap-3 flex-wrap items-center mb-11">
              <Button asChild className="rounded-none bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 px-6 py-3 font-bold tracking-widest uppercase text-xs">
                <a href="#contact-form">Send a Message →</a>
              </Button>
              <Button asChild variant="outline" className="rounded-none border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-3 font-bold tracking-wide text-sm">
                <a href="#features">See Platform</a>
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {["FIX API", "White-Label", "Multi-Asset", "24/7 Support", "ASIC Compliant"].map((b) => (
                <span key={b} className="text-[11px] font-semibold px-3 py-1 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 tracking-wide">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <Card id="contact-form" className="rounded-none border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <span className="text-[10px] font-bold tracking-[2.5px] uppercase text-gray-400 dark:text-gray-500 whitespace-nowrap">
                  Send a Message
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              </div>

              {sent && (
                <div className="flex gap-2.5 items-center mb-5 px-4 py-3 border border-green-600 bg-green-50 dark:bg-green-950/40 dark:border-green-700 text-green-700 dark:text-green-400 text-[13px] font-semibold rounded-md">
                  ✓ Message sent — we'll reach out within 1 business day.
                </div>
              )}

              <div className="grid grid-cols-2 gap-3.5">
                {[
                  { id: "name", label: "Full Name", ph: "Full Name", type: "text" },
                  { id: "email", label: "Email Address", ph: "your@example.com", type: "email" },
                  { id: "country", label: "Country", ph: "United Arab Emirates", type: "text" },
                ].map((f) => (
                  <div key={f.id}>
                    <InputLabel>{f.label}</InputLabel>
                    <input
                      className={inputCls}
                      type={f.type}
                      placeholder={f.ph}
                      value={form[f.id as keyof FormData]}
                      onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                    />
                  </div>
                ))}

                <div className="col-span-2">
                  <InputLabel>Category</InputLabel>
                  <select
                    className={inputCls}
                    value={form.cat}
                    onChange={(e) => setForm({ ...form, cat: e.target.value })}
                  >
                    <option value="">Select a category</option>
                    <option>Platform Demo</option>
                    <option>Technical Support</option>
                    <option>Partnership Enquiry</option>
                    <option>Pricing / Licensing</option>
                    <option>Onboarding</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <InputLabel>Message</InputLabel>
                  <textarea
                    className={`${inputCls} resize-y`}
                    rows={4}
                    placeholder="Describe what you're looking for..."
                    value={form.msg}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  />
                </div>

                <div className="col-span-2 flex justify-end">
                  <Button
                    onClick={handleSend}
                    className="rounded-none bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 px-8 py-3 font-bold tracking-widest uppercase text-xs"
                  >
                    Send Message →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── STATS ── */}
      <StatBar />

      {/* ── AVAILABILITY STRIP ── */}
      <section className="border-t border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-[1280px] mx-auto px-[5%] py-8 flex flex-col sm:flex-row items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.2)]" />
            <div className="text-center sm:text-left">
              <div className="text-[10px] tracking-[2px] text-green-500 font-bold uppercase font-mono">
                Live Support Active
              </div>
              <div className="font-bold text-[28px] tracking-[-0.5px] text-gray-900 dark:text-white leading-tight whitespace-nowrap">
                24 × 7 Availability
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 shrink-0 items-center sm:items-start">
            {[
              { label: "EMAIL", val: "support@orbitfxsolution.com", href: "mailto:support@orbitfxsolution.com" },
              { label: "WEB", val: "www.OrbitFXSolution.com", href: "https://www.OrbitFXSolution.com" },
              { label: "ADDRESS", val: "International Business Tower, Al A'amal Street, Business Bay, Dubai, United Arab Emirates", href: "https://maps.google.com/?q=International+Business+Tower,+Business+Bay,+Dubai" },
            ].map((c) => (
              <div
                key={c.label}
                className={`text-center sm:text-left ${c.label === "ADDRESS" ? "max-w-[260px]" : "whitespace-nowrap"
                  }`}
              >
                <div className="text-[9px] text-gray-400 dark:text-gray-500 font-bold tracking-[2px] mb-1 font-mono uppercase">
                  {c.label}
                </div>
                <a
                  href={c.href}
                  className="text-gray-700 dark:text-gray-300 no-underline text-sm font-semibold hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors break-words"
                >
                  {c.val}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM FEATURES ── */}
      <section id="features" className="py-22 px-[5%]">
        <div className="max-w-[1280px] mx-auto">
          <div className="py-12">
            <DiagBadge label="Platform" />
            <h2 className="font-bold text-[clamp(24px,4vw,40px)] tracking-[-0.8px] text-gray-900 dark:text-white mt-3.5">
              Why Brokers Choose OrbitFX
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-[15px] mt-2 max-w-[540px]">
              Institutional-grade technology built for scale, compliance, and peak performance across all market conditions.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Card
                  key={f.title}
                  className="rounded-none border-indigo-500/10 dark:border-indigo-500/20 bg-white dark:bg-gray-800 hover:border-indigo-500/30 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-7">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center border border-indigo-500/20 bg-indigo-500/10">
                      <Icon className="h-5 w-5 text-indigo-400" />
                    </div>
                    <h3 className="mb-3 text-lg font-bold text-indigo-950 dark:text-indigo-100">
                      {f.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {f.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-22 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto">
          <div className="py-12">
            <DiagBadge label="Process" />
            <h2 className="font-bold text-[clamp(24px,4vw,40px)] tracking-[-0.8px] text-gray-900 dark:text-white mt-3.5">
              How Onboarding Works
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-[15px] mt-2 max-w-[540px]">
              From first contact to live platform in as little as 5 business days.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: "01", title: "Initial Consultation", desc: "Share your brokerage goals and requirements with our specialist team. We'll identify the right solution stack for you." },
              { n: "02", title: "Technical Scoping", desc: "Our engineers map your infrastructure needs, API integrations, and liquidity requirements into a detailed proposal." },
              { n: "03", title: "Demo & Approval", desc: "Test-drive the platform in a live sandbox environment. Review the commercial terms and sign-off on the agreement." },
              { n: "04", title: "Go Live", desc: "Full deployment, staff training, and handover. Your dedicated account manager stays on for 90-day post-launch support." },
            ].map((s, i) => (
              <Card key={s.n} className="rounded-none border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardContent className="p-7">
                  {i < 3 && <div className="text-xs text-indigo-500 mb-2">→</div>}
                  <div className="font-mono font-bold text-4xl text-gray-200 dark:text-gray-700 leading-none mb-4">
                    {s.n}
                  </div>
                  <div className="font-bold text-[15px] text-gray-900 dark:text-white mb-2">{s.title}</div>
                  <div className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── HEAD OFFICE ── */}
      <section className="py-22 px-[5%]">
        <div className="max-w-[1280px] mx-auto">
          <div className="py-12">
            <DiagBadge label="Location" />
            <h2 className="font-bold text-[clamp(24px,4vw,40px)] tracking-[-0.8px] text-gray-900 dark:text-white mt-3.5">
              Head Office
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-[15px] mt-2 max-w-[540px]">
              Headquartered in Dubai, UAE — serving brokerage clients across the Middle East and Asia-Pacific.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="border border-gray-200 dark:border-gray-700 overflow-hidden rounded-tl-lg rounded-bl-lg lg:rounded-tr-none lg:rounded-bl-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.745923497022!2d55.26464727407908!3d25.178055577723285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69cb9d8e1863%3A0x976330e60c594f94!2sInternational%20Business%20Tower!5e0!3m2!1sen!2slk!4v1782813283926!5m2!1sen!2slk"
                width="100%"
                height="340"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                loading="lazy"
                title="OrbitFX Head Office — Business Bay, Dubai"
              />
            </div>
            <div className="border border-gray-200 dark:border-gray-700 border-l-0 bg-white dark:bg-gray-800 p-9 rounded-tr-lg rounded-br-lg lg:rounded-tl-none">
              <div className="flex flex-col gap-5">
                {[
                  { label: "ADDRESS", val: "International Business Tower\nAl A'amal Street, Business Bay\nDubai, United Arab Emirates" },
                  { label: "EMAIL", val: "support@orbitfxsolution.com" },
                  { label: "WEBSITE", val: "www.OrbitFXSolution.com" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-5">
                    <span className="font-mono text-[9px] font-bold tracking-[1.5px] text-gray-400 dark:text-gray-500 min-w-[60px] pt-0.5">
                      {item.label}
                    </span>
                    <span className="text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEPARTMENTS ── */}
      <section className="py-22 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto">
          <div className="py-12">
            <DiagBadge label="Departments" />
            <h2 className="font-bold text-[clamp(24px,4vw,40px)] tracking-[-0.8px] text-gray-900 dark:text-white mt-3.5">
              Reach the Right Team
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-[15px] mt-2 max-w-[540px]">
              Each department operates on dedicated lines. Use the extension for direct routing.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((d, i) => {
              const Icon = d.icon;
              return (
                <Card
                  key={d.name}
                  className="rounded-none border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center border border-indigo-500/20 bg-indigo-500/10">
                      <Icon className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[2px] text-gray-400 dark:text-gray-500">
                      Dept {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mb-1 text-sm font-bold text-gray-900 dark:text-white">
                      {d.name}
                    </h3>
                    <div className="mb-2.5 text-[12px] text-gray-500 dark:text-gray-400">
                      {d.desc}
                    </div>
                    <span className="inline-block rounded border border-indigo-200 bg-indigo-50 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wide text-indigo-500 dark:border-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-400">
                      {d.ext}
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-22 px-[5%]">
        <div className="max-w-[1280px] mx-auto">
          <div className="py-12">
            <DiagBadge label="FAQs" />
            <h2 className="font-bold text-[clamp(24px,4vw,40px)] tracking-[-0.8px] text-gray-900 dark:text-white mt-3.5">
              Common Questions
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-[15px] mt-2 max-w-[540px]">
              Everything you need to know about reaching us and working with Orbitfx Solution.
            </p>
          </div>
          <div className="max-w-full flex flex-col gap-2">
            {faqs.map((f, i) => (
              <Card key={i} className="rounded-none border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <button
                  className={`w-full flex justify-between items-center px-5 py-[18px] border-none cursor-pointer font-[Space_Grotesk,sans-serif] text-sm font-semibold text-left bg-transparent text-gray-900 dark:text-white transition-colors rounded-none hover:bg-gray-50 dark:hover:bg-gray-700/50 ${openFaq === i ? "bg-gray-50 dark:bg-gray-700/50" : ""}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <span
                    className="text-indigo-500 dark:text-indigo-400 text-xl ml-3 flex-shrink-0 font-mono transition-transform duration-200 inline-block"
                    style={{ transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 pt-4 text-[13px] text-gray-500 dark:text-gray-400 leading-[1.8] border-t border-gray-100 dark:border-gray-700">
                    {f.a}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}