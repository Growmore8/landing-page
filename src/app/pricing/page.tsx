"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Zap,
  Building2,
  Crown,
  Star,
  ArrowRight,
  Shield,
  Clock,
  Users,
  BarChart3,
  Cpu,
  Globe,
  Headphones,
  Lock,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const plans = [
  {
    id: "startup",
    icon: Zap,
    name: "Startup Broker",
    tagline: "Launch your brokerage fast",
    badge: null,
    description:
      "Everything you need to get your brokerage live with professional-grade infrastructure and essential tools.",
    price: "Custom",
    priceNote: "Provided by our Trusted Partners • Terms Apply",
    cta: "Request Quote",
    ctaVariant: "outline" as const,
    featured: false,
    color: "indigo",
    features: [
      "Branded Client Terminal (Desktop)",
      "Branded Web Terminal",
      "Full Backoffice Access",
      "API & Tool Kit for Seamless Integration",
      "Mobile App (iOS & Android)",
      "Technical Support (24/6)",
      "Liquidity Bridge Setup",
      "KYC / AML Module",
      "IB & Affiliate Portal",
      "Basic Risk Management",
    ],
  },
  {
    id: "enterprise",
    icon: Building2,
    name: "Enterprise Broker",
    tagline: "The Premier Solution for Growing Brokerages",
    badge: "Most Popular",
    description:
      "Full-featured enterprise suite with AI-enhanced terminals, multi-tier management, and dedicated account support.",
    price: "Custom",
    priceNote: "White-label & custom pricing available",
    cta: "Request Quote",
    ctaVariant: "default" as const,
    featured: true,
    color: "blue",
    features: [
      "Branded Desktop Terminals (Built-in AI)",
      "Branded Web Terminals (Client & Manager)",
      "Full Backoffice Access + Advanced Reports",
      "Branded Mobile App (iOS & Android)",
      "Built-in Risk Management Tool",
      "API & Tool Kit for Seamless Integration",
      "Technical Support (24/7 Priority)",
      "Dedicated Account Manager",
      "Multi-tier IB & Affiliate System",
      "Advanced Liquidity Aggregation (15+ Banks)",
      "Regulatory Reporting (MiFID II / ASIC)",
      "Custom Branding & White-Label UI",
    ],
  },
  {
    id: "institutional",
    icon: Crown,
    name: "Institutional",
    tagline: "For prime brokers & institutions",
    badge: "Enterprise",
    description:
      "Maximum performance, custom infrastructure, and exclusive SLA guarantees for high-volume institutional operations.",
    price: "Custom",
    priceNote: "Bespoke pricing on request",
    cta: "Talk to Sales",
    ctaVariant: "outline" as const,
    featured: false,
    color: "slate",
    features: [
      "Everything in Enterprise, plus:",
      "Dedicated Server Infrastructure",
      "Co-location & FIX 4.4/5.0 Direct Access",
      "Custom Liquidity Pools & Credit Lines",
      "Prime-of-Prime Brokerage Access",
      "White-Glove Onboarding & Migration",
      "99.99% Uptime SLA Guarantee",
      "24/7 Priority Technical Support",
      "Custom Compliance & Reporting Suite",
      "Multi-Jurisdiction Legal Structuring",
      "Quarterly Business Reviews",
      "Executive Escalation Path",
    ],
  },
];

const addOns = [
  { icon: BarChart3, label: "Advanced Risk Engine", desc: "Real-time position monitoring, auto-hedging & drawdown limits" },
  { icon: Cpu, label: "AI-Powered Analytics", desc: "Machine-learning P&L forecasting and anomaly detection" },
  { icon: Globe, label: "Multi-Jurisdiction Setup", desc: "Entity structuring across FSA, ASIC, CySEC & more" },
  { icon: Lock, label: "Enhanced KYC / AML", desc: "Automated document verification and PEP/sanctions screening" },
  { icon: RefreshCw, label: "CRM Integration", desc: "Salesforce, HubSpot, and custom CRM connectors" },
  { icon: TrendingUp, label: "Copy Trading Module", desc: "Social & copy trading layer with performance fees" },
  { icon: Headphones, label: "Managed Support Desk", desc: "Outsourced 24/7 client support team on your brand" },
  { icon: Users, label: "Introducing Broker Suite", desc: "Multi-level IB tree, commissions & marketing tools" },
];

