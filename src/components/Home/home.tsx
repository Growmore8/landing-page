"use client";

import { useEffect, useRef } from "react";
import { Button } from "../ui/button";

/* ── Static data ── */
const chips = [
  { pair: "EUR/USD", value: "▲ 1.0842", up: true, left: "3%", top: "22%" },
  { pair: "GBP/JPY", value: "▼ 188.42", up: false, left: "80%", top: "18%" },
  { pair: "XAU/USD", value: "▲ 2,381.5", up: true, left: "4%", top: "70%" },
  { pair: "USD/CHF", value: "▼ 0.8911", up: false, left: "82%", top: "68%" },
  { pair: "ETH/USD", value: "▲ 3,612", up: true, left: "86%", top: "43%" },
  { pair: "USD/JPY", value: "▼ 156.18", up: false, left: "2%", top: "46%" },
];

const deals = [
  { sym: "EUR/USD", sell: "1.0840", buy: "1.0842", left: "10%", top: "33%" },
  { sym: "XAU/USD", sell: "2381.1", buy: "2381.5", left: "68%", top: "80%" },
  { sym: "BTC/USD", sell: "97,235", buy: "97,240", left: "70%", top: "35%" },
];

const stats = [
  { n: "400+", l: "Brokers" },
  { n: "200K+", l: "Traders" },
  { n: "50+", l: "Asset Classes" },
  { n: "99.9%", l: "Uptime" },
];

const tickers = [
  { s: "BTC/USD", v: "67,420.50", up: true },
  { s: "ETH/USD", v: "3,512.80", up: true },
  { s: "EUR/USD", v: "1.0842", up: false },
  { s: "GBP/USD", v: "1.2703", up: true },
  { s: "XAU/USD", v: "2,318.40", up: true },
  { s: "S&P 500", v: "5,248.00", up: true },
  { s: "US30", v: "39,112.0", up: false },
  { s: "NAS100", v: "18,340.5", up: true },
  { s: "CRUDE", v: "82.14", up: false },
  { s: "USD/JPY", v: "149.82", up: true },
];

const tags = [
  { label: "White-label ready", color: "amber" },
  { label: "15+ years expertise", color: "green" },
  { label: "400+ brokers", color: "default" },
  { label: "200K+ traders", color: "default" },
];

/* ── Candlestick builder ── */
function buildCandles(el: HTMLDivElement, n: number) {
  let html = "";
  for (let i = 0; i < n; i++) {
    const up = Math.random() > 0.45;
    const h = (12 + Math.random() * 78).toFixed(0);
    const p = (0.55 + Math.random() * 0.8).toFixed(2);
    const delay = (Math.random() * 5).toFixed(2);
    html += `<div class="hero-candle ${up ? "up" : "dn"}"><i style="--h:${h}%;--p:${p};animation-delay:-${delay}s"></i></div>`;
  }
  el.innerHTML = html;
}

