"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Layers,
  Wallet,
  Globe,
  Zap,
  CheckCircle,
  Mail,
} from "lucide-react";

function AssetIcon({ slug, symbol }: { slug: string; symbol: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="h-7 w-7 rounded-full bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
        {symbol.slice(0, 2)}
      </div>
    );
  }
  return (
    <img
      src={`https://api.iconify.design/token-branded/${slug}.svg`}
      alt={symbol}
      className="h-7 w-7"
      onError={() => setFailed(true)}
    />
  );
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const paymentFeatures = [
  {
    icon: Lock,
    title: "MPC-Secured Custody",
    desc: "Every deposit is protected by multi-party computation — no single private key ever exists in one place, eliminating the classic hot-wallet single point of failure.",
  },
  {
    icon: Layers,
    title: "Three-Layer Custody Model",
    desc: "Incoming funds move through independently secured hot, warm, and cold environments, so operational liquidity and long-term treasury are never mixed.",
  },
  {
    icon: Zap,
    title: "Real-Time Settlement",
    desc: "Stablecoin and digital asset deposits are matched to your account automatically, with balances reflected the moment a payment confirms on-chain.",
  },
  {
    icon: ShieldCheck,
    title: "Built-In Compliance",
    desc: "KYC/AML and transaction-risk screening are embedded directly in the deposit flow, so every payment is checked without adding friction for the trader.",
  },
];

