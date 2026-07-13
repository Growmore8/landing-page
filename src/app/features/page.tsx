"use client";

import {
  ShieldCheck,
  Users,
  User,
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
  Sun,
  Moon,
  LineChart,
  Repeat,
  BarChart3,
  Newspaper,
  CalendarClock,
  LayoutGrid,
  Smartphone,
  ClipboardList,
  MousePointerClick,
  FileText,
  MessageSquare,
  KeyRound,
  UserCog,
  Gauge,
  ToggleLeft,
  Check as CheckIcon,
  IdCard,
  Settings,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const heroPills = [
  "TradingView Advanced Charts",
  "iOS & Android PWA",
  "Copy Trading",
  "18+ Manager Permissions",
  "Multi-Account",
];

const heroStats = [
  { n: "3", l: "User Roles" },
  { n: "18+", l: "Permission Keys" },
  { n: "9", l: "Client Features" },
  { n: "6", l: "Manager Tools" },
  { n: "5", l: "Feature Flags" },
  { n: "PWA", l: "Mobile Ready" },
];

// Updated to the 3 real OrbitFX roles (Client/Trader, Manager/IB, Admin/Broker)
const roles = [
  {
    icon: ShieldCheck,
    label: "Admin / Broker",
    desc: "Platform owner — full client & account management, creates and configures every manager, assigns 18+ permission keys and 5 feature flags, controls spread/risk, and has full audit log access.",
  },
  {
    icon: Users,
    label: "Manager / IB",
    desc: "Desk manager — manages all assigned client accounts, processes deposits/withdrawals, places and edits trades on clients' behalf, manages copy trading, and exports PDF statements, all within admin-set permissions.",
  },
  {
    icon: User,
    label: "Client / Trader",
    desc: "Account holder — live & demo trading with TradingView Advanced Charts, copy trading & signals, advanced analytics, deposit/withdrawal requests, and the mobile PWA app.",
  },
];

// Updated permission matrix to reflect the 3-role model + the 18+ permission-key system
type PermCheck = true | false;

const permMatrix: { feature: string; admin: PermCheck; manager: PermCheck; client: PermCheck }[] = [
  { feature: "Create / Configure Managers", admin: true, manager: false, client: false },
  { feature: "Assign Clients to Desk", admin: true, manager: false, client: false },
  { feature: "Approve Deposits/Withdrawals", admin: true, manager: true, client: false },
  { feature: "Manual Trade / Close / Edit", admin: true, manager: true, client: false },
  { feature: "Trade Execution (own account)", admin: false, manager: false, client: true },
  { feature: "KYC Review", admin: true, manager: true, client: false },
  { feature: "Spread & Risk Configuration", admin: true, manager: false, client: false },
  { feature: "Feature Flags (5 keys)", admin: true, manager: false, client: false },
  { feature: "Audit Log Access", admin: true, manager: true, client: false },
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
  { icon: CandlestickChart, title: "TradingView Advanced Charts", desc: "Dual charting engine — TradingView Advanced Charts plus Lightweight Charts for a compact panel view, with SL/TP lines drawn automatically." },
  { icon: Zap, title: "One-click execution", desc: "Market, limit, and stop orders from the terminal in one tap, with real-time P&L, balance, and equity updates." },
  { icon: LayoutDashboard, title: "Multi-account dashboard", desc: "Switch instantly between multiple LIVE and DEMO accounts from one login — no re-authentication needed." },
];

// Client Panel — the 9 client-facing features from the PDF
const clientFeatures = [
  {
    icon: LineChart,
    title: "Live Trading & Advanced Charts",
    desc: "Professional-grade order execution with TradingView Advanced Charts and real-time position tracking at exact entry prices.",
    bullets: [
      "One-click market, limit & stop orders",
      "TradingView Advanced Charts with colored position lines per trade",
      "Real-time P&L, balance & equity updates",
      "SL / TP lines displayed on chart automatically",
      "Lightweight Charts for lightweight panel view",
    ],
  },
  {
    icon: Repeat,
    title: "Copy Trading & Signals",
    desc: "Subscribe to expert signal providers and have their trades copied automatically to your account in real-time.",
    bullets: [
      "Browse and subscribe to active signal providers",
      "Trades auto-copied to account in real-time",
      "Adjustable copy lot ratio per provider",
      "Track provider performance history & win rate",
      "Start or stop copying with a single tap",
    ],
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    desc: "In-depth performance reporting built into the platform so traders can analyse and improve without leaving the app.",
    bullets: [
      "P&L breakdown by symbol, date & period",
      "Win rate, loss rate & average trade size",
      "Equity curve & drawdown history chart",
      "Best and worst performing symbols",
      "Downloadable trade report summary",
    ],
  },
  {
    icon: Newspaper,
    title: "Market News Feed",
    desc: "Live financial news streamed directly inside the trading panel — no browser tabs, no distractions.",
    bullets: [
      "Real-time financial news from live sources",
      "Displayed inside the platform (no tab-switching)",
      "News visible alongside open trades & charts",
      "Helps traders react quickly to market events",
    ],
  },
  {
    icon: CalendarClock,
    title: "Economic Calendar",
    desc: "Full economic events calendar with impact ratings and real-time countdowns so traders never miss a key release.",
    bullets: [
      "High / Medium / Low impact colour coding",
      "Filter by country, currency & impact level",
      "Countdown timer to each scheduled release",
      "Actual vs forecast vs previous values shown",
    ],
  },
  {
    icon: LayoutGrid,
    title: "Multi-Account Dashboard",
    desc: "One login, multiple accounts — manage all LIVE and DEMO accounts from a single premium dashboard.",
    bullets: [
      "Multiple LIVE and DEMO accounts per client",
      "Animated premium account cards (distinct LIVE/DEMO)",
      "Instant account switch without re-login",
      "Balance, equity & margin visible per account",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile App — iOS & Android",
    desc: "A full Progressive Web App installable directly on any phone — no app store required, native-like experience.",
    bullets: [
      "Installable on iOS Safari & Android Chrome",
      "No app store — install directly from browser",
      "Safe area support for notched & rounded devices",
      "Bottom tab navigation optimised for mobile trading",
      "Real-time portfolio sync across all devices",
    ],
  },
  {
    icon: Wallet,
    title: "Deposits & Withdrawals",
    desc: "Clients submit fund requests directly from the platform and track their status in real-time through to completion.",
    bullets: [
      "Submit deposit requests with amount & method",
      "Submit withdrawal requests with bank/wallet details",
      "Live status tracking: Pending → Approved → Processed",
      "Push notification on approval or rejection",
      "Full transaction history with timestamps",
    ],
  },
  {
    icon: Bell,
    title: "Notifications & Alerts",
    desc: "Real-time alerts for trade events, price levels, and direct messages from account managers — all inside the app.",
    bullets: [
      "Trade opened / closed / margin call alerts",
      "Deposit & withdrawal status notifications",
      "Direct messages from assigned manager",
      "Platform announcements & news alerts",
    ],
  },
];

const backOfficeCards = [
  { icon: PlusCircle, iconColor: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900", title: "Deposit management", desc: "Multi-PSP support — Stripe, FasaPay, Skrill, crypto bridge, and manual wire. Auto-confirmation with configurable thresholds." },
  { icon: MinusCircle, iconColor: "text-rose-600", bg: "bg-rose-50 border-rose-200 dark:bg-rose-950/30 dark:border-rose-900", title: "Withdrawal processing", desc: "Client initiates, manager approves or escalates. Compliance hold flags, AML checks via ComplyAdvantage, and automatic payout routing." },
  { icon: Zap, iconColor: "text-amber-600", bg: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900", title: "Instant credit", desc: "Manager or admin can issue instant credit or bonus to any account — configurable with expiry, trading volume requirement, and auto-reversal rules." },
  { icon: ArrowLeftRight, iconColor: "text-indigo-500", bg: "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-900", title: "Internal transfer", desc: "Move funds between accounts or sub-wallets instantly. Manager desk can initiate intra-portfolio transfers with full audit trail." },
  { icon: Receipt, iconColor: "text-indigo-500", bg: "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-900", title: "Transaction ledger", desc: "Every debit, credit, fee, and swap recorded to an immutable ledger. Exportable as CSV, PDF, or MT4/MT5 report format." },
  { icon: DollarSign, iconColor: "text-indigo-500", bg: "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-900", title: "Multi-currency", desc: "USD, EUR, GBP, SGD and crypto base accounts. Real-time FX conversion at live mid-rate on every transaction." },
];

// Manager Tools — the 6 desk-manager tools from the PDF
const managerTools = [
  {
    icon: ClipboardList,
    title: "Client Portfolio Management",
    desc: "A full dashboard of every assigned client account — balances, equity, open positions, and full trade history at a glance.",
    bullets: [
      "All assigned client accounts in one view",
      "Balance, equity, margin & free margin per account",
      "Open trades, pending orders & closed trade history",
      "KYC document status per client",
      "Search, filter & sort across all client accounts",
    ],
  },
  {
    icon: ArrowLeftRight,
    title: "Process Deposits & Withdrawals",
    desc: "Review and approve client fund requests with a full workflow — every action logged for compliance and transparency.",
    bullets: [
      "View all pending deposit & withdrawal requests",
      "Approve or reject with optional notes",
      "Credit bonus amounts directly to accounts",
      "Transfer funds between client accounts",
      "All actions auto-logged in the audit trail",
    ],
  },
  {
    icon: Repeat,
    title: "Copy Trading Management",
    desc: "Set up and manage signal providers, monitor active copy relationships, and oversee subscriber performance.",
    bullets: [
      "Create & configure signal provider accounts",
      "Set and adjust copy lot ratios for followers",
      "View all active subscriber relationships",
      "Monitor provider trade history & performance",
      "Stop or pause copy relationships at any time",
    ],
  },
  {
    icon: MousePointerClick,
    title: "Trade Operations",
    desc: "Place and manage trades on behalf of client accounts — fully permission-controlled and audited on every action.",
    bullets: [
      "Place manual trades on any assigned client account",
      "Close open positions with one click",
      "Edit trade SL & TP levels",
      "View real-time P&L per trade and per account",
      "Full trade log with manager action timestamps",
    ],
  },
  {
    icon: FileText,
    title: "Reports & PDF Statements",
    desc: "Generate professional PDF account statements and trade history reports for any client — with full audit log access.",
    bullets: [
      "Export PDF account statement per client",
      "Includes trades, deposits & withdrawal history",
      "Date-range filtering for custom period reports",
      "Full audit log: every manager action timestamped",
      "Available for compliance review at any time",
    ],
  },
  {
    icon: MessageSquare,
    title: "Client Communications",
    desc: "Send targeted messages or broadcast announcements to clients — directly inside the platform notification system.",
    bullets: [
      "Broadcast notification to all assigned clients",
      "Send direct messages to individual accounts",
      "Announce promotions, events & platform updates",
      "Personalised account-specific alerts",
    ],
  },
];

// Admin Back Office — the 4 categories from the PDF (covers the 18+ permission keys & 5 feature flags)
const adminCategories = [
  {
    icon: KeyRound,
    title: "Granular Manager Permissions (18+ Keys)",
    desc: "Assign exactly the right access to each manager. Every operational and feature permission is individually controllable per person.",
    bullets: [
      "Client ops: create clients, delete clients, manage managers",
      "Finance: process deposits/withdrawals, credit bonus, transfer funds, edit/delete financials",
      "Trades: manual trade, close trades, edit trades, delete trades",
      "Tools: view audit log, export PDF, send notifications, edit spread",
      "Features: copy trading, analytics, news, calendar, referral program",
    ],
  },
  {
    icon: UserCog,
    title: "Full Client & Account Management",
    desc: "Complete control over every client — from account creation and KYC to leverage, account type, and manager assignment.",
    bullets: [
      "Create, edit & deactivate client accounts",
      "Assign clients to specific managers",
      "Configure account type, leverage & group",
      "Manage KYC documents & verification status",
      "View complete financial & trade history per client",
    ],
  },
  {
    icon: Gauge,
    title: "Risk Management & Spread Control",
    desc: "Configure spread markups, swap charges, and account type parameters — with a live risk dashboard across all client accounts.",
    bullets: [
      "Per-group spread markup (fixed pip or percentage)",
      "Enable or disable swap charges per account group",
      "Set account type parameters & leverage limits",
      "Real-time risk dashboard: total open exposure",
      "Monitor margin levels across all live accounts",
    ],
  },
  {
    icon: ToggleLeft,
    title: "Feature Flags & Access Control",
    desc: "Enable or disable the 5 premium trading tools per manager — clients only see what their manager is permitted to show them.",
    bullets: [
      "Copy Trading — auto-copy & signal subscriptions",
      "Advanced Analytics — detailed performance reporting",
      "Market News Feed — live in-platform news",
      "Economic Calendar — events with impact & countdowns",
      "Referral Program — client invite & earn bonuses",
    ],
  },
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
  { color: "text-emerald-500", event: "Manager created", detail: 'Admin created Manager "Nimal Perera" — desk #M-22', time: "09:41:03" },
  { color: "text-indigo-500", event: "Client login", detail: "C-4421 · Dinesh Fernando · IP 203.x.x.81 · Chrome", time: "09:38:17" },
  { color: "text-emerald-500", event: "Deposit approved", detail: "Manager M-22 approved $2,000 deposit · TXN-88241", time: "09:32:55" },
  { color: "text-amber-500", event: "Permission updated", detail: "Admin updated withdrawal permission for Manager M-19", time: "09:27:11" },
  { color: "text-indigo-500", event: "Trade opened", detail: "C-4422 opened 1.0 lot BUY XAU/USD @ 2339.80", time: "09:22:04" },
  { color: "text-rose-500", event: "Withdrawal rejected", detail: "Manager M-22 rejected $5,000 withdrawal — AML hold", time: "09:15:38" },
];

const auditFeatures = [
  { icon: Filter, title: "Smart filters", desc: "Filter by role, event type, date range, client, or manager. Export filtered results to CSV or PDF." },
  { icon: Clock, title: "Trade history", desc: "Complete record of every open/close, including entry, exit, P&L, swap, and commission per trade." },
  { icon: Lock, title: "Immutable records", desc: "Audit entries cannot be edited or deleted by any user role. Designed for regulatory inspection readiness." },
  { icon: Download, title: "Exportable statements", desc: "Generate account statements, trade reports, and tax summaries per client on demand." },
];

// Role Comparison — the 3-role breakdown from the PDF
const roleColumns = [
  {
    icon: User,
    label: "Client / Trader",
    sub: "Account Holder",
    items: [
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
    icon: Users,
    label: "Manager / IB",
    sub: "Desk Manager",
    items: [
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
    icon: ShieldCheck,
    label: "Admin / Broker",
    sub: "Platform Owner",
    items: [
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

const widgets = [
  { icon: LineChart, title: "Live chart widget", sub: "Embeddable TradingView chart with symbol switcher" },
  { icon: Wallet, title: "Deposit widget", sub: "Standalone fund your account flow" },
  { icon: Users, title: "IB partner portal", sub: "Referral link, commissions, and payout tracker" },
  { icon: IdCard, title: "KYC upload widget", sub: "Document upload with Sumsub identity check" },
  { icon: Smartphone, title: "Mobile app", sub: "iOS & Android PWA — installable, no app store needed" },
  { icon: Newspaper, title: "News feed widget", sub: "Live financial news inside the trading panel" },
  { icon: FileText, title: "Account statement", sub: "On-demand PDF & CSV statement widget" },
  { icon: Settings, title: "Admin back-office", sub: "Full desk portal for manager operations" },
];

const portalStats = [
  { n: "3", l: "User roles" },
  { n: "18+", l: "Permission keys" },
  { n: "5", l: "Feature flags" },
  { n: "99.9%", l: "Uptime SLA" },
];

// Platform Technology — the technology stack from the PDF
const techStack = [
  { label: "Charting", value: "TradingView", sub: "Advanced Charts + Lightweight Charts — dual engine" },
  { label: "Mobile", value: "PWA", sub: "Installable iOS & Android — no app store needed" },
  { label: "Real-Time", value: "WebSockets", sub: "Live price ticks, P&L & position sync" },
  { label: "Security", value: "2FA + OAuth", sub: "Google login, TOTP two-factor authentication" },
  { label: "Permissions", value: "Role-Based", sub: "18+ keys, two-gate feature flag control" },
  { label: "Reports", value: "PDF Export", sub: "Statements, trade history & audit log" },
  { label: "Accounts", value: "Multi-Account", sub: "Unlimited LIVE & DEMO per client" },
  { label: "Deployment", value: "Production Ready", sub: "Docker — single command deploy" },
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
        <p className={`mt-3 text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed ${center ? "max-w-[700px] mx-auto" : "max-w-[560px]"}`}>
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

function FeatureCard({
  icon: Icon, title, desc, bullets,
}: { icon: any; title: string; desc: string; bullets: string[] }) {
  return (
    <div className="p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors flex flex-col">
      <div className="flex h-9 w-9 items-center justify-center border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40 mb-3">
        <Icon className="h-4 w-4 text-indigo-500" />
      </div>
      <div className="text-[14px] font-bold text-gray-900 dark:text-white mb-1.5">{title}</div>
      <div className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed mb-3">{desc}</div>
      <ul className="mt-auto flex flex-col gap-1.5">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2 items-start text-[11.5px] text-gray-600 dark:text-gray-300 leading-snug">
            <span className="text-indigo-500 mt-[3px]">›</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function FeaturesPage() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">

      {/* ── HERO ─────────────────────────────── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/60 to-indigo-50/40 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-950 border-b border-gray-200/60 dark:border-gray-800 px-[5%] py-20 sm:py-16">
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
          <DiagBadge label="OrbitFX Solution · Professional Trading Platform" color="indigo" />
          <h1 className="mt-5 font-bold text-[clamp(34px,5vw,58px)] leading-[1.07] tracking-[-2px] text-gray-900 dark:text-white mb-4">
            The Complete Platform for<br />
            <span className="text-indigo-500">Modern Forex Brokerages.</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-[16px] leading-[1.8] max-w-[560px] mx-auto mb-7">
            OrbitFX Solution is a full-stack professional trading platform — built for traders who
            demand precision, managers who need control, and brokers who run serious operations.
            Everything in one place, live and production-ready.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {heroPills.map((p) => (
              <span
                key={p}
                className="text-[11px] font-bold px-3 py-1.5 border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 text-gray-600 dark:text-gray-400 tracking-[0.5px]"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-[820px] mx-auto border-t border-gray-200 dark:border-gray-800 pt-8">
            {heroStats.map((s) => (
              <div key={s.l}>
                <div className="font-mono font-bold text-[22px] text-indigo-500 leading-none">{s.n}</div>
                <div className="text-[10px] uppercase tracking-[1px] text-gray-400 mt-1.5">{s.l}</div>
              </div>
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
              sub="Admin creates Managers and assigns their client pools, with 18+ individually controllable permission keys. Every action is scoped — Managers can only see and act on clients within their own desk."
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
    <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-gray-500 dark:text-gray-400">
      Permission Matrix (of 18+ keys)
    </span>
  </div>

  {/* ADD THIS WRAPPER */}
  <div className="overflow-x-auto">
    <table className="w-full min-w-[420px] text-[12px] border-collapse">
      <thead>
        <tr>
          {["Feature", "Admin", "Manager", "Client"].map((h) => (
            <th
              key={h}
              className="text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400 px-3 py-2.5 border-b border-gray-100 dark:border-gray-800 text-left whitespace-nowrap"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {permMatrix.map((row, i) => (
          <tr key={row.feature} className={i < permMatrix.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}>
            <td className="px-3 py-2.5 font-bold text-gray-900 dark:text-white text-[12px] whitespace-nowrap">{row.feature}</td>
            <td className="px-3 py-2.5 text-center">{row.admin ? <Check /> : <Cross />}</td>
            <td className="px-3 py-2.5 text-center">{row.manager ? <Check /> : <Cross />}</td>
            <td className="px-3 py-2.5 text-center">{row.client ? <Check /> : <Cross />}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
        </div>
      </section>

      {/* ── CLIENT PANEL (9 features) ────────── */}
      <section className="py-20 px-[5%] bg-slate-50/70 dark:bg-gray-900/50">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="For Traders & Clients"
            badgeColor="indigo"
            title="Client Panel — Everything a Trader Needs"
            sub="A professional trading environment built for both new and experienced traders — accessible from desktop and mobile."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {clientFeatures.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} bullets={f.bullets} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE TRADING TERMINAL ────────────── */}
      <section className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div>
            <SectionHead
              badge="Live Trading"
              badgeColor="blue"
              title="Real-Time Terminal with Live Buy/Sell Execution"
              sub="Full-featured web terminal with live price feeds, one-click execution, position management, and integrated charting via TradingView Advanced Charts."
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

      {/* ── MANAGER TOOLS (6 tools) ──────────── */}
      <section className="py-20 px-[5%] bg-slate-50/70 dark:bg-gray-900/50">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="For IB & Desk Managers"
            badgeColor="blue"
            title="Manager Tools — Full Control Over Your Client Book"
            sub="Desk managers and IBs get a dedicated panel to monitor, manage, and operate their assigned client accounts — all within admin-defined permission limits."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {managerTools.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} bullets={f.bullets} />
            ))}
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

      {/* ── ADMIN BACK OFFICE ────────────────── */}
      <section className="py-20 px-[5%] bg-slate-50/70 dark:bg-gray-900/50">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="For Brokers & Administrators"
            badgeColor="amber"
            title="Admin Back Office — Run a Complete Brokerage Operation"
            sub="The admin has complete control — from configuring managers and setting permissions, to risk management and full platform oversight."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {adminCategories.map((c) => (
              <FeatureCard key={c.title} icon={c.icon} title={c.title} desc={c.desc} bullets={c.bullets} />
            ))}
          </div>
        </div>
      </section>

      {/* ── REAL-TIME NOTIFICATIONS ──────────── */}
      <section className="py-20 px-[5%] bg-white dark:bg-gray-950">
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
      <section className="py-20 px-[5%] bg-slate-50/70 dark:bg-gray-900/50">
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

      {/* ── PLATFORM TECHNOLOGY ──────────────── */}
      <section className="py-20 px-[5%] bg-slate-50/70 dark:bg-gray-900/50">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Platform Technology"
            badgeColor="indigo"
            title="Built on Professional-Grade Technology"
            sub="Every component chosen for reliability, speed, and a professional user experience."
            center
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {techStack.map((t) => (
              <div key={t.label} className="p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400 mb-2">{t.label}</div>
                <div className="text-[15px] font-bold text-gray-900 dark:text-white mb-1">{t.value}</div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}