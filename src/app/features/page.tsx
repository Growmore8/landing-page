"use client";

import {
  ShieldCheck,
  Users,
  User,
  Building2,
  Zap,
  LayoutDashboard,
  CandlestickChart,
  PlusCircle,
  MinusCircle,
  ArrowLeftRight,
  Receipt,
  DollarSign,
  LogIn,
  TrendingUp,
  Wallet,
  Bell,
  Filter,
  Clock,
  Lock,
  Download,
  ChartLine,
  Sun,
  Moon,
  LineChart,
  BadgeDollarSign,
  IdCard,
  Smartphone,
  Newspaper,
  FileText,
  Settings,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const heroPills = [
  "Multi-role access control",
  "Live trading terminals",
  "Back-office automation",
  "Real-time notifications",
  "Dark & light theme",
  "Full audit log",
];

const roles = [
  {
    icon: ShieldCheck,
    label: "Super Admin",
    desc: "Full platform control — create managers, assign clients, configure permissions, view all reports and logs.",
  },
  {
    icon: Users,
    label: "Manager",
    desc: "Scoped desk access — manage assigned clients, approve deposits/withdrawals, view trading activity for their pool only.",
  },
  {
    icon: User,
    label: "Client",
    desc: "Self-service portal — fund wallet, open/close trades, upload KYC documents, view own history and statements.",
  },
  {
    icon: Building2,
    label: "IB / Partner",
    desc: "Referral desk — track referred clients, monitor commissions, access partner portal and payout history.",
  },
];

type PermCheck = true | false;

const permMatrix: { feature: string; admin: PermCheck; manager: PermCheck; client: PermCheck; ib: PermCheck }[] = [
  { feature: "Create Managers", admin: true, manager: false, client: false, ib: false },
  { feature: "Assign Clients", admin: true, manager: true, client: false, ib: false },
  { feature: "Approve Deposits", admin: true, manager: true, client: false, ib: false },
  { feature: "Trade Execution", admin: true, manager: true, client: true, ib: false },
  { feature: "KYC Review", admin: true, manager: true, client: false, ib: false },
  { feature: "Platform Config", admin: true, manager: false, client: false, ib: false },
  { feature: "Commission View", admin: true, manager: true, client: false, ib: true },
  { feature: "Audit Log", admin: true, manager: false, client: false, ib: false },
];

const watchlist = [
  { sym: "EUR/USD", price: "1.08342", chg: "+0.12%", up: true, spread: "0.2" },
  { sym: "GBP/USD", price: "1.27891", chg: "-0.08%", up: false, spread: "0.3" },
  { sym: "XAU/USD", price: "2341.50", chg: "+0.34%", up: true, spread: "0.5" },
  { sym: "BTC/USD", price: "67,420", chg: "+1.22%", up: true, spread: "5.0" },
  { sym: "US30", price: "39,187", chg: "-0.21%", up: false, spread: "2.0" },
  { sym: "NAS100", price: "17,832", chg: "+0.55%", up: true, spread: "1.5" },
];

const terminalFeatures = [
  { icon: CandlestickChart, title: "Live price feeds", desc: "FX, CFDs, indices, crypto, commodities — sub-100ms tick data via WebSocket." },
  { icon: Zap, title: "One-click execution", desc: "Market, limit, stop, and trailing orders from the terminal in one tap." },
  { icon: LayoutDashboard, title: "Position tracker", desc: "Live P&L, margin levels, swap, and floating exposure across all open positions." },
];

const backOfficeCards = [
  { icon: PlusCircle, iconColor: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900", title: "Deposit management", desc: "Multi-PSP support — Stripe, FasaPay, Skrill, crypto bridge, and manual wire. Auto-confirmation with configurable thresholds." },
  { icon: MinusCircle, iconColor: "text-rose-600", bg: "bg-rose-50 border-rose-200 dark:bg-rose-950/30 dark:border-rose-900", title: "Withdrawal processing", desc: "Client initiates, manager approves or escalates. Compliance hold flags, AML checks via ComplyAdvantage, and automatic payout routing." },
  { icon: Zap, iconColor: "text-amber-600", bg: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900", title: "Instant credit", desc: "Admin can issue instant credit or bonus to any account — configurable with expiry, trading volume requirement, and auto-reversal rules." },
  { icon: ArrowLeftRight, iconColor: "text-indigo-500", bg: "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-900", title: "Internal transfer", desc: "Move funds between accounts or sub-wallets instantly. Manager desk can initiate intra-portfolio transfers with full audit trail." },
  { icon: Receipt, iconColor: "text-indigo-500", bg: "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-900", title: "Transaction ledger", desc: "Every debit, credit, fee, and swap recorded to an immutable ledger. Exportable as CSV, PDF, or MT4/MT5 report format." },
  { icon: DollarSign, iconColor: "text-indigo-500", bg: "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-900", title: "Multi-currency", desc: "USD, EUR, GBP, SGD and crypto base accounts. Real-time FX conversion at live mid-rate on every transaction." },
];

const notifications = [
  { color: "bg-rose-500", title: "Withdrawal request — $4,200", body: "Client #C-4421 requested withdrawal. Awaiting your approval.", time: "2 min ago · Manager Desk" },
  { color: "bg-emerald-500", title: "Deposit confirmed — $1,500", body: "Stripe gateway confirmed deposit for Ahmed Al-Rashid.", time: "8 min ago · Back Office" },
  { color: "bg-amber-500", title: "New login — Client portal", body: "Priya Wijeratne logged in from Colombo, LK (Chrome / macOS).", time: "14 min ago · Security" },
  { color: "bg-indigo-500", title: "Trade closed — EUR/USD", body: "Position #T-88231 closed at 1.08342. P&L: +$342.00", time: "22 min ago · Trading" },
  { color: "bg-indigo-500", title: "KYC approved — C-4422", body: "Identity documents verified for Omar Hassan. Account live.", time: "1 hr ago · Compliance" },
  { color: "bg-rose-500", title: "Margin call triggered", body: "Client #C-3301 margin level at 42%. Stop-out threshold: 30%.", time: "2 hr ago · Risk" },
];

const notifCards = [
  { icon: LogIn, title: "Login alerts", desc: "Every login event — with device, IP, and geolocation — sent to the account owner." },
  { icon: TrendingUp, title: "Trade events", desc: "Open, close, stop-out, and margin call events pushed instantly to client and manager." },
  { icon: Wallet, title: "Fund events", desc: "Deposit received, withdrawal approved/rejected, and credit issued — all notified." },
  { icon: Bell, title: "System alerts", desc: "KYC status updates, document approval, account verification and platform announcements." },
];

const auditLog = [
  { color: "text-emerald-500", event: "Manager created", detail: 'Super Admin created Manager "Nimal Perera" — desk #M-22', time: "09:41:03" },
  { color: "text-indigo-500", event: "Client login", detail: "C-4421 · Dinesh Fernando · IP 203.x.x.81 · Chrome", time: "09:38:17" },
  { color: "text-emerald-500", event: "Deposit approved", detail: "Manager M-22 approved $2,000 deposit · TXN-88241", time: "09:32:55" },
  { color: "text-amber-500", event: "Permission updated", detail: "Super Admin updated withdrawal limit for Manager M-19", time: "09:27:11" },
  { color: "text-indigo-500", event: "Trade opened", detail: "C-4422 opened 1.0 lot BUY XAU/USD @ 2339.80", time: "09:22:04" },
  { color: "text-rose-500", event: "Withdrawal rejected", detail: "Manager M-22 rejected $5,000 withdrawal — AML hold", time: "09:15:38" },
];

const auditFeatures = [
  { icon: Filter, title: "Smart filters", desc: "Filter by role, event type, date range, client, or manager. Export filtered results to CSV or PDF." },
  { icon: Clock, title: "Trade history", desc: "Complete record of every open/close, including entry, exit, P&L, swap, and commission per trade." },
  { icon: Lock, title: "Immutable records", desc: "Audit entries cannot be edited or deleted by any user role. Designed for regulatory inspection readiness." },
  { icon: Download, title: "Exportable statements", desc: "Generate account statements, trade reports, and tax summaries per client on demand." },
];

const widgets = [
  { icon: LineChart, title: "Live chart widget", sub: "Embeddable TradingView chart with symbol switcher" },
  { icon: Wallet, title: "Deposit widget", sub: "Standalone fund your account flow" },
  { icon: Users, title: "IB partner portal", sub: "Referral link, commissions, and payout tracker" },
  { icon: IdCard, title: "KYC upload widget", sub: "Document upload with Sumsub identity check" },
  { icon: Smartphone, title: "Mobile app", sub: "iOS & Android white-label apps included" },
  { icon: Newspaper, title: "News feed widget", sub: "Acuity Trading signals and economic calendar" },
  { icon: FileText, title: "Account statement", sub: "On-demand PDF & CSV statement widget" },
  { icon: Settings, title: "Admin back-office", sub: "Full desk portal for manager operations" },
];

const portalStats = [
  { n: "50+", l: "Tradeable symbols" },
  { n: "8", l: "PSP integrations" },
  { n: "<100ms", l: "Execution latency" },
  { n: "99.9%", l: "Uptime SLA" },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

type BadgeColor = "default" | "indigo" | "blue" | "green" | "amber" | "rose";

function DiagBadge({ label, color = "default" }: { label: string; color?: BadgeColor }) {
  const c: Record<BadgeColor, string> = {
    default: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700",
    indigo: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
    blue: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
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

function SectionHead({
  badge, badgeColor = "indigo", title, sub, center = false,
}: {
  badge: string; badgeColor?: BadgeColor;
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

function Check() {
  return <span className="text-emerald-500 font-bold text-[15px]">✓</span>;
}
function Cross() {
  return <span className="text-gray-300 dark:text-gray-700 font-bold text-[15px]">—</span>;
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function FeaturesPage() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">

      {/* ── HERO ─────────────────────────────── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/60 to-indigo-50/40 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-950 border-b border-gray-200/60 dark:border-gray-800 px-[5%] py-16 sm:py-0">
        {/* Grid pattern (unchanged) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 dark:opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(rgba(91,140,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(91,140,255,0.1) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="relative z-10 max-w-[1280px] mx-auto text-center">
          <DiagBadge label="Platform Features" color="indigo" />
          <h1 className="mt-5 font-bold text-[clamp(34px,5vw,58px)] leading-[1.07] tracking-[-2px] text-gray-900 dark:text-white mb-4">
            Everything Your Brokerage<br />
            <span className="text-indigo-500">Needs to Operate.</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-[16px] leading-[1.8] max-w-[480px] mx-auto mb-7">
            OrbitFX delivers a unified suite — multi-role access, live trading, back-office
            automation, real-time notifications, and full audit history — all white-labelled
            under your brand.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {heroPills.map((p) => (
              <span
                key={p}
                className="text-[11px] font-bold px-3 py-1.5 border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 text-gray-600 dark:text-gray-400 tracking-[0.5px]"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCESS CONTROL ───────────────────── */}
      <section className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div>
            <SectionHead
              badge="Access Control"
              badgeColor="indigo"
              title="Admin, Manager & Client — Each Role, Precisely Controlled"
              sub="Super Admin creates Managers and assigns their client pools. Every action is scoped — Managers can only see and act on clients within their own desk."
            />
            <div className="flex flex-col">
              {roles.map((r, i) => {
                const Icon = r.icon;
                return (
                  <div
                    key={r.label}
                    className={`flex gap-4 items-start py-4 ${i < roles.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}`}
                  >
                    <Icon className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[13px] font-bold text-gray-900 dark:text-white mb-0.5">{r.label}</div>
                      <div className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{r.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — permission matrix */}
          <div className="border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-gray-500 dark:text-gray-400">Permission Matrix</span>
            </div>
            <table className="w-full text-[12px] border-collapse">
              <thead>
                <tr>
                  {["Feature", "Super Admin", "Manager", "Client", "IB"].map((h) => (
                    <th
                      key={h}
                      className="text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400 px-3 py-2.5 border-b border-gray-100 dark:border-gray-800 text-left"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permMatrix.map((row, i) => (
                  <tr key={row.feature} className={i < permMatrix.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}>
                    <td className="px-3 py-2.5 font-bold text-gray-900 dark:text-white text-[12px]">{row.feature}</td>
                    <td className="px-3 py-2.5 text-center">{row.admin ? <Check /> : <Cross />}</td>
                    <td className="px-3 py-2.5 text-center">{row.manager ? <Check /> : <Cross />}</td>
                    <td className="px-3 py-2.5 text-center">{row.client ? <Check /> : <Cross />}</td>
                    <td className="px-3 py-2.5 text-center">{row.ib ? <Check /> : <Cross />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── LIVE TRADING TERMINAL ────────────── */}
      <section className="py-20 px-[5%] bg-slate-50/70 dark:bg-gray-900/50">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div>
            <SectionHead
              badge="Live Trading"
              badgeColor="blue"
              title="Real-Time Terminal with Live Buy/Sell Execution"
              sub="Full-featured web terminal with live price feeds, one-click execution, position management, and integrated charting via TradingView."
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {terminalFeatures.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                    <div className="flex h-9 w-9 items-center justify-center border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40 mb-3">
                      <Icon className="h-4 w-4 text-indigo-500" />
                    </div>
                    <div className="text-[13px] font-bold text-gray-900 dark:text-white mb-1">{f.title}</div>
                    <div className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — terminal mock */}
          <div className="border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Mock header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <span className="text-[13px] font-bold text-gray-900 dark:text-white">
                Orbit<span className="text-indigo-500">FX</span> Terminal
              </span>
              <div className="flex gap-1">
                {["Watchlist", "Positions", "History"].map((t, i) => (
                  <span
                    key={t}
                    className={`text-[10px] px-2 py-1 cursor-pointer font-${i === 0 ? "bold" : "medium"} ${i === 0
                        ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 border border-indigo-200 dark:border-indigo-900"
                        : "text-gray-400 dark:text-gray-500"
                      }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {/* Watchlist rows */}
            {watchlist.map((row) => (
              <div
                key={row.sym}
                className="flex items-center justify-between px-3.5 py-2 border-b border-gray-100/70 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/70 transition-colors"
              >
                <span className="font-mono font-bold text-[12px] text-gray-900 dark:text-white w-[68px]">{row.sym}</span>
                <span className="font-mono text-[12px] text-gray-700 dark:text-gray-300">{row.price}</span>
                <span className={`font-mono text-[12px] ${row.up ? "text-emerald-600" : "text-rose-500"}`}>{row.chg}</span>
                <span className="font-mono text-[10px] text-gray-400">{row.spread}</span>
                <div className="flex gap-1">
                  <button className="text-[9px] font-bold px-2 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 cursor-pointer hover:bg-emerald-100 transition-colors">
                    BUY
                  </button>
                  <button className="text-[9px] font-bold px-2 py-1 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900 cursor-pointer hover:bg-rose-100 transition-colors">
                    SELL
                  </button>
                </div>
              </div>
            ))}
            <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <span className="text-[11px] text-gray-400 font-mono">● LIVE — 50+ symbols available across FX, CFD, Crypto, Indices</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── BACK OFFICE ──────────────────────── */}
      <section className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Back Office"
            badgeColor="green"
            title="Deposits, Withdrawals, and Instant Credit — Fully Automated"
            sub="Managers approve or reject in one click. Auto-routing PSP, crypto bridge, and manual gateway all supported. Full ledger updated instantly."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {backOfficeCards.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                  <div className={`flex h-9 w-9 items-center justify-center border mb-3 ${c.bg}`}>
                    <Icon className={`h-4 w-4 ${c.iconColor}`} />
                  </div>
                  <div className="text-[13px] font-bold text-gray-900 dark:text-white mb-1.5">{c.title}</div>
                  <div className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">{c.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── REAL-TIME NOTIFICATIONS ──────────── */}
      <section className="py-20 px-[5%] bg-slate-50/70 dark:bg-gray-900/50">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div>
            <SectionHead
              badge="Notifications"
              badgeColor="rose"
              title="Every Login, Trade, and Transaction — Notified in Real Time"
              sub="All roles receive instant alerts. Admins get platform-wide events. Managers get their desk's activity. Clients get their own account events. All delivered in-app, email, and SMS."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {notifCards.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="p-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                    <Icon className="h-5 w-5 text-indigo-500 mb-3" />
                    <div className="text-[13px] font-bold text-gray-900 dark:text-white mb-1">{c.title}</div>
                    <div className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">{c.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — notification feed mock */}
          <div className="border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <span className="text-[12px] font-bold text-gray-900 dark:text-white">Notifications</span>
              <span className="text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 border border-indigo-200 dark:border-indigo-900 px-2 py-0.5">
                6 unread
              </span>
            </div>
            {notifications.map((n, i) => (
              <div
                key={i}
                className={`flex gap-3 items-start px-4 py-3.5 bg-white dark:bg-gray-950 ${i < notifications.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}`}
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${n.color}`} />
                <div>
                  <div className="text-[13px] font-bold text-gray-900 dark:text-white">{n.title}</div>
                  <div className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">{n.body}</div>
                  <div className="text-[10px] text-gray-400 font-mono mt-1">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUDIT LOG ────────────────────────── */}
      <section className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left — audit mock */}
          <div className="border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <span className="text-[12px] font-bold text-gray-900 dark:text-white">Audit Log</span>
              <span className="text-[10px] text-gray-400 font-mono">Live · Auto-refresh</span>
            </div>
            {auditLog.map((row, i) => (
              <div
                key={i}
                className={`flex gap-3 items-start px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900/70 transition-colors ${i < auditLog.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}`}
              >
                <div className={`flex-shrink-0 mt-0.5 ${row.color}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current mt-1.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold text-gray-900 dark:text-white">{row.event}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5 truncate">{row.detail}</div>
                </div>
                <div className="text-[10px] text-gray-400 font-mono flex-shrink-0">{row.time}</div>
              </div>
            ))}
          </div>

          {/* Right */}
          <div>
            <SectionHead
              badge="Audit & History"
              badgeColor="amber"
              title="Immutable Audit Log Across Every Role and Action"
              sub="Every login, permission change, trade, deposit, withdrawal, and config edit is logged with timestamp, user, IP, and full context — forever."
            />
            <div className="flex flex-col">
              {auditFeatures.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className={`flex gap-4 items-start py-4 ${i < auditFeatures.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}`}
                  >
                    <Icon className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[13px] font-bold text-gray-900 dark:text-white mb-0.5">{f.title}</div>
                      <div className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── THEMING ──────────────────────────── */}
      <section className="py-20 px-[5%] bg-slate-50/70 dark:bg-gray-900/50">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Theming"
            badgeColor="indigo"
            title="Dark Mode and Light Mode — Both Fully Supported"
            sub="Every client, manager, and admin portal ships with system-aware theme switching. White-labelled colors, logos, and typography adapt per broker."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[680px] mx-auto">
            {/* Dark */}
            <div className="border border-gray-700 overflow-hidden">
              <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#060c1e] border-b border-[#1e293b]">
                <div className="w-6 h-6 bg-[#1e293b] border border-[#334155] flex items-center justify-center">
                  <Moon className="h-3 w-3 text-indigo-300" />
                </div>
                <span className="text-white text-[12px] font-bold">Dark Mode</span>
              </div>
              <div className="bg-[#060c1e] p-3.5 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#0f172a] border border-[#1e293b] p-2.5">
                    <div className="font-mono text-[18px] text-white font-bold">$48,320</div>
                    <div className="text-[10px] text-[#94a3b8] mt-1">Portfolio Value</div>
                  </div>
                  <div className="bg-[#0f172a] border border-[#1e293b] p-2.5">
                    <div className="font-mono text-[18px] text-[#4ade80] font-bold">+3.2%</div>
                    <div className="text-[10px] text-[#94a3b8] mt-1">Today's P&L</div>
                  </div>
                </div>
                <div className="bg-[#0f172a] border border-[#1e293b] p-2.5 flex justify-between items-center">
                  <span className="text-[12px] font-mono text-white">EUR/USD</span>
                  <span className="text-[12px] font-mono text-[#c7d2fe]">1.08342</span>
                  <span className="text-[10px] font-mono text-[#4ade80]">+0.12%</span>
                </div>
                <div className="bg-[#1e1b4b] border border-[#3730a3] py-2 text-center text-[11px] font-bold text-[#a5b4fc]">
                  Active Indigo Theme
                </div>
              </div>
            </div>

            {/* Light */}
            <div className="border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#f8faff] border-b border-[#e2e8f0]">
                <div className="w-6 h-6 bg-white border border-[#e2e8f0] flex items-center justify-center">
                  <Sun className="h-3 w-3 text-indigo-500" />
                </div>
                <span className="text-[#111827] text-[12px] font-bold">Light Mode</span>
              </div>
              <div className="bg-[#f8faff] p-3.5 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white border border-[#e2e8f0] p-2.5">
                    <div className="font-mono text-[18px] text-[#111827] font-bold">$48,320</div>
                    <div className="text-[10px] text-[#6b7280] mt-1">Portfolio Value</div>
                  </div>
                  <div className="bg-white border border-[#e2e8f0] p-2.5">
                    <div className="font-mono text-[18px] text-[#16a34a] font-bold">+3.2%</div>
                    <div className="text-[10px] text-[#6b7280] mt-1">Today's P&L</div>
                  </div>
                </div>
                <div className="bg-white border border-[#e2e8f0] p-2.5 flex justify-between items-center">
                  <span className="text-[12px] font-mono text-[#111827]">EUR/USD</span>
                  <span className="text-[12px] font-mono text-[#4f46e5]">1.08342</span>
                  <span className="text-[10px] font-mono text-[#16a34a]">+0.12%</span>
                </div>
                <div className="bg-[#eef2ff] border border-[#c7d2fe] py-2 text-center text-[11px] font-bold text-[#4f46e5]">
                  Active Indigo Theme
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WIDGETS & PORTAL ─────────────────── */}
      <section className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Widgets & Portal"
            badgeColor="blue"
            title="Embeddable Widgets and Client Portal — All White-Labelled"
            sub="Drop individual widgets into any page or deploy the full client portal under your own domain. Everything carries your brand — OrbitFX stays invisible."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            {widgets.map((w) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.title}
                  className="flex flex-col gap-1.5 p-4 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-indigo-400 dark:hover:border-indigo-700 hover:bg-white dark:hover:bg-gray-900/80 transition-all cursor-pointer"
                >
                  <Icon className="h-5 w-5 text-indigo-500" />
                  <div className="text-[12px] font-bold text-gray-900 dark:text-white">{w.title}</div>
                  <div className="text-[11px] text-gray-400 dark:text-gray-500 leading-snug">{w.sub}</div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {portalStats.map((s) => (
              <div key={s.l} className="p-5 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                <div className="font-mono font-bold text-[26px] text-gray-900 dark:text-white leading-none tracking-tight">{s.n}</div>
                <div className="text-[11px] text-gray-400 mt-1.5 tracking-wide">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