// icon: best-effort slug in Iconify's "token-branded" set. Many smaller/newer
// chains below are not guaranteed to exist in that set — the <AssetIcon>
// renderer below falls back to a letter avatar automatically if the icon
// 404s, so the grid never shows a broken image.
const supportedAssets = [
  { name: "Bitcoin", symbol: "BTC", icon: "btc" },
  { name: "Ethereum", symbol: "ETH", icon: "eth" },
  { name: "Solana", symbol: "SOL", icon: "sol" },
  { name: "Binance Smart Chain", symbol: "BNB", icon: "bnb" },
  { name: "TRON", symbol: "TRX", icon: "trx" },
  { name: "Doge", symbol: "DOGE", icon: "doge" },
  { name: "Sui", symbol: "SUI", icon: "sui" },
  { name: "Toncoin", symbol: "TON", icon: "ton" },
  { name: "Cardano", symbol: "ADA", icon: "ada" },
  { name: "Polygon", symbol: "MATIC", icon: "matic" },
  { name: "OKB X Layer", symbol: "OKB", icon: "okb" },
  { name: "Vaulta", symbol: "VAULTA", icon: "vaulta" },
  { name: "Dot", symbol: "DOT", icon: "dot" },
  { name: "Eth Base", symbol: "BASE", icon: "eth" },
  { name: "Optimism", symbol: "OP", icon: "op" },
  { name: "Litecoin", symbol: "LTC", icon: "ltc" },
  { name: "Hyperliquid", symbol: "HYPE", icon: "hype" },
  { name: "Strk Fee", symbol: "STRK", icon: "strk" },
  { name: "Merlin", symbol: "MERL", icon: "merl" },
  { name: "ETH Classic", symbol: "ETC", icon: "etc" },
  { name: "Arbitrum", symbol: "ARB", icon: "arb" },
  { name: "OKT Chain", symbol: "OKT", icon: "okt" },
  { name: "Taproot", symbol: "BTC", icon: "btc" },
  { name: "Bsv", symbol: "BSV", icon: "bsv" },
  { name: "Aurora", symbol: "AURORA", icon: "aurora" },
  { name: "Bitcoin Cash", symbol: "BCH", icon: "bch" },
  { name: "Dash", symbol: "DASH", icon: "dash" },
  { name: "ETH Taiko Main", symbol: "TAIKO", icon: "eth" },
  { name: "Zksync", symbol: "ZK", icon: "zksync" },
  { name: "Scroll ETH", symbol: "SCROLL", icon: "scroll" },
  { name: "Ethg", symbol: "ETHG", icon: "ethg" },
  { name: "QTUM", symbol: "QTUM", icon: "qtum" },
  { name: "Aca", symbol: "ACA", icon: "aca" },
  { name: "Aelf", symbol: "ELF", icon: "elf" },
  { name: "Aleo", symbol: "ALEO", icon: "aleo" },
  { name: "Algorand", symbol: "ALGO", icon: "algo" },
  { name: "Apt", symbol: "APT", icon: "apt" },
  { name: "AssetHub KSM", symbol: "KSM", icon: "ksm" },
  { name: "Astr", symbol: "ASTR", icon: "astr" },
  { name: "Atom", symbol: "ATOM", icon: "atom" },
  { name: "Avail", symbol: "AVAIL", icon: "avail" },
  { name: "Avax C", symbol: "AVAX", icon: "avax" },
  { name: "Avax X", symbol: "AVAX", icon: "avax" },
  { name: "Babylon", symbol: "BABY", icon: "babylon" },
  { name: "Bera", symbol: "BERA", icon: "bera" },
  { name: "Bitcoin Runes", symbol: "BTC", icon: "btc" },
  { name: "Cheq", symbol: "CHEQ", icon: "cheq" },
  { name: "Ckb", symbol: "CKB", icon: "ckb" },
  { name: "Core", symbol: "CORE", icon: "core" },
  { name: "Dag", symbol: "DAG", icon: "dag" },
  { name: "Dcr", symbol: "DCR", icon: "dcr" },
  { name: "Dynexcoin", symbol: "DNX", icon: "dnx" },
  { name: "Dydx", symbol: "DYDX", icon: "dydx" },
  { name: "Edg", symbol: "EDG", icon: "edg" },
  { name: "ETH Linea", symbol: "LINEA", icon: "linea" },
  { name: "Eth Mint", symbol: "MINT", icon: "eth" },
  { name: "Eth Pow", symbol: "ETHW", icon: "ethw" },
  { name: "Fil", symbol: "FIL", icon: "fil" },
  { name: "Fis", symbol: "FIS", icon: "fis" },
  { name: "Fraxtal", symbol: "FRAX", icon: "frax" },
  { name: "Fantom", symbol: "FTM", icon: "ftm" },
  { name: "Stable gUSDT", symbol: "USDT", icon: "usdt" },
  { name: "HyperCash", symbol: "HC", icon: "hc" },
  { name: "Initia", symbol: "INIT", icon: "init" },
  { name: "Story", symbol: "IP", icon: "ip" },
  { name: "Kaspa", symbol: "KAS", icon: "kas" },
  { name: "Ksm", symbol: "KSM", icon: "ksm" },
  { name: "Luna", symbol: "LUNA", icon: "luna" },
  { name: "Terra Lunc", symbol: "LUNC", icon: "lunc" },
  { name: "OpBNB", symbol: "OPBNB", icon: "bnb" },
  { name: "Mbe", symbol: "MBE", icon: "mbe" },
  { name: "Mantle", symbol: "MNT", icon: "mnt" },
  { name: "Monad", symbol: "MON", icon: "mon" },
  { name: "Movr", symbol: "MOVR", icon: "movr" },
  { name: "Neo", symbol: "NEO", icon: "neo" },
  { name: "Nuls", symbol: "NULS", icon: "nuls" },
  { name: "Mantra", symbol: "OM", icon: "om" },
  { name: "Peaq", symbol: "PEAQ", icon: "peaq" },
  { name: "Pi", symbol: "PI", icon: "pi" },
  { name: "Rei", symbol: "REI", icon: "rei" },
  { name: "Sonic", symbol: "S", icon: "sonic" },
  { name: "Sdn", symbol: "SDN", icon: "sdn" },
  { name: "Shardeum", symbol: "SHM", icon: "shm" },
  { name: "Smart", symbol: "SMART", icon: "smart" },
  { name: "Sophon", symbol: "SOPH", icon: "soph" },
  { name: "TFuel on Theta", symbol: "TFUEL", icon: "tfuel" },
  { name: "Celestia", symbol: "TIA", icon: "tia" },
  { name: "Telos", symbol: "TLOS", icon: "tlos" },
  { name: "Toncoin v2", symbol: "TON", icon: "ton" },
  { name: "Venom", symbol: "VENOM", icon: "venom" },
  { name: "Wemix", symbol: "WEMIX", icon: "wemix" },
  { name: "Xion", symbol: "XION", icon: "xion" },
  { name: "Xrp", symbol: "XRP", icon: "xrp" },
  { name: "Verge", symbol: "XVG", icon: "xvg" },
  { name: "Xx", symbol: "XX", icon: "xx" },
  { name: "Zeta", symbol: "ZETA", icon: "zeta" },
  { name: "Assethub Dot", symbol: "DOT", icon: "dot" },
  { name: "Hermes Edu Coin", symbol: "HEC", icon: "hec" },
  { name: "Scdo", symbol: "SCDO", icon: "scdo" },
  { name: "Smartbch", symbol: "BCH", icon: "bch" },
  { name: "XDC", symbol: "XDC", icon: "xdc" },
  { name: "Plasma", symbol: "XPL", icon: "xpl" },
];

