"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Users,
  BookOpen,
  Heart,
  Briefcase,
  Newspaper,
  Star,
  Handshake,
  Cpu,
  ShieldCheck,
  Palette,
  ChevronDown,
  ChevronUp,
  MapPin,
  Mail,
  Phone,
  Globe,
  TrendingUp,
  Award,
  Target,
  Lightbulb,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const values = [
  { icon: Target, title: "Precision", desc: "Every feature ships when it's right, not when it's rushed. We hold a high bar across product, support, and commercial execution." },
  { icon: Lightbulb, title: "Transparency", desc: "We tell our partners what's real — timelines, limitations, pricing. No hidden clauses, no vague SLAs. Clarity builds durable business." },
  { icon: CheckCircle, title: "Accountability", desc: "We own outcomes. When something breaks, we fix it and explain why. When we commit to a deadline, we keep it or call it early." },
  { icon: TrendingUp, title: "Ambition", desc: "We're building infrastructure for the next decade of retail brokerage — not patching yesterday's platforms. We think in decades, ship in sprints." },
];

const milestones = [
  { year: "Jan 2026", label: "Founded", desc: "Orbitfx Solution established in Dubai, United Arab Emirates, as a financial technology company focused on brokerage infrastructure." },
  { year: "Feb 2026", label: "Platform Build", desc: "Core development begins on our proprietary broker back-office infrastructure, trading terminals, and client portal." },
  { year: "Mar 2026", label: "Liquidity Partnerships", desc: "Secured liquidity relationships with tier-1 banks and ECN providers to power the OrbitFX trading engine." },
  { year: "Apr 2026", label: "Beta Launch", desc: "OrbitFX Platform enters closed beta — unified trading terminals, admin portal, and IB suite tested with select partners." },
  { year: "May 2026", label: "First Clients", desc: "Onboarded our first brokerage clients across the Middle East and Asia-Pacific region, delivering fully white-labelled deployments." },
  { year: "Jun 2026", label: "Full Release", desc: "OrbitFX Platform v1 officially released — AI-enhanced terminals, institutional desk, and regulatory reporting suite." },
];

const manifesto = [
  {
    n: "01",
    title: "Brokers deserve better infrastructure.",
    desc: "Too many brokerages launch on patched-together tools, outdated platforms, and fragile liquidity bridges. We build the infrastructure we'd want to run a brokerage on ourselves.",
  },
  {
    n: "02",
    title: "Technology should reduce operations, not add to them.",
    desc: "Every feature we ship either reduces a manual task, eliminates a compliance risk, or increases revenue for our clients. If it doesn't pass that test, it doesn't ship.",
  },
  {
    n: "03",
    title: "White-label means genuinely yours.",
    desc: "Your clients should never know OrbitFX exists. The platform carries your identity — your logo, your domain, your mobile app, your support voice. We stay invisible so you can shine.",
  },
  {
    n: "04",
    title: "Partnership is a two-way commitment.",
    desc: "When you sign with OrbitFX, you get a team invested in your growth. Your success metrics are our success metrics. We don't disappear after go-live.",
  },
];

const teamMembers = [
  { name: "Rajiv Mendis", role: "Chief Executive Officer", dept: "Leadership", initials: "RM" },
  { name: "Priya Weerasekara", role: "Chief Technology Officer", dept: "Technology", initials: "PW" },
  { name: "Damith Perera", role: "Head of Product", dept: "Product", initials: "DP" },
  { name: "Aishath Naseer", role: "VP Sales — APAC", dept: "Sales", initials: "AN" },
  { name: "Omar Al-Rashid", role: "Head of Liquidity Partnerships", dept: "Liquidity", initials: "OA" },
  { name: "Kavindi Silva", role: "Head of Compliance & Legal", dept: "Compliance", initials: "KS" },
];

const openRoles = [
  { title: "Senior Backend Engineer (Go/Rust)", dept: "Engineering", location: "Dubai / Remote", type: "Full-time" },
  { title: "Product Manager — Trading Terminals", dept: "Product", location: "Dubai / Remote", type: "Full-time" },
  { title: "FX Sales Executive — Middle East", dept: "Sales", location: "Dubai", type: "Full-time" },
  { title: "Compliance Analyst (ASIC/CySEC)", dept: "Compliance", location: "Remote", type: "Contract" },
  { title: "DevOps Engineer — Cloud Infrastructure", dept: "Engineering", location: "Dubai", type: "Full-time" },
  { title: "UX Designer — Platform UI", dept: "Design", location: "Remote", type: "Full-time" },
];

