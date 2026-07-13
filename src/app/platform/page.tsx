"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Monitor,
  Smartphone,
  Globe,
  BarChart3,
  Shield,
  Zap,
  Users,
  Settings,
  ArrowRight,
  TrendingUp,
  DollarSign,
  FileText,
  Bell,
  Lock,
  RefreshCw,
  Layers,
  Cpu,
  Network,
  Database,
  PieChart,
  CreditCard,
  UserCheck,
  Briefcase,
  Building2,
  HeadphonesIcon,
  Plug,
  AlertTriangle,
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  BookOpen,
  Target,
  Code2,
  Activity,
  Moon,
  Sun,
  History,
  Banknote,
  ShieldCheck,
  ClipboardList,
  Copy,
  Newspaper,
  CalendarClock,
  KeyRound,
  ToggleLeft,
  Wifi,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA (aligned with OrbitFX Solution PDF)
───────────────────────────────────────────── */

const platformModules = [
  {
    icon: Monitor,
    title: "Client Panel",
    desc: "A professional trading environment for traders — live TradingView charts, copy trading, analytics, and account tools accessible from desktop and mobile.",
    tags: ["Web", "PWA", "9 Features"],
  },
  {
    icon: Users,
    title: "Manager / IB Panel",
    desc: "Desk managers and IBs get a dedicated panel to monitor and operate their assigned client accounts, all within admin-defined permission limits.",
    tags: ["IB", "6 Tools", "Permission-Gated"],
  },
  {
    icon: Settings,
    title: "Admin Back Office",
    desc: "Full brokerage control — manager configuration, 18+ granular permission keys, feature flags, and platform-wide oversight.",
    tags: ["Admin", "18+ Keys", "Role-Based"],
  },
  {
    icon: BarChart3,
    title: "Risk Management & Spread Control",
    desc: "Per-group spread markup, swap configuration, account leverage limits, and a live risk dashboard tracking total open exposure.",
    tags: ["Real-Time", "Spread", "Exposure"],
  },
  {
    icon: ArrowLeftRight,
    title: "Deposits & Withdrawals",
    desc: "Clients submit fund requests directly from the platform with live status tracking — Pending → Approved → Processed — and full transaction history.",
    tags: ["Live Status", "Transparent", "Audit"],
  },
  {
    icon: Copy,
    title: "Copy Trading & Signals",
    desc: "Clients subscribe to expert signal providers with adjustable copy lot ratios; managers create and oversee provider performance.",
    tags: ["Auto-Copy", "Signals", "Real-Time"],
  },
  {
    icon: ToggleLeft,
    title: "Feature Flags & Access Control",
    desc: "Enable or disable the 5 premium trading tools per manager — clients only see what their manager is permitted to show them.",
    tags: ["5 Flags", "Granular", "Two-Gate"],
  },
  {
    icon: FileText,
    title: "Reports & PDF Statements",
    desc: "Generate professional PDF account statements and trade history reports for any client, with date-range filtering and full audit access.",
    tags: ["PDF Export", "Audit Log", "Compliance"],
  },
];

const tradingTools = [
  { icon: TrendingUp, label: "TradingView Advanced Charts", desc: "Dual charting engine — TradingView Advanced Charts plus Lightweight Charts, with colored position lines and auto SL/TP display." },
  { icon: Wifi, label: "Real-Time WebSockets", desc: "Live price ticks, P&L, balance, and position sync pushed instantly to every connected client and manager." },
  { icon: Copy, label: "Copy Trading Engine", desc: "Signal providers, adjustable copy lot ratios, one-tap start/stop, and full provider performance tracking." },
  { icon: PieChart, label: "Advanced Analytics", desc: "P&L breakdown by symbol, date and period, win/loss rate, equity curve, drawdown history, and downloadable reports." },
  { icon: Newspaper, label: "Market News Feed", desc: "Real-time financial news streamed inside the trading panel — no browser tabs, no distractions." },
  { icon: CalendarClock, label: "Economic Calendar", desc: "Full events calendar with high/medium/low impact colour coding, countdowns, and actual vs forecast values." },
];

const integrations = [
  { icon: TrendingUp, label: "Charting", items: ["TradingView Advanced Charts", "Lightweight Charts", "Dual-engine rendering"] },
  { icon: Smartphone, label: "Mobile", items: ["Installable PWA", "iOS Safari & Android Chrome", "No app store required"] },
  { icon: Lock, label: "Security", items: ["2FA / TOTP", "Google OAuth login", "IP-aware session management"] },
  { icon: KeyRound, label: "Permissions", items: ["18+ Manager Permission Keys", "Two-Gate Feature Flags", "Role-Based Access"] },
  { icon: FileText, label: "Reports", items: ["PDF Account Statements", "Trade History Export", "Full Audit Log"] },
  { icon: Database, label: "Deployment", items: ["Docker — single command deploy", "Production-ready", "Multi-Account architecture"] },
];

