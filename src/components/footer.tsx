"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// --- Animated candlestick chart data ---
const generateCandles = (count: number) => {
  let price = 100;
  return Array.from({ length: count }, (_, i) => {
    const open = price;
    const change = (Math.random() - 0.48) * 6;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * 3;
    const low = Math.min(open, close) - Math.random() * 3;
    price = close;
    return { open, close, high, low, bullish: close >= open };
  });
};

const CANDLE_COUNT = 28;

function TradingChart() {
  const [candles, setCandles] = useState(() => generateCandles(CANDLE_COUNT));
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCandles(prev => {
          const last = prev[prev.length - 1];
          const open = last.close;
          const change = (Math.random() - 0.47) * 5;
          const close = open + change;
          const high = Math.max(open, close) + Math.random() * 2.5;
          const low = Math.min(open, close) - Math.random() * 2.5;
          return [...prev.slice(1), { open, close, high, low, bullish: close >= open }];
        });
        setAnimating(false);
      }, 300);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const allPrices = candles.flatMap(c => [c.high, c.low]);
  const minP = Math.min(...allPrices);
  const maxP = Math.max(...allPrices);
  const range = maxP - minP || 1;
  const toY = (p: number) => ((maxP - p) / range) * 100;

  const linePoints = candles.map((c, i) => {
    const x = (i / (CANDLE_COUNT - 1)) * 100;
    const y = toY((c.open + c.close) / 2);
    return `${x},${y}`;
  }).join(" ");

  const areaPoints = `0,100 ${linePoints} 100,100`;

  return (
    <div className="relative w-full h-28 overflow-hidden">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6b7280" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6b7280" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="chartFillDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9ca3af" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#9ca3af" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[25, 50, 75].map(y => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#6b7280" strokeOpacity="0.08" strokeWidth="0.4" />
        ))}

        {/* Area fill */}
        <polygon
          points={areaPoints}
          fill="url(#chartFill)"
          className="dark:fill-[url(#chartFillDark)]"
          style={{ transition: animating ? "all 0.3s ease" : undefined }}
        />

        {/* Line */}
        <polyline
          points={linePoints}
          fill="none"
          stroke="#6b7280"
          strokeWidth="0.8"
          strokeLinejoin="round"
          className="dark:stroke-gray-400"
          style={{ transition: animating ? "all 0.3s ease" : undefined }}
        />

        {/* Candles */}
        {candles.map((c, i) => {
          const x = (i / (CANDLE_COUNT - 1)) * 100;
          const bodyTop = toY(Math.max(c.open, c.close));
          const bodyH = Math.max(Math.abs(toY(c.open) - toY(c.close)), 0.8);
          const color = c.bullish ? "#10b981" : "#ef4444";
          return (
            <g key={i} style={{ transition: "all 0.3s ease" }}>
              <line x1={x} y1={toY(c.high)} x2={x} y2={toY(c.low)} stroke={color} strokeWidth="0.35" strokeOpacity="0.7" />
              <rect
                x={x - 0.9}
                y={bodyTop}
                width={1.8}
                height={bodyH}
                fill={color}
                fillOpacity="0.85"
                rx="0.2"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// Ticker strip
const TICKERS = [
  { sym: "BTC/USD", val: "67,420.50", chg: "+2.14%" },
  { sym: "ETH/USD", val: "3,512.80", chg: "+1.88%" },
  { sym: "EUR/USD", val: "1.0842", chg: "-0.12%" },
  { sym: "GBP/USD", val: "1.2703", chg: "+0.34%" },
  { sym: "XAU/USD", val: "2,318.40", chg: "+0.57%" },
  { sym: "S&P 500", val: "5,248.00", chg: "+0.91%" },
  { sym: "US30", val: "39,112.0", chg: "-0.08%" },
  { sym: "NAS100", val: "18,340.5", chg: "+1.22%" },
];

function TickerTape() {
  const items = [...TICKERS, ...TICKERS];
  return (
    <div className="bg-white/90 dark:bg-gray-900/95 border-y border-gray-200 dark:border-gray-800" style={{ overflow: "hidden", padding: "2px 0" }}>
      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .ticker-track { display: flex; gap: 0; animation: ticker 32s linear infinite; width: max-content; }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="ticker-track">
        {items.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-7 border-r border-gray-200 dark:border-gray-800 text-[11px] tracking-[0.5px] font-mono"
          >
            <span className="font-bold text-gray-700 dark:text-gray-300">{t.sym}</span>
            <span className="text-gray-900 dark:text-gray-100">{t.val}</span>
            <span style={{ color: t.chg.startsWith("+") ? "#10b981" : "#ef4444", fontWeight: 700 }}>{t.chg}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function DiagBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-block bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-100 text-white dark:text-gray-900 text-[10px] font-extrabold tracking-[2px] uppercase px-[14px] py-1"
      style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
    >
      {label}
    </span>
  );
}

export default function Footer() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 28s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>

      <footer className="relative bg-white dark:bg-gray-950 overflow-hidden mt-12">

        {/* CTA Section */}
        <div style={{ maxWidth: 1280, margin: "0 auto 56px", padding: "0 5%" }}>
          <div className="relative overflow-hidden flex items-center justify-between flex-wrap gap-6 px-11 py-5 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: "linear-gradient(180deg,#374151,#6b7280)" }} />
            <div>
              <DiagBadge label="Grow with us" />
              <h3 className="mt-[14px] font-bold text-[clamp(20px,3vw,28px)] tracking-[-0.5px] text-gray-900 dark:text-gray-100 font-['Space_Grotesk',sans-serif]">
                Ready to Maximize Your Brokerage's Potential?
              </h3>
            </div>
            <button
              onClick={() => router.push("/contact")}
              className="px-6 py-2 rounded-xs bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300">
              Contact Us Now
            </button>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 py-1 relative overflow-hidden">
          <TickerTape />
        </div>
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-400/5 dark:bg-gray-600/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-300/5 dark:bg-gray-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Main grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 py-10">

            {/* Brand section */}
            <div className="lg:col-span-2 space-y-6 flex flex-col items-center text-center md:items-start md:text-left">
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-700 dark:from-gray-400 dark:to-gray-600 p-0.5 shadow-lg shadow-gray-500/20">
                  <div className="w-full h-full rounded-xl bg-white dark:bg-gray-900 flex items-center justify-center">
                    <Image
                      src="/Orbit1.png"
                      alt="Orbitfx Solution"
                      width={56}
                      height={56}
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                <div>
                  <span className="font-bold text-xl bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent">
                    OrbitFX
                  </span>
                  <span className="font-bold text-xl text-gray-500 dark:text-gray-400">Solution</span>
                </div>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-md">
                Enterprise-grade trading infrastructure powering the next generation of Forex Brokers and Prop Firms with institutional-grade technology.
              </p>

              {/* Live stats */}
              <div className="flex gap-6 pt-2">
                {[
                  { value: "500+", label: "Clients" },
                  { value: "$2B+", label: "Volume" },
                  { value: "99.9%", label: "Uptime" },
                ].map((stat, i) => (
                  <div key={stat.label} style={{ animationDelay: `${i * 200}ms` }}>
                    <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">{stat.value}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Link columns */}
            <div className="md:col-span-2 lg:col-span-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Products",
                  links: [
                    { label: "Trading Platform", href: "#" },
                    { label: "Risk Management", href: "#" },
                    { label: "Liquidity Bridge", href: "#" },
                    { label: "Analytics Suite", href: "#" },
                    { label: "API Gateway", href: "#" },
                  ],
                },
                {
                  title: "Resources",
                  links: [
                    { label: "News", href: "/resources#news" },
                    { label: "Documentation", href: "/resources#documentation" },
                    { label: "Comparisons", href: "/resources#comparisons" },
                    { label: "Quick Access", href: "/resources#quick" },
                    { label: "Help", href: "/resources#news" },
                  ],
                },
                {
                  title: "Company",
                  links: [
                    { label: "About Us", href: "/company#about" },
                    { label: "Our Story", href: "/company#story" },
                    { label: "Careers", href: "/company#careers" },
                    { label: "Press & Media", href: "/company#press" },
                    { label: "Trust Center", href: "/company#trust" },
                  ],
                },
              ].map((col, colIndex) => (
                <div key={col.title} style={{ animationDelay: `${colIndex * 150 + 300}ms` }}>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-6 text-sm uppercase tracking-wider">
                    {col.title}
                  </h4>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="group flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-300 text-sm"
                        >
                          <span className="w-0 group-hover:w-2 h-0.5 bg-gray-500 transition-all duration-300" />
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {/* Ticker */}


          {/* Newsletter section */}
          <div className="border-t border-gray-200 dark:border-gray-800 py-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Stay updated</h4>
                <p className="text-sm text-gray-400 dark:text-gray-500">Get the latest product updates and industry insights.</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-2.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:border-gray-500 dark:focus:border-gray-400 focus:ring-2 focus:ring-gray-500/20 outline-none text-sm transition-all duration-300"
                />
                <button className="px-6 py-2.5 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              © {new Date().getFullYear()} Orbitfx Solution. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "SLA"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-400 dark:text-gray-500 text-sm hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>

      </footer >
    </>
  );
}