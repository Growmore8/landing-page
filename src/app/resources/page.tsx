"use client";

import {
  BookOpen,
  Newspaper,
  Megaphone,
  Zap,
  Bell,
  FileText,
  HelpCircle,
  BookMarked,
  HeadphonesIcon,
  Activity,
  GitCompare,
  Code2,
  Layers,
  Video,
  ArrowRight,
  ExternalLink,
  Search,
  TrendingUp,
  Clock,
  Star,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const articlesNews = [
  {
    icon: BookOpen,
    label: "Blog",
    sub: "Short-form posts",
    href: "https://brokeret.com/blog",
    tag: "Popular",
    tagColor: "indigo",
  },
  {
    icon: FileText,
    label: "Articles",
    sub: "In-depth guides",
    href: "https://brokeret.com/articles",
    tag: "New",
    tagColor: "emerald",
  },
  {
    icon: Newspaper,
    label: "News",
    sub: "Industry updates",
    href: "https://brokeret.com/news",
    tag: null,
    tagColor: null,
  },
  {
    icon: Megaphone,
    label: "Product Updates",
    sub: "Feature releases",
    href: "https://brokeret.com/updates",
    tag: "Latest",
    tagColor: "blue",
  },
  {
    icon: Bell,
    label: "Notices",
    sub: "Announcements",
    href: "https://brokeret.com/notice",
    tag: null,
    tagColor: null,
  },
];

const helpDocs = [
  {
    icon: BookMarked,
    label: "Documentation",
    sub: "Full platform reference",
    href: "https://OrbitFXSolution.com/contact#",
    external: false,
  },
  {
    icon: Code2,
    label: "API Reference",
    sub: "Endpoints, auth & payloads",
    href: "https://OrbitFXSolution.com/contact#",
    external: false,
  },
  {
    icon: Layers,
    label: "Integration Guides",
    sub: "Connect OrbitFX to your stack",
    href: "https://OrbitFXSolution.com/contact#",
    external: false,
  },
  {
    icon: HelpCircle,
    label: "FAQ",
    sub: "Common questions answered",
    href: "https://brokeret.com/faq",
    external: false,
  },
  {
    icon: BookOpen,
    label: "Trading Glossary",
    sub: "FX & CFD terminology",
    href: "https://brokeret.com/glossary",
    external: false,
  },
  {
    icon: HeadphonesIcon,
    label: "Support",
    sub: "Support plans & SLAs",
    href: "https://brokeret.com/support-plans",
    external: false,
  },
  {
    icon: Activity,
    label: "System Status",
    sub: "Live uptime & incidents",
    href: "https://brokeret.com/status",
    external: false,
  },
];

const learningTools = [
  {
    icon: GitCompare,
    label: "Platform Comparison",
    sub: "OrbitFX vs the alternatives",
    href: "https://brokeret.com/trading-platform-comparison",
  },
  {
    icon: FileText,
    label: "Case Studies",
    sub: "Real broker setups, real numbers",
    href: "https://OrbitFXSolution.com/contact#",
  },
  {
    icon: Video,
    label: "Webinars",
    sub: "Live sessions & recordings",
    href: "https://OrbitFXSolution.com/contact#",
  },
];

const featuredArticles = [
  {
    tag: "Guide",
    tagColor: "indigo",
    title: "How to Set Up a White-Label Brokerage on OrbitFX",
    excerpt: "A step-by-step walkthrough of the OrbitFX onboarding flow — from entity setup to your first live account.",
    readTime: "12 min read",
    href: "https://brokeret.com/articles",
  },
  {
    tag: "Industry",
    tagColor: "blue",
    title: "APAC Retail Brokerage Trends: 2026 Outlook",
    excerpt: "Key regulatory shifts, technology adoption, and client acquisition patterns shaping the year ahead.",
    readTime: "8 min read",
    href: "https://brokeret.com/news",
  },
  {
    tag: "Product",
    tagColor: "emerald",
    title: "Inside the OrbitFX Risk Engine",
    excerpt: "A look at how anomaly detection, margin forecasting, and automated stop-out rules work together.",
    readTime: "6 min read",
    href: "https://brokeret.com/updates",
  },
];

const recentUpdates = [
  { version: "June 2026", date: "This month", note: "OrbitFX trading platform becomes available to new and existing brokers." },
  { version: "Onboarding", date: "Rolling basis", note: "Guided setup sessions for entity configuration, branding, and account structure." },
  { version: "Documentation", date: "Live now", note: "Reference docs and integration guides published alongside platform access." },
  { version: "Webinars", date: "Ongoing", note: "Walkthrough sessions covering the trading terminal, back office, and IB portal." },
];

const stats = [
  { n: "200+",  l: "Articles published"  },
  { n: "50+",   l: "Glossary terms"      },
  { n: "99.9%", l: "Docs uptime"         },
  { n: "48hr",  l: "Support response SLA"},
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

type BadgeColor = "indigo" | "blue" | "emerald" | "amber" | "rose" | "default";

function DiagBadge({ label, color = "indigo" }: { label: string; color?: BadgeColor }) {
  const c: Record<BadgeColor, string> = {
    default:  "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700",
    indigo:   "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
    blue:     "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    emerald:  "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    amber:    "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    rose:     "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800",
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

function InlineBadge({ label, color }: { label: string; color: string }) {
  const c: Record<string, string> = {
    indigo:  "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 border-indigo-200 dark:border-indigo-900",
    blue:    "bg-blue-50 dark:bg-blue-950/40 text-blue-500 border-blue-200 dark:border-blue-900",
    emerald: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border-emerald-200 dark:border-emerald-900",
    amber:   "bg-amber-50 dark:bg-amber-950/40 text-amber-600 border-amber-200 dark:border-amber-900",
  };
  return (
    <span className={`text-[9px] font-bold uppercase tracking-[1.5px] px-2 py-0.5 border ${c[color] ?? c.indigo}`}>
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
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
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

function ResourceCard({
  icon: Icon,
  label,
  sub,
  href,
  tag,
  tagColor,
  external = false,
}: {
  icon: React.ElementType;
  label: string;
  sub: string;
  href: string;
  tag?: string | null;
  tagColor?: string | null;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-start gap-3 p-4
        border border-gray-200 dark:border-gray-800
        bg-white dark:bg-gray-900
        hover:border-indigo-400 dark:hover:border-indigo-700
        hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20
        transition-all duration-150 no-underline"
    >
      <div className="flex-shrink-0 mt-0.5 flex h-9 w-9 items-center justify-center
        border border-indigo-100 dark:border-indigo-900
        bg-indigo-50 dark:bg-indigo-950/40
        group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60
        group-hover:border-indigo-300 dark:group-hover:border-indigo-700
        transition-colors"
      >
        <Icon className="h-4 w-4 text-indigo-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[13px] font-bold text-gray-900 dark:text-white leading-snug
            group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {label}
          </span>
          {tag && tagColor && <InlineBadge label={tag} color={tagColor} />}
          {external && <ExternalLink className="h-3 w-3 text-gray-300 dark:text-gray-700 flex-shrink-0" />}
        </div>
        <div className="text-[11px] text-gray-400 dark:text-gray-500 leading-snug">{sub}</div>
      </div>
      <ArrowRight className="h-3.5 w-3.5 text-gray-300 dark:text-gray-700 flex-shrink-0 mt-1
        group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all duration-150" />
    </Link>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function ResourcesPage() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/60 to-indigo-50/40 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-950 pt-16 pb-20 px-[5%] border-b border-gray-200/60 dark:border-gray-800">
        <div
          className="absolute inset-0 pointer-events-none opacity-25 dark:opacity-15"
          style={{
            backgroundImage: "linear-gradient(rgba(91,140,255,0.09) 1px,transparent 1px),linear-gradient(90deg,rgba(91,140,255,0.09) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <DiagBadge label="Resources" color="indigo" />
            <h1 className="mt-5 font-bold text-[clamp(34px,5vw,58px)] leading-[1.07] tracking-[-2px] text-gray-900 dark:text-white mb-5">
              Everything You Need<br />
              <span className="text-indigo-500">to Know OrbitFX.</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-[16px] leading-[1.8] max-w-[440px] mb-6">
              Guides, documentation, news, glossary, system status, and platform comparisons — all in one place for brokers building on OrbitFX.
            </p>

            {/* Availability note */}
            <div className="flex items-center gap-2 mb-6 px-4 py-2.5 border border-indigo-200 dark:border-indigo-900 bg-indigo-50/60 dark:bg-indigo-950/30 max-w-[440px]">
              <Sparkles className="h-4 w-4 text-indigo-500 flex-shrink-0" />
              <span className="text-[12px] text-gray-600 dark:text-gray-300 leading-snug">
                The OrbitFX trading platform is becoming available this month — documentation and onboarding resources are live now.
              </span>
            </div>

            {/* Search bar */}
            <div className="flex gap-0 max-w-[420px]">
              <div className="flex-1 flex items-center gap-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2.5">
                <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search docs, articles, glossary…"
                  className="flex-1 text-[13px] bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 placeholder:text-gray-400"
                />
              </div>
              <Button className="rounded-none bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-widest text-[10px] px-5 flex-shrink-0">
                Search
              </Button>
            </div>
          </div>

          {/* Right — quick-access stat cards */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <Card key={s.l} className="rounded-none border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm shadow-none">
                <CardContent className="p-5">
                  <div className="font-mono font-bold text-[30px] text-gray-900 dark:text-white leading-none tracking-tight">{s.n}</div>
                  <div className="text-[11px] text-gray-400 mt-2 tracking-wide">{s.l}</div>
                </CardContent>
              </Card>
            ))}
            <Card className="col-span-2 rounded-none border border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-none">
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[12px] font-bold text-gray-900 dark:text-white mb-0.5">Platform documentation</div>
                  <div className="text-[11px] text-gray-400">Setup guides, API reference & integration docs</div>
                </div>
                <Link
                  href="https://OrbitFXSolution.com/contact#"
                  className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-indigo-500 hover:text-indigo-600 transition-colors no-underline flex-shrink-0"
                >
                  Open docs <ExternalLink className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── ARTICLES & NEWS ──────────────────────── */}
      <section id="news" className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-14">
          {/* Left — section list */}
          <div className="lg:col-span-1">
            <SectionHead
              badge="Articles & News"
              badgeColor="indigo"
              title="Stay Informed"
              sub="From short blog posts to in-depth industry analysis — everything published by the OrbitFX team."
            />
            <div className="flex flex-col gap-2">
              {articlesNews.map((item) => (
                <ResourceCard key={item.label} {...item} tag={item.tag} tagColor={item.tagColor} />
              ))}
            </div>
          </div>

          {/* Right — featured articles */}
          <div className="lg:col-span-2">
            <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-gray-400 mb-4 font-mono flex items-center gap-2">
              <Star className="h-3 w-3 text-amber-400" />
              Featured reads
            </div>
            <div className="flex flex-col gap-4">
              {featuredArticles.map((a, i) => (
                <Link
                  key={i}
                  href={a.href}
                  className="group flex gap-5 p-5 border border-gray-200 dark:border-gray-800
                    hover:border-indigo-300 dark:hover:border-indigo-700
                    bg-white dark:bg-gray-900
                    hover:bg-indigo-50/20 dark:hover:bg-indigo-950/10
                    transition-all no-underline"
                >
                  {/* Index number */}
                  <div className="flex-shrink-0 font-mono text-[28px] font-bold text-gray-100 dark:text-gray-800 leading-none pt-1 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <InlineBadge label={a.tag} color={a.tagColor} />
                      <span className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                        <Clock className="h-3 w-3" />{a.readTime}
                      </span>
                    </div>
                    <div className="text-[15px] font-bold text-gray-900 dark:text-white leading-snug mb-2
                      group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {a.title}
                    </div>
                    <div className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{a.excerpt}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-300 dark:text-gray-700 flex-shrink-0 mt-1
                    group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="https://brokeret.com/articles"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-indigo-500 hover:text-indigo-600 transition-colors no-underline"
              >
                Browse all articles <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HELP & DOCUMENTATION ─────────────────── */}
      <section id="documentation" className="py-20 px-[5%] bg-slate-50/70 dark:bg-gray-900/50">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div>
            <SectionHead
              badge="Help & Documentation"
              badgeColor="blue"
              title="Find Answers Fast"
              sub="Reference documentation, API details, integration guides, FAQs, terminology, and live system status — everything to get your team up to speed."
            />
            <div className="flex flex-col gap-2">
              {helpDocs.map((item) => (
                <ResourceCard key={item.label} {...item} external={item.external} />
              ))}
            </div>
          </div>

          {/* Right — system status mock + docs callout */}
          <div className="flex flex-col gap-4">
            {/* System status widget */}
            <Card className="rounded-none border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-none">
              <CardContent className="p-0">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-[12px] font-bold text-gray-900 dark:text-white">System Status</span>
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    All systems operational
                  </span>
                </div>
                {[
                  { name: "Trading Terminal",    status: "Operational", color: "bg-emerald-400" },
                  { name: "Client Portal",       status: "Operational", color: "bg-emerald-400" },
                  { name: "Back Office",         status: "Operational", color: "bg-emerald-400" },
                  { name: "Payment Gateway",     status: "Operational", color: "bg-emerald-400" },
                  { name: "Market Data Feeds",   status: "Operational", color: "bg-emerald-400" },
                  { name: "KYC / AML Engine",    status: "Operational", color: "bg-emerald-400" },
                ].map((s, i, arr) => (
                  <div
                    key={s.name}
                    className={`flex items-center justify-between px-5 py-3 ${i < arr.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}`}
                  >
                    <span className="text-[13px] text-gray-700 dark:text-gray-300">{s.name}</span>
                    <span className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
                      <span className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
                      {s.status}
                    </span>
                  </div>
                ))}
                <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <span className="text-[11px] text-gray-400 font-mono">Last checked: just now</span>
                  <Link
                    href="https://brokeret.com/status"
                    className="text-[11px] font-bold text-indigo-500 hover:text-indigo-600 transition-colors no-underline flex items-center gap-1"
                  >
                    Full status page <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick support CTA */}
            <Card className="rounded-none border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
              <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                <div>
                  <div className="text-[13px] font-bold text-gray-900 dark:text-white mb-1">Can't find what you need?</div>
                  <div className="text-[12px] text-gray-400 leading-relaxed">Our support team responds within 48 hours on all plans.</div>
                </div>
                <Link
                  href="https://brokeret.com/support-plans"
                  className="flex-shrink-0 no-underline"
                >
                  <Button className="rounded-none bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 font-bold uppercase tracking-widest text-[10px] px-5 py-2.5">
                    View support plans →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── LEARNING & COMPARISONS ───────────────── */}
      <section id="comparisons" className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-14 items-start">
          {/* Left */}
          <div className="lg:col-span-1">
            <SectionHead
              badge="Learning & Comparisons"
              badgeColor="emerald"
              title="Evaluate & Explore"
              sub="Compare platforms, browse real broker case studies, and join webinars covering setup and best practices."
            />
            <div className="flex flex-col gap-2">
              {learningTools.map((item) => (
                <ResourceCard
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  sub={item.sub}
                  href={item.href}
                />
              ))}
            </div>
          </div>

          {/* Right — what's coming this month feed */}
          <div className="lg:col-span-2">
            <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-gray-400 mb-4 font-mono flex items-center gap-2">
              <TrendingUp className="h-3 w-3 text-indigo-400" />
              What's happening this month
            </div>
            <Card className="rounded-none border border-gray-200 dark:border-gray-800 overflow-hidden shadow-none">
              <CardContent className="p-0">
                <div className="flex items-center justify-between px-5 py-3.5 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-[12px] font-bold text-gray-900 dark:text-white">June 2026 Rollout</span>
                  <Link
                    href="https://brokeret.com/updates"
                    className="text-[11px] font-bold text-indigo-500 hover:text-indigo-600 transition-colors no-underline flex items-center gap-1"
                  >
                    Product updates <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
                {recentUpdates.map((entry, i) => (
                  <div
                    key={entry.version}
                    className={`flex gap-5 px-5 py-4 ${i < recentUpdates.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""} hover:bg-gray-50 dark:hover:bg-gray-900/70 transition-colors`}
                  >
                    <div className="flex-shrink-0 text-right w-[110px]">
                      <div className="font-mono text-[12px] font-bold text-indigo-500">{entry.version}</div>
                      <div className="font-mono text-[10px] text-gray-400 mt-0.5">{entry.date}</div>
                    </div>
                    <div className="flex-1 text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">{entry.note}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Webinar CTA card */}
            <div className="mt-4 border border-indigo-200 dark:border-indigo-900 bg-gradient-to-r from-indigo-50 to-blue-50/50 dark:from-indigo-950/30 dark:to-blue-950/20 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Video className="h-4 w-4 text-indigo-500" />
                  <span className="text-[13px] font-bold text-gray-900 dark:text-white">Join a setup webinar</span>
                </div>
                <div className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  Walkthroughs of the trading terminal, back office, IB portal, and mobile app for new brokers.
                </div>
              </div>
              <Link href="https://OrbitFXSolution.com/contact#" className="flex-shrink-0 no-underline">
                <Button className="rounded-none bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-widest text-[10px] px-6 py-2.5">
                  Reserve a Spot →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL RESOURCES GRID ───────────────────── */}
      <section id="quick" className="py-20 px-[5%] bg-slate-50/70 dark:bg-gray-900/50">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Quick Access"
            badgeColor="default"
            title="All Resources at a Glance"
            sub="Every link in one place — jump to what you need."
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1 */}
            <div>
              <div className="text-[10px] font-extrabold tracking-[2px] uppercase text-indigo-500 mb-3 font-mono px-1">Articles & News</div>
              <div className="flex flex-col gap-2">
                {articlesNews.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5
                      border border-gray-200 dark:border-gray-800
                      bg-white dark:bg-gray-900
                      hover:border-indigo-300 dark:hover:border-indigo-700
                      hover:bg-indigo-50/30 dark:hover:bg-indigo-950/10
                      transition-all no-underline group"
                  >
                    <item.icon className="h-3.5 w-3.5 text-indigo-500 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-[12px] font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.label}</div>
                      <div className="text-[10px] text-gray-400">{item.sub}</div>
                    </div>
                    <ArrowRight className="h-3 w-3 text-gray-300 dark:text-gray-700 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <div className="text-[10px] font-extrabold tracking-[2px] uppercase text-blue-500 mb-3 font-mono px-1">Help & Documentation</div>
              <div className="flex flex-col gap-2">
                {helpDocs.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 px-3 py-2.5
                      border border-gray-200 dark:border-gray-800
                      bg-white dark:bg-gray-900
                      hover:border-blue-300 dark:hover:border-blue-700
                      hover:bg-blue-50/30 dark:hover:bg-blue-950/10
                      transition-all no-underline group"
                  >
                    <item.icon className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-[12px] font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                        {item.label}
                        {item.external && <ExternalLink className="h-2.5 w-2.5 text-gray-300" />}
                      </div>
                      <div className="text-[10px] text-gray-400">{item.sub}</div>
                    </div>
                    <ArrowRight className="h-3 w-3 text-gray-300 dark:text-gray-700 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3 */}
            <div>
              <div className="text-[10px] font-extrabold tracking-[2px] uppercase text-emerald-500 mb-3 font-mono px-1">Learning & Comparisons</div>
              <div className="flex flex-col gap-2">
                {learningTools.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5
                      border border-gray-200 dark:border-gray-800
                      bg-white dark:bg-gray-900
                      hover:border-emerald-300 dark:hover:border-emerald-700
                      hover:bg-emerald-50/30 dark:hover:bg-emerald-950/10
                      transition-all no-underline group"
                  >
                    <item.icon className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-[12px] font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-gray-400">{item.sub}</div>
                    </div>
                    <ArrowRight className="h-3 w-3 text-gray-300 dark:text-gray-700 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>

              {/* Rollout mini */}
              <Card className="mt-4 rounded-none border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-none">
                <CardContent className="p-0">
                  <div className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gray-500">This month</span>
                    <Link href="https://brokeret.com/updates"
                      className="text-[10px] text-indigo-500 font-bold no-underline hover:text-indigo-600 transition-colors">
                      All →
                    </Link>
                  </div>
                  <div className="px-3 py-3">
                    <div className="font-mono text-[11px] font-bold text-indigo-500 mb-0.5">{recentUpdates[0].version} · {recentUpdates[0].date}</div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">{recentUpdates[0].note}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
