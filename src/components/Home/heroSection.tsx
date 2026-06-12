"use client";

import { useEffect, useRef } from "react";
import { Button } from "../ui/button";

const tickers = [
  { s: "BTC/USD", v: "67,420.50", up: true },
  { s: "ETH/USD", v: "3,512.80",  up: true },
  { s: "EUR/USD", v: "1.0847",    up: false },
  { s: "GBP/USD", v: "1.2703",    up: true },
  { s: "XAU/USD", v: "2,381.5",   up: true },
  { s: "S&P 500", v: "5,248.00",  up: true },
  { s: "US30",    v: "39,112.0",  up: false },
  { s: "NAS100",  v: "18,340.5",  up: true },
  { s: "CRUDE",   v: "82.14",     up: false },
  { s: "USD/JPY", v: "149.82",    up: true },
  { s: "USD/CHF", v: "0.8911",    up: false },
  { s: "GBP/JPY", v: "188.42",    up: false },
];

const chips = [
  { pair: "EUR/USD", value: "▲ 1.0847", up: true,  left: "3%",  top: "12%" },
  { pair: "GBP/JPY", value: "▼ 188.42", up: false, left: "60%", top: "10%" },
  { pair: "XAU/USD", value: "▲ 2,381.5",up: true,  left: "3%",  top: "72%" },
  { pair: "BTC/USD", value: "▼ 97,240", up: false, left: "60%", top: "74%" },
];

const stats = [
  { n: "400+",  l: "Brokers" },
  { n: "200K+", l: "Traders" },
  { n: "50+",   l: "Asset Classes" },
  { n: "99.9%", l: "Uptime" },
];

const tags = [
  { label: "White-label ready", color: "amber" },
  { label: "15+ years expertise", color: "green" },
  { label: "Tier-1 liquidity", color: "indigo" },
  { label: "200K+ traders", color: "default" },
  { label: "50+ asset classes", color: "default" },
];