const pressItems = [
  { outlet: "FinanceFeeds", date: "Jun 2026", headline: "Orbitfx Solution launches full platform release with AI-enhanced terminals and institutional desk.", tag: "Launch" },
  { outlet: "Finance Magnates", date: "May 2026", headline: "New entrant Orbitfx Solution makes waves in APAC brokerage technology with white-label platform.", tag: "Expansion" },
  { outlet: "Gulf News", date: "Apr 2026", headline: "Dubai-based fintech startup Orbitfx Solution enters closed beta with fully integrated brokerage platform.", tag: "Product" },
  { outlet: "FXStreet", date: "Mar 2026", headline: "Orbitfx Solution secures tier-1 liquidity partnerships ahead of platform launch later this year.", tag: "Partnerships" },
];

const testimonials = [
  {
    quote: "OrbitFX gave us a fully operational brokerage in under two weeks. The back-office is exactly what our compliance team needed — intuitive, auditable, and fast.",
    author: "Operations Director",
    company: "FX Brokerage — Singapore",
    rating: 5,
  },
  {
    quote: "Switching to OrbitFX cut our manual processing time by 60%. The deposit/withdrawal automation alone paid for the platform in the first quarter.",
    author: "Head of Technology",
    company: "Prime Broker — Dubai",
    rating: 5,
  },
  {
    quote: "Our IB network grew 40% in three months after we launched the OrbitFX partner portal. Commission tracking is transparent and the payout engine is flawless.",
    author: "Partnership Manager",
    company: "Retail Broker — Abu Dhabi",
    rating: 5,
  },
];

const techStack = [
  { cat: "Infrastructure", items: ["AWS Multi-Region", "Kubernetes / EKS", "Terraform IaC", "CloudFront CDN"] },
  { cat: "Core Platform", items: ["Go (backend APIs)", "React / Next.js", "PostgreSQL + TimescaleDB", "Redis Cluster"] },
  { cat: "Market Connectivity", items: ["FIX 4.4 / 5.0", "WebSocket Feeds", "REST APIs", "QuickFIX/J Engine"] },
  { cat: "Security", items: ["256-bit TLS", "HSM Key Management", "WAF + DDoS Protection", "SOC 2 Logging"] },
  { cat: "Observability", items: ["Prometheus + Grafana", "OpenTelemetry", "PagerDuty Alerting", "ELK Stack"] },
  { cat: "Payments", items: ["Stripe", "Fasapay", "Skrill / Neteller", "Crypto PSP Bridge"] },
];

const trustItems = [
  { icon: ShieldCheck, title: "ISO 27001 Compliant", desc: "Information security management certified across all production infrastructure." },
  { icon: ShieldCheck, title: "SOC 2 Type II Logging", desc: "Full audit trail and access logging aligned with SOC 2 operational standards." },
  { icon: ShieldCheck, title: "GDPR Data Practices", desc: "Client data handling policies aligned with GDPR for EU-facing broker operations." },
  { icon: ShieldCheck, title: "99.9% Uptime SLA", desc: "Contractual uptime guarantees backed by multi-region failover and monitoring." },
  { icon: ShieldCheck, title: "Penetration Testing", desc: "Bi-annual third-party penetration testing with published remediation reports." },
  { icon: ShieldCheck, title: "Responsible Disclosure", desc: "Public vulnerability disclosure programme with a dedicated security contact." },
];

const brandColors = [
  { name: "Brand Blue", hex: "#5b8cff", text: "white" },
  { name: "Indigo", hex: "#6366f1", text: "white" },
  { name: "Midnight", hex: "#060c1e", text: "white" },
  { name: "Slate", hex: "#334155", text: "white" },
  { name: "Light Gray", hex: "#f4f7ff", text: "dark" },
  { name: "White", hex: "#ffffff", text: "dark" },
];