const comparisons = [
  { feature: "Branded Client Terminals", startup: true, enterprise: true, institutional: true },
  { feature: "Web Terminal (Client & Manager)", startup: false, enterprise: true, institutional: true },
  { feature: "Backoffice Access", startup: "Basic", enterprise: "Full", institutional: "Custom" },
  { feature: "Mobile App", startup: true, enterprise: true, institutional: true },
  { feature: "AI-Enhanced Features", startup: false, enterprise: true, institutional: true },
  { feature: "Risk Management Tool", startup: "Basic", enterprise: "Advanced", institutional: "Custom" },
  { feature: "IB & Affiliate Portal", startup: true, enterprise: "Multi-tier", institutional: "Custom" },
  { feature: "Liquidity Aggregation", startup: "Standard", enterprise: "15+ Banks", institutional: "Bespoke" },
  { feature: "Regulatory Reporting", startup: false, enterprise: "MiFID II / ASIC", institutional: "All Jurisdictions" },
  { feature: "Dedicated Account Manager", startup: false, enterprise: true, institutional: true },
  { feature: "Technical Support", startup: "24/6", enterprise: "24/7 Priority", institutional: "24/7 + Escalation" },
  { feature: "Uptime SLA", startup: "99.9%", enterprise: "99.95%", institutional: "99.99%" },
  { feature: "FIX API Access", startup: false, enterprise: true, institutional: "Direct + Co-lo" },
  { feature: "White-Label UI", startup: "Basic", enterprise: "Full", institutional: "Custom Dev" },
  { feature: "Server Infrastructure", startup: "Shared", enterprise: "Shared / Dedicated", institutional: "Dedicated" },
];

const faqs = [
  {
    q: "What is the difference between Startup and Enterprise packages?",
    a: "Startup Brokers gives you the essential tools to launch — branded terminals, backoffice, mobile app, and basic support. Enterprise Brokers adds AI-enhanced features, multi-tier IB management, advanced risk tools, 24/7 priority support, and a dedicated account manager. Enterprise is designed for brokerages looking to scale rapidly.",
  },
  {
    q: "How does pricing work — is there a monthly fee?",
    a: "All CubeX plans are custom-priced based on your volume, asset classes, jurisdiction, and required modules. We do not publish fixed monthly prices because every brokerage has unique needs. Contact our sales team for a tailored proposal with transparent, itemised licensing.",
  },
  {
    q: "Can I add features like Copy Trading or CRM to my package?",
    a: "Yes. All packages support modular add-ons. You can bolt on Copy Trading, Enhanced KYC/AML, CRM connectors, managed support desks, or any other module at any time. Add-ons are priced individually and can be activated without re-signing your primary agreement.",
  },
  {
    q: "How long does onboarding and go-live take?",
    a: "Typical go-live is 5–15 business days for Startup, 2–4 weeks for Enterprise, and 4–8 weeks for Institutional. Timelines depend on regulatory jurisdiction, infrastructure complexity, and custom UI requirements. Your dedicated onboarding manager will provide a day-by-day milestone plan.",
  },
  {
    q: "Is the platform white-labelled fully under my brand?",
    a: "Yes. Logos, colour schemes, domain names, email senders, mobile app store listings, and all client-facing surfaces are fully white-labelled. Enterprise and Institutional clients receive custom UI development. Startup clients get a streamlined branding toolkit they can self-configure.",
  },
  {
    q: "What regulatory jurisdictions does CubeX support?",
    a: "We support structuring and technical compliance tooling for FSA (Seychelles), ASIC (Australia), CySEC (Cyprus), FSCA (South Africa), FCA (UK), MiFID II (EU), VFSC (Vanuatu), and others. Our compliance team works with your legal counsel to configure reporting modules for your specific jurisdiction.",
  },
  {
    q: "What happens if I need to upgrade my plan later?",
    a: "Upgrading is seamless. Your data, client accounts, and configurations are fully migrated. There is no downtime during upgrades. Most Enterprise features can be activated remotely within 24–48 hours of agreement execution.",
  },
];

