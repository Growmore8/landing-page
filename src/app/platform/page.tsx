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
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const platformModules = [
  {
    icon: LayoutDashboard,
    title: "Client Portal",
    desc: "Branded web portal for end-clients — live balances, open positions, deposit & withdrawal requests, transaction history, and document upload.",
    tags: ["Web", "Mobile", "White-Label"],
  },
  {
    icon: Settings,
    title: "Manager Admin Portal",
    desc: "Full broker back-office management: client lifecycle, KYC/AML review, account approvals, role-based access controls.",
    tags: ["Admin", "Role-Based", "Multi-User"],
  },
  {
    icon: Users,
    title: "IB & Partner Portal",
    desc: "Multi-tier introducing broker tree with real-time commission tracking, referral links, performance dashboards, and payout management.",
    tags: ["IB", "Affiliate", "Multi-Tier"],
  },
  {
    icon: BarChart3,
    title: "Risk Management Console",
    desc: "Real-time position monitoring, exposure limits, auto-hedging triggers, and drawdown alerts — all configurable per asset class.",
    tags: ["Real-Time", "Auto-Hedge", "Alerts"],
  },
  {
    icon: ArrowLeftRight,
    title: "Deposits & Withdrawals",
    desc: "Automated payment gateway integrations, manual approval workflows, multi-currency wallets, and full audit trails on every transaction.",
    tags: ["PSP", "Multi-Currency", "Audit"],
  },
  {
    icon: UserCheck,
    title: "KYC / AML Engine",
    desc: "Document verification, PEP & sanctions screening, automated compliance scoring, and regulatory reporting outputs.",
    tags: ["Compliance", "Automated", "Reporting"],
  },
  {
    icon: CreditCard,
    title: "Credit & Margin Engine",
    desc: "Dynamic margin calculation, credit in/out allocation per client, margin-call automation, and stop-out logic configurable per account type.",
    tags: ["Margin", "Credit", "Stop-Out"],
  },
  {
    icon: ShieldCheck,
    title: "Insurance & Indemnity",
    desc: "Client fund protection modules, balance insurance configurations, and indemnity record tracking for regulated environments.",
    tags: ["Protection", "Insurance", "Records"],
  },
];

const tradingTools = [
  { icon: Network, label: "FIX API Connectivity", desc: "FIX 4.4/5.0 direct market access, REST and WebSocket APIs with full sandbox environments." },
  { icon: Activity, label: "Live Trading Terminal", desc: "Real-time buy/sell execution, live symbol pricing, order book depth, and instant trade confirmations." },
  { icon: FileText, label: "Trade Reporting", desc: "Automated MiFID II, ASIC, and EMIR trade reporting with exportable compliance logs." },
  { icon: Cpu, label: "AI Signal Engine", desc: "Built-in machine-learning signals for volatility forecasting and anomaly detection." },
  { icon: PieChart, label: "P&L Analytics", desc: "Real-time profit and loss dashboards, exposure heatmaps, and historical performance reports." },
  { icon: AlertTriangle, label: "Real-Time Alerts", desc: "Configurable push, SMS, and email alerts for margin calls, large deposits, and compliance flags." },
];

const integrations = [
  { icon: Plug, label: "Payment Gateways", items: ["Stripe", "PayPal", "Fasapay", "Skrill", "Neteller", "Wire Transfer", "Crypto PSPs"] },
  { icon: Globe, label: "Liquidity Providers", items: ["15+ Tier-1 Banks", "ECN Aggregation", "Prime-of-Prime", "Crypto Exchanges"] },
  { icon: Code2, label: "Third-Party Tools", items: ["TradingView Charts", "Acuity News Feed", "AutoChartist", "Trading Central"] },
  { icon: ClipboardList, label: "Audit & Reporting", items: ["Transaction Logs", "Deposit/Withdrawal History", "Credit Adjustments", "Compliance Exports"] },
];

