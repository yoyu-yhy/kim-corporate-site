
"use client";

import { useEffect, useRef, useState } from "react";
import { HeroGlitchTypography } from "@/components/common/HeroGlitchTypography";
import { HeroShaderBackground } from "@/components/common/HeroShaderBackground";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const mapRange = (value: number, inputMin: number, inputMax: number) =>
  clamp((value - inputMin) / (inputMax - inputMin));

const easeOutCubic = (value: number) => 1 - Math.pow(1 - clamp(value), 3);

export function HomeHero() {
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
      const scrollableDistance = Math.max(
        1,
        section.offsetHeight - window.innerHeight,
      );
      const nextProgress = clamp(-rect.top / scrollableDistance);

      setProgress(nextProgress);
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

  const revealStyle = (start: number, end: number) => {
    const eased = easeOutCubic(mapRange(progress, start, end));

    return {
      opacity: eased,
      transform: `translate3d(0, ${18 - eased * 18}px, 0)`,
      filter: `blur(${6 - eased * 6}px)`,
    };
  };

  const subtitleFade = mapRange(progress, 0.06, 0.32);
  const mainHeroProgress = easeOutCubic(mapRange(progress, 0.42, 0.66));
  const subtitleStyle = {
    opacity: 1 - subtitleFade,
    transform: `translate3d(0, ${-56 * subtitleFade}px, 0)`,
  };
  const mainHeroStyle = {
    opacity: mainHeroProgress,
    transform: `translate3d(0, ${32 - mainHeroProgress * 32}px, 0)`,
    filter: `blur(${8 - mainHeroProgress * 8}px)`,
  };

  return (
    <section
      ref={sectionRef}
      data-hero-section
      className="relative h-[360vh] bg-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_16%,rgba(52,52,47,0.16),transparent_40%),radial-gradient(circle_at_12%_68%,rgba(18,18,18,0.08),transparent_36%),linear-gradient(180deg,#ffffff_0%,#f7f6ef_48%,#ffffff_100%)]" />
          <div className="absolute right-[-18%] top-[-28%] h-[880px] w-[76vw] -rotate-12 rounded-[999px] bg-neutral-500/16 blur-3xl" />
          <div className="absolute left-[-24%] top-[24%] h-[620px] w-[58vw] rotate-12 rounded-[999px] bg-neutral-950/7 blur-3xl" />
          <div className="absolute inset-0 opacity-100">
            <HeroShaderBackground />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(116deg,transparent_0%,transparent_38%,rgba(255,255,255,0.16)_50%,transparent_64%,transparent_100%)] opacity-28" />
          <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-white via-white/50 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b from-white/64 via-white/18 to-transparent" />
        </div>

        <p
          className="pointer-events-none absolute right-[6vw] top-[24vh] z-20 whitespace-nowrap text-right text-[clamp(1.15rem,1.95vw,2.15rem)] font-semibold leading-none tracking-[0.18em] text-neutral-950 md:right-[7vw] md:top-[22vh]"
          style={subtitleStyle}
        >
          Knowledge is money
        </p>

        <div className="relative z-20 mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 py-10 md:px-10 md:py-12 xl:px-16">
          <div className="min-w-0 max-w-full">
            <div
              className="will-change-[filter,opacity,transform]"
              style={mainHeroStyle}
            >
              <HeroGlitchTypography />
            </div>
            <div className="mt-10 max-w-3xl md:mt-12">
              <h1 className="text-[clamp(2rem,3.4vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-neutral-950">
                <span
                  className="block whitespace-nowrap will-change-[filter,opacity,transform]"
                  style={revealStyle(0.62, 0.76)}
                >
                  知識を価値に変え、
                </span>
                <span
                  className="mt-1 block whitespace-nowrap will-change-[filter,opacity,transform]"
                  style={revealStyle(0.72, 0.84)}
                >
                  売上成長を加速させる。
                </span>
              </h1>
              <p
                className="mt-7 max-w-2xl text-base leading-8 text-neutral-600 will-change-[filter,opacity,transform] md:text-lg"
                style={revealStyle(0.82, 0.96)}
              >
                <span className="block">
                  株式会社KIMは、知識・発信・テクノロジーを掛け合わせ、
                </span>
                <span className="block">
                  企業やブランドの価値を正しく届けるマーケティングカンパニーです。
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
