"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useRef, useState } from "react";

import { services } from "@/constants/site";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const easeOutCubic = (value: number) => 1 - Math.pow(1 - clamp(value), 3);

const serviceLabels = [
  "マーケティング支援",
  "SNSコンサルティング / 運用代行",
  "動画制作・動画編集",
  "WEBサイト・LP制作",
  "Google MEO対策",
  "AIテレフォンサービス",
  "インフルエンサーマーケティング",
] as const;

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    let frameId = 0;
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateProgress = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, window.innerHeight * 0.82);
      const start = window.innerHeight * 0.68;

      setProgress(clamp((start - rect.top) / distance));
      setIsDesktop(mediaQuery.matches);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    mediaQuery.addEventListener("change", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      mediaQuery.removeEventListener("change", requestUpdate);
    };
  }, []);

  const sectionProgress = isDesktop ? progress : 1;
  const darkProgress = easeOutCubic(sectionProgress);
  const contentProgress = easeOutCubic((sectionProgress - 0.16) / 0.38);
  const boardProgress = easeOutCubic((sectionProgress - 0.28) / 0.38);
  const listProgress = easeOutCubic((sectionProgress - 0.42) / 0.38);

  const darkLayerStyle = {
    opacity: darkProgress,
    transform: `scale(${0.72 + darkProgress * 0.28})`,
    borderRadius: `${72 - darkProgress * 72}px`,
  } satisfies CSSProperties;

  const contentStyle = {
    opacity: contentProgress,
    transform: `translate3d(0, ${28 - contentProgress * 28}px, 0)`,
    filter: `blur(${6 - contentProgress * 6}px)`,
  } satisfies CSSProperties;

  const boardStyle = {
    opacity: boardProgress,
    transform: `translate3d(${34 - boardProgress * 34}px, ${14 - boardProgress * 14}px, 0) scale(${0.985 + boardProgress * 0.015})`,
  } satisfies CSSProperties;

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#f7f7f3] py-20 text-white md:py-24 lg:min-h-screen lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 inset-y-6 z-0 origin-center overflow-hidden bg-[#11100f] md:inset-x-8 md:inset-y-8 lg:inset-x-10 lg:inset-y-10"
        style={darkLayerStyle}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(245,238,220,0.14),transparent_34%),radial-gradient(circle_at_84%_42%,rgba(255,255,255,0.08),transparent_42%),linear-gradient(135deg,#171513_0%,#0d0d0d_48%,#201d18_100%)]" />
        <div className="absolute left-[-18%] top-[6%] h-[620px] w-[68vw] rounded-[999px] bg-white/8 blur-3xl" />
        <div className="absolute right-[-16%] bottom-[-8%] h-[560px] w-[58vw] rounded-[999px] bg-[#d8c8a1]/8 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.028] [background-image:radial-gradient(rgba(255,255,255,0.45)_0.5px,transparent_0.5px)] [background-size:3px_3px]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-10rem)] w-full max-w-[1500px] gap-12 px-6 md:min-h-[calc(100vh-12rem)] md:px-10 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] lg:items-center xl:px-16">
        <div style={contentStyle}>
          <h2 className="max-w-[11ch] text-[clamp(2.45rem,5.2vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-white">
            Growth
            <br />
            Design
          </h2>
          <p className="mt-8 max-w-md text-base leading-8 text-neutral-300 md:text-lg">
            <span className="block">
              SNS、WEB、動画、MEO、AI、インフルエンサー施策まで、
            </span>
            <span className="block">
              目的に応じて必要な手段を組み合わせます。
            </span>
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 rounded-full border border-[#c6b892]/34 bg-white/[0.055] px-6 py-3 text-sm font-semibold text-[#f0e3bd] transition hover:bg-white/[0.095]"
            >
              支援領域を詳しく見る
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div style={boardStyle}>
          <div className="relative overflow-hidden rounded-[2.8rem] border border-white/12 bg-black/24 px-6 py-7 shadow-[0_50px_150px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.14)] md:px-8 md:py-8 lg:rounded-[3.2rem] lg:px-10 lg:py-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.06),transparent_32%),radial-gradient(circle_at_78%_72%,rgba(198,184,146,0.06),transparent_36%)]" />
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
              <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.18)_76%)]" />
            </div>

            <div className="relative z-10">
              <div
                className="space-y-3"
                style={{ opacity: listProgress }}
              >
                {services.map((service, index) => {
                  const label = serviceLabels[index] ?? service.title;
                  const delayOffset = Math.max(0, listProgress - index * 0.032);
                  const itemProgress = clamp(delayOffset / 0.75);

                  return (
                    <Link
                      key={service.title}
                      href="/services"
                      className="group grid min-h-[64px] grid-cols-[3.25rem_minmax(0,1fr)_auto] items-center gap-4 rounded-[1.35rem] border border-white/[0.075] bg-white/[0.045] px-4 py-3 shadow-[0_18px_70px_rgba(0,0,0,0.14)] transition hover:border-white/12 hover:bg-white/[0.065] md:min-h-[70px] md:grid-cols-[4rem_minmax(0,1fr)_auto] md:gap-6 md:px-5"
                      style={{
                        opacity: itemProgress,
                        transform: `translate3d(0, ${12 - itemProgress * 12}px, 0)`,
                      }}
                    >
                      <span className="text-[10px] font-semibold tracking-[0.32em] text-[#c6b892]/68">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="min-w-0 text-[clamp(1.05rem,1.45vw,1.65rem)] font-semibold leading-[1.12] tracking-[-0.055em] text-white/92">
                        {label}
                      </h3>
                      <span className="translate-x-2 text-sm text-white/0 transition group-hover:translate-x-0 group-hover:text-white/42">
                        →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