const outsourcedServices = [
  { icon: HeadphonesIcon, title: "Managed Support Desk", desc: "24/7 white-labelled client support team operating under your brand — calls, chat, and email covered." },
  { icon: UserCheck, title: "Outsourced KYC Ops", desc: "Dedicated compliance officers reviewing documents, running AML checks, and approving accounts on your behalf." },
  { icon: Briefcase, title: "IB Relationship Management", desc: "Our partner team manages your IB relationships, resolves disputes, and onboards new introducing brokers." },
  { icon: BookOpen, title: "Content & Education", desc: "Trading education content, market commentary, and webinar production for your client base." },
  { icon: Target, title: "Marketing Campaigns", desc: "Performance marketing, SEO, paid media, and retention campaign management by fintech specialists." },
  { icon: Building2, title: "Regulatory Consulting", desc: "Guidance on licensing, jurisdiction selection, entity structuring, and ongoing compliance advisory." },
];

const portals = [
  {
    id: "client",
    icon: Monitor,
    label: "Client Web Portal",
    color: "indigo",
    features: [
      "Live account dashboard & balance overview",
      "Real-time symbol prices with buy/sell execution",
      "One-click fund deposits & withdrawals",
      "Full transaction history & statement downloads",
      "Document upload & KYC status tracker",
      "Live in-app notifications & alerts",
      "Referral & IB programme access",
      "Light & dark theme toggle",
    ],
  },
  {
    id: "mobile",
    icon: Smartphone,
    label: "Mobile App (iOS & Android)",
    color: "blue",
    features: [
      "Native iOS & Android, fully white-labelled",
      "Biometric login (Face ID / Fingerprint)",
      "Real-time portfolio & open positions",
      "Instant deposit via Apple Pay / Google Pay",
      "Push notifications for margin & market events",
      "Live buy/sell trading terminal",
      "Secure document camera for KYC",
      "Dark mode & accessibility support",
    ],
  },
  {
    id: "admin",
    icon: LayoutDashboard,
    label: "Manager Admin Portal",
    color: "slate",
    features: [
      "Full client lifecycle management",
      "Multi-role access control (Admin / Manager / Support)",
      "KYC / AML review & approval workflow",
      "Deposit & withdrawal approval queue",
      "Credit in/out & bonus allocation per client",
      "IB commission calculation & payout",
      "Risk desk exposure dashboard",
      "Full audit log & history export",
    ],
  },
];

const audiences = [
  {
    icon: Globe,
    title: "Retail Brokers",
    desc: "Launch a fully branded broker with client and admin portals, live trading, and back-office tools ready in days.",
    color: "indigo",
  },
  {
    icon: Building2,
    title: "Institutions & White-Label Partners",
    desc: "Use our infrastructure as a white-label core — plug in your brand, liquidity, and compliance framework seamlessly.",
    color: "blue",
  },
  {
    icon: Activity,
    title: "Algo Traders & Fintech Teams",
    desc: "API-first architecture lets your developers build, test, and deploy automated strategies via FIX, REST, and WebSocket.",
    color: "purple",
  },
  {
    icon: Briefcase,
    title: "Introducing Broker Use Cases",
    desc: "Manage your entire IB network from a single portal — track sub-IBs, client volumes, commissions, and performance.",
    color: "slate",
  },
];

const testimonials = [
  {
    quote: "OrbitFX gave us a fully operational brokerage in under two weeks. The backoffice deposit, withdrawal, and credit tools are exactly what our team needed.",
    author: "Operations Director",
    company: "FX Brokerage, Singapore",
    rating: 5,
  },
  {
    quote: "The risk management console and automated margin-call system saved us countless hours. The live trading terminal feels instant.",
    author: "Head of Technology",
    company: "Prime Broker, Dubai",
    rating: 5,
  },
  {
    quote: "Our IB network grew 40% in three months after switching to OrbitFX's partner portal. The commission tracking is transparent and real-time.",
    author: "Partnership Manager",
    company: "Retail Broker, Colombo",
    rating: 5,
  },
];