export default function Home() {
  const dRef = useRef<HTMLDivElement>(null);
  const hRef = useRef<HTMLDivElement>(null);
  const mRef = useRef<HTMLDivElement>(null);
  const sRef = useRef<HTMLDivElement>(null);
  const candlesBackRef = useRef<HTMLDivElement>(null);
  const candlesFrontRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  /* countdown */
  useEffect(() => {
    const launch = new Date(2026, 6, 1);
    const tick = () => {
      const diff = Math.max(0, launch.getTime() - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor(diff / 3600000) % 24;
      const m = Math.floor(diff / 60000) % 60;
      const s = Math.floor(diff / 1000) % 60;
      if (dRef.current) dRef.current.textContent = String(d).padStart(2, "0");
      if (hRef.current) hRef.current.textContent = String(h).padStart(2, "0");
      if (mRef.current) mRef.current.textContent = String(m).padStart(2, "0");
      if (sRef.current) sRef.current.textContent = String(s).padStart(2, "0");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* candles */
  useEffect(() => {
    const sm = window.matchMedia("(max-width:640px)").matches;
    if (candlesBackRef.current) buildCandles(candlesBackRef.current, sm ? 22 : 42);
    if (candlesFrontRef.current) buildCandles(candlesFrontRef.current, sm ? 14 : 26);
  }, []);

  /* cube drag */
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
        if (Math.abs(vY) > 0.02) { rotY += vY; vY *= 0.94; }
        else if (!reduce && idle > 45) { rotY += 0.22; rotX += (-18 - rotX) * 0.015; }
      }
      render();
      raf = requestAnimationFrame(loop);
    };
    const down = (e: PointerEvent) => {
      dragging = true; idle = 0; vY = 0;
      lastX = e.clientX; lastY = e.clientY;
      try { scene.setPointerCapture(e.pointerId); } catch (_) { }
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      rotY += dx * 0.6; rotX -= dy * 0.6;
      rotX = Math.max(-90, Math.min(90, rotX));
      vY = dx * 0.6; lastX = e.clientX; lastY = e.clientY;
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
      {/* ─── ALL STYLES ───────────────────────────────────────────── */}
      <style>{`
        /* ---- Ticker ---- */
        @keyframes ticker-scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker-track { display:flex; width:max-content; animation:ticker-scroll 38s linear infinite; }
        .ticker-track:hover { animation-play-state:paused; }

        /* ---- Grid bg ---- */
        @keyframes grid-pan { from{transform:translateY(0)} to{transform:translateY(64px)} }
        .hero-grid {
          position:absolute; inset:0; pointer-events:none;
          background-image:
            linear-gradient(rgba(91,140,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91,140,255,0.07) 1px, transparent 1px);
          background-size:64px 64px;
          animation:grid-pan 8s linear infinite;
        }
        .dark .hero-grid {
          background-image:
            linear-gradient(rgba(91,140,255,0.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91,140,255,0.10) 1px, transparent 1px);
        }

        /* ---- SVG price line ---- */
        .hero-priceline { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }
        @keyframes dash-draw { from{stroke-dashoffset:3000} to{stroke-dashoffset:0} }
        .hero-priceline path {
          fill:none; stroke:url(#plg); stroke-width:2.2; opacity:0.55;
          stroke-dasharray:3000; animation:dash-draw 3.5s cubic-bezier(.4,0,.2,1) forwards;
        }

        /* ---- Candles ---- */
        .hero-candles { position:absolute; bottom:0; left:0; right:0; height:100%; display:flex; align-items:flex-end; gap:1px; padding:0 2px; pointer-events:none; }
        .hero-candles.back  { opacity:0.13; }
        .hero-candles.front { opacity:0.22; bottom:0; }
        .hero-candle { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; height:100%; }
        @keyframes candle-pulse { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(0.92)} }
        .hero-candle i {
          display:block; width:calc(var(--p) * 1em); min-width:2px; height:var(--h);
          border-radius:1px 1px 0 0; animation:candle-pulse 4s ease-in-out infinite;
          transform-origin:bottom;
        }
        .hero-candle.up i { background:linear-gradient(to top,#1fd286,#34d399); }
        .hero-candle.dn i { background:linear-gradient(to top,#ff4d5e,#f87171); }

        /* ---- Floating chips ---- */
        @keyframes chip-float {
          0%,100%{transform:translateY(0px) scale(1); opacity:0.85}
          50%{transform:translateY(-12px) scale(1.02); opacity:1}
        }
        .hero-chip {
          position:absolute; display:flex; align-items:center; gap:6px;
          font-size:11px; font-family:'Space Mono',monospace; font-weight:600; letter-spacing:0.3px;
          padding:6px 12px; border-radius:20px; white-space:nowrap; pointer-events:none;
          backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,0.12);
          animation:chip-float var(--t,8s) ease-in-out infinite;
          background:rgba(255,255,255,0.08);
          color:rgba(0,0,0,0.55);
          box-shadow:0 4px 16px rgba(0,0,0,0.06);
        }
        .dark .hero-chip { background:rgba(255,255,255,0.07); color:rgba(255,255,255,0.55); border-color:rgba(255,255,255,0.08); }
        .hero-chip b { font-size:12px; }
        .hero-chip.up b { color:#16a34a; }
        .hero-chip.dn b { color:#dc2626; }
        .dark .hero-chip.up b { color:#4ade80; }
        .dark .hero-chip.dn b { color:#f87171; }
        .hero-chip::before {
          content:''; width:7px; height:7px; border-radius:50%; flex-shrink:0;
          animation:candle-pulse 2s ease-in-out infinite;
        }
        .hero-chip.up::before { background:#16a34a; box-shadow:0 0 0 3px rgba(22,163,74,0.2); }
        .hero-chip.dn::before { background:#dc2626; box-shadow:0 0 0 3px rgba(220,38,38,0.2); }

        /* ---- Deal cards ---- */
        @keyframes deal-drift {
          0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)}
        }
        .hero-deal {
          position:absolute; display:flex; flex-direction:column; gap:4px;
          font-family:'Space Mono',monospace; padding:10px 14px; pointer-events:none;
          backdrop-filter:blur(12px); border-radius:10px;
          border:1px solid rgba(255,255,255,0.15);
          background:rgba(255,255,255,0.1);
          box-shadow:0 8px 24px rgba(0,0,0,0.08);
          animation:deal-drift var(--t,9s) ease-in-out infinite;
        }
        .dark .hero-deal { background:rgba(15,20,40,0.55); border-color:rgba(255,255,255,0.1); }
        .hero-deal .dsym { font-size:10px; font-weight:800; letter-spacing:1.5px; color:rgba(0,0,0,0.4); text-transform:uppercase; }
        .dark .hero-deal .dsym { color:rgba(255,255,255,0.35); }
        .hero-deal .drow { display:flex; gap:8px; align-items:center; }
        .hero-deal .dside { display:flex; flex-direction:column; align-items:center; font-size:11px; font-weight:700; min-width:56px; padding:4px 8px; border-radius:6px; }
        .hero-deal .dside small { font-size:8px; font-weight:600; letter-spacing:1.5px; opacity:0.6; margin-bottom:1px; }
        .hero-deal .sell { background:rgba(239,68,68,0.12); color:#dc2626; }
        .hero-deal .buy  { background:rgba(34,197,94,0.12);  color:#16a34a; }
        .dark .hero-deal .sell { background:rgba(239,68,68,0.18); color:#f87171; }
        .dark .hero-deal .buy  { background:rgba(34,197,94,0.18);  color:#4ade80; }

        /* ---- 3-D cube ---- */
        @keyframes cube-glow { 0%,100%{box-shadow:0 0 30px rgba(91,140,255,0.35)} 50%{box-shadow:0 0 55px rgba(91,140,255,0.6)} }
        .hero-scene {
          width:var(--cube,200px); height:var(--cube,200px);
          perspective:900px; cursor:grab; position:relative; z-index:5;
          filter:drop-shadow(0 0 40px rgba(91,140,255,0.4));
        }
        .hero-scene:active { cursor:grabbing; }
        .hero-cube {
          width:100%; height:100%; position:relative;
          transform-style:preserve-3d; transition:none;
        }
        .cube-face {
          position:absolute; inset:0;
          display:flex; align-items:center; justify-content:center;
          border:1px solid rgba(91,140,255,0.35);
          backdrop-filter:blur(4px);
          font-family:'Space Mono',monospace;
        }
        .face-front  { background:linear-gradient(135deg,rgba(91,140,255,0.28),rgba(120,60,255,0.18)); transform:translateZ(calc(var(--cube,200px)/2)); }
        .face-back   { background:linear-gradient(135deg,rgba(91,140,255,0.18),rgba(31,210,134,0.18)); transform:rotateY(180deg) translateZ(calc(var(--cube,200px)/2)); }
        .face-left   { background:linear-gradient(135deg,rgba(91,140,255,0.15),rgba(91,140,255,0.08)); transform:rotateY(-90deg) translateZ(calc(var(--cube,200px)/2)); }
        .face-right  { background:linear-gradient(135deg,rgba(120,60,255,0.15),rgba(91,140,255,0.08)); transform:rotateY(90deg)  translateZ(calc(var(--cube,200px)/2)); }
        .face-top    { background:linear-gradient(135deg,rgba(91,140,255,0.25),rgba(255,255,255,0.05)); transform:rotateX(90deg)  translateZ(calc(var(--cube,200px)/2)); }
        .face-bottom { background:rgba(91,140,255,0.05); transform:rotateX(-90deg) translateZ(calc(var(--cube,200px)/2)); }
        .cube-logo { font-size:28px; font-weight:900; letter-spacing:-2px; line-height:1; }
        .cube-logo .cx { color:#5b8cff; }
        .cube-logo .sub { font-size:8px; letter-spacing:3px; color:rgba(255,255,255,0.4); display:block; text-align:center; margin-top:4px; }
        .face-mini { font-size:10px; font-weight:700; letter-spacing:2px; color:rgba(255,255,255,0.35); text-align:center; }
        .face-mini span { display:block; font-size:18px; font-weight:900; color:rgba(91,140,255,0.7); letter-spacing:-1px; line-height:1.2; }

        /* ---- Countdown ---- */
        .countdown-digit {
          display:flex; flex-direction:column; align-items:center;
          min-width:64px;
        }
        .countdown-num {
          font-family:'Space Mono',monospace; font-size:42px; font-weight:700;
          color:#111; line-height:1; letter-spacing:-2px;
          text-shadow:0 2px 12px rgba(91,140,255,0.2);
        }
        .dark .countdown-num { color:#fff; }
        .countdown-lbl { font-size:9px; font-weight:700; letter-spacing:3px; color:#9ca3af; text-transform:uppercase; margin-top:4px; }
        .countdown-sep { font-family:'Space Mono',monospace; font-size:36px; font-weight:300; color:#d1d5db; align-self:flex-start; padding-top:4px; }
        .dark .countdown-sep { color:#374151; }

        /* ---- Hero fade-in ---- */
        @keyframes hero-in { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .hero-animate { animation:hero-in 0.7s cubic-bezier(.22,1,.36,1) both; }
        .hero-animate-1 { animation-delay:0.1s; }
        .hero-animate-2 { animation-delay:0.22s; }
        .hero-animate-3 { animation-delay:0.34s; }
        .hero-animate-4 { animation-delay:0.46s; }
        .hero-animate-5 { animation-delay:0.58s; }

        /* ---- Radial glow ---- */
        .hero-glow {
          position:absolute; pointer-events:none;
          border-radius:50%; filter:blur(90px); opacity:0.35;
        }
        .hero-glow-1 { width:600px; height:400px; background:radial-gradient(ellipse,rgba(91,140,255,0.5),transparent 70%); top:-10%; left:30%; transform:translateX(-50%); }
        .hero-glow-2 { width:400px; height:300px; background:radial-gradient(ellipse,rgba(31,210,134,0.3),transparent 70%); top:50%; left:10%; }
        .hero-glow-3 { width:350px; height:280px; background:radial-gradient(ellipse,rgba(168,85,247,0.25),transparent 70%); top:30%; right:5%; }
      `}</style>

      {/* ─── TICKER TAPE ─────────────────────────────────── */}
      <div className="overflow-hidden bg-gray-900 dark:bg-black border-b border-white/5 py-[7px]">
        <div className="ticker-track">
          {tickerItems.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-7 border-r border-white/8 font-mono text-[11px]">
              <span className="text-gray-500 font-bold">{t.s}</span>
              <span className="text-white">{t.v}</span>
              <span className={t.up ? "text-emerald-400" : "text-red-400"}>{t.up ? "▲" : "▼"}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── HERO ────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ "--cube": "200px", "--brand": "#5b8cff" } as React.CSSProperties}
      >
        {/* Layered background */}
        <div className="absolute inset-0" />
        <div className="hero-glow hero-glow-1 dark:opacity-40" />
        <div className="hero-glow hero-glow-2 dark:opacity-30" />
        <div className="hero-glow hero-glow-3 dark:opacity-20" />
        <div className="hero-grid" />

        {/* SVG price line */}
        <svg className="hero-priceline" viewBox="0 0 1440 800" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="plg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ff4d5e" />
              <stop offset=".5" stopColor="#f3b73c" />
              <stop offset="1" stopColor="#1fd286" />
            </linearGradient>
          </defs>
          <path d="M-20,560 L90,540 L150,580 L230,470 L300,510 L380,420 L450,460 L540,350 L620,400 L700,300 L790,360 L870,250 L950,310 L1040,200 L1120,260 L1210,160 L1300,210 L1380,120 L1460,160" />
        </svg>

        {/* Candles */}
        <div className="hero-candles back" ref={candlesBackRef} aria-hidden />
        <div className="hero-candles front" ref={candlesFrontRef} aria-hidden />

        {/* Floating price chips */}
        {chips.map((c, i) => (
          <div
            key={i}
            className={`hero-chip ${c.up ? "up" : "dn"}`}
            style={{ left: c.left, top: c.top, "--t": `${7 + i * 0.7}s` } as React.CSSProperties}
          >
            {c.pair} <b>{c.value}</b>
          </div>
        ))}

        {/* Floating deal panels */}
        {deals.map((d, i) => (
          <div
            key={i}
            className="hero-deal hidden sm:flex"
            style={{ left: d.left, top: d.top, "--t": `${8.5 + i * 0.8}s` } as React.CSSProperties}
          >
            <span className="dsym">{d.sym}</span>
            <div className="drow">
              <span className="dside sell"><small>SELL</small>{d.sell}</span>
              <span className="dside buy"><small>BUY</small>{d.buy}</span>
            </div>
          </div>
        ))}

        {/* ─── MAIN CONTENT ──────────────────────── */}
        <div className="relative z-10 min-h-screen flex flex-col">

          {/* Center section — stacked vertically */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-8">
              {/* Headline */}
            <h1 className="hero-animate hero-animate-2 text-center font-bold leading-[1.05] tracking-[-2.5px] mb-5"
              style={{ fontSize: "clamp(42px,7vw,80px)", color: "inherit" }}>
              <span className="text-gray-900 dark:text-white">Trade Smarter</span><br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#5b8cff] via-[#818cf8] to-[#a78bfa] bg-clip-text text-transparent">
                  with CubeX
                </span>
                {/* Underline accent */}
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#5b8cff] to-[#a78bfa] rounded-full opacity-40" />
              </span>
            </h1>

            {/* Subhead */}
            <p className="hero-animate hero-animate-3 text-center text-[15px] sm:text-[16px] leading-[1.75] text-gray-500 dark:text-gray-400 max-w-[440px] mb-8">
              Real-time execution across 50+ asset classes. Enterprise back-office, white-label portals, and liquidity from 15+ tier-1 banks — all in one platform.
            </p>



          </div>

        </div>
      </div>
    </>
  );
}
