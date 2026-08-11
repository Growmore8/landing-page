"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// ─── DiagBadge (matches the site's shared badge — kept local so this file has no cross-file dependency) ──
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

// ─── Data ─────────────────────────────────────────────────────────────────────
const capabilities = [
  {
    icon: "solar:widget-5-bold-duotone",
    title: "Three-Layer Custody",
    desc: "Independent hot, warm, and cold environments keep operational, treasury, and client funds fully segregated — managed from one console.",
  },
  {
    icon: "solar:shield-keyhole-bold-duotone",
    title: "RAFP Governance",
    desc: "Role-based approval flows define who can move funds, under what conditions, with policy enforcement and conflict detection built in.",
  },
  {
    icon: "solar:lock-keyhole-bold-duotone",
    title: "MPC Security Core",
    desc: "m-of-n threshold signing runs inside secure enclaves. The full private key is never reconstructed, at rest or in transit.",
  },
  {
    icon: "solar:document-add-bold-duotone",
    title: "Embedded Compliance",
    desc: "KYC/AML, KYT, and Travel Rule logic run inside the payment flow itself, without adding friction for the end trader.",
  },
];

const gwStats = [
  { icon: "solar:wallet-money-bold-duotone", val: "1,862+", label: "Tokens Supported" },
  { icon: "solar:link-round-bold-duotone", val: "98+", label: "Protocols" },
  { icon: "solar:buildings-2-bold-duotone", val: "380+", label: "Institutional Clients" },
  { icon: "solar:global-bold-duotone", val: "15+", label: "Countries" },
];

const tokens = [
  { name: "Bitcoin", icon: "token-branded:btc" },
  { name: "Ethereum", icon: "token-branded:eth" },
  { name: "Solana", icon: "token-branded:sol" },
  { name: "BNB Smart Chain", icon: "token-branded:bnb" },
  { name: "TRON", icon: "token-branded:trx" },
  { name: "Dogecoin", icon: "token-branded:doge" },
  { name: "Sui", icon: "token-branded:sui" },
  { name: "Toncoin", icon: "token-branded:ton" },
  { name: "Cardano", icon: "token-branded:ada" },
  { name: "Polygon", icon: "token-branded:matic" },
  { name: "Polkadot", icon: "token-branded:dot" },
  { name: "Base", icon: "token-branded:eth" },
  { name: "Optimism", icon: "token-branded:op" },
  { name: "Litecoin", icon: "token-branded:ltc" },
  { name: "Hyperliquid", icon: "token-branded:hype" },
];

export default function PaymentGateway() {
  const router = useRouter();
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;
  const tokenItems = [...tokens, ...tokens];

  return (
    <section ref={ref} className="py-24 px-5 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <style>{`
        @keyframes pg-ticker-scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .pg-ticker-track { display:flex; width:max-content; animation:pg-ticker-scroll 30s linear infinite; }
        .pg-ticker-track:hover { animation-play-state:paused; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal" data-dir="up" data-delay="0">
            <DiagBadge label="Payment Gateway" />
          </div>
          <h2
            className="reveal text-4xl md:text-5xl font-black mt-4 tracking-tight text-gray-900 dark:text-white"
            data-dir="up" data-delay="80"
          >
            Deposits &amp; Withdrawals in{" "}
            <span className="text-indigo-500 dark:text-indigo-400">Digital Assets</span>
          </h2>
          <p className="reveal text-gray-400 text-sm mt-4 max-w-md mx-auto" data-dir="up" data-delay="140">
            OrbitFX supports secure stablecoin and digital asset payment processing through{" "}
            <span className="font-semibold text-gray-600 dark:text-gray-300">CipherBC</span>,
            an MPC-secured custody and settlement layer.
          </p>
        </div>

        {/* Body: text + checklist / stat cards */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div className="reveal" data-dir="left" data-delay="0">
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6 text-[15px]">
              Every deposit and payout runs through a bank-grade wallet infrastructure engineered
              for high-volume address management and hot-wallet risk reduction — so your traders
              fund and withdraw with the same reliability as any traditional rail.
            </p>
            <ul className="space-y-3">
              {capabilities.map((c) => (
                <li key={c.title} className="flex items-start gap-3">
                  <span className="w-8 h-8 border border-indigo-500/20 bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon icon={c.icon} className="text-indigo-500 dark:text-indigo-400" width={16} />
                  </span>
                  <div>
                    <div className="font-semibold text-sm text-gray-900 dark:text-white">{c.title}</div>
                    <div className="text-gray-400 text-xs leading-relaxed mt-0.5">{c.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {gwStats.map((item, i) => (
              <Card
                key={item.label}
                className="reveal border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 hover:border-indigo-500/30 transition-all"
                data-dir="up"
                data-delay={i * 80}
              >
                <Icon icon={item.icon} className="text-3xl mb-3 text-indigo-400" />
                <div className="text-2xl font-black text-gray-900 dark:text-white font-mono">{item.val}</div>
                <div className="text-gray-400 dark:text-gray-500 text-sm mt-1">{item.label}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Supported tokens ticker */}
        <div className="reveal mb-3 text-center" data-dir="up" data-delay="0">
          <span className="text-[9px] font-bold uppercase tracking-[2px] text-gray-400 dark:text-gray-500 font-mono">
            Settle across 90+ networks, including
          </span>
        </div>
        <div className="reveal overflow-hidden bg-slate-200 dark:bg-black border border-gray-300 dark:border-gray-800 mb-14" data-dir="up" data-delay="60">
          <div className="pg-ticker-track py-3">
            {tokenItems.map((t, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-6 border-r border-white/[0.07] font-mono text-[11px] whitespace-nowrap"
              >
                <Icon icon={t.icon} width={16} height={16} className="flex-shrink-0" />
                {t.name}
              </span>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}