const faqs = [
  {
    q: "What is the OrbitFX Platform and who is it for?",
    a: "OrbitFX is an end-to-end brokerage technology platform built for retail brokers, white-label operators, institutions, and prop trading firms. It covers client and admin portals, live trading, full back-office management, risk engines, and compliance tooling.",
  },
  {
    q: "How does the platform work without software installation?",
    a: "The OrbitFX platform is fully cloud-hosted. Client portals, admin panels, and the mobile app are all accessible via browser or app download — no on-premise installation required. Your team can manage everything from anywhere with role-based access controls.",
  },
  {
    q: "What tools and features does the Manager Admin Portal include?",
    a: "The Manager Admin Portal is your full back-office command centre. It covers client lifecycle management, KYC/AML review, deposit and withdrawal approvals, credit in/out and bonus allocation, IB commission calculation, real-time risk desk monitoring, and full audit-log history exports.",
  },
  {
    q: "Can I run OrbitFX on mobile and other devices?",
    a: "Yes. OrbitFX includes a fully white-labelled native mobile app for iOS and Android. The client portal and admin panel are also fully responsive and accessible on tablets and desktops. All portals support light and dark themes.",
  },
  {
    q: "How are deposits, withdrawals, and fund management handled?",
    a: "The platform integrates with all major payment gateways (Stripe, PayPal, Fasapay, Skrill, Neteller, wire transfer, and crypto PSPs). Brokers can configure automated approval flows or manual override workflows. Every deposit, withdrawal, and credit adjustment is logged with full audit-trail history.",
  },
  {
    q: "What outsourced services does OrbitFX offer alongside the platform?",
    a: "Beyond the technology, OrbitFX offers fully managed outsourced services: 24/7 white-labelled client support, outsourced KYC operations, IB relationship management, trading education content, performance marketing, and regulatory consulting. These services let you run a lean internal team.",
  },
  {
    q: "Is OrbitFX suitable for growing brokerages looking to scale?",
    a: "Absolutely. The platform is built to scale from a single-jurisdiction startup to a multi-asset, multi-jurisdiction institutional operation. Features like multi-tier IB management, liquidity aggregation from 15+ banks, and jurisdiction-specific compliance reporting ensure you never outgrow the platform.",
  },
];