const flowSteps = [
  {
    n: "01",
    title: "Choose your asset",
    desc: "Select a stablecoin or supported token from your OrbitFX client portal and generate a dedicated deposit address in seconds.",
  },
  {
    n: "02",
    title: "Send your payment",
    desc: "Funds move on-chain directly into custody-grade infrastructure — never into a single exposed wallet.",
  },
  {
    n: "03",
    title: "Automatic verification",
    desc: "The transaction is screened, matched to your account, and confirmed without manual reconciliation.",
  },
  {
    n: "04",
    title: "Balance credited",
    desc: "Your OrbitFX trading balance updates in real time once the network confirmation threshold is met.",
  },
];

const complianceItems = [
  { icon: ShieldCheck, title: "Segregated Client Custody", desc: "Client deposits are held separately from operational and treasury funds at all times." },
  { icon: ShieldCheck, title: "Enterprise MPC + HSM", desc: "Signing infrastructure combines MPC threshold security with hardware security module support." },
  { icon: ShieldCheck, title: "Policy-Based Approvals", desc: "Every withdrawal path is governed by role-based approval rules before funds move." },
  { icon: ShieldCheck, title: "Full Audit Trail", desc: "Every payment event is logged for transparent, reviewable record-keeping." },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function DiagBadge({ label, color = "indigo" }: { label: string; color?: "default" | "indigo" | "blue" | "green" }) {
  const c = {
    default: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700",
    indigo: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
    blue: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    green: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
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
  badge,
  badgeColor = "indigo",
  title,
  sub,
  center = false,
}: {
  badge: string;
  badgeColor?: "default" | "indigo" | "blue" | "green";
  title: React.ReactNode;
  sub?: string;
  center?: boolean;
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

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function PaymentsPage() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* ── HERO ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/60 to-indigo-50/40 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-950 pt-20 pb-24 px-[5%]">
        <div
          className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(rgba(91,140,255,0.09) 1px,transparent 1px),linear-gradient(90deg,rgba(91,140,255,0.09) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative z-10 max-w-[900px] mx-auto text-center">
          <div className="flex justify-center">
            <DiagBadge label="Payments" color="indigo" />
          </div>

          <h1 className="mt-5 font-bold text-[clamp(34px,5vw,58px)] leading-[1.07] tracking-[-2px] text-gray-900 dark:text-white mb-6">
            Deposit With Confidence.
            <br />
            <span className="text-indigo-500">Secured by CipherBC.</span>
          </h1>

          <p className="mx-auto text-gray-500 dark:text-gray-400 text-[16px] leading-[1.8] max-w-[650px] mb-10">
            OrbitFX now supports stablecoin and digital asset deposits through{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">CipherBC</span>, an
            institutional-grade digital asset payment infrastructure. Every deposit is protected
            by MPC custody, real-time screening, and a fully auditable settlement flow — so funding
            your account is as fast as it is secure.
          </p>

          
          <div className="grid md:grid-cols-3 gap-4 max-w-[820px] mx-auto mt-10">
            {[
              { label: "POWERED BY", value: "CipherBC DAOS", note: "Digital Asset Operating System" },
              { label: "NETWORKS SUPPORTED", value: "90+", note: "Across major blockchains" },
              { label: "SETTLEMENT", value: "Real-Time", note: "Automated matching & credit" },
            ].map((r) => (
              <div key={r.label} className="p-5 border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm text-left">
                <div className="font-mono text-[9px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">{r.label}</div>
                <div className="text-[15px] font-bold text-gray-900 dark:text-white">{r.value}</div>
                <div className="text-[12px] text-gray-400 mt-1">{r.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CIPHERBC ──────────────────────── */}
      <section id="why-cipherbc" className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Why CipherBC"
            title="Bank-Grade Infrastructure Behind Every Deposit"
            sub="OrbitFX partners with CipherBC to bring institutional custody standards to everyday deposits and payouts."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {paymentFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex flex-col gap-3 p-6 border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/40 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40">
                    <Icon className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div className="text-[14px] font-bold text-gray-900 dark:text-white">{f.title}</div>
                  <div className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────── */}
      <section id="how-it-works" className="py-20 px-[5%] bg-slate-50/70 dark:bg-gray-900/50">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead badge="How It Works" title="From Deposit to Balance in Four Steps" sub="A CipherBC-secured payment moves through screening and custody automatically — no manual steps on your end." center />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1100px] mx-auto">
            {flowSteps.map((s) => (
              <div key={s.n} className="border-l-2 border-indigo-500 pl-5 py-2">
                <div className="font-mono text-[10px] font-bold tracking-[2px] text-indigo-400 mb-2">{s.n}</div>
                <div className="text-[14px] font-bold text-gray-900 dark:text-white mb-2 leading-snug">{s.title}</div>
                <div className="text-[13px] text-gray-500 dark:text-gray-400 leading-[1.8]">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPPORTED ASSETS ──────────────────── */}
      <section id="supported-assets" className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Supported Assets"
            title="Deposit in the Asset You Already Hold"
            sub="CipherBC's infrastructure supports 90+ blockchain networks and 1,500+ tokens. The most-used assets on OrbitFX:"
          />
          <div className="relative h-[440px] overflow-hidden">
            {/* fade masks top/bottom */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white dark:from-gray-950 to-transparent z-10" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-950 to-transparent z-10" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 h-full">
              {[0, 1, 2, 3].map((colIndex) => {
                const colAssets = supportedAssets.filter((_, i) => i % 4 === colIndex);
                const reverse = colIndex % 2 === 1;
                const duration = 22 + colIndex * 4;
                return (
                  <div key={colIndex} className={`relative overflow-hidden ${colIndex >= 2 ? "hidden sm:block" : ""}`}>
                    <div
                      className="flex flex-col gap-3"
                      style={{
                        animation: `${reverse ? "marqueeDown" : "marqueeUp"} ${duration}s linear infinite`,
                      }}
                    >
                      {[...colAssets, ...colAssets].map((a, i) => (
                        <div
                          key={a.symbol + a.name + i}
                          className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/40 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                        >
                          <AssetIcon slug={a.icon} symbol={a.symbol} />
                          <div className="min-w-0">
                            <div className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight truncate">{a.name}</div>
                            <div className="text-[9px] text-gray-400 font-mono uppercase tracking-wide">{a.symbol}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <style>{`
            @keyframes marqueeUp {
              0% { transform: translateY(0); }
              100% { transform: translateY(-50%); }
            }
            @keyframes marqueeDown {
              0% { transform: translateY(-50%); }
              100% { transform: translateY(0); }
            }
            @media (prefers-reduced-motion: reduce) {
              [style*="marqueeUp"], [style*="marqueeDown"] {
                animation: none !important;
              }
            }
          `}</style>

          <p className="mt-6 text-[12px] text-gray-400">
            {supportedAssets.length}+ networks and tokens shown here for reference. Exact live availability is confirmed in your client portal at deposit time and may vary by jurisdiction.
          </p>
        </div>
      </section>

      {/* ── COMPLIANCE / TRUST ────────────────── */}
      <section id="security-compliance" className="py-20 px-[5%] bg-slate-50/70 dark:bg-gray-900/50">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead
            badge="Security & Compliance"
            title="Custody Built for Regulated Markets"
            sub="Every OrbitFX payment routed through CipherBC follows the same segregation, approval, and audit standards used by banks and institutional custodians."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {complianceItems.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.title} className="flex gap-4 p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                  <Icon className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[13px] font-bold text-gray-900 dark:text-white mb-1">{t.title}</div>
                    <div className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">{t.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────── */}
      <section id="payments-faq" className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto">
          <SectionHead badge="FAQ" title="Payment Questions, Answered" center />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[1000px] mx-auto">
            {[
              {
                q: "Is CipherBC a separate account I need to manage?",
                a: "No. CipherBC operates behind the scenes as OrbitFX's payment infrastructure. You deposit and withdraw entirely from your existing OrbitFX client portal.",
              },
              {
                q: "Are my funds held with my funds custody?",
                a: "Client deposits are held in segregated custody, separate from OrbitFX operational and treasury balances, at every stage of the settlement process.",
              },
              {
                q: "How long does a deposit take to reflect in my balance?",
                a: "Deposits are matched and credited automatically once the required network confirmations are reached — typically within minutes, depending on the chain.",
              },
              {
                q: "Which assets can I use to fund my account?",
                a: "Major stablecoins and tokens across 90+ supported networks. Your client portal will always show the current list available in your region.",
              },
            ].map((f) => (
              <div key={f.q} className="p-6 border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/40">
                <div className="flex gap-2 items-start mb-2">
                  <CheckCircle className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                  <div className="text-[14px] font-bold text-gray-900 dark:text-white">{f.q}</div>
                </div>
                <div className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed pl-6">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}