export default function Home() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const cubeRef  = useRef<HTMLDivElement>(null);

  /* cube drag */
  useEffect(() => {
    const scene = sceneRef.current;
    const cube  = cubeRef.current;
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
    const down = (e: PointerEvent) => {
      dragging = true; idle = 0; vY = 0;
      lastX = e.clientX; lastY = e.clientY;
      try { scene.setPointerCapture(e.pointerId); } catch (_) {}
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      rotY += dx * 0.5; rotX -= dy * 0.5;
      rotX = Math.max(-80, Math.min(80, rotX));
      vY = dx * 0.5; lastX = e.clientX; lastY = e.clientY;
    };
    const up = () => { dragging = false; idle = 0; };
    scene.addEventListener("pointerdown", down);
    scene.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    render(); raf = requestAnimationFrame(loop);
    return () => {
      scene.removeEventListener("pointerdown", down);
      scene.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      cancelAnimationFrame(raf);
    };
  }, []);

  const tickerItems = [...tickers, ...tickers];

  return (
    <>
      <style>{`
        @keyframes ticker-scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker-track { display:flex; width:max-content; animation:ticker-scroll 36s linear infinite; }
        .ticker-track:hover { animation-play-state:paused; }

        @keyframes hero-in { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .ha { animation:hero-in 0.7s cubic-bezier(.22,1,.36,1) both; }
        .ha-1{animation-delay:0.08s} .ha-2{animation-delay:0.18s} .ha-3{animation-delay:0.28s}
        .ha-4{animation-delay:0.38s} .ha-5{animation-delay:0.48s}

        .hero-grid-bg {
          position:absolute; inset:0; pointer-events:none;
          background-image:
            linear-gradient(rgba(99,102,241,0.07) 1px,transparent 1px),
            linear-gradient(90deg,rgba(99,102,241,0.07) 1px,transparent 1px);
          background-size:40px 40px;
        }

        @keyframes chip-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .hero-chip {
          position:absolute; display:flex; align-items:center; gap:5px;
          font-size:10px; font-weight:700; letter-spacing:0.3px;
          padding:5px 11px; white-space:nowrap; pointer-events:none;
          backdrop-filter:blur(8px);
          border:1px solid rgba(99,102,241,0.15);
          background:rgba(255,255,255,0.82);
          font-family:'Space Mono',monospace;
          animation:chip-float var(--t,7s) ease-in-out infinite;
        }
        .dark .hero-chip { background:rgba(15,20,40,0.7); border-color:rgba(99,102,241,0.2); }
        .hero-chip.up b { color:#059669; }
        .hero-chip.dn b { color:#dc2626; }
        .dark .hero-chip.up b { color:#34d399; }
        .dark .hero-chip.dn b { color:#f87171; }
        .hero-chip::before {
          content:''; width:6px; height:6px; border-radius:50%; flex-shrink:0;
        }
        .hero-chip.up::before { background:#10b981; }
        .hero-chip.dn::before { background:#ef4444; }

        .hero-scene {
          width:200px; height:200px; perspective:800px; cursor:grab;
          filter:drop-shadow(0 8px 40px rgba(99,102,241,0.35));
        }
        .hero-scene:active{cursor:grabbing}
        .hero-cube { width:100%; height:100%; position:relative; transform-style:preserve-3d; }
        .cube-face {
          position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
          border:1px solid rgba(99,102,241,0.3);
        }
        .face-front { background:linear-gradient(135deg,rgba(99,102,241,0.25),rgba(139,92,246,0.15)); transform:translateZ(100px); }
        .face-back  { background:linear-gradient(135deg,rgba(99,102,241,0.12),rgba(16,185,129,0.15)); transform:rotateY(180deg) translateZ(100px); }
        .face-left  { background:rgba(99,102,241,0.08); transform:rotateY(-90deg) translateZ(100px); }
        .face-right { background:rgba(139,92,246,0.08); transform:rotateY(90deg) translateZ(100px); }
        .face-top   { background:rgba(99,102,241,0.1); transform:rotateX(90deg) translateZ(100px); }
        .face-bottom{ background:rgba(99,102,241,0.04); transform:rotateX(-90deg) translateZ(100px); }
        .cube-logo { font-size:24px; font-weight:900; letter-spacing:-1px; color:#fff; line-height:1; text-align:center; font-family:'Space Mono',monospace; }
        .cube-logo .cx { color:#a5b4fc; }
        .cube-sub { font-size:7px; letter-spacing:3px; color:rgba(255,255,255,0.4); display:block; text-align:center; margin-top:5px; }
        .face-mini { font-size:9px; font-weight:700; letter-spacing:2px; color:rgba(255,255,255,0.4); text-align:center; font-family:'Space Mono',monospace; }
        .face-mini span { display:block; font-size:18px; font-weight:900; color:rgba(165,180,252,0.8); letter-spacing:-0.5px; line-height:1.2; }
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

        {/* LEFT + RIGHT grid */}
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-0 min-h-[560px]">

          {/* LEFT — text content */}
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-20 relative z-10">

            {/* Badge */}
            <div className="ha ha-1 inline-flex items-center gap-2 mb-6 w-fit
              border border-indigo-500/20 bg-indigo-500/8 dark:bg-indigo-500/10
              px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-indigo-600 dark:text-indigo-400">
                Trusted by 400+ Brokers Worldwide
              </span>
            </div>

            {/* Headline */}
            <h1 className="ha ha-2 font-black leading-[1.02] tracking-tight text-slate-900 dark:text-white mb-4"
              style={{ fontSize: "clamp(36px,5vw,58px)", letterSpacing: "-2px", fontFamily: "'Space Mono', monospace" }}>
              Empower Your<br />
              <span className="text-indigo-500">Brokerage</span> Growth.
            </h1>

            {/* Sub */}
            <p className="ha ha-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-[420px] mb-6">
              The platform Forex brokers &amp; Prop Firms rely on to streamline operations,
              scale efficiently, and deliver superior trading performance — built for long-term growth.
            </p>

            {/* Tags */}
            <div className="ha ha-4 flex flex-wrap gap-2 mb-8">
              {tags.map((tag) => (
                <span key={tag.label} className={
                  tag.color === "amber"
                    ? "text-[10px] font-bold uppercase tracking-wide px-3 py-1 border border-amber-300 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10"
                    : tag.color === "green"
                    ? "text-[10px] font-bold uppercase tracking-wide px-3 py-1 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
                    : tag.color === "indigo"
                    ? "text-[10px] font-bold uppercase tracking-wide px-3 py-1 border border-indigo-300 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10"
                    : "text-[10px] font-bold uppercase tracking-wide px-3 py-1 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800"
                }>
                  {tag.label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="ha ha-5 flex flex-col sm:flex-row gap-3">
              <Button className="rounded-none bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-gray-200 px-7 py-3 font-bold tracking-widest uppercase text-[10px] font-mono">
                Request a Demo →
              </Button>
              <Button variant="outline" className="rounded-none border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-3 font-bold tracking-wide text-sm">
                Explore Platform
              </Button>
            </div>
          </div>

          {/* RIGHT — cube */}
          <div className="relative flex items-center justify-center py-16
            bg-gradient-to-br from-indigo-50 via-violet-50 to-white
            dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
            <div className="hero-grid-bg" />

            {/* Floating chips */}
            {chips.map((c, i) => (
              <div
                key={i}
                className={`hero-chip ${c.up ? "up" : "dn"}`}
                style={{ left: c.left, top: c.top, "--t": `${7 + i * 0.8}s` } as React.CSSProperties}
              >
                {c.pair} <b>{c.value}</b>
              </div>
            ))}

            {/* 3D Cube */}
            <div
              ref={sceneRef}
              className="hero-scene"
              style={{ "--cube": "200px" } as React.CSSProperties}
              aria-label="Interactive 3D CubeX logo — drag to rotate"
            >
              <div ref={cubeRef} className="hero-cube">
                <div className="cube-face face-front">
                  <div className="cube-logo">Cube<span className="cx">X</span><span className="cube-sub">PLATFORM</span></div>
                </div>
                <div className="cube-face face-back">
                  <div className="face-mini"><span>50+</span>ASSETS</div>
                </div>
                <div className="cube-face face-left">
                  <div className="face-mini"><span>400+</span>BROKERS</div>
                </div>
                <div className="cube-face face-right">
                  <div className="face-mini"><span>24/7</span>SUPPORT</div>
                </div>
                <div className="cube-face face-top">
                  <div className="face-mini"><span>99.9%</span>UPTIME</div>
                </div>
                <div className="cube-face face-bottom" />
              </div>
            </div>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="border-t border-gray-100 dark:border-white/8 bg-white dark:bg-slate-900">
          <div className="max-w-[1280px] mx-auto grid grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.l} className={`py-5 text-center ${i < stats.length - 1 ? "border-r border-gray-100 dark:border-white/8" : ""}`}>
                <div className="font-mono font-bold text-[22px] tracking-tight text-slate-900 dark:text-white leading-none">{s.n}</div>
                <div className="text-[10px] text-gray-400 mt-1 tracking-widest uppercase">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}