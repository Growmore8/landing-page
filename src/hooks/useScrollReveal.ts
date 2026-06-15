"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const existing = document.getElementById("scroll-reveal-styles");
    if (existing) existing.remove();
    const style = document.createElement("style");
    style.id = "scroll-reveal-styles";
    style.textContent = `
  .reveal {
    opacity: 0;
    transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: opacity, transform;
  }
  .reveal[data-dir="up"]    { transform: translateY(36px); }
  .reveal[data-dir="down"]  { transform: translateY(-36px); }
  .reveal[data-dir="left"]  { transform: translateX(-48px); }
  .reveal[data-dir="right"] { transform: translateX(48px); }
  .reveal[data-dir="fade"]  { transform: scale(0.97); }
  .reveal.is-visible {
    opacity: 1 !important;
    transform: none;
  }
`;
    document.head.appendChild(style);

    const container = ref.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.delay ?? "0", 10);
            setTimeout(() => {
              el.classList.add("is-visible");
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}
