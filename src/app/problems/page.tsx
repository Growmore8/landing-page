"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Problem {
  id: number;
  icon: string;
  pain: string;
  painDetail: string;
  solution: string;
  solutionDetail: string;
  stat: string;
  statLabel: string;
  tag: string;
  category: string;
  impact: string;
  impactColor: "red" | "orange" | "yellow";
  features: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROBLEMS: Problem[] = [
  {
    id: 1,
    icon: "solar:cpu-bolt-bold-duotone",
    pain: "Outdated Execution Infrastructure",
    painDetail:
      "Legacy platforms built on decade-old architecture can't keep pace with modern market microstructure. Slow order routing, missed fills, and unpredictable latency erode trader trust and retention — directly hitting your bottom line.",
    solution: "Sub-Millisecond Order Execution",
    solutionDetail:
      "OrbitFX delivers FIX-native order routing via co-located infrastructure with end-to-end latency under 1ms. Smart order matching, configurable execution modes, and real-time fill reporting — built for live market conditions from day one.",
    stat: "< 1ms",
    statLabel: "Order Fills",
    tag: "Execution",
    category: "Infrastructure",
    impact: "Critical",
    impactColor: "red",
    features: [
      "FIX 4.4 / 5.0 protocol execution",
      "Co-located matching infrastructure",
      "Configurable STP / DMA modes",
      "Real-time fill & slippage reporting",
      "Zero-downtime failover architecture",
    ],
  },
  {
    id: 2,
    icon: "solar:plug-circle-bold-duotone",
    pain: "Single LP Dependency & Wide Spreads",
    painDetail:
      "Relying on a single liquidity provider means you're exposed to their outages, re-quotes, and pricing gaps. During high-impact news events — exactly when your traders are most active — your execution degrades exactly when it matters most.",
    solution: "Multi-LP Aggregation & Smart Routing",
    solutionDetail:
      "OrbitFX connects to multiple tier-1 banks and ECN providers simultaneously. Our aggregation engine selects the best bid/offer across all connected LPs in real time, with automatic failover if any provider goes dark.",
    stat: "10+",
    statLabel: "LP Connections",
    tag: "Liquidity",
    category: "Connectivity",
    impact: "Critical",
    impactColor: "red",
    features: [
      "Multi-LP concurrent aggregation",
      "Best-bid / best-offer routing",
      "Automatic LP failover",
      "Per-instrument LP assignment",
      "Spread markup & markup reporting",
    ],
  },
  {
    id: 3,
    icon: "solar:chart-bold-duotone",
    pain: "Poor Mobile Trading Experience",
    painDetail:
      "Traders don't stay on platforms with laggy, feature-stripped mobile apps. If the mobile experience is slow, crashes on chart load, or missing basic order types — they churn to a competitor within weeks.",
    solution: "Native iOS & Android Trading Apps",
    solutionDetail:
      "OrbitFX ships fully native iOS and Android apps — not wrapped web views. Biometric authentication, real-time push alerts, full charting with 50+ indicators, and one-tap execution. Fully white-labelled under your brand with your App Store listing.",
    stat: "iOS & Android",
    statLabel: "Native Apps",
    tag: "Mobile",
    category: "Product",
    impact: "High",
    impactColor: "orange",
    features: [
      "Native iOS & Android builds",
      "Biometric login (Face ID / Touch ID)",
      "Real-time push notifications",
      "Full chart suite on mobile",
      "Your brand in the App Store",
    ],
  },
  {
    id: 4,
    icon: "solar:shield-warning-bold-duotone",
    pain: "Zero Real-Time Risk Visibility",
    painDetail:
      "Operating a brokerage without live exposure data is flying blind. Without real-time margin monitoring, per-group controls, and configurable routing rules, a single adverse move can create outsized liability before your team even notices.",
    solution: "Live Risk Desk & Exposure Controls",
    solutionDetail:
      "OrbitFX Risk Desk gives compliance teams a live view of all open positions, margin utilisation, and net exposure across every account group. Set threshold alerts, configure A-book / B-book routing per instrument, and control leverage per segment — all in one interface.",
    stat: "Real-time",
    statLabel: "Risk Monitoring",
    tag: "Risk",
    category: "Compliance",
    impact: "Critical",
    impactColor: "red",
    features: [
      "Live position & net exposure monitor",
      "Per-group margin & leverage controls",
      "A-book / B-book routing rules",
      "Automated threshold-based alerts",
      "Regulatory reporting exports",
    ],
  },
  {
    id: 5,
    icon: "solar:graph-up-bold-duotone",
    pain: "6–12 Month Platform Build Times",
    painDetail:
      "Custom platform builds eat capital and delay revenue. By the time you go live, the market has moved, your team has churned, and you've spent 12 months solving problems OrbitFX already solved for 400+ brokerages.",
    solution: "Production-Ready in 14 Days",
    solutionDetail:
      "OrbitFX deploys a fully configured, white-labelled trading environment in under 14 days. Our implementation team handles liquidity connections, risk desk setup, terminal configuration, and full UAT — so your team just needs to launch.",
    stat: "14 Days",
    statLabel: "Time to Live",
    tag: "Deployment",
    category: "Operations",
    impact: "High",
    impactColor: "orange",
    features: [
      "End-to-end managed implementation",
      "UAT sandbox before go-live",
      "Dedicated implementation manager",
      "Branding & UI configuration",
      "Full handover & team training",
    ],
  },
  {
    id: 6,
    icon: "solar:wallet-money-bold-duotone",
    pain: "Runaway Infrastructure Costs",
    painDetail:
      "Self-hosted execution servers, co-location fees, feed handler maintenance, DR infrastructure — these compound fast. A mid-size brokerage can spend $500K+ annually on infrastructure that still doesn't match a managed platform's reliability.",
    solution: "Fully Managed Cloud Infrastructure",
    solutionDetail:
      "OrbitFX is multi-region, cloud-hosted, and fully managed. No servers to rack, no patches to apply, no infrastructure team to hire. 99.9% uptime SLA with active-active failover — you pay for outcomes, not overhead.",
    stat: "Zero",
    statLabel: "Infra Overhead",
    tag: "Infrastructure",
    category: "Cost",
    impact: "High",
    impactColor: "orange",
    features: [
      "Multi-region active-active setup",
      "Zero infrastructure team required",
      "99.9% uptime SLA guarantee",
      "Automatic patching & upgrades",
      "Predictable monthly billing",
    ],
  },
];