const deviceShowcaseItems = [
  { label: "Desktop Trading Terminal", icon: Monitor, desc: "Live symbols, instant buy/sell execution, and full account overview" },
  { label: "Web Client Portal", icon: Globe, desc: "Browser-based access to funds, history, and notifications" },
  { label: "iOS & Android App", icon: Smartphone, desc: "Native mobile with biometrics, push alerts, and live trading" },
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
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/70 to-indigo-50/50 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-950 pt-16 pb-0 px-[5%]">
        <div
          className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15"
          style={{
            backgroundImage: "linear-gradient(rgba(99,102,241,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.1) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          {/* Left */}
          <div className="pb-16 reveal" data-dir="left">
            <DiagBadge label="OrbitFX Platform" color="indigo" />
            <h1 className="mt-5 font-bold text-[clamp(32px,4.8vw,56px)] leading-[1.07] tracking-[-2px] text-gray-900 dark:text-white">
              Real-Time Trading<br />
              <span className="text-indigo-500">Platform</span> for Brokers<br />
              Who Value Simplicity.
            </h1>
            <p className="mt-5 text-gray-500 dark:text-gray-400 text-[16px] leading-[1.8] max-w-[430px]">
              One platform. Client portal, admin manager back-office, live trading terminal, deposits & withdrawals, credit management, KYC, insurance, audit history, and notifications — all white-labelled with light & dark themes.
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <Button className="rounded-none bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest text-xs px-7 py-3 shadow-lg shadow-blue-600/25">
                Request a Demo →
              </Button>
              <Button variant="outline" className="rounded-none border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold tracking-wide text-sm px-6 py-3">
                See All Features
              </Button>
            </div>
            {/* Trust pills */}
            <div className="mt-8 flex gap-2 flex-wrap">
              {["White-Label", "Multi-Asset", "Live Trading", "24/7 Support", "Light & Dark"].map((b) => (
                <span key={b} className="text-[11px] font-semibold px-3 py-1 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-900/60 tracking-wide">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Mock terminal screenshot placeholder */}
          <div className="relative flex justify-end items-end reveal" data-dir="right" data-delay="120">
            <div className="relative w-full max-w-[520px] rounded-tl-lg rounded-tr-lg overflow-hidden border-t border-l border-r border-gray-200 dark:border-gray-700 shadow-2xl shadow-indigo-900/20">
              {/* Fake browser chrome */}
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <div className="ml-3 flex-1 bg-white dark:bg-gray-700 rounded px-3 py-1 text-[11px] text-gray-400 font-mono">
                  portal.OrbitFX.io
                </div>
              </div>
              {/* Platform UI mockup */}
              <div className="bg-gray-900 dark:bg-gray-950 p-4 min-h-[300px]">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-indigo-500 rounded-sm" />
                    <span className="text-white text-[12px] font-bold font-mono">OrbitFX Terminal</span>
                  </div>
                  <div className="flex gap-2">
                    {["EUR/USD", "GBP/USD", "BTC/USD"].map(p => (
                      <span key={p} className="text-[9px] bg-gray-800 dark:bg-gray-900 text-gray-400 px-2 py-1 rounded font-mono">{p}</span>
                    ))}
                  </div>
                </div>
                {/* Chart area */}
                <div className="bg-gray-800 dark:bg-black rounded mb-3 p-3 relative overflow-hidden h-[140px]">
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
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-blue-600 rounded px-3 py-2 text-center">
                    <div className="text-[9px] text-blue-200 font-mono">BUY</div>
                    <div className="text-white text-xs font-bold font-mono">1.0845</div>
                  </div>
                  <div className="bg-gray-800 dark:bg-gray-900 rounded px-3 py-2 text-center">
                    <div className="text-[9px] text-gray-500 font-mono">SPREAD</div>
                    <div className="text-gray-300 text-xs font-bold font-mono">0.3</div>
                  </div>
                  <div className="bg-red-600 rounded px-3 py-2 text-center">
                    <div className="text-[9px] text-red-200 font-mono">SELL</div>
                    <div className="text-white text-xs font-bold font-mono">1.0842</div>
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
            sub="Client and admin manager portals, live trading, and full back-office — every module is white-labelled, integrated, and ready to go."
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

      {/* ── PORTAL DEEP-DIVE ──────────────────── */}
      <section className="py-20 px-[5%] bg-slate-50/80 dark:bg-gray-900/60">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Client & Admin Portals"
            title={<>Three Portals, One<br />Unified Ecosystem</>}
            sub="Client portal, mobile app, and manager admin — all interconnected, sharing the same real-time data layer with full notification support."
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
                    {p.id === "client" && "The fully branded client portal is the primary touchpoint for your end-users. Available via web browser on any device, it combines live trading, account management, fund operations (deposit/withdrawal/credit), and real-time notifications in one clean interface with light and dark themes."}
                    {p.id === "mobile" && "Your brand in your clients' pockets. The native iOS and Android app is fully white-labelled — your logo, your colours, your app store listing. Biometric login, live buy/sell trading, push notifications, and instant funding keep your clients engaged and active."}
                    {p.id === "admin" && "The Manager Admin Portal is your brokerage command centre. From approving deposits, withdrawals, and credit adjustments to reviewing KYC and monitoring live risk exposure, every back-office function is available with role-based access controls and a full audit history log."}
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
                        {p.id === "client" ? "Client Dashboard" : p.id === "mobile" ? "Mobile App" : "Admin Console"}
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
                      : p.id === "mobile"
                      ? [{ l: "Open Trades", v: "7" }, { l: "Margin Used", v: "22%" }, { l: "Free Margin", v: "$18,200" }]
                      : [{ l: "Pending Withdrawals", v: "6" }, { l: "Pending KYC", v: "14" }, { l: "Credit Requests", v: "3" }]
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
                       p.id === "mobile" ? "EUR/USD order filled at 1.0845" :
                       "New deposit request from J. Perera — $5,000"}
                    </span>
                  </div>
                  {/* Table mock */}
                  <div className="border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="grid grid-cols-3 bg-gray-50 dark:bg-gray-800 px-3 py-2">
                      {(p.id === "client" ? ["Symbol", "P&L", "Status"] : p.id === "mobile" ? ["Pair", "Vol", "Side"] : ["Type", "Amount", "Status"]).map(h => (
                        <span key={h} className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{h}</span>
                      ))}
                    </div>
                    {(p.id === "client"
                      ? [["EUR/USD", "+$210", "Open"], ["XAU/USD", "+$390", "Open"], ["BTC/USD", "+$32.5", "Open"]]
                      : p.id === "mobile"
                      ? [["EUR/USD", "1.0 Lot", "BUY"], ["GBP/JPY", "0.5 Lot", "SELL"], ["BTC/USD", "0.1 Lot", "BUY"]]
                      : [["Withdrawal", "$5,000", "Pending"], ["Deposit", "$2,200", "Approved"], ["Credit In", "$500", "Review"]]
                    ).map((row, ri) => (
                      <div key={ri} className="grid grid-cols-3 px-3 py-2.5 border-t border-gray-100 dark:border-gray-800">
                        {row.map((cell, ci) => (
                          <span key={ci} className={`text-[12px] font-mono ${
                            ci === 1 && p.id === "client" ? "text-green-500 font-bold" :
                            ci === 2 ? (cell === "Open" || cell === "BUY" || cell === "Approved" ? "text-green-500" : cell === "Pending" || cell === "Review" ? "text-amber-500" : "text-red-400") + " font-semibold" :
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
              sub="Every tool your trading and technology teams need — from direct market access APIs to live execution and automated reporting."
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
          {/* Right — broker features */}
          <div>
            <div className="sticky top-8">
              <div className="mb-6 reveal" data-dir="right">
                <DiagBadge label="Broker-Focused" color="blue" />
                <h3 className="mt-4 font-bold text-[22px] tracking-tight text-gray-900 dark:text-white">
                  OrbitFX Brings a Range of<br />Broker-Focused Features
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-[14px] leading-relaxed">
                  Every feature is designed with the broker operator in mind — not just the trader. We solve the compliance, operations, and revenue challenges that matter to your business.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { icon: DollarSign, title: "Revenue Sharing & Markup", desc: "Configure spread markups, commission structures, and revenue splits per account group or IB tier." },
                  { icon: Banknote, title: "Credit In/Out Management", desc: "Allocate, adjust, and revoke client credit with full traceability on every adjustment." },
                  { icon: Bell, title: "Real-Time Notifications", desc: "Deposit, withdrawal, margin call, and KYC alerts delivered instantly via in-app, email, SMS, or push." },
                  { icon: History, title: "Full Audit Log & History", desc: "Every deposit, withdrawal, credit change, and admin action is logged and searchable for compliance review." },
                  { icon: Layers, title: "Multi-Account Management", desc: "Clients can hold multiple accounts in different currencies or strategies under one login." },
                  { icon: Shield, title: "Two-Factor Authentication", desc: "Enforced 2FA for all admin access with IP whitelisting and session management." },
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

      {/* ── INTEGRATIONS & COMPATIBILITY ──────── */}
      <section className="py-20 px-[5%] bg-slate-50/80 dark:bg-gray-900/60">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHead
                badge="Integrations & Compatibility"
                title={<>Connect Everything<br />You Already Use</>}
                sub="OrbitFX plugs into your existing payment providers, liquidity, market data, and audit tooling — no rip-and-replace required."
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
                  <div className="text-sm font-bold text-gray-900 dark:text-white">OrbitFX Integration Hub</div>
                  <div className="text-[11px] text-gray-400">All connections active</div>
                </div>
              </div>
              {[
                { label: "Payment Gateways", status: "7 Active", color: "green" },
                { label: "Liquidity Providers", status: "15+ Connected", color: "green" },
                { label: "Chart Providers", status: "2 Active", color: "green" },
                { label: "News & Analysis", status: "3 Active", color: "green" },
                { label: "Compliance APIs", status: "Configured", color: "amber" },
                { label: "Audit & History Engine", status: "Live", color: "green" },
                { label: "Notification Gateway", status: "Active", color: "green" },
                { label: "Insurance Module", status: "Configured", color: "amber" },
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
            sub="Whether you're launching your first broker or scaling an institutional desk — OrbitFX adapts to your operation."
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
            sub="OrbitFX operates on ISO 27001-compliant cloud infrastructure with multi-region redundancy and 99.9%+ uptime SLA."
            center
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Shield, label: "256-bit TLS Encryption" },
              { icon: Lock, label: "2FA & IP Whitelisting" },
              { icon: Database, label: "Multi-Region Redundancy" },
              { icon: RefreshCw, label: "Automated Backups" },
              { icon: Activity, label: "99.9% Uptime SLA" },
              { icon: FileText, label: "ISO 27001 Compliant" },
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
            sub="OrbitFX works seamlessly across desktop, web browser, and native mobile. Your clients get a consistent experience wherever they trade."
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
          <SectionHead badge="FAQs" title="Frequently Asked Questions" sub="Everything you need to know about the OrbitFX Platform." center />
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
