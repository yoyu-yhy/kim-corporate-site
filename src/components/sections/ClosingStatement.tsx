"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useRef, useState } from "react";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import { closingStatement } from "@/constants/site";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const easeOutCubic = (value: number) => 1 - Math.pow(1 - clamp(value), 3);

export function ClosingStatement() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const start = window.innerHeight * 0.94;
      const distance = Math.max(1, window.innerHeight * 0.72);
      setProgress(clamp((start - rect.top) / distance));
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const entryProgress = easeOutCubic(progress);
  const lineProgress = easeOutCubic((progress - 0.1) / 0.42);
  const glowProgress = easeOutCubic((progress - 0.22) / 0.48);

  const sectionStyle = {
    opacity: 0.76 + entryProgress * 0.24,
    transform: `translate3d(0, ${28 - entryProgress * 28}px, 0)`,
    filter: `blur(${5 - entryProgress * 5}px)`,
  } satisfies CSSProperties;

  const lineStyle = {
    transform: `translate3d(${-10 + lineProgress * 18}%, 0, 0) rotate(-6deg) scaleX(${0.72 + lineProgress * 0.28})`,
    opacity: 0.08 + lineProgress * 0.16,
  } satisfies CSSProperties;

  const glowStyle = {
    opacity: 0.35 + glowProgress * 0.45,
    transform: `translate3d(${18 - glowProgress * 18}px, ${10 - glowProgress * 10}px, 0) scale(${0.96 + glowProgress * 0.04})`,
  } satisfies CSSProperties;

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#f8f6ef] py-16 md:py-20 xl:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.98),transparent_34%),radial-gradient(circle_at_86%_72%,rgba(31,29,25,0.10),transparent_38%),linear-gradient(180deg,#f8f6ef_0%,#ffffff_100%)]" />
        <div
          className="absolute right-[-18%] top-[18%] h-[440px] w-[54vw] rounded-[999px] bg-white/72 blur-3xl"
          style={glowStyle}
        />
        <div
          className="absolute left-[-12%] top-[42%] h-px w-[124%] origin-left bg-gradient-to-r from-transparent via-neutral-950/18 to-transparent"
          style={lineStyle}
        />
      </div>

      <div
        className="relative z-10 mx-auto max-w-[1500px] px-6 md:px-10 xl:px-16"
        style={sectionStyle}
      >
        <ScrollReveal>
          <h2 className="max-w-5xl text-[clamp(2.75rem,7.2vw,7.35rem)] font-semibold leading-[0.88] tracking-[-0.09em] text-neutral-950">
            {closingStatement.title}
          </h2>
        </ScrollReveal>
        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] md:items-end">
          <ScrollReveal delay={120}>
            <p className="max-w-2xl text-[clamp(1.15rem,1.85vw,1.8rem)] font-semibold leading-[1.62] tracking-[-0.052em] text-neutral-900">
              {closingStatement.description}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/company"
                className="inline-flex min-w-[10.4rem] items-center justify-center rounded-full bg-neutral-950 px-7 py-4 text-sm font-semibold !text-white shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition hover:bg-neutral-800"
              >
                <span className="text-white">Company</span>
              </Link>
              <Link
                href="/services"
                className="inline-flex min-w-[10.4rem] items-center justify-center rounded-full border border-neutral-950/18 bg-white/78 px-7 py-4 text-sm font-semibold text-neutral-950 shadow-[0_18px_45px_rgba(36,32,24,0.06)] transition hover:bg-white"
              >
                Services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