const IMPACT_STATS = [
  { val: "< 1ms", label: "Order execution latency" },
  { val: "14 days", label: "Average go-live timeline" },
  { val: "400+", label: "Brokerages running on OrbitFX" },
  { val: "99.9%", label: "Platform uptime SLA" },
  { val: "Zero", label: "Infrastructure team needed" },
  { val: "50+", label: "Asset classes supported" },
];

// ─── DiagBadge ────────────────────────────────────────────────────────────────
function DiagBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[10px] font-extrabold tracking-[2px] uppercase px-3.5 py-1 border border-gray-200 dark:border-gray-700"
      style={{ clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}
    >
      {label}
    </span>
  );
}

// ─── useCountUp hook ──────────────────────────────────────────────────────────
function useCountUp(target: string, duration = 1200, triggered = false) {
  const [display, setDisplay] = useState("0");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!triggered) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) { setDisplay(target); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const cur = Math.round(ease * num * 10) / 10;
      setDisplay(target.replace(/[0-9.]+/, cur % 1 === 0 ? String(cur) : cur.toFixed(1)));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else setDisplay(target);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [triggered, target, duration]);

  return display;
}

// ─── useInView hook ───────────────────────────────────────────────────────────
function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Animated counter cell ────────────────────────────────────────────────────
function StatCell({ val, label, triggered }: { val: string; label: string; triggered: boolean }) {
  const display = useCountUp(val, 1400, triggered);
  return (
    <div className="border-r border-gray-200 dark:border-gray-700 last:border-r-0 px-6 py-5 text-center">
      <div className="font-mono font-black text-2xl text-gray-900 dark:text-white leading-none">{display}</div>
      <div className="text-[11px] text-gray-400 mt-1.5 tracking-wide leading-snug">{label}</div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function ProblemsHero() {
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const move = (e: MouseEvent) => {
      const r = grid.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      grid.style.setProperty("--mx", `${x}%`);
      grid.style.setProperty("--my", `${y}%`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <style>{`
        @keyframes hero-in{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        .ph{animation:hero-in 0.65s cubic-bezier(.22,1,.36,1) both}
        .ph-1{animation-delay:0.05s}.ph-2{animation-delay:0.15s}.ph-3{animation-delay:0.25s}.ph-4{animation-delay:0.35s}.ph-5{animation-delay:0.45s}
        .problems-grid{
          background-image:linear-gradient(rgba(99,102,241,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.06) 1px,transparent 1px);
          background-size:44px 44px;
        }
        .problems-glow{
          background:radial-gradient(circle at var(--mx,50%) var(--my,40%), rgba(99,102,241,0.14) 0%, transparent 55%);
          transition:background 0.1s ease;
        }
        @keyframes float-badge{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .float-b{animation:float-badge var(--ft,6s) ease-in-out infinite}
        @keyframes scan-line{from{transform:translateY(-100%)}to{transform:translateY(600%)} }
        .scan{animation:scan-line 3.5s linear infinite;opacity:0.03}
        @keyframes blink-dot{0%,100%{opacity:1}50%{opacity:0.2}}
        .blink{animation:blink-dot 1.4s ease-in-out infinite}
      `}</style>

      <section className="relative overflow-hidden bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-gray-700">
        <div ref={gridRef} className="absolute inset-0 problems-grid pointer-events-none" />
        <div className="absolute inset-0 problems-glow pointer-events-none" />

        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="scan absolute left-0 right-0 h-px bg-indigo-400" />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 py-20 lg:py-28">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="ph ph-1 inline-flex items-center gap-2 mb-6 w-fit border border-red-500/20 bg-red-500/[0.06] dark:bg-red-500/10 px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 blink" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-red-600 dark:text-red-400">6 Problems. One Platform.</span>
            </div>

            <h1
              className="ph ph-2 font-black leading-[1.02] tracking-tight text-slate-900 dark:text-white mb-5"
              style={{ fontSize: "clamp(36px,5vw,62px)", letterSpacing: "-2px", fontFamily: "'Space Mono', monospace" }}
            >
              What Breaks<br />
              <span className="text-indigo-500">Brokerages.</span><br />
              How We Fix It.
            </h1>

            <p className="ph ph-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-[500px] mb-8">
              Every brokerage faces the same six infrastructure failures. OrbitFX was built specifically to eliminate each one — before they cost you traders, capital, or reputation.
            </p>

            <div className="ph ph-4 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => router.push("/contact")}
                className="rounded-none bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-gray-200 px-7 py-3 font-bold tracking-widest uppercase text-[10px] font-mono"
              >
                Fix These Problems →
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/platform")}
                className="rounded-none border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-3 font-bold tracking-wide text-sm"
              >
                Explore Platform
              </Button>
            </div>
          </div>

          {/* Floating impact badges */}
          <div className="hidden lg:block">
            {[
              { label: "Execution latency", val: "< 1ms", up: true, style: { right: "18%", top: "15%", "--ft": "7s" } as React.CSSProperties },
              { label: "Go-live time", val: "14 days", up: true, style: { right: "6%", top: "42%", "--ft": "8.5s" } as React.CSSProperties },
              { label: "Active brokers", val: "400+", up: true, style: { right: "22%", bottom: "18%", "--ft": "6.2s" } as React.CSSProperties },
            ].map((b, i) => (
              <div
                key={i}
                className="float-b absolute flex items-center gap-2 bg-white/90 dark:bg-slate-900/80 border border-indigo-500/15 backdrop-blur-sm px-4 py-2.5"
                style={b.style}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                <span className="text-[10px] text-gray-400 font-mono">{b.label}</span>
                <span className="text-sm font-black text-gray-900 dark:text-white font-mono ml-1">{b.val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Impact Stats Bar ──────────────────────────────────────────────────────────
function ImpactStatsBar() {
  const { ref, inView } = useInView(0.4);
  return (
    <div
      ref={ref}
      className="grid grid-cols-3 md:grid-cols-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 overflow-x-auto"
    >
      {IMPACT_STATS.map((s) => (
        <StatCell key={s.label} val={s.val} label={s.label} triggered={inView} />
      ))}
    </div>
  );
}

// ─── Problem Detail Card ──────────────────────────────────────────────────────
function ProblemCard({ p, index }: { p: Problem; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isEven = index % 2 === 0;
  const impactColors = {
    red: "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/50",
    orange: "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800/50",
    yellow: "bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50",
  };

  return (
    <div
      className={`reveal border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 ${expanded ? "bg-indigo-500/[0.02] dark:bg-indigo-950/20" : "bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900/50"}`}
      data-dir={isEven ? "left" : "right"}
      data-delay={`${index * 60}`}
    >
      {/* Collapsed / summary row */}
      <button
        className="w-full text-left px-6 md:px-10 py-6 grid grid-cols-12 gap-4 md:gap-6 items-center group"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {/* Number */}
        <div className="col-span-1 hidden md:flex items-center justify-center">
          <span
            className={`font-mono text-[11px] font-black w-9 h-9 border-2 flex items-center justify-center transition-colors ${expanded ? "border-indigo-500 text-indigo-500 bg-indigo-500/10" : "border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600"}`}
          >
            {String(p.id).padStart(2, "0")}
          </span>
        </div>

        {/* Icon + pain title */}
        <div className="col-span-10 md:col-span-6 flex items-center gap-4">
          <span className={`transition-colors flex-shrink-0 ${expanded ? "text-indigo-500" : "text-gray-400"}`}>
            <Icon icon={p.icon} width={28} height={28} />
          </span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[9px] font-bold uppercase tracking-[2px] px-2 py-0.5 border font-mono ${impactColors[p.impactColor]}`}
              >
                {p.impact}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[2px] px-2 py-0.5 border border-gray-200 dark:border-gray-700 text-gray-400 bg-gray-50 dark:bg-gray-800 font-mono">
                {p.tag}
              </span>
            </div>
            <h3
              className={`font-bold text-base mt-1 transition-colors leading-snug ${expanded ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"}`}
            >
              {p.pain}
            </h3>
          </div>
        </div>

        {/* Stat */}
        <div className="col-span-2 hidden md:block text-right">
          <div className="font-black font-mono text-lg text-gray-900 dark:text-white leading-none">{p.stat}</div>
          <div className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wide">{p.statLabel}</div>
        </div>

        {/* Expand toggle */}
        <div className="col-span-2 md:col-span-1 flex justify-end items-center gap-2">
          <span
            className={`text-[10px] font-bold uppercase tracking-wide font-mono hidden md:block transition-colors ${expanded ? "text-indigo-500" : "text-gray-300 dark:text-gray-600 group-hover:text-gray-500"}`}
          >
            {expanded ? "Collapse" : "Expand"}
          </span>
          <span
            className={`w-7 h-7 border flex items-center justify-center transition-all duration-300 ${expanded ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-500 rotate-45" : "border-gray-200 dark:border-gray-700 text-gray-400 group-hover:border-indigo-500/30 group-hover:text-indigo-500"}`}
          >
            <Icon icon="solar:add-circle-bold" width={14} />
          </span>
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-6 md:px-10 pb-8 grid md:grid-cols-2 gap-8 border-t border-gray-100 dark:border-gray-800 pt-6">
          {/* Pain */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-5 bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                <Icon icon="solar:close-circle-bold" className="text-red-500" width={11} />
              </span>
              <span className="text-red-500 dark:text-red-400 text-[10px] font-bold uppercase tracking-[2px] font-mono">The Problem</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed ml-7">{p.painDetail}</p>
          </div>

          {/* Solution */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-5 bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <Icon icon="solar:check-circle-bold" className="text-indigo-500" width={11} />
              </span>
              <span className="text-indigo-500 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-[2px] font-mono">OrbitFX Solution: {p.solution}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed ml-7 mb-5">{p.solutionDetail}</p>
            <ul className="space-y-2 ml-7">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                  <span className="w-4 h-4 border border-indigo-500/20 bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon icon="solar:check-bold" className="text-indigo-500 dark:text-indigo-400" width={9} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Problems List ─────────────────────────────────────────────────────────────
function ProblemsList() {
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;
  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", "Infrastructure", "Connectivity", "Product", "Compliance", "Operations", "Cost"];
  const filtered = filter === "All" ? PROBLEMS : PROBLEMS.filter((p) => p.category === filter);

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="reveal" data-dir="left" data-delay="0">
              <DiagBadge label="Problem → Solution" />
            </div>
            <h2
              className="reveal text-3xl md:text-4xl font-black mt-4 tracking-tight text-gray-900 dark:text-white"
              data-dir="left"
              data-delay="80"
            >
              Every Problem. Every Fix.
            </h2>
            <p className="reveal text-gray-400 text-sm mt-2 max-w-md" data-dir="left" data-delay="120">
              Expand any problem to see exactly how OrbitFX eliminates it.
            </p>
          </div>

          {/* Filter chips */}
          <div className="reveal flex flex-wrap gap-2" data-dir="right" data-delay="80">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`text-[10px] font-bold uppercase tracking-[1.5px] px-3 py-1.5 border transition-all font-mono ${filter === c
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                    : "border-gray-200 dark:border-gray-700 text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Column headers */}
        <div className="hidden md:grid grid-cols-12 gap-6 px-10 mb-2 pb-3 border-b border-gray-200 dark:border-gray-700">
          <div className="col-span-1 text-[9px] font-bold uppercase tracking-[2px] text-gray-300 dark:text-gray-600 font-mono">#</div>
          <div className="col-span-6 text-[9px] font-bold uppercase tracking-[2px] text-gray-300 dark:text-gray-600 font-mono">Problem</div>
          <div className="col-span-2 text-right text-[9px] font-bold uppercase tracking-[2px] text-gray-300 dark:text-gray-600 font-mono">OrbitFX Metric</div>
          <div className="col-span-1 text-right text-[9px] font-bold uppercase tracking-[2px] text-gray-300 dark:text-gray-600 font-mono" />
        </div>

        {/* Problem rows */}
        <div className="border-t border-gray-200 dark:border-gray-700">
          {filtered.map((p, i) => (
            <ProblemCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Visual comparison ─────────────────────────────────────────────────────────
function ComparisonSection() {
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;
  const rows = [
    { feature: "Order Execution Latency", legacy: "> 50ms", OrbitFX: "< 1ms", better: true },
    { feature: "Liquidity Sources", legacy: "1 LP", OrbitFX: "10+ LPs aggregated", better: true },
    { feature: "Mobile Trading App", legacy: "Web wrapper (slow)", OrbitFX: "Native iOS & Android", better: true },
    { feature: "Risk Monitoring", legacy: "Manual / delayed", OrbitFX: "Real-time dashboard", better: true },
    { feature: "Time to Market", legacy: "6–12 months", OrbitFX: "14 days", better: true },
    { feature: "Infrastructure Managed By", legacy: "Your team + cost", OrbitFX: "OrbitFX (zero overhead)", better: true },
    { feature: "Uptime SLA", legacy: "Best-effort", OrbitFX: "99.9% guaranteed", better: true },
    { feature: "White-Label Branding", legacy: "Partial / extra cost", OrbitFX: "Fully included", better: true },
  ];

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="reveal" data-dir="up" data-delay="0">
            <DiagBadge label="Side by Side" />
          </div>
          <h2 className="reveal text-3xl md:text-4xl font-black mt-4 tracking-tight text-gray-900 dark:text-white" data-dir="up" data-delay="80">
            Legacy Platform vs. OrbitFX
          </h2>
        </div>

        <div className="reveal border border-gray-200 dark:border-gray-700 overflow-hidden" data-dir="up" data-delay="140">
          {/* Header row */}
          <div className="grid grid-cols-3 bg-gray-900 dark:bg-black">
            <div className="px-5 py-3 text-[10px] font-bold uppercase tracking-[2px] text-gray-400 font-mono">Feature</div>
            <div className="px-5 py-3 text-[10px] font-bold uppercase tracking-[2px] text-red-400 font-mono border-l border-white/10">Legacy Platform</div>
            <div className="px-5 py-3 text-[10px] font-bold uppercase tracking-[2px] text-indigo-400 font-mono border-l border-white/10">OrbitFX</div>
          </div>

          {rows.map((r, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 border-t border-gray-200 dark:border-gray-700 ${i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800/50"}`}
            >
              <div className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300 font-medium">{r.feature}</div>
              <div className="px-5 py-4 border-l border-gray-200 dark:border-gray-700 flex items-center gap-2">
                <Icon icon="solar:close-circle-bold" className="text-red-400 flex-shrink-0" width={14} />
                <span className="text-sm text-gray-400 dark:text-gray-500">{r.legacy}</span>
              </div>
              <div className="px-5 py-4 border-l border-gray-200 dark:border-gray-700 flex items-center gap-2">
                <Icon icon="solar:check-circle-bold" className="text-indigo-500 flex-shrink-0" width={14} />
                <span className="text-sm text-gray-800 dark:text-gray-100 font-semibold">{r.OrbitFX}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Cost of Inaction ──────────────────────────────────────────────────────────
function CostOfInaction() {
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;
  const costs = [
    { icon: "solar:user-minus-bold-duotone", title: "Trader Churn", desc: "Slow execution and poor mobile experience drive traders to competitors. Each churned trader represents months of CAC and lost spread revenue — gone permanently.", val: "22%", unit: "avg annual churn on legacy platforms" },
    { icon: "solar:chart-2-bold-duotone", title: "Revenue Leakage", desc: "Wide spreads from single-LP setups reduce fill quality. Traders notice, reduce volume, and eventually leave. Better liquidity directly protects margin revenue.", val: "3–5×", unit: "wider spreads vs multi-LP setups" },
    { icon: "solar:clock-circle-bold-duotone", title: "Build Time Cost", desc: "12 months of engineering costs, delayed go-live, and missed market windows add up fast. OrbitFX gets you live in 14 days — without the headcount.", val: "$500K+", unit: "typical custom platform build cost" },
  ];

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="reveal" data-dir="up" data-delay="0">
            <DiagBadge label="The Real Cost" />
          </div>
          <h2 className="reveal text-3xl md:text-4xl font-black mt-4 tracking-tight text-gray-900 dark:text-white" data-dir="up" data-delay="80">
            What Inaction Actually Costs
          </h2>
          <p className="reveal text-gray-400 text-sm mt-3 max-w-md mx-auto" data-dir="up" data-delay="120">
            These aren't theoretical numbers. They're the operating reality for brokerages running on legacy infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {costs.map((c, i) => (
            <div
              key={i}
              className="reveal border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-7 relative overflow-hidden hover:border-indigo-500/25 transition-all duration-300"
              data-dir="up"
              data-delay={`${i * 100}`}
            >
              {/* Top accent */}
              <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

              <Icon icon={c.icon} className="text-indigo-400 mb-4" width={32} />
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{c.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{c.desc}</p>

              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex items-baseline gap-2">
                <span className="font-black font-mono text-2xl text-red-500 dark:text-red-400">{c.val}</span>
                <span className="text-[10px] uppercase tracking-[1.5px] text-gray-400 font-mono leading-snug">{c.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonial strip ─────────────────────────────────────────────────────────
function TestimonialStrip() {
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;
  return (
    <section ref={ref} className="py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="reveal" data-dir="up" data-delay="0">
          <Icon icon="solar:quote-down-bold-duotone" className="text-indigo-400 mx-auto mb-6" width={40} />
        </div>
        <blockquote
          className="reveal text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug tracking-tight mb-6"
          data-dir="up"
          data-delay="80"
        >
          "We were running on a platform that requoted during NFP every single month. OrbitFX eliminated that entirely. Our traders' retention numbers went up 30% in the first quarter."
        </blockquote>
        <div className="reveal flex items-center justify-center gap-3" data-dir="up" data-delay="140">
          <div className="w-10 h-10 border border-indigo-500/20 bg-indigo-500/10 flex items-center justify-center text-lg flex-shrink-0">🇬🇧</div>
          <div className="text-left">
            <div className="font-bold text-sm text-gray-900 dark:text-white">James K.</div>
            <div className="text-gray-400 text-xs">CEO, AlphaFX Brokerage</div>
          </div>
          <Icon icon="solar:verified-check-bold-duotone" className="text-indigo-500 ml-2" width={20} />
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function ProblemsCTA() {
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;
  const router = useRouter();
  return (
    <section ref={ref} className="py-28 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700">
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <div className="reveal w-[88px] h-[88px] border border-indigo-500/20 bg-indigo-500/10 flex items-center justify-center mx-auto mb-7" data-dir="fade" data-delay="0">
          <span className="font-black text-[22px] tracking-tight text-indigo-500 dark:text-indigo-400 font-mono">CX</span>
        </div>
        <div className="reveal mb-5 inline-block" data-dir="up" data-delay="80">
          <DiagBadge label="Stop the Bleeding" />
        </div>
        <h2
          className="reveal text-[clamp(2rem,5vw,3.8rem)] font-black leading-[1.08] tracking-tight mb-5 text-gray-900 dark:text-white"
          data-dir="up"
          data-delay="140"
        >
          Stop patching. <span className="text-indigo-500 dark:text-indigo-400">Start winning.</span>
        </h2>
        <p
          className="reveal text-gray-500 dark:text-gray-400 text-base leading-[1.75] max-w-[500px] mx-auto mb-9"
          data-dir="up"
          data-delay="200"
        >
          OrbitFX replaces your entire fragmented trading stack with one institutional-grade platform. Live in 14 days. No infrastructure team. No hidden costs.
        </p>

        <div className="reveal flex flex-wrap gap-3 justify-center mb-7" data-dir="up" data-delay="260">
          <Button
            onClick={() => router.push("/contact")}
            className="rounded-none bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 px-8 py-3 font-bold tracking-widest uppercase text-xs"
          >
            Request a Demo →
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/pricing")}
            className="rounded-none border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-3 font-bold tracking-wide text-sm"
          >
            View Pricing
          </Button>
        </div>

        <div className="reveal flex flex-wrap justify-center gap-x-5 gap-y-1" data-dir="up" data-delay="320">
          {["No setup fees", "14-day go-live", "99.9% uptime SLA"].map((t, i) => (
            <span key={i} className="text-xs text-gray-400 font-medium flex items-center gap-1.5 font-mono">
              {i > 0 && <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 inline-block" />}
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProblemsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <ProblemsHero />
      <ImpactStatsBar />
      <ProblemsList />
      <ComparisonSection />
      <CostOfInaction />
      <TestimonialStrip />
      <ProblemsCTA />
    </main>
  );
}
