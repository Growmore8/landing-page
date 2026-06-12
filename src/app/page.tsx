"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import Homes from "@/components/Home/home";
import { useRouter } from "next/navigation";
import { useScrollReveal } from "@/hooks/useScrollReveal";
// ─── Types ────────────────────────────────────────────────────────────────────
interface FAQItem { q: string; a: string; }
interface NewsItem { category: string; title: string; img: string; }

// ─── Data ─────────────────────────────────────────────────────────────────────
const faqs: FAQItem[] = [
  { q: "What is CubeX Trading Platform?", a: "CubeX is a white-label trading platform built by CubeX Enterprises for Forex brokers and Prop Firms. It delivers execution infrastructure, trading terminals, liquidity connectivity, and risk management in one unified system." },
  { q: "Can I fully brand the platform as my own?", a: "Yes. CubeX is fully white-label — your logo, domain, color scheme, and mobile app identity are yours. Your traders will never see the CubeX name." },
  { q: "What asset classes does CubeX support?", a: "CubeX supports 50+ asset classes including Forex pairs, commodities, indices, metals, energies, and crypto CFDs — all configurable per broker." },
  { q: "How does CubeX connect to liquidity providers?", a: "CubeX integrates via FIX 4.4/5.0 protocol with tier-1 banks and ECN providers. Brokers can connect multiple LPs with full aggregation and smart order routing for best-bid execution." },
  { q: "Does CubeX offer a mobile trading app?", a: "Yes. The CubeX Trader mobile app is available for iOS and Android with full order execution, live charting, real-time prices, and push notifications — fully white-labelled under your brand." },
  { q: "How quickly can I go live?", a: "Most brokerages go live within 14 days. CubeX Enterprises' implementation team handles all setup, liquidity connections, and platform configuration end-to-end." },
];

