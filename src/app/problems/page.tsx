"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const POINTS = [
  { icon: "solar:cpu-bolt-bold-duotone",      pain: "Outdated Execution",        painDetail: "Legacy platforms miss market moves and deliver poor fill rates that frustrate active traders.",     solution: "CubeX delivers sub-millisecond order execution via FIX connectivity with zero-downtime cloud infrastructure.", stat: "< 1ms fills" },
  { icon: "solar:plug-circle-bold-duotone",   pain: "Limited Liquidity Access",  painDetail: "Single-LP setups mean wide spreads, requotes, and poor execution during news events.",             solution: "CubeX connects to multiple tier-1 banks and ECN providers with smart order routing for best available price.", stat: "Multi-LP"    },
  { icon: "solar:chart-bold-duotone",         pain: "Poor Mobile Experience",    painDetail: "Traders churn when the mobile trading experience is slow, buggy, or missing key features.",        solution: "CubeX delivers fully native iOS and Android apps — biometric login, real-time charts, one-tap execution.",    stat: "iOS & Android"},
  { icon: "solar:shield-warning-bold-duotone",pain: "No Risk Visibility",        painDetail: "Brokers operating blind — no live exposure data, margin alerts, or routing controls.",             solution: "CubeX Risk Desk gives real-time position monitoring, per-group margin controls, and A/B-book routing rules.", stat: "Real-time"   },
  { icon: "solar:graph-up-bold-duotone",      pain: "Slow Time to Market",       painDetail: "Custom platform builds take 6–12 months and still require ongoing dev resources to maintain.",     solution: "CubeX deploys a fully white-labelled, production-ready trading platform in under 14 days.",                   stat: "14-day live" },
  { icon: "solar:wallet-money-bold-duotone",  pain: "High Infrastructure Costs", painDetail: "Running your own execution servers, feed handlers, and data infrastructure is expensive.",         solution: "CubeX is cloud-hosted, multi-region, and fully managed — no infrastructure team needed.",                     stat: "Zero infra"  },
];

export default function ProblemsPage() {
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;

  return (
    <main ref={ref} className="min-h-screen bg-gray-50 dark:bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <span className="reveal inline-block text-[10px] font-bold uppercase tracking-[3px] text-indigo-500 border border-indigo-500/30 px-3 py-1 mb-5"
            data-dir="left" data-delay="0">
            Problem → Solution
          </span>
          <h1 className="reveal text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.05] mb-5"
            data-dir="left" data-delay="80">
            Every problem.<br />
            <span className="text-indigo-500 dark:text-indigo-400">One platform.</span>
          </h1>
          <p className="reveal text-gray-400 text-base leading-relaxed"
            data-dir="left" data-delay="160">
            CubeX was built by trading infrastructure veterans who lived these problems firsthand.
            Here's what we fixed — and exactly how.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {POINTS.map((p, i) => (
            <div
              key={i}
              className={`reveal relative border p-6 transition-all duration-300 cursor-default overflow-hidden ${
                hovered === i
                  ? "border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-950/20 -translate-y-1"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              }`}
              data-dir={i % 2 === 0 ? "left" : "right"}
              data-delay={`${(i % 3) * 80}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 border font-mono transition-all duration-300 ${
                hovered === i
                  ? "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-indigo-500/20"
                  : "bg-gray-50 dark:bg-gray-700 text-gray-400 border-gray-200 dark:border-gray-600"
              }`}>{p.stat}</span>

              <div className={`w-11 h-11 flex items-center justify-center mb-4 border transition-all duration-300 ${
                hovered === i ? "bg-indigo-500/10 border-indigo-500/20" : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              }`}>
                <Icon icon={p.icon} width={22} className={`transition-colors duration-300 ${hovered === i ? "text-indigo-500 dark:text-indigo-400" : "text-gray-400"}`} />
              </div>

              <div className="flex items-center gap-2 mb-1">
                <Icon icon="solar:close-circle-bold" className="text-red-400 flex-shrink-0" width={14} />
                <span className="text-red-500 dark:text-red-400 text-xs font-semibold uppercase tracking-wide font-mono">{p.pain}</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-4 pl-5">{p.painDetail}</p>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <Icon icon="solar:arrow-down-bold" width={14} className={`transition-colors duration-300 flex-shrink-0 ${hovered === i ? "text-indigo-500" : "text-gray-300 dark:text-gray-600"}`} />
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              </div>

              <div className="flex items-center gap-2 mb-1">
                <Icon icon="solar:check-circle-bold" className="text-indigo-500 dark:text-indigo-400 flex-shrink-0" width={14} />
                <span className="text-indigo-500 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wide font-mono">CubeX Solution</span>
              </div>
              <p className={`text-xs leading-relaxed pl-5 transition-colors duration-300 ${hovered === i ? "text-gray-700 dark:text-gray-200" : "text-gray-500 dark:text-gray-400"}`}>
                {p.solution}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal border border-indigo-500/20 bg-indigo-500/5 dark:bg-indigo-950/20 p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          data-dir="up" data-delay="0">
          <div>
            <h3 className="text-xl font-black mb-1 text-gray-900 dark:text-white">
              One platform. Every tool your brokerage needs.
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Web terminal · Mobile app · Multi-LP liquidity · Risk desk · 14-day go-live
            </p>
          </div>
          <Button className="rounded-none bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 px-7 py-3 font-bold whitespace-nowrap flex-shrink-0 tracking-widest uppercase text-xs">
            Explore CubeX Platform
          </Button>
        </div>

      </div>
    </main>
  );
}