const outsourcedServices = [
  { icon: HeadphonesIcon, title: "Managed Support Desk", desc: "24/7 white-labelled client support team operating under your brand — calls, chat, and email covered." },
  { icon: UserCheck, title: "Outsourced KYC Ops", desc: "Dedicated compliance officers reviewing documents, running AML checks, and approving accounts on your behalf." },
  { icon: Briefcase, title: "IB Relationship Management", desc: "Our partner team manages your IB relationships, resolves disputes, and onboards new introducing brokers." },
  { icon: BookOpen, title: "Content & Education", desc: "Trading education content, market commentary, and webinar production for your client base." },
  { icon: Target, title: "Marketing Campaigns", desc: "Performance marketing, SEO, paid media, and retention campaign management by fintech specialists." },
  { icon: Building2, title: "Regulatory Consulting", desc: "Guidance on licensing, jurisdiction selection, entity structuring, and ongoing compliance advisory." },
];

/* Three roles, matching the PDF's Role Comparison table */
const portals = [
  {
    id: "client",
    icon: Monitor,
    label: "Client / Trader",
    color: "indigo",
    features: [
      "Live & demo account trading",
      "TradingView Advanced Charts",
      "Copy signals & auto-copy trades",
      "Advanced analytics & P&L reports",
      "Live market news in-platform",
      "Economic calendar with countdowns",
      "Deposit & withdrawal requests",
      "Mobile PWA app (iOS & Android)",
      "Multi-account dashboard",
      "Real-time notifications & alerts",
    ],
  },
  {
    id: "manager",
    icon: Users,
    label: "Manager / IB",
    color: "blue",
    features: [
      "Manage all assigned client accounts",
      "Process deposits & withdrawals",
      "Credit bonus & transfer funds",
      "Place manual trades for clients",
      "Close & edit client trades",
      "Manage copy trading & signals",
      "Export PDF account statements",
      "Send client notifications",
      "View full audit log",
      "All within admin-set permissions",
    ],
  },
  {
    id: "admin",
    icon: LayoutDashboard,
    label: "Admin / Broker",
    color: "slate",
    features: [
      "Full client & account management",
      "Create & configure all managers",
      "Assign 18+ permissions per manager",
      "Enable/disable 5 feature flags per manager",
      "Spread markup & swap configuration",
      "Risk dashboard — live exposure view",
      "Full audit log & PDF reports",
      "Trade operations oversight",
      "Platform announcements & comms",
      "Complete brokerage back office",
    ],
  },
];

const audiences = [
  {
    icon: Globe,
    title: "Retail Brokers",
    desc: "Launch a fully branded broker with a client panel, manager tools, and admin back office — production-ready with a single Docker deploy.",
    color: "indigo",
  },
  {
    icon: Building2,
    title: "Institutions & White-Label Partners",
    desc: "Use our infrastructure as a white-label core — plug in your brand, permissions structure, and compliance framework seamlessly.",
    color: "blue",
  },
  {
    icon: Copy,
    title: "Signal Providers & Copy Trading Desks",
    desc: "Run signal-provider programmes natively — adjustable copy ratios, subscriber tracking, and performance history built in.",
    color: "purple",
  },
  {
    icon: Briefcase,
    title: "IB & Manager Networks",
    desc: "Give every manager exactly the access they need with 18+ granular permission keys and per-manager feature flags — nothing more, nothing less.",
    color: "slate",
  },
];

const testimonials = [
  {
    quote: "OrbitFX gave us a fully operational brokerage in under two weeks. The back-office deposit, withdrawal, and permission controls are exactly what our team needed.",
    author: "Operations Director",
    company: "FX Brokerage, Singapore",
    rating: 5,
  },
  {
    quote: "The risk dashboard and per-manager feature flags saved us countless hours. Clients installing the PWA straight from the browser removed all our app-store friction.",
    author: "Head of Technology",
    company: "Prime Broker, Dubai",
    rating: 5,
  },
  {
    quote: "Our IB network grew 40% in three months after switching to OrbitFX. The 18+ permission keys mean every manager only sees what they should.",
    author: "Partnership Manager",
    company: "Retail Broker, Colombo",
    rating: 5,
  },
];