const partners = [
  { name: "Integral FX", cat: "Liquidity" },
  { name: "Currenex", cat: "Liquidity" },
  { name: "Refinitiv FXall", cat: "Market Data" },
  { name: "TradingView", cat: "Charting" },
  { name: "Acuity Trading", cat: "News & Signals" },
  { name: "AutoChartist", cat: "Analytics" },
  { name: "Stripe", cat: "Payments" },
  { name: "AWS", cat: "Infrastructure" },
  { name: "Twilio", cat: "Messaging" },
  { name: "Sumsub", cat: "KYC / AML" },
  { name: "ComplyAdvantage", cat: "Compliance" },
  { name: "Trading Central", cat: "Research" },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function DiagBadge({ label, color = "default" }: { label: string; color?: "default" | "indigo" | "blue" | "green" }) {
  const c = {
    default: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700",
    indigo: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
    blue: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    green: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
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

function SectionHead({ badge, badgeColor = "indigo", title, sub, center = false }: {
  badge: string; badgeColor?: "default" | "indigo" | "blue" | "green";
  title: React.ReactNode; sub?: string; center?: boolean;
}) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <DiagBadge label={badge} color={badgeColor} />
      <h2 className="mt-4 font-bold text-[clamp(22px,3.5vw,38px)] tracking-[-0.8px] text-gray-900 dark:text-white leading-tight">
        {title}
      </h2>
      {sub && (
        <p className={`mt-3 text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed ${center ? "max-w-[600px] mx-auto" : "max-w-[560px]"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

function StarRating({ n }: { n: number }) {
  return <div className="flex gap-0.5">{Array.from({ length: n }).map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}</div>;
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function CompanyPage() {

  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/60 to-indigo-50/40 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-950 pt-20 pb-24 px-[5%]">
  <div
    className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15"
    style={{
      backgroundImage:
        "linear-gradient(rgba(91,140,255,0.09) 1px,transparent 1px),linear-gradient(90deg,rgba(91,140,255,0.09) 1px,transparent 1px)",
      backgroundSize: "56px 56px",
    }}
  />

  <div className="relative z-10 max-w-[900px] mx-auto text-center">
    <div className="flex justify-center">
      <DiagBadge label="Company" color="indigo" />
    </div>

    <h1 className="mt-5 font-bold text-[clamp(34px,5vw,58px)] leading-[1.07] tracking-[-2px] text-gray-900 dark:text-white mb-6">
      The Team Behind
      <br />
      <span className="text-indigo-500">OrbitFX Platform.</span>
    </h1>

    <p className="mx-auto text-gray-500 dark:text-gray-400 text-[16px] leading-[1.8] max-w-[650px] mb-10">
      OrbitFX is built and operated by
      <span className="font-semibold text-gray-700 dark:text-gray-300">
        {" "}Orbitfx Solution
      </span>
      — a Dubai-based financial technology company founded in 2026,
      building institutional-grade trading infrastructure for brokers
      across the Middle East, Asia-Pacific and beyond.
    </p>

    {/* Company Cards */}
    <div className="grid md:grid-cols-2 gap-4 max-w-[760px] mx-auto mb-10">
      {[
        {
          label: "COMPANY",
          value: "Orbitfx Solution",
          note: "Est. 2026 · Dubai, United Arab Emirates",
        },
        {
          label: "FLAGSHIP PRODUCT",
          value: "OrbitFX Platform",
          note: "Trading technology division",
        },
      ].map((r) => (
        <div
          key={r.label}
          className="p-5 border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm text-left"
        >
          <div className="font-mono text-[9px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">
            {r.label}
          </div>

          <div className="text-[15px] font-bold text-gray-900 dark:text-white">
            {r.value}
          </div>

          <div className="text-[12px] text-gray-400 mt-1">
            {r.note}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ── ABOUT US ──────────────────────────────── */}
      <section id="about" className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionHead
              badge="About Us"
              title="Who We Are and What We Stand For"
              sub="Orbitfx Solution is the technology company behind OrbitFX — a full-stack brokerage platform serving retail brokers, institutions, and white-label operators across the Middle East and Asia-Pacific."
            />
            <div className="flex flex-col gap-4 text-[14px] text-gray-600 dark:text-gray-400 leading-[1.85]">
              <p>
                Founded in 2026, Orbitfx Solution was built to solve a clear problem: the brokerage technology market was fragmented, outdated, and inaccessible to operators who needed a modern, reliable foundation to launch and scale.
              </p>
              <p>
                Today, OrbitFX is a unified platform covering client portals, manager back-office, risk management, KYC/AML, liquidity access, and mobile apps. Everything is white-labelled, cloud-hosted, and built to scale from day one.
              </p>
              <p>
                We operate from the International Business Tower in Business Bay, Dubai, with a team of engineers, compliance specialists, and market professionals dedicated to one thing: making brokerages work better.
              </p>
            </div>
          </div>
          {/* Stats */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { n: "2026", l: "Year Founded" },
                { n: "50+", l: "Active Broker Clients" },
                { n: "10K+", l: "End Traders Served" },
                { n: "30+", l: "Team Members" },
                { n: "50+", l: "Asset Classes" },
                { n: "99.9%", l: "Platform Uptime SLA" },
              ].map((s) => (
                <div key={s.l} className="p-5 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                  <div className="font-mono font-bold text-[28px] text-gray-900 dark:text-white leading-none tracking-tight">{s.n}</div>
                  <div className="text-[11px] text-gray-400 mt-1.5 tracking-wide">{s.l}</div>
                </div>
              ))}
            </div>
            {/* Office */}
            <div className="flex flex-col gap-3">
              {[
                { flag: "🇦🇪", city: "Dubai", country: "United Arab Emirates", detail: "International Business Tower, Al A'amal Street, Business Bay" },
              ].map((o) => (
                <div key={o.city} className="flex gap-3 items-start p-4 border border-gray-200 dark:border-gray-800">
                  <span className="text-2xl leading-none mt-0.5">{o.flag}</span>
                  <div>
                    <div className="text-[13px] font-bold text-gray-900 dark:text-white">{o.city}, {o.country}</div>
                    <div className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">{o.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR STORY ─────────────────────────────── */}
      <section id="story" className="py-20 px-[5%] bg-slate-50/70 dark:bg-gray-900/50">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead badge="Our Story" title="How OrbitFX Came to Be" sub="From an idea to a fully operational brokerage platform — built and launched in 2026." center />
          <div className="relative max-w-[860px] mx-auto">
            {/* Timeline spine */}
            <div className="absolute left-[78px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-200 dark:via-indigo-900 to-transparent hidden sm:block" />
            <div className="flex flex-col gap-0">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-6 sm:gap-8 items-start group">
                  {/* Year */}
                  <div className="flex-shrink-0 w-[78px] text-right sm:pr-6 pt-5">
                    <span className="font-mono text-[12px] font-bold text-indigo-500 dark:text-indigo-400 tracking-wide">{m.year}</span>
                  </div>
                  {/* Dot */}
                  <div className="relative flex-shrink-0 hidden sm:flex items-start pt-[22px]">
                    <div className="w-3 h-3 rounded-full border-2 border-indigo-500 bg-white dark:bg-gray-900 group-hover:bg-indigo-500 transition-colors z-10" />
                  </div>
                  {/* Content */}
                  <div className={`flex-1 py-5 ${i < milestones.length - 1 ? "border-b border-gray-200/70 dark:border-gray-800" : ""}`}>
                    <div className="text-[13px] font-bold text-gray-900 dark:text-white mb-1">{m.label}</div>
                    <div className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ─────────────────────────────── */}
      <section id="manifesto" className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHead
                badge="Our Manifesto"
                title="Our Principles and Values"
                sub="Four beliefs that shape every product decision, every partnership, and every hire we make."
              />
              <div className="grid grid-cols-1 gap-4 mb-8">
                {values.map((v) => {
                  const Icon = v.icon;
                  return (
                    <div key={v.title} className="flex gap-4 p-5 border border-gray-100 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors bg-gray-50/50 dark:bg-gray-900/40">
                      <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40">
                        <Icon className="h-5 w-5 text-indigo-500" />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-gray-900 dark:text-white mb-1">{v.title}</div>
                        <div className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {manifesto.map((m) => (
                <div key={m.n} className="border-l-2 border-indigo-500 pl-6 py-2">
                  <div className="font-mono text-[10px] font-bold tracking-[2px] text-indigo-400 mb-2">{m.n}</div>
                  <div className="text-[16px] font-bold text-gray-900 dark:text-white mb-2 leading-snug">{m.title}</div>
                  <div className="text-[13px] text-gray-500 dark:text-gray-400 leading-[1.8]">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP TEAM ───────────────────────── */}
      <section className="py-20 px-[5%] bg-slate-50/70 dark:bg-gray-900/50">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead badge="Leadership" title="The People Running OrbitFX" sub="Our leadership team spans trading technology, financial markets, compliance, and enterprise sales." center />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {teamMembers.map((p) => (
              <div key={p.name} className="flex flex-col items-center text-center p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-[15px] mb-3">
                  {p.initials}
                </div>
                <div className="text-[13px] font-bold text-gray-900 dark:text-white leading-snug mb-1">{p.name}</div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug mb-2">{p.role}</div>
                <span className="text-[9px] font-bold uppercase tracking-[1.5px] text-indigo-500 px-2 py-0.5 border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40">
                  {p.dept}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAREERS ───────────────────────────────── */}
      <section id="careers" className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1">
              <SectionHead
                badge="Careers"
                title="Join Our Growing Team"
                sub="We're hiring engineers, compliance specialists, and market professionals who want to build the infrastructure layer of retail brokerage."
              />
              <div className="flex flex-col gap-4 mb-6">
                {[
                  { icon: Globe, label: "Remote-first culture with our headquarters in Business Bay, Dubai" },
                  { icon: Award, label: "Competitive packages + performance equity for senior roles" },
                  { icon: Users, label: "Cross-functional teams shipping real financial infrastructure" },
                ].map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.label} className="flex gap-3 items-start">
                      <Icon className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">{b.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-3">
              {openRoles.map((r) => (
                <div
                  key={r.title}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border border-gray-200 dark:border-gray-800 hover:border-indigo-400 dark:hover:border-indigo-700 hover:bg-gray-50 dark:hover:bg-gray-900/70 transition-all cursor-pointer group"
                >
                  <div>
                    <div className="text-[14px] font-bold text-gray-900 dark:text-white mb-1">{r.title}</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[11px] text-gray-400 font-mono">{r.dept}</span>
                      <span className="text-gray-300 dark:text-gray-700">·</span>
                      <span className="text-[11px] text-gray-400 flex items-center gap-1"><MapPin className="h-3 w-3" />{r.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 border ${r.type === "Full-time" ? "border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400" : "border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400"}`}>
                      {r.type}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRESS & MEDIA ─────────────────────────── */}
      <section id="press" className="py-20 px-[5%] bg-slate-50/70 dark:bg-gray-900/50">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead badge="Press & Media" title="News and Media Coverage" sub="Recent coverage of OrbitFX and Orbitfx Solution in financial media." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {pressItems.map((p, i) => (
              <Card key={i} className="rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[11px] font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-2 py-0.5">{p.outlet}</span>
                      <span className="text-[11px] text-gray-400 font-mono">{p.date}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 border border-indigo-200 dark:border-indigo-900 flex-shrink-0">
                      {p.tag}
                    </span>
                  </div>
                  <p className="text-[14px] text-gray-700 dark:text-gray-300 leading-[1.7] mb-3">{p.headline}</p>
                  <div className="flex items-center gap-1 text-indigo-500 text-[11px] font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                    Read article <ExternalLink className="h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            <div>
              <div className="text-[11px] font-mono text-gray-400 mb-1 uppercase tracking-wide">Press enquiries</div>
              <a href="mailto:press@OrbitFXSolution.com" className="text-[14px] font-semibold text-indigo-500 hover:text-indigo-600 flex items-center gap-1.5">
                <Mail className="h-4 w-4" />press@OrbitFXSolution.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────── */}
      <section id="testimonials" className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead badge="Testimonials" title="What Our Clients Say" sub="Real feedback from operators using OrbitFX to power their brokerages every day." center />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <Card key={i} className="rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <CardContent className="p-7">
                  <StarRating n={t.rating} />
                  <p className="mt-4 text-[13px] text-gray-600 dark:text-gray-300 leading-[1.85] italic mb-5">
                    "{t.quote}"
                  </p>
                  <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                    <div className="text-[12px] font-bold text-gray-900 dark:text-white">{t.author}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{t.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ────────────────────────────── */}
      <section id="tech" className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Tech Stack"
            title="Enterprise Infrastructure"
            sub="OrbitFX is built on a cloud-native, distributed stack engineered for sub-millisecond execution and multi-region fault tolerance."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((t) => (
              <Card key={t.cat} className="rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-indigo-500">{t.cat}</span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {t.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[13px] text-gray-700 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST CENTER ──────────────────────────── */}
      <section id="trust" className="py-20 px-[5%] bg-slate-50/70 dark:bg-gray-900/50">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Trust Center"
            title="Security and Compliance"
            sub="OrbitFX operates on ISO 27001-compliant infrastructure with full audit trails, penetration testing, and contractual uptime guarantees."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {trustItems.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.title} className="flex gap-4 p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                  <Icon className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[13px] font-bold text-gray-900 dark:text-white mb-1">{t.title}</div>
                    <div className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">{t.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Responsible disclosure CTA */}
          <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-[14px] font-bold text-gray-900 dark:text-white mb-1">Security Vulnerability Disclosure</div>
              <div className="text-[13px] text-gray-500 dark:text-gray-400">Found a security issue? Report it responsibly and we'll respond within 48 hours.</div>
            </div>
            <a
              href="mailto:security@OrbitFXSolution.com"
              className="flex-shrink-0 inline-flex items-center gap-2 rounded-none border border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 font-bold uppercase tracking-widest text-xs px-5 py-2.5 transition-colors no-underline"
            >
              <Mail className="h-4 w-4" /> security@OrbitFXSolution.com
            </a>
          </div>
        </div>
      </section>

      {/* ── BRAND ASSETS ──────────────────────────── */}
      <section id="brand" className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Brand Assets"
            title="Logos, Colors and Guidelines"
            sub="Official OrbitFX and Orbitfx Solution brand assets. Use these assets only in accordance with our brand guidelines."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Logo tiles */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-gray-400 mb-4 font-mono">Logo Variants</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "OrbitFX — Light", bg: "bg-white border border-gray-200", text: "text-gray-900" },
                  { name: "OrbitFX — Dark", bg: "bg-gray-900 border border-gray-800", text: "text-white" },
                  { name: "Orbitfx Solution — Light", bg: "bg-white border border-gray-200", text: "text-gray-900" },
                  { name: "Orbitfx Solution — Dark", bg: "bg-gray-900 border border-gray-800", text: "text-white" },
                ].map((l) => (
                  <div key={l.name} className={`${l.bg} p-6 flex flex-col items-center justify-center gap-3 min-h-[100px]`}>
                    <div className={`font-bold text-[18px] tracking-tight ${l.text}`}>
                      {l.name.startsWith("Orbitfx Solution") ? (
                        <span>OrbitFX <span className="text-indigo-500">Solution</span></span>
                      ) : (
                        <span>Orbit<span className="text-indigo-500">Fx</span></span>
                      )}
                    </div>
                    <div className={`text-[9px] font-mono tracking-[2px] uppercase opacity-40 ${l.text}`}>{l.name}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Color palette */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-gray-400 mb-4 font-mono">Brand Color Palette</div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {brandColors.map((c) => (
                  <div key={c.name} className="overflow-hidden border border-gray-200 dark:border-gray-800">
                    <div className="h-14" style={{ background: c.hex }} />
                    <div className="p-2.5 bg-white dark:bg-gray-900">
                      <div className="text-[12px] font-bold text-gray-900 dark:text-white">{c.name}</div>
                      <div className="text-[11px] font-mono text-gray-400">{c.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-none bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 font-bold uppercase tracking-widest text-xs px-6 py-2.5">
                  Download Brand Kit →
                </Button>
                <Button variant="outline" className="rounded-none border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold tracking-wide text-sm px-5 py-2.5">
                  Brand Guidelines
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}