const stats = [
  { n: "150+", l: "Brokerages Launched" },
  { n: "50+", l: "Asset Classes" },
  { n: "99.9%", l: "Platform Uptime" },
  { n: "24/7", l: "Expert Support" },
  { n: "15+", l: "Tier-1 Liquidity Banks" },
];

const trustLogos = [
  "FIX API", "MiFID II", "ASIC", "CySEC", "FSA", "ISO 27001",
];

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

function DiagBadge({ label, color = "default" }: { label: string; color?: "default" | "indigo" | "blue" }) {
  const colors = {
    default: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
    indigo: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
    blue: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  };
  return (
    <span
      className={`inline-block text-[10px] font-extrabold tracking-[2px] uppercase px-3.5 py-1 border ${colors[color]}`}
      style={{ clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}
    >
      {label}
    </span>
  );
}

function FeatureRow({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="h-4 w-4 text-indigo-500 mx-auto" />;
  if (value === false)
    return <span className="block text-center text-gray-300 dark:text-gray-700 text-lg leading-none">—</span>;
  return <span className="text-xs text-gray-600 dark:text-gray-300 font-medium text-center block">{value}</span>;
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [billingTab, setBillingTab] = useState<"brokers" | "institutional">("brokers");

  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">

      {/* ── HERO / PAGE HEADER ─────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/60 to-white dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-950 pt-20 pb-16 px-[5%]">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.08) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        
        <div className="relative z-10 max-w-[1280px] mx-auto text-center">
          <DiagBadge label="Pricing" color="indigo" />
          <h1 className="mt-5 font-bold text-[clamp(32px,5vw,58px)] leading-[1.08] tracking-[-1.5px] text-gray-900 dark:text-white">
            CubeX Platform Packages
          </h1>
          <p className="mt-5 text-gray-500 dark:text-gray-400 text-[16px] leading-relaxed max-w-[680px] mx-auto">
            Our pricing plans are structured with real broker challenges in mind. Get access to enterprise-grade technology and expert support, in the format that suits you best.
          </p>
          {/* Tab toggle */}
          <div className="mt-8 inline-flex items-center gap-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-1 rounded-none">
            {(["brokers", "institutional"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setBillingTab(tab)}
                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-none ${
                  billingTab === tab
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab === "brokers" ? "Retail Brokers" : "Institutional"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING CARDS ─────────────────────── */}
      <section className="px-[5%] pb-20 bg-gradient-to-b from-white to-slate-50/50 dark:from-gray-950 dark:to-gray-900/50">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-4">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isFeatured = plan.featured;
              return (
                <div key={plan.id} className="relative flex flex-col">
                  {/* Most Popular badge */}
                  {plan.badge && (
                    <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 px-4 py-1 text-[10px] font-extrabold uppercase tracking-[2px] whitespace-nowrap ${
                      isFeatured
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900"
                    }`}>
                      {plan.badge}
                    </div>
                  )}
                  <Card
                    className={`flex flex-col flex-1 rounded-none transition-all duration-300 ${
                      isFeatured
                        ? "bg-[#1a3a6b] dark:bg-blue-900 border-blue-700 dark:border-blue-600 shadow-2xl shadow-blue-900/30 scale-[1.02]"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700"
                    }`}
                  >
                    <CardContent className="p-8 flex flex-col flex-1">
                      {/* Icon + Name */}
                      <div className={`mb-6 flex h-14 w-14 items-center justify-center border ${
                        isFeatured
                          ? "border-blue-500/40 bg-blue-500/20"
                          : "border-indigo-500/20 bg-indigo-500/10"
                      }`}>
                        <Icon className={`h-7 w-7 ${isFeatured ? "text-blue-200" : "text-indigo-400"}`} />
                      </div>

                      <h2 className={`text-2xl font-bold tracking-tight mb-1 ${
                        isFeatured ? "text-white" : "text-gray-900 dark:text-white"
                      }`}>
                        {plan.name}
                      </h2>
                      <p className={`text-[12px] font-medium mb-4 ${
                        isFeatured ? "text-blue-200" : "text-gray-400 dark:text-gray-500"
                      }`}>
                        {plan.tagline}
                      </p>
                      <p className={`text-[13px] leading-relaxed mb-6 ${
                        isFeatured ? "text-blue-100/80" : "text-gray-500 dark:text-gray-400"
                      }`}>
                        {plan.description}
                      </p>

                      {/* Price */}
                      <div className={`mb-2 pb-6 border-b ${
                        isFeatured ? "border-blue-600/40" : "border-gray-100 dark:border-gray-800"
                      }`}>
                        <div className={`text-3xl font-bold font-mono tracking-tight ${
                          isFeatured ? "text-white" : "text-gray-900 dark:text-white"
                        }`}>
                          {plan.price}
                        </div>
                        <div className={`mt-1 text-[11px] ${
                          isFeatured ? "text-blue-300" : "text-gray-400 dark:text-gray-500"
                        }`}>
                          {plan.priceNote}
                        </div>
                      </div>

                      {/* CTA */}
                      <Button
                        className={`w-full rounded-none mb-6 font-bold uppercase tracking-widest text-xs py-3 ${
                          isFeatured
                            ? "bg-white text-blue-900 hover:bg-blue-50"
                            : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200"
                        }`}
                      >
                        {plan.cta} →
                      </Button>

                      {/* Features */}
                      <ul className="flex flex-col gap-3 flex-1">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-3">
                            <span className={`mt-0.5 flex-shrink-0 flex items-center justify-center h-4 w-4 rounded-full ${
                              isFeatured ? "bg-blue-500/30 text-blue-200" : "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-500"
                            }`}>
                              <Check className="h-2.5 w-2.5" strokeWidth={3} />
                            </span>
                            <span className={`text-[13px] leading-snug ${
                              isFeatured ? "text-blue-50" : "text-gray-600 dark:text-gray-300"
                            }`}>
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ───────────────────────── */}
      <section className="border-t border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 py-5 px-[5%]">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          <span className="font-mono text-[9px] tracking-[2.5px] text-gray-400 uppercase mr-2">Compliant with</span>
          {trustLogos.map((l) => (
            <span key={l} className="text-[11px] font-bold tracking-wide text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-gray-800 px-3 py-1.5">
              {l}
            </span>
          ))}
        </div>
      </section>

      {/* ── STATS ─────────────────────────────── */}
      <section className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto flex flex-wrap">
          {stats.map((s, i) => (
            <div
              key={s.l}
              className={`flex-1 min-w-[140px] py-7 px-6 text-center ${
                i < stats.length - 1 ? "border-r border-gray-100 dark:border-gray-800" : ""
              }`}
            >
              <div className="font-mono font-bold text-[28px] text-gray-900 dark:text-white leading-none">{s.n}</div>
              <div className="text-[11px] text-gray-400 mt-1.5 tracking-wide">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ADD-ONS ───────────────────────────── */}
      <section className="py-20 px-[5%] bg-slate-50/80 dark:bg-gray-900/60">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <DiagBadge label="Add-Ons" color="indigo" />
              <h2 className="mt-3.5 font-bold text-[clamp(22px,3.5vw,36px)] tracking-[-0.8px] text-gray-900 dark:text-white">
                Extend Your Platform
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-[15px] max-w-[500px]">
                Modular upgrades that snap onto any plan — activate when you need them, pay only for what you use.
              </p>
            </div>
            <Button
              variant="outline"
              className="self-start md:self-auto rounded-none border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase tracking-widest text-xs px-6 py-3"
            >
              View All Add-Ons →
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {addOns.map((a) => {
              const Icon = a.icon;
              return (
                <Card
                  key={a.label}
                  className="group rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-400 dark:hover:border-indigo-700 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/40 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60 transition-colors">
                      <Icon className="h-5 w-5 text-indigo-500" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">{a.label}</h3>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">{a.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-indigo-500 text-[11px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────── */}
      <section className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12 text-center">
            <DiagBadge label="Compare" color="indigo" />
            <h2 className="mt-3.5 font-bold text-[clamp(22px,3.5vw,36px)] tracking-[-0.8px] text-gray-900 dark:text-white">
              Feature Comparison
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-[15px]">
              See exactly what's included in each plan before you commit.
            </p>
          </div>
          <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-none">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-4 px-6 text-[11px] font-bold uppercase tracking-[1.5px] text-gray-400 w-[40%]">Feature</th>
                  <th className="py-4 px-4 text-center text-[12px] font-bold text-gray-700 dark:text-gray-300">Startup</th>
                  <th className="py-4 px-4 text-center text-[12px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-950/20">Enterprise</th>
                  <th className="py-4 px-4 text-center text-[12px] font-bold text-gray-700 dark:text-gray-300">Institutional</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-gray-100 dark:border-gray-800 last:border-0 ${
                      i % 2 === 0 ? "bg-white dark:bg-gray-950" : "bg-gray-50/50 dark:bg-gray-900/30"
                    }`}
                  >
                    <td className="py-3.5 px-6 text-[13px] text-gray-700 dark:text-gray-300 font-medium">{row.feature}</td>
                    <td className="py-3.5 px-4"><FeatureRow value={row.startup} /></td>
                    <td className="py-3.5 px-4 bg-blue-50/30 dark:bg-blue-950/10"><FeatureRow value={row.enterprise} /></td>
                    <td className="py-3.5 px-4"><FeatureRow value={row.institutional} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── WHY CUBEX SUMMARY STRIP ───────────── */}
      <section className="py-14 px-[5%] bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-center text-gray-600 dark:text-gray-400 text-[14px] leading-[1.9] max-w-[860px] mx-auto mb-10">
            We provide a one-stop solution for any broker, offering branded trading terminals, full backoffice access, mobile apps, API integration, and 24/7 support. Backed by trusted liquidity providers with years of market experience, our platform ensures seamless performance, scalability, and reliability.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              { icon: Shield, label: "Bank-Grade Security" },
              { icon: Clock, label: "Sub-ms Execution" },
              { icon: Globe, label: "Multi-Jurisdiction" },
              { icon: Users, label: "150+ Brokers Served" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2.5 px-5 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <Icon className="h-4 w-4 text-indigo-500" />
                  <span className="text-[12px] font-semibold text-gray-700 dark:text-gray-300 tracking-wide">{item.label}</span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-8">
            <Button className="rounded-none bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest text-xs px-8 py-3">
              Contact Sales →
            </Button>
          </div>
        </div>
      </section>

      {/* ── FAQs ──────────────────────────────── */}
      <section className="py-20 px-[5%] bg-white dark:bg-gray-950">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12 text-center">
            <DiagBadge label="FAQs" />
            <h2 className="mt-3.5 font-bold text-[clamp(22px,3.5vw,36px)] tracking-[-0.8px] text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-[15px]">
              Everything you need to know about CubeX pricing and packages.
            </p>
          </div>
          <div className="max-w-[860px] mx-auto flex flex-col gap-2">
            {faqs.map((f, i) => (
              <Card
                key={i}
                className="rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
              >
                <button
                  className={`w-full flex justify-between items-center px-6 py-5 text-left text-[14px] font-semibold text-gray-900 dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/60 ${
                    openFaq === i ? "bg-gray-50 dark:bg-gray-800/60" : "bg-transparent"
                  }`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="pr-4">{f.q}</span>
                  <span className="flex-shrink-0 text-indigo-500">
                    {openFaq === i ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 pt-1 text-[13px] text-gray-500 dark:text-gray-400 leading-[1.85] border-t border-gray-100 dark:border-gray-800">
                    {f.a}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