const faqs = [
  {
    q: "What is the OrbitFX Solution and who is it for?",
    a: "OrbitFX Solution is a full-stack professional trading platform built for traders who demand precision, managers who need control, and brokers who run serious operations. It covers three roles — Client/Trader, Manager/IB, and Admin/Broker — with live trading, copy trading, analytics, and a complete back office.",
  },
  {
    q: "Do clients need to install an app from the App Store?",
    a: "No. OrbitFX ships as a full Progressive Web App, installable directly from iOS Safari or Android Chrome — no app store required. It includes safe-area support for notched devices and bottom tab navigation optimised for mobile trading.",
  },
  {
    q: "How does copy trading work on the platform?",
    a: "Clients browse and subscribe to active signal providers, with trades auto-copied to their account in real-time. Copy lot ratios are adjustable per provider, and managers can create, monitor, and pause copy relationships at any time.",
  },
  {
    q: "How granular are manager permissions?",
    a: "Very. Admins assign 18+ individual permission keys per manager, covering client operations, finance, trades, tools, and feature access, plus 5 separate feature flags (Copy Trading, Advanced Analytics, Market News, Economic Calendar, Referral Program) that control what clients see.",
  },
  {
    q: "How are deposits, withdrawals, and fund management handled?",
    a: "Clients submit deposit and withdrawal requests directly from the platform and track live status — Pending, Approved, Processed — through to completion. Managers review and approve requests, credit bonuses, and transfer funds, with every action auto-logged in the audit trail.",
  },
  {
    q: "What charting and data technology powers the platform?",
    a: "OrbitFX runs a dual charting engine — TradingView Advanced Charts alongside Lightweight Charts — with WebSockets delivering real-time price ticks, P&L, and position sync across every connected client and manager.",
  },
  {
    q: "Is OrbitFX Solution ready for production deployment?",
    a: "Yes. The platform is production-ready and deploys via Docker with a single command, and secures access with 2FA/TOTP and Google OAuth login across all roles.",
  },
];

const deviceShowcaseItems = [
  { label: "Desktop Trading Terminal", icon: Monitor, desc: "TradingView Advanced Charts, live P&L, and full account overview" },
  { label: "Web Client Panel", icon: Globe, desc: "Browser-based access to funds, copy trading, and notifications" },
  { label: "Installable PWA", icon: Smartphone, desc: "Native-like mobile app installed straight from the browser — no app store" },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function DiagBadge({ label, color = "default" }: { label: string; color?: "default" | "indigo" | "blue" }) {
  const c = {
    default: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
    indigo: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
    blue: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
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

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-amber-400 text-sm">★</span>
      ))}
    </div>
  );
}

