"use client"

import React, { useState, useRef, useEffect } from "react";
import { ModeToggle } from "@/components/misc/themeToggler";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Users, BookOpen, Heart, Briefcase, Newspaper,
    Star, Cpu, ShieldCheck, Palette,
    ChevronDown,
    BarChart2,
    Zap,
    LifeBuoy,
} from "lucide-react";

const companyNav = [
    { icon: Users, label: "About Us", sub: "Who we are and what we stand for", href: "/company#about" },
    { icon: BookOpen, label: "Our Story", sub: "How CubeX came to be", href: "/company#story" },
    { icon: Heart, label: "Our Manifesto", sub: "Our principles and values", href: "/company#manifesto" },
    { icon: Briefcase, label: "Careers", sub: "Join our growing team", href: "/company#careers" },
    { icon: Star, label: "Testimonials", sub: "What our clients say", href: "/company#testimonials" },
    { icon: Cpu, label: "Tech Stack", sub: "Enterprise infrastructure", href: "/company#tech" },
    { icon: ShieldCheck, label: "Trust Center", sub: "Security and compliance", href: "/company#trust" },
    { icon: Palette, label: "Brand Assets", sub: "Logos, colors and guidelines", href: "/company#brand" },
];

const resourcesNav = [
    { icon: Newspaper, label: "News & Insights", sub: "Latest updates and market analysis", href: "/resources#news" },
    { icon: BookOpen, label: "Documentation", sub: "Guides, API refs and platform docs", href: "/resources#documentation" },
    { icon: BarChart2, label: "Comparisons", sub: "See how CubeX stacks up", href: "/resources#comparisons" },
    { icon: Zap, label: "Quick Access", sub: "Tools and shortcuts at a glance", href: "/resources#quick" },

];