const news: NewsItem[] = [
  { category: "Execution", title: "Why Sub-Millisecond Execution Is the New Standard in FX Trading", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80" },
  { category: "Liquidity", title: "Multi-LP Aggregation: How Smart Order Routing Improves Fill Quality", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
  { category: "Guide", title: "A-Book vs B-Book: How Modern Brokerage Risk Models Work", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { category: "Strategy", title: "Building a Scalable Multi-Asset Trading Infrastructure in 2026", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80" },
];

const tickers = [
  { s: "BTC/USD", v: "67,420.50", up: true },
  { s: "ETH/USD", v: "3,512.80", up: true },
  { s: "EUR/USD", v: "1.0847", up: false },
  { s: "GBP/USD", v: "1.2703", up: true },
  { s: "XAU/USD", v: "2,381.5", up: true },
  { s: "S&P 500", v: "5,248.00", up: true },
  { s: "US30", v: "39,112.0", up: false },
  { s: "NAS100", v: "18,340.5", up: true },
  { s: "CRUDE", v: "82.14", up: false },
  { s: "USD/JPY", v: "149.82", up: true },
  { s: "USD/CHF", v: "0.8911", up: false },
  { s: "GBP/JPY", v: "188.42", up: false },
];

const chips = [
  { pair: "EUR/USD", value: "▲ 1.0847", up: true, left: "3%", top: "12%" },
  { pair: "GBP/JPY", value: "▼ 188.42", up: false, left: "60%", top: "10%" },
  { pair: "XAU/USD", value: "▲ 2,381.5", up: true, left: "3%", top: "72%" },
  { pair: "BTC/USD", value: "▼ 97,240", up: false, left: "60%", top: "74%" },
];

const heroTags = [
  { label: "White-label ready", color: "amber" },
  { label: "50+ asset classes", color: "green" },
  { label: "Tier-1 liquidity", color: "indigo" },
  { label: "400+ brokers", color: "default" },
  { label: "Sub-ms execution", color: "default" },
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

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Home() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const cube = cubeRef.current;
    if (!scene || !cube) return;
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    let rotX = -18, rotY = 0, dragging = false, lastX = 0, lastY = 0, idle = 0, vY = 0;
    let raf: number;
    const render = () => { cube.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`; };
    const loop = () => {
      if (!dragging) {
        idle++;
        if (Math.abs(vY) > 0.02) { rotY += vY; vY *= 0.93; }
        else if (!reduce && idle > 60) { rotY += 0.2; rotX += (-18 - rotX) * 0.015; }
      }
      render();
      raf = requestAnimationFrame(loop);
    };
    const down = (e: PointerEvent) => { dragging = true; idle = 0; vY = 0; lastX = e.clientX; lastY = e.clientY; try { scene.setPointerCapture(e.pointerId); } catch (_) { } };
    const move = (e: PointerEvent) => { if (!dragging) return; const dx = e.clientX - lastX, dy = e.clientY - lastY; rotY += dx * 0.5; rotX -= dy * 0.5; rotX = Math.max(-80, Math.min(80, rotX)); vY = dx * 0.5; lastX = e.clientX; lastY = e.clientY; };
    const up = () => { dragging = false; idle = 0; };
    scene.addEventListener("pointerdown", down);
    scene.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    render(); raf = requestAnimationFrame(loop);
    return () => { scene.removeEventListener("pointerdown", down); scene.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up); cancelAnimationFrame(raf); };
  }, []);

  const tickerItems = [...tickers, ...tickers];

  return (
    <>
      <style>{`
        @keyframes ticker-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .ticker-track{display:flex;width:max-content;animation:ticker-scroll 36s linear infinite}
        .ticker-track:hover{animation-play-state:paused}
        @keyframes hero-in{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .ha{animation:hero-in 0.7s cubic-bezier(.22,1,.36,1) both}
        .ha-1{animation-delay:0.08s}.ha-2{animation-delay:0.18s}.ha-3{animation-delay:0.28s}.ha-4{animation-delay:0.38s}.ha-5{animation-delay:0.48s}
        .hero-grid-bg{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(99,102,241,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.07) 1px,transparent 1px);background-size:40px 40px}
        @keyframes chip-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .hero-chip{position:absolute;display:flex;align-items:center;gap:5px;font-size:10px;font-weight:700;letter-spacing:0.3px;padding:5px 11px;white-space:nowrap;pointer-events:none;backdrop-filter:blur(8px);border:1px solid rgba(99,102,241,0.15);background:rgba(255,255,255,0.82);font-family:'Space Mono',monospace;animation:chip-float var(--t,7s) ease-in-out infinite}
        .dark .hero-chip{background:rgba(15,20,40,0.7);border-color:rgba(99,102,241,0.2)}
        .hero-chip.up b{color:#059669}.hero-chip.dn b{color:#dc2626}
        .dark .hero-chip.up b{color:#34d399}.dark .hero-chip.dn b{color:#f87171}
        .hero-chip::before{content:'';width:6px;height:6px;border-radius:50%;flex-shrink:0}
        .hero-chip.up::before{background:#10b981}.hero-chip.dn::before{background:#ef4444}
        .hero-scene{width:200px;height:200px;perspective:800px;cursor:grab;filter:drop-shadow(0 8px 40px rgba(99,102,241,0.35))}
        .hero-scene:active{cursor:grabbing}
        .hero-cube{width:100%;height:100%;position:relative;transform-style:preserve-3d}
        .cube-face{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;border:1px solid rgba(99,102,241,0.3)}
        .face-front{background:linear-gradient(135deg,rgba(99,102,241,0.25),rgba(139,92,246,0.15));transform:translateZ(100px)}
        .face-back{background:linear-gradient(135deg,rgba(99,102,241,0.12),rgba(16,185,129,0.15));transform:rotateY(180deg) translateZ(100px)}
        .face-left{background:rgba(99,102,241,0.08);transform:rotateY(-90deg) translateZ(100px)}
        .face-right{background:rgba(139,92,246,0.08);transform:rotateY(90deg) translateZ(100px)}
        .face-top{background:rgba(99,102,241,0.1);transform:rotateX(90deg) translateZ(100px)}
        .face-bottom{background:rgba(99,102,241,0.04);transform:rotateX(-90deg) translateZ(100px)}
        .cube-logo{font-size:24px;font-weight:900;letter-spacing:-1px;color:#fff;line-height:1;text-align:center;font-family:'Space Mono',monospace}
        .cube-logo .cx{color:#a5b4fc}
        .cube-sub{font-size:7px;letter-spacing:3px;color:rgba(255,255,255,0.4);display:block;text-align:center;margin-top:5px}
        .face-mini{font-size:9px;font-weight:700;letter-spacing:2px;color:rgba(255,255,255,0.4);text-align:center;font-family:'Space Mono',monospace}
        .face-mini span{display:block;font-size:18px;font-weight:900;color:rgba(165,180,252,0.8);letter-spacing:-0.5px;line-height:1.2}
      `}</style>

      {/* TICKER */}
      <div className="overflow-hidden bg-slate-900 dark:bg-black border-b border-white/5 py-[7px]">
        <div className="ticker-track">
          {tickerItems.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-6 border-r border-white/[0.07] font-mono text-[11px]">
              <span className="text-slate-500 font-bold">{t.s}</span>
              <span className="text-white">{t.v}</span>
              <span className={t.up ? "text-emerald-400" : "text-red-400"}>{t.up ? "▲" : "▼"}</span>
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-0 min-h-[560px]">
          {/* LEFT */}
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-20 relative z-10">
            <div className="ha ha-1 inline-flex items-center gap-2 mb-6 w-fit border border-indigo-500/20 bg-indigo-500/[0.08] dark:bg-indigo-500/10 px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-indigo-600 dark:text-indigo-400">Trusted by 400+ Brokers Worldwide</span>
            </div>
            <h1 className="ha ha-2 font-black leading-[1.02] tracking-tight text-slate-900 dark:text-white mb-4"
              style={{ fontSize: "clamp(36px,5vw,58px)", letterSpacing: "-2px", fontFamily: "'Space Mono', monospace" }}>
              Empower Your<br /><span className="text-indigo-500">Brokerage</span> Growth.
            </h1>
            <p className="ha ha-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-[420px] mb-6">
              The trading platform Forex brokers &amp; Prop Firms rely on — built for execution speed, liquidity depth, and long-term scalability.
            </p>
            <div className="ha ha-4 flex flex-wrap gap-2 mb-8">
              {heroTags.map((t) => (
                <span key={t.label} className={`text-[10px] font-bold uppercase tracking-wide px-3 py-1 border ${t.color === "amber" ? "border-amber-300 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10"
                  : t.color === "green" ? "border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
                    : t.color === "indigo" ? "border-indigo-300 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10"
                      : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800"
                  }`}>{t.label}</span>
              ))}
            </div>
            <div className="ha ha-5 flex flex-col sm:flex-row gap-3">
              <Button className="rounded-none bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-gray-200 px-7 py-3 font-bold tracking-widest uppercase text-[10px] font-mono">Request a Demo →</Button>
              <Button variant="outline" className="rounded-none border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-3 font-bold tracking-wide text-sm">Explore Platform</Button>
            </div>
          </div>

          {/* RIGHT — cube */}
          <div className="relative flex items-center justify-center py-16 bg-gradient-to-br from-indigo-50 via-violet-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
            <div className="hero-grid-bg" />
            {chips.map((c, i) => (
              <div key={i} className={`hero-chip ${c.up ? "up" : "dn"}`}
                style={{ left: c.left, top: c.top, "--t": `${7 + i * 0.8}s` } as React.CSSProperties}>
                {c.pair} <b>{c.value}</b>
              </div>
            ))}
            <div ref={sceneRef} className="hero-scene" aria-label="Interactive 3D CubeX logo — drag to rotate">
              <div ref={cubeRef} className="hero-cube">
                <div className="cube-face face-front"><div className="cube-logo">Cube<span className="cx">X</span><span className="cube-sub">PLATFORM</span></div></div>
                <div className="cube-face face-back"><div className="face-mini"><span>50+</span>ASSETS</div></div>
                <div className="cube-face face-left"><div className="face-mini"><span>400+</span>BROKERS</div></div>
                <div className="cube-face face-right"><div className="face-mini"><span>24/7</span>SUPPORT</div></div>
                <div className="cube-face face-top"><div className="face-mini"><span>99.9%</span>UPTIME</div></div>
                <div className="cube-face face-bottom" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── StatBar ──────────────────────────────────────────────────────────────────
function StatBar() {
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;
  const items = [
    { n: "2026", l: "Founded" },
    { n: "400+", l: "Brokers Served" },
    { n: "99.9%", l: "Uptime SLA" },
    { n: "200K+", l: "Active Traders" },
    { n: "50+", l: "Asset Classes" },
  ];
  return (
    <div ref={ref} className="flex overflow-x-auto border-t border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      {items.map((s, i) => (
        <div key={s.l} className="reveal flex-1 min-w-[130px] py-5 px-6 border-r border-gray-200 dark:border-gray-700 last:border-r-0 text-center"
          data-dir="up"
          data-delay={i * 60}>
          <div className="font-mono font-bold text-2xl text-gray-900 dark:text-white leading-none">{s.n}</div>
          <div className="text-[11px] text-gray-400 mt-1.5 tracking-wide">{s.l}</div>
        </div>
      ))}
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function AboutUs() {
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;
  const stats = [
    { icon: "mdi:lightning-bolt", val: "< 1ms", label: "Order Execution" },
    { icon: "mdi:earth", val: "50+", label: "Asset Classes" },
    { icon: "mdi:account-group", val: "200K+", label: "Active Traders" },
    { icon: "mdi:shield-check", val: "99.9%", label: "Uptime SLA" },
  ];
  return (
    <section ref={ref} id="about" className="py-24 px-5">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="reveal" data-dir="left" data-delay="0">
          <DiagBadge label="About CubeX" />
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight tracking-tight text-gray-900 dark:text-white">
            Institutional-Grade Trading Infrastructure
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6 text-[15px]">
            CubeX Enterprises builds and maintains trading infrastructure for brokerages worldwide. Our platform is purpose-built for execution speed, liquidity depth, and real-time market data — running continuously in live market conditions.
          </p>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 text-[15px]">
            From FIX protocol connectivity and multi-LP aggregation to white-label terminals and risk desk tooling — CubeX gives brokerages everything they need to compete at the institutional level, without the institutional price tag.
          </p>
          <a href="#" className="inline-flex items-center gap-2 text-indigo-500 dark:text-indigo-400 font-semibold hover:gap-3 transition-all text-sm">
            Explore Our Platform
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((item, i) => (
            <Card key={item.label} className="reveal border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 hover:border-indigo-500/30 transition-all"
              data-dir="up"
              data-delay={i * 80}>
              <Icon icon={item.icon} className="text-3xl mb-3 text-indigo-400" />
              <div className="text-3xl font-black text-gray-900 dark:text-white font-mono">{item.val}</div>
              <div className="text-gray-400 dark:text-gray-500 text-sm mt-1">{item.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyChooseUs() {
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;
  const features = [
    { title: "Multi-Asset Trading Terminal", desc: "A fully branded web and desktop trading terminal supporting Forex, metals, indices, commodities, and crypto CFDs — with real-time charts, one-click execution, and depth of market." },
    { title: "White-Label Platform", desc: "Launch under your brand instantly. CubeX handles the terminal, mobile app, and all trading infrastructure — your clients see only your identity." },
    { title: "FIX Protocol Liquidity Connectivity", desc: "Connect to tier-1 banks and ECN providers via FIX 4.4/5.0. CubeX aggregates multiple liquidity sources with smart order routing and best-bid/offer execution." },
    { title: "Risk Desk & Exposure Management", desc: "Real-time position monitoring, margin controls, threshold alerts, and A-book/B-book routing — all configurable per account group and instrument." },
    { title: "Mobile Trading App (iOS & Android)", desc: "Full-featured native apps with biometric login, push alerts, live prices, charting, and one-tap order execution — fully white-labelled under your brand." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section ref={ref} className="py-24 px-5 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="reveal" data-dir="up" data-delay="0"><DiagBadge label="Why CubeX" /></div>
          <h2 className="reveal text-4xl md:text-5xl font-black mt-4 tracking-tight text-gray-900 dark:text-white" data-dir="up" data-delay="80">Everything Your Brokerage Needs</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal space-y-2" data-dir="left" data-delay="0">
            {features.map((f, i) => (
              <div key={i} className={`border overflow-hidden transition-all ${open === i ? "border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-950/30" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"}`}>
                <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setOpen(open === i ? null : i)}>
                  <span className={`font-semibold text-sm ${open === i ? "text-indigo-500 dark:text-indigo-400" : "text-gray-900 dark:text-white"}`}>{f.title}</span>
                  <svg className={`w-4 h-4 flex-shrink-0 ml-4 transition-transform ${open === i ? "rotate-180 text-indigo-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {open === i && <div className="px-5 pb-5 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</div>}
              </div>
            ))}
          </div>
          <div className="reveal border border-indigo-500/10 bg-indigo-500/5 dark:bg-indigo-950/20 p-8" data-dir="right" data-delay="120">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 border border-indigo-500/20 bg-indigo-500/10 mb-4">
                <span className="font-black text-xl text-indigo-500 font-mono">CX</span>
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">CubeX Trading Suite</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Web terminal, mobile app, and risk desk — all white-labelled under your brand.</p>
              <div className="grid grid-cols-2 gap-3">
                {["Web Terminal", "Mobile App", "Risk Desk", "Live Prices", "Multi-LP Feed", "Order Execution"].map((item) => (
                  <div key={item} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 text-gray-600 dark:text-gray-300 text-sm text-center font-medium">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Inside Platform ──────────────────────────────────────────────────────────
function InsideVertexTrader() {
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;
  const tabs = [
    { label: "Trading Terminal", icon: "solar:chart-2-bold-duotone", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80", features: ["One-click order execution", "Advanced charting (50+ indicators)", "DOM & depth of market", "Multi-account switching"] },
    { label: "Risk Desk", icon: "solar:shield-warning-bold-duotone", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", features: ["Live exposure monitoring", "Margin & leverage controls", "A-book / B-book routing", "Threshold-based alerts"] },
    { label: "Liquidity Bridge", icon: "solar:link-bold-duotone", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", features: ["FIX 4.4 / 5.0 connectivity", "Multi-LP aggregation", "Smart order routing", "Slippage & fill reporting"] },
    { label: "Mobile App", icon: "solar:phone-bold-duotone", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", features: ["iOS & Android native builds", "Biometric authentication", "Real-time push alerts", "Full charting on mobile"] },
    { label: "Trader Portal", icon: "solar:users-group-rounded-bold-duotone", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", features: ["Account overview & P&L", "Deposit & withdrawal flows", "Trade history & statements", "White-label branded UI"] },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const goTo = (index: number) => {
    if (index === activeTab || animating) return;
    setDirection(index > activeTab ? "left" : "right");
    setAnimating(true);
    setTimeout(() => { setActiveTab(index); setAnimating(false); }, 280);
  };
  const t = tabs[activeTab];
  return (
    <section ref={ref} className="py-16 px-5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="reveal" data-dir="up" data-delay="0"><DiagBadge label="A Look Inside" /></div>
          <h2 className="reveal text-4xl md:text-5xl font-black mt-4 tracking-tight text-gray-900 dark:text-white" data-dir="up" data-delay="80">The CubeX Platform</h2>
        </div>
        <div className="reveal flex flex-wrap gap-2 justify-center mb-10" data-dir="up" data-delay="140">
          {tabs.map((tab, i) => (
            <button key={tab.label} onClick={() => goTo(i)} className={`inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold transition-all duration-200 border ${activeTab === i ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white" : "bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white"}`}>
              <Icon icon={tab.icon} width={15} className={activeTab === i ? "" : "text-gray-400"} />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center transition-all duration-280"
          style={{ opacity: animating ? 0 : 1, transform: animating ? `translateX(${direction === "left" ? "-32px" : "32px"})` : "translateX(0)" }}>
          <div className="reveal" data-dir="left" data-delay="200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 border border-indigo-500/20 bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                <Icon icon={t.icon} className="text-indigo-500 dark:text-indigo-400" width={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t.label}</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6 text-sm">
              CubeX's {t.label.toLowerCase()} is engineered for live trading environments — built for speed, reliability, and full white-label customisation. Every component is production-tested across hundreds of brokerages globally.
            </p>
            <ul className="space-y-3 mb-8">
              {t.features.map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                  <span className="w-5 h-5 border border-indigo-500/20 bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon icon="solar:check-bold" className="text-indigo-500 dark:text-indigo-400" width={11} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <button onClick={() => goTo(activeTab - 1)} disabled={activeTab === 0} className="w-9 h-9 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:border-indigo-500/50 hover:text-indigo-500 disabled:opacity-25 disabled:cursor-not-allowed transition-all"><Icon icon="solar:arrow-left-bold" width={15} /></button>
              <button onClick={() => goTo(activeTab + 1)} disabled={activeTab === tabs.length - 1} className="w-9 h-9 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:border-indigo-500/50 hover:text-indigo-500 disabled:opacity-25 disabled:cursor-not-allowed transition-all"><Icon icon="solar:arrow-right-bold" width={15} /></button>
              <div className="flex gap-1.5 ml-1">
                {tabs.map((_, i) => (<button key={i} onClick={() => goTo(i)} className={`transition-all duration-300 ${i === activeTab ? "w-6 h-1.5 bg-indigo-500" : i < activeTab ? "w-1.5 h-1.5 bg-gray-400" : "w-1.5 h-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-400"}`} />))}
              </div>
              <div className="flex-1" />
              <Button className="rounded-none bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 px-5 py-2 font-bold tracking-widest uppercase text-xs">Learn More</Button>
            </div>
          </div>
          <div className="reveal overflow-hidden border border-gray-200 dark:border-gray-700 aspect-video" data-dir="right" data-delay="260">
            <img src={t.image} alt={`${t.label} preview`} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Highlights ───────────────────────────────────────────────────────────────
function Highlights() {
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;
  const [active, setActive] = useState(0);
  const highlights = [
    { icon: "solar:phone-bold-duotone", title: "Mobile Trading App", desc: "Full-featured iOS & Android trading app with biometric login and real-time alerts.", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80", badge: "iOS & Android", details: ["Biometric login (Face ID / Fingerprint)", "Live push alerts & notifications", "One-tap order execution", "Full charting suite on mobile"] },
    { icon: "solar:monitor-bold-duotone", title: "Web Trading Terminal", desc: "Powerful web-based terminal with advanced charting and full order management.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", badge: "Web", details: ["50+ technical indicators", "Multiple chart types & timeframes", "One-click buy/sell execution", "Multi-account view"] },
    { icon: "solar:chart-2-bold-duotone", title: "IB & Partner Portal", desc: "Multi-tier IB management with commission tracking and rebate automation.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", badge: "IB Tools", details: ["Multi-tier IB commission structure", "Real-time referral tracking", "Automated rebate payouts", "Performance analytics dashboard"] },
    { icon: "solar:shield-warning-bold-duotone", title: "Risk Management Desk", desc: "Live exposure tracking, margin controls, and A/B-book routing tools.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", badge: "Risk", details: ["Live position & exposure monitor", "Per-group margin controls", "A-book / B-book routing rules", "Automated threshold alerts"] },
    { icon: "solar:box-bold-duotone", title: "Desktop & APK Apps", desc: "Downloadable Windows, macOS, and Android APK builds for your branded platform.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", badge: "Desktop & APK", details: ["Windows & macOS native apps", "Android APK direct install", "Auto-update delivery", "Offline-capable with sync"] },
    { icon: "solar:link-bold-duotone", title: "Liquidity Integrations", desc: "FIX protocol connectivity to tier-1 banks and ECN liquidity providers.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", badge: "FIX / API", details: ["FIX 4.4 / 5.0 protocol support", "Multi-LP aggregation engine", "Smart order routing", "Fill & slippage reporting"] },
  ];
  useEffect(() => {
    const timer = setInterval(() => setActive((prev) => (prev + 1) % highlights.length), 4000);
    return () => clearInterval(timer);
  }, [highlights.length]);
  const opened = highlights[active];
  return (
    <section ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="reveal" data-dir="up" data-delay="0"><DiagBadge label="Platform Features" /></div>
          <h2 className="reveal text-4xl md:text-5xl font-black mt-4 tracking-tight text-gray-900 dark:text-white" data-dir="up" data-delay="80">
            CubeX Platform <span className="text-indigo-500 dark:text-indigo-400">Highlights</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3" data-dir="left" data-delay="100">
            {highlights.map((h, i) => (
              <button key={i} onClick={() => setActive(i)} className={`text-left p-5 border transition-all duration-300 cursor-pointer ${active === i ? "border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-950/30" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-indigo-500/20"}`}>
                <div className="flex items-start justify-between mb-3">
                  <span className={`transition-colors ${active === i ? "text-indigo-500" : "text-gray-400"}`}><Icon icon={h.icon} width={32} height={32} /></span>
                  <span className={`text-xs font-semibold px-2 py-0.5 border font-mono ${active === i ? "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-indigo-500/20" : "bg-gray-50 dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700"}`}>{h.badge}</span>
                </div>
                <h3 className={`font-bold text-base mb-1 transition-colors ${active === i ? "text-indigo-500" : "text-gray-900 dark:text-white"}`}>{h.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{h.desc}</p>
                {active === i && (
                  <div className="mt-3 h-0.5 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div key={active} className="h-full bg-indigo-500" style={{ animation: "progress 4s linear forwards" }} />
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="reveal border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-8" data-dir="right" data-delay="160">
            <div className="relative h-60 overflow-hidden">
              <img key={active} src={opened.image} alt={opened.title} className="w-full h-full object-cover transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />
              <span className="absolute bottom-4 left-6 text-xs font-semibold px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">{opened.badge}</span>
              <div className="absolute bottom-4 right-6 flex gap-1.5">
                {highlights.map((_, i) => (<button key={i} onClick={() => setActive(i)} className={`transition-all duration-300 ${active === i ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`} />))}
              </div>
              <button onClick={() => setActive((active - 1 + highlights.length) % highlights.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-indigo-500/80 border border-white/10 flex items-center justify-center text-white transition-all duration-200"><Icon icon="solar:arrow-left-bold" width={18} /></button>
              <button onClick={() => setActive((active + 1) % highlights.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-indigo-500/80 border border-white/10 flex items-center justify-center text-white transition-all duration-200"><Icon icon="solar:arrow-right-bold" width={18} /></button>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-indigo-500 dark:text-indigo-400"><Icon icon={opened.icon} width={36} height={36} /></span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">{opened.title}</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{opened.desc}</p>
              <h4 className="text-[9px] font-bold uppercase tracking-[2px] text-gray-400 dark:text-gray-500 font-mono mb-3">What's included</h4>
              <ul className="space-y-2 mb-6">
                {opened.details.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                    <span className="w-5 h-5 border border-indigo-500/20 bg-indigo-500/10 flex items-center justify-center flex-shrink-0"><Icon icon="solar:check-circle-bold" className="text-indigo-500 dark:text-indigo-400" width={12} height={12} /></span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes progress{from{width:0%}to{width:100%}}`}</style>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;
  const testimonials = [
    { quote: "CubeX had our white-label terminal live in under 2 weeks. Execution speed is exceptional and our traders noticed the difference immediately.", name: "James K.", role: "CEO, AlphaFX Brokerage", flag: "🇬🇧", stat: "2-week go-live" },
    { quote: "The liquidity bridge setup was seamless. We connected three LPs in days — the FIX integration is rock solid and order routing is exactly what we needed.", name: "Maria S.", role: "CTO, TradeMax Group", flag: "🇩🇪", stat: "3 LPs connected" },
    { quote: "Our traders love the mobile app and the risk desk gave us visibility we never had before. CubeX is the infrastructure backbone of our entire operation.", name: "Yusuf A.", role: "Director, PrimeTrade FX", flag: "🇦🇪", stat: "Full platform" },
  ];
  return (
    <section ref={ref} className="relative py-28 overflow-hidden bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-700">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="reveal" data-dir="up" data-delay="0"><DiagBadge label="Social Proof" /></div>
          <h2 className="reveal text-4xl md:text-5xl font-black mt-4 tracking-tight text-gray-900 dark:text-white" data-dir="up" data-delay="80">
            Trusted by <span className="text-indigo-500 dark:text-indigo-400">Brokers Worldwide</span>
          </h2>
          <p className="reveal text-gray-400 text-sm mt-4 max-w-md mx-auto" data-dir="up" data-delay="140">
            Hundreds of brokerages run on CubeX — here's what they say about the platform.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="reveal relative border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-7 flex flex-col hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-1"
              data-dir="up"
              data-delay={i * 100}>
              <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <Icon key={j} icon="solar:star-bold" className="text-indigo-400" width={14} />)}</div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1 mb-6">"{t.quote}"</p>
              <div className="mb-5"><span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 font-mono"><Icon icon="solar:graph-up-bold" width={12} />{t.stat}</span></div>
              <div className="h-px bg-gray-100 dark:bg-gray-700 mb-5" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-indigo-500/20 bg-indigo-500/10 flex items-center justify-center text-lg flex-shrink-0">{t.flag}</div>
                <div><div className="font-bold text-sm text-gray-900 dark:text-white">{t.name}</div><div className="text-gray-400 text-xs">{t.role}</div></div>
                <div className="ml-auto"><Icon icon="solar:verified-check-bold-duotone" className="text-indigo-500 dark:text-indigo-400" width={20} /></div>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700 pt-10"
          data-dir="up" data-delay="200">
          {[{ icon: "solar:buildings-bold-duotone", label: "400+ Brokerages" }, { icon: "solar:global-bold-duotone", label: "50+ Countries" }, { icon: "solar:shield-check-bold-duotone", label: "99.9% Uptime" }, { icon: "solar:users-group-rounded-bold-duotone", label: "200K+ Traders" }].map((item) => (
            <div key={item.label} className="flex items-center gap-2"><Icon icon={item.icon} className="text-indigo-400" width={18} /><span>{item.label}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Onboarding ───────────────────────────────────────────────────────────────
function Onboarding() {
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const steps = [
    { number: "01", title: "Choose Your Plan", short: "Pick the right fit", desc: "Browse CubeX's flexible plans — from startup brokerages to enterprise-grade operations. Every plan includes core trading infrastructure, white-label branding, and dedicated onboarding support.", icon: "solar:document-add-bold-duotone", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80", badge: "Step 1", highlights: ["Compare Starter, Growth & Enterprise tiers", "Transparent pricing — no hidden fees", "Flexible monthly or annual billing"] },
    { number: "02", title: "Request a Quote", short: "Get your custom quote", desc: "Submit a quick quote request. Our team prepares a tailored CubeX package based on your trading volume, asset classes, and regional requirements — usually within 24 hours.", icon: "solar:bill-list-bold-duotone", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80", badge: "Step 2", highlights: ["Custom quote within 24 hours", "Volume-based pricing available", "No commitment required"] },
    { number: "03", title: "Provide Your Details", short: "Share your requirements", desc: "Fill in your brokerage details — entity type, jurisdiction, preferred instruments, and branding assets. CubeX pre-configures your platform before technical setup begins.", icon: "solar:user-id-bold-duotone", image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80", badge: "Step 3", highlights: ["Entity & jurisdiction details", "Upload logo and brand assets", "Select instruments & account types"] },
    { number: "04", title: "Connect with Our Team", short: "Meet your launch team", desc: "You'll be introduced to a dedicated CubeX implementation manager. Together you'll finalise the integration scope, timelines, and any custom configuration requirements.", icon: "solar:users-group-two-rounded-bold-duotone", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80", badge: "Step 4", highlights: ["Dedicated implementation manager", "Kickoff call & project timeline", "Custom configuration scoping"] },
    { number: "05", title: "Set Up & Integrate", short: "We build your platform", desc: "CubeX engineers deploy your white-label trading environment, connect your liquidity providers, configure the risk desk, and complete all integrations — fully managed end-to-end.", icon: "solar:code-bold-duotone", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", badge: "Step 5", highlights: ["Liquidity & FIX bridge setup", "Risk desk configuration", "UAT sandbox for your team"] },
    { number: "06", title: "Go Live with CubeX", short: "Launch with confidence", desc: "Your CubeX trading platform goes live with a dedicated launch engineer on standby. Traders can access web, mobile, and desktop terminals from day one — fully branded, fully yours.", icon: "solar:rocket-bold-duotone", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", badge: "Day 14", highlights: ["Live environment deployment", "24/7 launch support coverage", "Full handover & training session"] },
  ];
  const goTo = (index: number) => {
    if (index === active || animating) return;
    setDirection(index > active ? "left" : "right");
    setAnimating(true);
    setTimeout(() => { setActive(index); setAnimating(false); }, 320);
  };
  const current = steps[active];
  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="reveal" data-dir="up" data-delay="0"><DiagBadge label="Simple Process" /></div>
          <h2 className="reveal text-4xl md:text-5xl font-black mt-4 tracking-tight text-gray-900 dark:text-white" data-dir="up" data-delay="80">
            Get Started with <span className="text-indigo-500 dark:text-indigo-400">CubeX Trading Platform</span>
          </h2>
          <p className="reveal text-gray-400 text-sm mt-4 max-w-md mx-auto" data-dir="up" data-delay="140">
            Six simple steps from choosing your plan to going live with a fully branded brokerage.
          </p>
        </div>
        <div className="reveal flex items-center justify-center gap-0 mb-12 overflow-x-auto pb-2" data-dir="up" data-delay="180">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <button onClick={() => goTo(i)} className={`relative flex flex-col items-center gap-1.5 px-3 py-2 transition-all duration-300 border ${active === i ? "border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-950/30" : "border-transparent hover:border-gray-200 dark:hover:border-gray-700"}`}>
                <span className={`w-8 h-8 flex items-center justify-center text-xs font-black border-2 transition-all duration-300 font-mono ${i < active ? "border-gray-400 text-gray-400 bg-gray-100 dark:bg-gray-800" : active === i ? "border-indigo-500 text-indigo-500 bg-indigo-500/10" : "border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600"}`}>
                  {i < active ? <Icon icon="solar:check-bold" width={14} /> : s.number}
                </span>
                <span className={`text-[11px] font-semibold whitespace-nowrap hidden sm:block transition-colors ${active === i ? "text-indigo-500 dark:text-indigo-400" : i < active ? "text-gray-400" : "text-gray-300 dark:text-gray-600"}`}>{s.title}</span>
              </button>
              {i < steps.length - 1 && <div className="w-6 h-px mx-0.5 flex-shrink-0"><div className={`h-full transition-all duration-500 ${i < active ? "bg-gray-400" : "bg-gray-200 dark:bg-gray-700"}`} /></div>}
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="reveal transition-all duration-300" data-dir="left" data-delay="220"
            style={{ opacity: animating ? 0 : 1, transform: animating ? `translateX(${direction === "left" ? "-40px" : "40px"})` : undefined }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 border border-indigo-500/20 bg-indigo-500/10 flex items-center justify-center"><Icon icon={current.icon} className="text-indigo-500 dark:text-indigo-400" width={26} /></div>
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 font-mono">{current.badge}</span>
                <h3 className="text-2xl font-black mt-0.5 text-gray-900 dark:text-white">{current.title}</h3>
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">{current.desc}</p>
            <div className="space-y-2.5 mb-8">
              {current.highlights.map((h) => (
                <div key={h} className="flex items-center gap-3">
                  <span className="w-5 h-5 border border-indigo-500/20 bg-indigo-500/10 flex items-center justify-center flex-shrink-0"><Icon icon="solar:check-bold" className="text-indigo-500 dark:text-indigo-400" width={11} /></span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">{h}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => goTo(active - 1)} disabled={active === 0} className="w-10 h-10 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:border-indigo-500/50 hover:text-indigo-500 disabled:opacity-25 disabled:cursor-not-allowed transition-all"><Icon icon="solar:arrow-left-bold" width={16} /></button>
              <button onClick={() => goTo(active + 1)} disabled={active === steps.length - 1} className="w-10 h-10 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:border-indigo-500/50 hover:text-indigo-500 disabled:opacity-25 disabled:cursor-not-allowed transition-all"><Icon icon="solar:arrow-right-bold" width={16} /></button>
              <span className="text-gray-400 text-xs font-mono ml-1">{active + 1} / {steps.length}</span>
              <div className="flex-1" />
              <Button className="rounded-none bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 px-5 py-2 font-bold tracking-widest uppercase text-xs">Get Started</Button>
            </div>
          </div>
          <div className="reveal transition-all duration-300" data-dir="right" data-delay="260"
            style={{ opacity: animating ? 0 : 1, transform: animating ? `translateX(${direction === "left" ? "40px" : "-40px"})` : undefined }}>
            <div className="relative overflow-hidden border border-gray-200 dark:border-gray-700">
              <img src={current.image} alt={current.title} className="w-full h-72 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
              <div className="absolute top-4 right-4 text-7xl font-black text-white/5 leading-none select-none font-mono">{current.number}</div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2"><Icon icon={current.icon} className="text-indigo-400" width={18} /><span className="text-white font-bold text-sm">{current.short}</span></div>
                <div className="flex gap-1.5 mt-3">
                  {steps.map((_, i) => (<button key={i} onClick={() => goTo(i)} className={`transition-all duration-300 ${i === active ? "w-6 h-1.5 bg-white" : i < active ? "w-1.5 h-1.5 bg-white/50" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"}`} />))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


const POINTS = [
  { icon: "solar:cpu-bolt-bold-duotone", pain: "Outdated Execution", painDetail: "Legacy platforms miss market moves and deliver poor fill rates that frustrate active traders.", solution: "CubeX delivers sub-millisecond order execution via FIX connectivity with zero-downtime cloud infrastructure.", stat: "< 1ms fills" },
  { icon: "solar:plug-circle-bold-duotone", pain: "Limited Liquidity Access", painDetail: "Single-LP setups mean wide spreads, requotes, and poor execution during news events.", solution: "CubeX connects to multiple tier-1 banks and ECN providers with smart order routing for best available price.", stat: "Multi-LP" },
  { icon: "solar:chart-bold-duotone", pain: "Poor Mobile Experience", painDetail: "Traders churn when the mobile trading experience is slow, buggy, or missing key features.", solution: "CubeX delivers fully native iOS and Android apps — biometric login, real-time charts, one-tap execution.", stat: "iOS & Android" },
  { icon: "solar:shield-warning-bold-duotone", pain: "No Risk Visibility", painDetail: "Brokers operating blind — no live exposure data, margin alerts, or routing controls.", solution: "CubeX Risk Desk gives real-time position monitoring, per-group margin controls, and A/B-book routing rules.", stat: "Real-time" },
  { icon: "solar:graph-up-bold-duotone", pain: "Slow Time to Market", painDetail: "Custom platform builds take 6–12 months and still require ongoing dev resources to maintain.", solution: "CubeX deploys a fully white-labelled, production-ready trading platform in under 14 days.", stat: "14-day live" },
  { icon: "solar:wallet-money-bold-duotone", pain: "High Infrastructure Costs", painDetail: "Running your own execution servers, feed handlers, and data infrastructure is expensive.", solution: "CubeX is cloud-hosted, multi-region, and fully managed — no infrastructure team needed.", stat: "Zero infra" },
];

const STATS = [
  { n: "< 1ms", l: "Execution" },
  { n: "14 days", l: "Go-live" },
  { n: "50+", l: "Assets" },
  { n: "99.9%", l: "Uptime" },
];

function PainPoints() {
  const router = useRouter();
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;
  const featured = POINTS[0];

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="relative max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="reveal inline-block text-[10px] font-bold uppercase tracking-[3px] text-indigo-500 border border-indigo-500/30 px-3 py-1 mb-4"
            data-dir="up" data-delay="0"
          >
            Problem → Solution
          </span>
          <h2
            className="reveal text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white"
            data-dir="up" data-delay="80"
          >
            Built to Fix What{" "}
            <span className="text-indigo-500 dark:text-indigo-400">Brokerages Get Wrong</span>
          </h2>
          <p
            className="reveal text-gray-400 text-sm mt-4 max-w-md mx-auto"
            data-dir="up" data-delay="140"
          >
            One platform that replaces fragmented trading infrastructure end-to-end.
          </p>
        </div>

        {/* Featured card + stats row */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch mb-10">

          {/* Featured problem/solution card */}
          <div
            className="reveal flex-1 border border-indigo-500/20 bg-white dark:bg-gray-800 p-8 relative overflow-hidden"
            data-dir="left" data-delay="0"
          >
            {/* Accent line */}
            <span className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-60" />

            <div className="flex items-center gap-3 mb-6 pl-4">
              <div className="w-10 h-10 flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20">
                <Icon icon={featured.icon} width={20} className="text-indigo-500 dark:text-indigo-400" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[2.5px] text-indigo-500 font-mono">
                {featured.stat}
              </span>
            </div>

            <div className="pl-4 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Icon icon="solar:close-circle-bold" className="text-red-400 flex-shrink-0" width={13} />
                  <span className="text-red-500 dark:text-red-400 text-[10px] font-bold uppercase tracking-widest font-mono">
                    {featured.pain}
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed pl-5">{featured.painDetail}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <Icon icon="solar:arrow-down-bold" width={13} className="text-indigo-400 flex-shrink-0" />
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Icon icon="solar:check-circle-bold" className="text-indigo-500 dark:text-indigo-400 flex-shrink-0" width={13} />
                  <span className="text-indigo-500 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-widest font-mono">
                    CubeX Solution
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed pl-5">{featured.solution}</p>
              </div>
            </div>
          </div>

          {/* Stats column */}
          <div
            className="reveal lg:w-56 grid grid-cols-2 lg:grid-cols-1 gap-3"
            data-dir="right" data-delay="80"
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                className="flex-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-5 flex flex-col justify-center"
              >
                <span className="text-2xl font-black text-gray-900 dark:text-white font-mono tracking-tight">
                  {s.n}
                </span>
                <span className="text-[10px] uppercase tracking-[2px] text-gray-400 mt-1">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div
          className="reveal flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-8 py-5"
          data-dir="up" data-delay="0"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-bold text-gray-900 dark:text-white">5 more problems</span> we solve —
            execution, liquidity, mobile, risk, and infrastructure.
          </p>
          <Button
            onClick={() => router.push("/problems")}
            className="rounded-none bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 px-7 py-3 font-bold tracking-widest uppercase text-xs whitespace-nowrap flex-shrink-0"
          >
            View All Problems →
          </Button>
        </div>

      </div>
    </section>
  );
}

// ─── News ─────────────────────────────────────────────────────────────────────
function NewsSection() {
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;
  return (
    <section ref={ref} className="py-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="reveal" data-dir="left" data-delay="0"><DiagBadge label="Resources" /></div>
            <h2 className="reveal text-4xl font-black text-gray-900 dark:text-white mt-4 tracking-tight" data-dir="left" data-delay="80">
              Explore Latest News &amp; Insights
            </h2>
          </div>
          <a href="#" className="reveal text-indigo-500 dark:text-indigo-400 font-semibold hover:underline whitespace-nowrap text-sm" data-dir="right" data-delay="80">
            View All Articles →
          </a>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {news.map((n, i) => (
            <a key={i} href="#"
              className="reveal group border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden hover:border-indigo-500/30 transition-all"
              data-dir="up"
              data-delay={i * 80}>
              <div className="aspect-video overflow-hidden">
                <img src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <span className="text-indigo-500 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-[2px] font-mono">{n.category}</span>
                <h3 className="text-gray-900 dark:text-white font-semibold text-sm mt-2 leading-snug group-hover:text-indigo-500 transition-colors">{n.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQSection() {
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section ref={ref} className="py-24 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="reveal" data-dir="up" data-delay="0"><DiagBadge label="Support" /></div>
          <h2 className="reveal text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-4 tracking-tight" data-dir="up" data-delay="80">FAQs</h2>
        </div>
        <div className="flex flex-col gap-2">
          {faqs.map((f, i) => (
            <div key={i}
              className={`reveal border transition-all ${open === i ? "border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-950/30" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"}`}
              data-dir="up"
              data-delay={i * 60}>
              <button className="w-full flex justify-between items-center px-5 py-[18px] text-sm font-semibold text-left text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors" onClick={() => setOpen(open === i ? null : i)}>
                <span>{f.q}</span>
                <span className="text-indigo-500 dark:text-indigo-400 text-xl ml-3 flex-shrink-0 font-mono transition-transform duration-200 inline-block" style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
              </button>
              {open === i && <div className="px-5 pb-4 pt-4 text-[13px] text-gray-500 dark:text-gray-400 leading-[1.8] border-t border-gray-100 dark:border-gray-700">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;
  return (
    <section ref={ref} className="py-28 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <div className="reveal w-[88px] h-[88px] border border-indigo-500/20 bg-indigo-500/10 flex items-center justify-center mx-auto mb-7" data-dir="fade" data-delay="0">
          <span className="font-black text-[22px] tracking-tight text-indigo-500 dark:text-indigo-400 font-mono">CX</span>
        </div>
        <div className="reveal mb-5 inline-block" data-dir="up" data-delay="80"><DiagBadge label="Get Started Today" /></div>
        <h2 className="reveal max-w-4xl text-[clamp(2rem,5vw,3.8rem)] font-black leading-[1.08] tracking-tight mb-5 text-gray-900 dark:text-white" data-dir="up" data-delay="140">
          The trading platform your brokerage <span className="text-indigo-500 dark:text-indigo-400">deserves</span>
        </h2>
        <p className="reveal text-gray-500 dark:text-gray-400 text-base leading-[1.75] max-w-[500px] mx-auto mb-9" data-dir="up" data-delay="200">
          400+ brokers trust CubeX for execution speed, liquidity depth, and a white-label trading experience that keeps traders coming back. Go live in under 14 days.
        </p>

        <div className="reveal flex flex-wrap gap-3 justify-center mb-7" data-dir="up" data-delay="260">
          <Button className="rounded-none bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 px-8 py-3 font-bold tracking-widest uppercase text-xs">Request a Demo →</Button>
          <Button variant="outline" className="rounded-none border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-3 font-bold tracking-wide text-sm">Talk to Sales</Button>
        </div>
        <div className="reveal flex flex-wrap justify-center gap-x-5 gap-y-1" data-dir="up" data-delay="320">
          {["No setup fees", "Dedicated onboarding", "99.9% uptime SLA"].map((t, i) => (
            <span key={i} className="text-xs text-gray-400 font-medium flex items-center gap-1.5 font-mono">
              {i > 0 && <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 inline-block" />}{t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Homes />
      <Home />
      <StatBar />
      <AboutUs />
      <WhyChooseUs />
      <InsideVertexTrader />
      <Highlights />
      <Testimonials />
      <Onboarding />
      <PainPoints />
      <NewsSection />
      <FAQSection />
      <CTA />
    </main>
  );
}