function SectionHead({
  badge, badgeColor = "indigo", title, sub, center = false,
}: {
  badge: string; badgeColor?: "default" | "indigo" | "blue"; title: React.ReactNode; sub?: string; center?: boolean;
}) {
  return (
    <div className={`mb-12 reveal ${center ? "text-center" : ""}`} data-dir="up">
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

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */

export default function PlatformPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activePortal, setActivePortal] = useState(0);
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef as React.RefObject<HTMLDivElement>} className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen mt-5">

      {/* ── HERO ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/70 to-indigo-50/50 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-950 pt-12 sm:pt-16 pb-0 px-[5%]">
        <div
          className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15"
          style={{
            backgroundImage: "linear-gradient(rgba(99,102,241,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.1) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center lg:items-end">
          {/* Left */}
          <div className="pb-10 lg:pb-16 reveal" data-dir="left">
            <DiagBadge label="OrbitFX Solution" color="indigo" />
            <h1 className="mt-5 font-bold text-[clamp(30px,4.8vw,56px)] leading-[1.1] tracking-[-1.5px] sm:tracking-[-2px] text-gray-900 dark:text-white">
              The Complete<br />
              <span className="text-indigo-500">Platform</span> for Modern<br />
              Forex Brokerages.
            </h1>
            <p className="mt-5 text-gray-500 dark:text-gray-400 text-[15px] sm:text-[16px] leading-[1.8] max-w-[430px]">
              A full-stack professional trading platform — built for traders who demand precision, managers who need control, and brokers who run serious operations. Everything in one place, live and production-ready.
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <Button className="rounded-none bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest text-xs px-6 sm:px-7 py-3 shadow-lg shadow-blue-600/25 w-full sm:w-auto">
                Request a Demo →
              </Button>
              <Button variant="outline" className="rounded-none border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold tracking-wide text-sm px-6 py-3 w-full sm:w-auto">
                See All Features
              </Button>
            </div>
            {/* Trust pills */}
            <div className="mt-8 flex gap-2 flex-wrap">
              {["TradingView Advanced Charts", "iOS & Android PWA", "Copy Trading", "18+ Manager Permissions", "Multi-Account"].map((b) => (
                <span key={b} className="text-[11px] font-semibold px-3 py-1 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-900/60 tracking-wide">
                  {b}
                </span>
              ))}
            </div>
            {/* Stat strip, matches PDF header stats */}
            <div className="mt-10 grid grid-cols-3 sm:grid-cols-6 gap-x-4 gap-y-5 max-w-full sm:max-w-[520px]">
              {[
                { v: "3", l: "User Roles" },
                { v: "18+", l: "Permission Keys" },
                { v: "9", l: "Client Features" },
                { v: "6", l: "Manager Tools" },
                { v: "5", l: "Feature Flags" },
                { v: "PWA", l: "Mobile Ready" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-indigo-500 font-bold text-base sm:text-lg font-mono">{s.v}</div>
                  <div className="text-[9px] uppercase tracking-wide text-gray-400 leading-snug">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Mock terminal screenshot placeholder */}
          <div className="relative flex justify-center lg:justify-end items-end reveal" data-dir="right" data-delay="120">
            <div className="w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[520px] lg:mb-0 rounded-t-lg overflow-hidden border-t border-l border-r border-gray-200 dark:border-gray-700 shadow-2xl shadow-indigo-900/20">
              {/* Fake browser chrome */}
              <div className="bg-gray-100 dark:bg-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
                <div className="ml-3 flex-1 bg-white dark:bg-gray-700 rounded px-3 py-1 text-[10px] sm:text-[11px] text-gray-400 font-mono truncate">
                  portal.OrbitFX.io
                </div>
              </div>
              {/* Platform UI mockup */}
              <div className="bg-gray-900 dark:bg-gray-950 p-3 sm:p-4 min-h-[240px] sm:min-h-[300px]">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 bg-indigo-500 rounded-sm flex-shrink-0" />
                    <span className="text-white text-[11px] sm:text-[12px] font-bold font-mono truncate">OrbitFX Terminal</span>
                  </div>
                  <div className="hidden xs:flex sm:flex gap-1.5 sm:gap-2 flex-shrink-0">
                    {["EUR/USD", "GBP/USD", "BTC/USD"].map(p => (
                      <span key={p} className="text-[8px] sm:text-[9px] bg-gray-800 dark:bg-gray-900 text-gray-400 px-1.5 sm:px-2 py-1 rounded font-mono whitespace-nowrap">{p}</span>
                    ))}
                  </div>
                </div>
                {/* Chart area */}
                <div className="bg-gray-800 dark:bg-black rounded mb-3 p-3 relative overflow-hidden h-[110px] sm:h-[140px]">
                  <div className="absolute bottom-0 left-0 right-0 h-full flex items-end gap-0.5 px-2 pb-2">
                    {[40,55,45,65,50,70,60,80,65,75,55,85,70,90,75,80,95,70,85,100,80,95,75,88,92,78,96,82,100,88].map((h, i) => (
                      <div key={i} className="flex-1 bg-indigo-500/40 rounded-t-sm" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="relative z-10">
                    <span className="text-white text-xs font-mono font-bold">EUR/USD</span>
                    <span className="ml-2 text-green-400 text-xs font-mono">1.0842 ▲</span>
                  </div>
                </div>
                {/* Order row */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  <div className="bg-blue-600 rounded px-2 sm:px-3 py-1.5 sm:py-2 text-center">
                    <div className="text-[8px] sm:text-[9px] text-blue-200 font-mono">BUY</div>
                    <div className="text-white text-[11px] sm:text-xs font-bold font-mono">1.0845</div>
                  </div>
                  <div className="bg-gray-800 dark:bg-gray-900 rounded px-2 sm:px-3 py-1.5 sm:py-2 text-center">
                    <div className="text-[8px] sm:text-[9px] text-gray-500 font-mono">SPREAD</div>
                    <div className="text-gray-300 text-[11px] sm:text-xs font-bold font-mono">0.3</div>
                  </div>
                  <div className="bg-red-600 rounded px-2 sm:px-3 py-1.5 sm:py-2 text-center">
                    <div className="text-[8px] sm:text-[9px] text-red-200 font-mono">SELL</div>
                    <div className="text-white text-[11px] sm:text-xs font-bold font-mono">1.0842</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MODULES & FEATURES ────────────────── */}
      <section className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Modules & Features"
            title="Everything Your Brokerage Needs in One Place"
            sub="Client panel, manager/IB tools, and admin back office — every module is permission-gated, real-time, and production-ready."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformModules.map((m, idx) => {
              const Icon = m.icon;
              return (
                <Card
                  key={m.title}
                  className="group rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-400 dark:hover:border-indigo-700 hover:shadow-lg transition-all duration-200 reveal"
                  data-dir="up"
                  data-delay={(idx % 4) * 80}
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center border border-indigo-500/20 bg-indigo-50 dark:bg-indigo-950/40 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                      <Icon className="h-5 w-5 text-indigo-500" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{m.title}</h3>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed mb-3">{m.desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {m.tags.map(t => (
                        <span key={t} className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
                          {t}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ROLE DEEP-DIVE ────────────────────── */}
      <section className="py-20 px-[5%] bg-slate-50/80 dark:bg-gray-900/60">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Role Comparison"
            title={<>Three Roles, One<br />Unified Platform</>}
            sub="Client/Trader, Manager/IB, and Admin/Broker — each with the right level of access for their responsibilities, sharing the same real-time data layer."
          />
          {/* Tab nav */}
          <div className="flex flex-wrap gap-2 mb-8 reveal" data-dir="up">
            {portals.map((p, i) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePortal(i)}
                  className={`flex items-center gap-2.5 px-5 py-3 border text-sm font-semibold transition-all duration-200 rounded-none ${
                    activePortal === i
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                      : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {p.label}
                </button>
              );
            })}
          </div>
          {/* Panel */}
          {portals.map((p, i) => {
            if (i !== activePortal) return null;
            return (
              <div key={p.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="reveal" data-dir="left">
                  <p className="text-gray-500 dark:text-gray-400 text-[14px] leading-relaxed mb-6">
                    {p.id === "client" && "The Client Panel is a professional trading environment built for both new and experienced traders — accessible from desktop and mobile, with TradingView Advanced Charts, copy trading, analytics, and a full deposit/withdrawal flow."}
                    {p.id === "manager" && "Desk managers and IBs get a dedicated panel to monitor, manage, and operate their assigned client accounts — processing deposits, placing trades, and managing copy trading — all within admin-defined permission limits."}
                    {p.id === "admin" && "The Admin Back Office gives the broker complete control — from configuring managers and assigning 18+ granular permission keys, to risk management, feature flags, and full platform oversight."}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex-shrink-0 flex items-center justify-center h-4 w-4 rounded-full bg-indigo-100 dark:bg-indigo-900/40">
                          <Check className="h-2.5 w-2.5 text-indigo-500" strokeWidth={3} />
                        </span>
                        <span className="text-[13px] text-gray-600 dark:text-gray-300 leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-8 rounded-none bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 font-bold uppercase tracking-widest text-xs px-7 py-3">
                    Request Demo →
                  </Button>
                </div>
                {/* Mock UI */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-none shadow-lg reveal" data-dir="right" data-delay="100">
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-indigo-500 rounded-sm flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">CX</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {p.id === "client" ? "Client Dashboard" : p.id === "manager" ? "Manager Console" : "Admin Console"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5 items-center">
                        <span className="w-2 h-2 rounded-full bg-green-400" />
                        <span className="text-[11px] text-green-500 font-semibold">Live</span>
                      </div>
                      <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 rounded-full px-1.5 py-1">
                        <Sun className="h-3 w-3 text-amber-400" />
                        <Moon className="h-3 w-3 text-indigo-400" />
                      </div>
                    </div>
                  </div>
                  {/* Stat rows */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {(p.id === "client"
                      ? [{ l: "Balance", v: "$24,810.00" }, { l: "Equity", v: "$25,442.50" }, { l: "P&L", v: "+$632.50" }]
                      : p.id === "manager"
                      ? [{ l: "Assigned Clients", v: "42" }, { l: "Pending Requests", v: "6" }, { l: "Copy Subscribers", v: "18" }]
                      : [{ l: "Managers", v: "9" }, { l: "Permission Keys", v: "18+" }, { l: "Open Exposure", v: "$1.2M" }]
                    ).map((s) => (
                      <div key={s.l} className="bg-gray-50 dark:bg-gray-800 p-3 border border-gray-100 dark:border-gray-700">
                        <div className="text-[10px] text-gray-400 font-mono tracking-wide mb-1">{s.l}</div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white font-mono">{s.v}</div>
                      </div>
                    ))}
                  </div>
                  {/* Notification strip */}
                  <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900">
                    <Bell className="h-3.5 w-3.5 text-indigo-500 flex-shrink-0" />
                    <span className="text-[11px] text-indigo-600 dark:text-indigo-300 font-medium">
                      {p.id === "client" ? "Your withdrawal of $1,200 was approved" :
                       p.id === "manager" ? "New deposit request from J. Perera — $5,000" :
                       "Manager 'Desk EU' updated: 3 permissions revoked"}
                    </span>
                  </div>
                  {/* Table mock */}
                  <div className="border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="grid grid-cols-3 bg-gray-50 dark:bg-gray-800 px-3 py-2">
                      {(p.id === "client" ? ["Symbol", "P&L", "Status"] : p.id === "manager" ? ["Client", "Action", "Status"] : ["Manager", "Permissions", "Status"]).map(h => (
                        <span key={h} className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{h}</span>
                      ))}
                    </div>
                    {(p.id === "client"
                      ? [["EUR/USD", "+$210", "Open"], ["XAU/USD", "+$390", "Open"], ["BTC/USD", "+$32.5", "Open"]]
                      : p.id === "manager"
                      ? [["J. Perera", "Deposit $5,000", "Pending"], ["A. Silva", "Withdrawal $1,200", "Approved"], ["M. Fonseka", "Credit +$500", "Review"]]
                      : [["Desk EU", "14 / 18 Keys", "Active"], ["Desk MENA", "18 / 18 Keys", "Active"], ["Desk APAC", "9 / 18 Keys", "Restricted"]]
                    ).map((row, ri) => (
                      <div key={ri} className="grid grid-cols-3 px-3 py-2.5 border-t border-gray-100 dark:border-gray-800">
                        {row.map((cell, ci) => (
                          <span key={ci} className={`text-[12px] font-mono ${
                            ci === 1 && p.id === "client" ? "text-green-500 font-bold" :
                            ci === 2 ? (cell === "Open" || cell === "Approved" || cell === "Active" ? "text-green-500" : cell === "Pending" || cell === "Review" ? "text-amber-500" : "text-red-400") + " font-semibold" :
                            "text-gray-700 dark:text-gray-300"
                          }`}>
                            {cell}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TRADING TOOLS & TECH ──────────────── */}
      <section className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left text */}
          <div>
            <SectionHead
              badge="Trading Tools & Technologies"
              title={<>Built for Speed,<br />Precision & Scale</>}
              sub="Everything a trader needs — TradingView charting, copy trading, live analytics, and real-time market context, all inside the platform."
            />
            <div className="flex flex-col gap-3">
              {tradingTools.map((t, idx) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.label}
                    className="flex gap-4 p-4 border border-gray-100 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors bg-gray-50/50 dark:bg-gray-900/50 reveal"
                    data-dir="left"
                    data-delay={idx * 60}
                  >
                    <div className="flex-shrink-0 flex h-9 w-9 items-center justify-center border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40">
                      <Icon className="h-4 w-4 text-indigo-500" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-gray-900 dark:text-white mb-0.5">{t.label}</div>
                      <div className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">{t.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Right — manager/admin features */}
          <div>
            <div className="sticky top-8">
              <div className="mb-6 reveal" data-dir="right">
                <DiagBadge label="Manager & Admin Focused" color="blue" />
                <h3 className="mt-4 font-bold text-[22px] tracking-tight text-gray-900 dark:text-white">
                  OrbitFX Brings a Range of<br />Back-Office Controls
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-[14px] leading-relaxed">
                  Every feature is designed with the manager and admin in mind — granular permissions, live risk visibility, and a fully auditable back office.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { icon: KeyRound, title: "18+ Granular Permission Keys", desc: "Client ops, finance, trades, tools, and feature access — assign exactly the right access to each manager." },
                  { icon: ToggleLeft, title: "5 Premium Feature Flags", desc: "Copy Trading, Advanced Analytics, Market News, Economic Calendar, and Referral Program — toggled per manager." },
                  { icon: Bell, title: "Real-Time Notifications", desc: "Deposit, withdrawal, margin call, and KYC alerts delivered instantly via in-app notifications." },
                  { icon: History, title: "Full Audit Log & History", desc: "Every deposit, withdrawal, credit change, and manager action is logged and searchable for compliance review." },
                  { icon: Layers, title: "Multi-Account Management", desc: "Clients hold unlimited LIVE and DEMO accounts under one login, with instant switching and no re-login." },
                  { icon: Shield, title: "2FA & Google OAuth", desc: "TOTP two-factor authentication plus Google login enforced across all roles." },
                ].map((f, idx) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.title}
                      className="flex gap-3 p-4 border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 reveal"
                      data-dir="right"
                      data-delay={idx * 60}
                    >
                      <Icon className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[13px] font-bold text-gray-900 dark:text-white mb-0.5">{f.title}</div>
                        <div className="text-[12px] text-gray-500 dark:text-gray-400">{f.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLATFORM TECHNOLOGY ───────────────── */}
      <section className="py-20 px-[5%] bg-slate-50/80 dark:bg-gray-900/60">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHead
                badge="Platform Technology"
                title={<>Built on Professional-<br />Grade Technology</>}
                sub="Every component chosen for reliability, speed, and a professional user experience — production-ready with a single Docker deploy."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {integrations.map((int, idx) => {
                  const Icon = int.icon;
                  return (
                    <Card
                      key={int.label}
                      className="rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 reveal"
                      data-dir="up"
                      data-delay={idx * 70}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Icon className="h-4 w-4 text-indigo-500" />
                          <span className="text-[12px] font-bold text-gray-900 dark:text-white">{int.label}</span>
                        </div>
                        <ul className="flex flex-col gap-1.5">
                          {int.items.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-[12px] text-gray-500 dark:text-gray-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
            {/* Right visual */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 shadow-lg reveal" data-dir="right">
              <div className="mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500 flex items-center justify-center rounded-sm">
                  <span className="text-white text-xs font-bold">CX</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">OrbitFX System Status</div>
                  <div className="text-[11px] text-gray-400">All components active</div>
                </div>
              </div>
              {[
                { label: "TradingView Charts", status: "Live", color: "green" },
                { label: "WebSocket Price Feed", status: "Connected", color: "green" },
                { label: "Copy Trading Engine", status: "Active", color: "green" },
                { label: "PWA Install Service", status: "Available", color: "green" },
                { label: "2FA / Google OAuth", status: "Enforced", color: "amber" },
                { label: "Audit & History Engine", status: "Live", color: "green" },
                { label: "Notification Gateway", status: "Active", color: "green" },
                { label: "Docker Deployment", status: "Production", color: "amber" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      row.color === "green" ? "bg-green-400" : row.color === "amber" ? "bg-amber-400" : "bg-blue-400"
                    }`} />
                    <span className="text-[13px] text-gray-700 dark:text-gray-300">{row.label}</span>
                  </div>
                  <span className={`text-[11px] font-mono font-bold ${
                    row.color === "green" ? "text-green-500" : row.color === "amber" ? "text-amber-500" : "text-blue-500"
                  }`}>{row.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TARGET AUDIENCE ───────────────────── */}
      <section className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Target Audience & Use Cases"
            title="Built for Every Type of Brokerage"
            sub="Whether you're launching your first broker or scaling a manager/IB network — OrbitFX adapts to your operation."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {audiences.map((a, idx) => {
              const Icon = a.icon;
              const colorMap: Record<string, string> = {
                indigo: "bg-indigo-600",
                blue: "bg-blue-600",
                purple: "bg-purple-600",
                slate: "bg-slate-700 dark:bg-slate-600",
              };
              return (
                <Card
                  key={a.title}
                  className="rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow overflow-hidden reveal"
                  data-dir="up"
                  data-delay={idx * 80}
                >
                  <div className={`h-2 ${colorMap[a.color]}`} />
                  <CardContent className="p-6">
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center ${colorMap[a.color]}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{a.title}</h3>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">{a.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OUTSOURCED SERVICES ───────────────── */}
      <section className="py-20 px-[5%] bg-slate-50/80 dark:bg-gray-900/60">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Outsourced Services"
            title={<>Beyond Technology —<br />A Full Brokerage Team</>}
            sub="OrbitFX connects you to trusted outsourced service partners so you can run lean and focus on growth while experts handle operations."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {outsourcedServices.map((s, idx) => {
              const Icon = s.icon;
              return (
                <Card
                  key={s.title}
                  className="group rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-400 dark:hover:border-indigo-700 hover:shadow-md transition-all duration-200 reveal"
                  data-dir="up"
                  data-delay={idx * 70}
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60 transition-colors">
                      <Icon className="h-5 w-5 text-indigo-500" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-indigo-500 text-[11px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────── */}
      <section className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Testimonials & Case Studies"
            title="Trusted by Brokers Across Asia-Pacific"
            sub="Real feedback from operators using OrbitFX to power their brokerages every day."
            center
          />
          {/* Logo strip */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 reveal" data-dir="up">
            {["FX Broker SG", "Prime Capital LK", "AlphaDesk AE", "TradeCore MY", "Nexus FX AU"].map((l) => (
              <div key={l} className="px-5 py-3 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-[11px] font-bold text-gray-400 dark:text-gray-600 tracking-wide">
                {l}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <Card
                key={i}
                className="rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 reveal"
                data-dir="up"
                data-delay={i * 90}
              >
                <CardContent className="p-7">
                  <StarRating count={t.rating} />
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

      {/* ── PLATFORM SECURITY & UPTIME ─────────── */}
      <section className="py-20 px-[5%] bg-slate-50/80 dark:bg-gray-900/60">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Security & Infrastructure"
            title="Enterprise-Grade Security You Can Trust"
            sub="OrbitFX secures every role with 2FA and OAuth, keeps a full audit trail, and deploys production-ready via Docker."
            center
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Lock, label: "2FA / TOTP" },
              { icon: KeyRound, label: "Google OAuth Login" },
              { icon: Wifi, label: "Real-Time WebSockets" },
              { icon: ToggleLeft, label: "Two-Gate Feature Flags" },
              { icon: FileText, label: "Full Audit Log" },
              { icon: Database, label: "Docker Deployment" },
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="flex flex-col items-center text-center p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 reveal"
                  data-dir="fade"
                  data-delay={idx * 60}
                >
                  <div className="flex h-12 w-12 items-center justify-center border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40 mb-3">
                    <Icon className="h-5 w-5 text-indigo-500" />
                  </div>
                  <span className="text-[12px] font-semibold text-gray-700 dark:text-gray-300 leading-snug">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DEVICE SHOWCASE ───────────────────── */}
      <section className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Explore in Action"
            title="One Platform, Every Screen"
            sub="OrbitFX works seamlessly across desktop, web browser, and an installable PWA. Your clients get a consistent experience wherever they trade."
            center
          />
          {/* Device cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {deviceShowcaseItems.map((d, idx) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.label}
                  className="flex flex-col items-center text-center p-8 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors reveal"
                  data-dir="up"
                  data-delay={idx * 90}
                >
                  <div className="flex h-16 w-16 items-center justify-center border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40 mb-5">
                    <Icon className="h-8 w-8 text-indigo-500" />
                  </div>
                  <h3 className="font-bold text-[14px] text-gray-900 dark:text-white mb-2">{d.label}</h3>
                  <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">{d.desc}</p>
                </div>
              );
            })}
          </div>
          {/* Mock multi-device row */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 rounded-none p-8 flex flex-col md:flex-row items-end justify-center gap-6 reveal" data-dir="fade">
            {/* Desktop */}
            <div className="w-full max-w-[380px] bg-gray-800 rounded-t-lg overflow-hidden border-t-2 border-x-2 border-gray-700">
              <div className="bg-gray-700 px-3 py-2 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="ml-2 text-[10px] text-gray-500 font-mono flex-1 text-center">OrbitFX Desktop Terminal</span>
              </div>
              <div className="bg-gray-900 p-3 h-[120px] flex flex-col gap-2">
                <div className="flex gap-2">
                  {["EUR/USD","GBP/USD","XAU/USD"].map(p => (
                    <span key={p} className="text-[9px] bg-gray-800 text-gray-400 px-2 py-1 font-mono">{p}</span>
                  ))}
                </div>
                <div className="flex-1 bg-gray-800 flex items-end px-2 pb-2 gap-0.5">
                  {[30,45,35,55,48,60,52,70,58,65,48,72,60,80,65,72,88,62,75,90,72,85,68,80,84,70,88,74,90,80].map((h, i) => (
                    <div key={i} className="flex-1 bg-indigo-500/50 rounded-t-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
            {/* Mobile */}
            <div className="w-[120px] bg-gray-800 rounded-2xl overflow-hidden border-4 border-gray-700 self-end">
              <div className="bg-gray-700 h-5 flex items-center justify-center">
                <div className="w-12 h-1.5 bg-gray-600 rounded-full" />
              </div>
              <div className="bg-gray-900 p-2 h-[160px] flex flex-col gap-2">
                <div className="bg-gray-800 rounded p-2">
                  <div className="text-[8px] text-gray-500">Balance</div>
                  <div className="text-[11px] text-white font-bold font-mono">$24,810</div>
                </div>
                <div className="flex gap-1">
                  <div className="flex-1 bg-blue-600 rounded-sm py-2 text-center text-[8px] text-white font-bold">BUY</div>
                  <div className="flex-1 bg-red-600 rounded-sm py-2 text-center text-[8px] text-white font-bold">SELL</div>
                </div>
                <div className="flex-1 bg-gray-800 rounded flex items-end px-1 pb-1 gap-0.5">
                  {[40,55,45,65,50,70,60,80,65,75].map((h, i) => (
                    <div key={i} className="flex-1 bg-indigo-400/60 rounded-t-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-8 reveal" data-dir="up">
            <Button className="rounded-none bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest text-xs px-8 py-3">
              Book a Live Demo →
            </Button>
            <Button variant="outline" className="rounded-none border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold tracking-wide text-sm px-6 py-3">
              Get Demo Credentials
            </Button>
          </div>
        </div>
      </section>

      {/* ── FAQs ──────────────────────────────── */}
      <section className="py-20 px-[5%] bg-slate-50/80 dark:bg-gray-900/60">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead badge="FAQs" title="Frequently Asked Questions" sub="Everything you need to know about the OrbitFX Solution." center />
          <div className="max-w-[860px] mx-auto flex flex-col gap-2">
            {faqs.map((f, i) => (
              <Card
                key={i}
                className="rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden reveal"
                data-dir="up"
                data-delay={i * 50}
              >
                <button
                  className={`w-full flex justify-between items-center px-6 py-5 text-left text-[14px] font-semibold text-gray-900 dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/60 ${openFaq === i ? "bg-gray-50 dark:bg-gray-800/60" : "bg-transparent"}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="pr-4">{f.q}</span>
                  <span className="flex-shrink-0 text-indigo-500">
                    {openFaq === i ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 pt-1 text-[13px] text-gray-500 dark:text-gray-400 leading-[1.85] border-t border-gray-100 dark:border-gray-800">
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