const navItems = [
    { name: "Home", href: "/" },
    { name: "Platform", href: "/platform" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Company", href: "/company", hasMega: "company" },
    { name: "Resources", href: "/resources", hasMega: "resources" },
    { name: "Get In Touch", href: "/contact" },
];

function AnimatedLink({ name, href, className = "" }: { name: string; href: string; className?: string }) {
    return (
        <Link href={href} className={`group text-gray-800 dark:text-gray-200 text-md font-medium flex overflow-hidden ${className}`}>
            {name.split("").map((c, i) => (
                <span
                    key={i}
                    style={{ transitionDelay: `${i * 30}ms` }}
                    className="inline-block transition-all duration-300
                        group-hover:-translate-y-0.5
                        group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-indigo-500
                        group-hover:bg-clip-text group-hover:text-transparent
                        dark:group-hover:from-indigo-300 dark:group-hover:to-indigo-400"
                >
                    {c === " " ? "\u00A0" : c}
                </span>
            ))}
        </Link>
    );
}

function CompanyMegaMenu({ visible }: { visible: boolean }) {
    return (
        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] z-50
            border border-gray-200 dark:border-gray-800
            bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-xl shadow-black/10
            transition-all duration-200 origin-top
            ${visible ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
        >
            <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-[10px] font-extrabold tracking-[2px] uppercase text-indigo-500">Company</span>
                <Link href="/company" className="text-[11px] font-bold text-gray-400 hover:text-indigo-500 transition-colors tracking-wide">
                    View all →
                </Link>
            </div>

            {/* 2 cols for company */}
            <div className="grid grid-cols-2 gap-px bg-gray-100 dark:bg-gray-800 p-px">
                {companyNav.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="group flex items-start gap-3 p-4
                                bg-white dark:bg-gray-950
                                hover:bg-indigo-50 dark:hover:bg-indigo-950/40
                                transition-colors duration-150 no-underline"
                        >
                            <div className="flex-shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center
                                border border-indigo-100 dark:border-indigo-900
                                bg-indigo-50 dark:bg-indigo-950/40
                                group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60
                                group-hover:border-indigo-300 dark:group-hover:border-indigo-700
                                transition-colors"
                            >
                                <Icon className="h-3.5 w-3.5 text-indigo-500" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-[12px] font-bold text-gray-900 dark:text-white leading-snug
                                    group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {item.label}
                                </div>
                                <div className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 leading-snug truncate">
                                    {item.sub}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] text-gray-400 dark:text-gray-500">
                    Cubex Enterprises · Est. 2026 · Colombo, Sri Lanka
                </span>
            </div>
        </div>
    );
}

function ResourcesMegaMenu({ visible }: { visible: boolean }) {
    return (
        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] z-50
            border border-gray-200 dark:border-gray-800
            bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-xl shadow-black/10
            transition-all duration-200 origin-top
            ${visible ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
        >
            <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-[10px] font-extrabold tracking-[2px] uppercase text-indigo-500">Resources</span>
                <Link href="/resources" className="text-[11px] font-bold text-gray-400 hover:text-indigo-500 transition-colors tracking-wide">
                    View all →
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-px bg-gray-100 dark:bg-gray-800 p-px">
                {resourcesNav.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="group flex items-start gap-3 p-4
                                bg-white dark:bg-gray-950
                                hover:bg-indigo-50 dark:hover:bg-indigo-950/40
                                transition-colors duration-150 no-underline"
                        >
                            <div className="flex-shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center
                                border border-indigo-100 dark:border-indigo-900
                                bg-indigo-50 dark:bg-indigo-950/40
                                group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60
                                group-hover:border-indigo-300 dark:group-hover:border-indigo-700
                                transition-colors"
                            >
                                <Icon className="h-3.5 w-3.5 text-indigo-500" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-[12px] font-bold text-gray-900 dark:text-white leading-snug
                                    group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {item.label}
                                </div>
                                <div className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 leading-snug truncate">
                                    {item.sub}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] text-gray-400 dark:text-gray-500">
                    Documentation, guides & support — all in one place
                </span>
            </div>
        </div>
    );
}

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    // ✅ Separate desktop open state per mega type
    const [desktopOpen, setDesktopOpen] = useState<"company" | "resources" | null>(null);
    // ✅ Separate mobile accordion state per mega type
    const [mobileAccordion, setMobileAccordion] = useState<"company" | "resources" | null>(null);

    const navRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setDesktopOpen(null);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    function handleMouseEnter(type: "company" | "resources") {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setDesktopOpen(type);
    }

    function handleMouseLeave() {
        timeoutRef.current = setTimeout(() => setDesktopOpen(null), 120);
    }

    function toggleMobileAccordion(type: "company" | "resources") {
        setMobileAccordion((prev) => (prev === type ? null : type));
    }

    return (
        <nav className="bg-zinc-100 dark:bg-zinc-900 fixed top-0 left-0 w-full z-50">
            <div ref={navRef} className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                        <Image src="/icon.png" alt="CubeX Logo" width={32} height={32} className="object-cover" priority />
                    </div>
                    <div>
                        <div className="font-['Space_Grotesk',sans-serif] font-bold text-[17px] leading-none tracking-[-0.3px] text-indigo-950 dark:text-indigo-100">
                            CUBE<span style={{ color: "#6366f1" }}>X</span>
                        </div>
                        <div className="text-[8px] tracking-[3px] font-semibold leading-none text-indigo-400 dark:text-indigo-500">
                            ENTERPRISES
                        </div>
                    </div>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) =>
                        item.hasMega ? (
                            <div
                                key={item.name}
                                className="relative"
                                onMouseEnter={() => handleMouseEnter(item.hasMega as "company" | "resources")}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button
                                    className="group text-gray-800 dark:text-gray-200 text-md font-medium flex items-center gap-0 cursor-pointer bg-transparent border-none p-0 m-0 font-[inherit] leading-none"
                                >
                                    {item.name.split("").map((c, i) => (
                                        <span
                                            key={i}
                                            style={{ transitionDelay: `${i * 30}ms` }}
                                            className="inline-block transition-all duration-300
                                                group-hover:-translate-y-0.5
                                                group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-indigo-500
                                                group-hover:bg-clip-text group-hover:text-transparent
                                                dark:group-hover:from-indigo-300 dark:group-hover:to-indigo-400"
                                        >
                                            {c}
                                        </span>
                                    ))}
                                    <svg
                                        className={`w-3 h-3 ml-1 flex-shrink-0 text-gray-400 transition-transform duration-200 ${desktopOpen === item.hasMega ? "rotate-180" : ""}`}
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {item.hasMega === "company" && <CompanyMegaMenu visible={desktopOpen === "company"} />}
                                {item.hasMega === "resources" && <ResourcesMegaMenu visible={desktopOpen === "resources"} />}
                            </div>
                        ) : (
                            <AnimatedLink key={item.name} name={item.name} href={item.href} />
                        )
                    )}
                </div>

                {/* Right actions */}
                <div className="hidden md:flex items-center gap-3">
                    <ModeToggle />
                    <Button variant="cubex">Contact Sale</Button>
                </div>

                {/* Mobile hamburger */}
                <Button size="icon" variant="cubex" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileOpen
                            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        }
                    </svg>
                </Button>
            </div>

            {mobileOpen && (
                <>
                    <div
                        className="fixed inset-0 top-16 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => { setMobileOpen(false); setMobileAccordion(null); }}
                    />
                    <div className="fixed top-16 left-0 right-0 bottom-0 z-50 md:hidden bg-white dark:bg-zinc-900 overflow-y-auto">
                        <div className="px-6 py-5">
                            <div className="flex flex-col">
                                {navItems.map((item) =>
                                    item.hasMega ? (
                                        <div key={item.name} className="border-b border-gray-100 dark:border-gray-800">
                                            <button
                                                onClick={() => toggleMobileAccordion(item.hasMega as "company" | "resources")}
                                                className="w-full flex items-center justify-between py-4 text-left font-medium text-gray-900 dark:text-white"
                                            >
                                                <span>{item.name}</span>
                                                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${mobileAccordion === item.hasMega ? "rotate-180" : ""}`} />
                                            </button>

                                            <div className={`overflow-hidden transition-all duration-300 ${mobileAccordion === item.hasMega ? "max-h-[800px] opacity-100 pb-4" : "max-h-0 opacity-0"}`}>
                                                <div className="space-y-1">
                                                    {(item.hasMega === "company" ? companyNav : resourcesNav).map((c) => {
                                                        const Icon = c.icon;
                                                        return (
                                                            <Link
                                                                key={c.label}
                                                                href={c.href}
                                                                onClick={() => { setMobileOpen(false); setMobileAccordion(null); }}
                                                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors"
                                                            >
                                                                <Icon className="h-4 w-4 mt-0.5 text-indigo-500 shrink-0" />
                                                                <div>
                                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{c.label}</div>
                                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{c.sub}</div>
                                                                </div>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="py-4 border-b border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white font-medium hover:text-indigo-500 transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                )}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                                <div className="flex items-center justify-between">
                                    <ModeToggle />
                                    <Button variant="cubex">Contact Sales</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
}