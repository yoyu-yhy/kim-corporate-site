"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { KimLogo } from "@/components/common/KimLogo";
import { navigation } from "@/constants/site";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

export function Header() {
  const pathname = usePathname();
  const [heroProgress, setHeroProgress] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(1440);
  const isHome = pathname === "/";
  const navigationJaLabels: Record<string, string> = {
    Mission: "ミッション",
    Services: "事業内容",
    Clients: "実績",
    Company: "会社情報",
  };

  useEffect(() => {
    let frameId = 0;

    const updateScrollState = () => {
      if (!isHome) {
        setHeroProgress(1);
        setViewportWidth(window.innerWidth);
        return;
      }

      const hero = document.querySelector<HTMLElement>("[data-hero-section]");

      if (!hero) {
        setHeroProgress(1);
        setViewportWidth(window.innerWidth);
        return;
      }

      const rect = hero.getBoundingClientRect();
      const scrollableDistance = Math.max(
        1,
        hero.offsetHeight - window.innerHeight,
      );

      setHeroProgress(clamp(-rect.top / scrollableDistance));
      setViewportWidth(window.innerWidth);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [isHome]);

  const logoMoveRawProgress = isHome ? clamp((heroProgress - 0.02) / 0.5) : 1;
  const logoMoveProgress = 1 - Math.pow(1 - logoMoveRawProgress, 3);
  const navProgress = isHome
    ? 1 - Math.pow(1 - clamp((heroProgress - 0.34) / 0.2), 3)
    : 1;
  const isNavInteractive = navProgress > 0.9;
  const initialLogoSizePx = Math.min(Math.max(116, viewportWidth * 0.23), 320);
  const finalLogoSizePx = 32;
  const finalScale = finalLogoSizePx / initialLogoSizePx;
  const startX = 0;
  const startY = -6;
  const endX = viewportWidth < 768 ? 16 : 48;
  const endY = viewportWidth < 768 ? 22 : 30;
  const logoX = startX + (endX - startX) * logoMoveProgress;
  const logoY = startY + (endY - startY) * logoMoveProgress;
  const logoScale = 1 + (finalScale - 1) * logoMoveProgress;
  const logoStyle = {
    transform: `translate3d(${logoX}px, ${logoY}px, 0) scale(${logoScale})`,
    pointerEvents: logoMoveProgress > 0.96 ? "auto" : "none",
    willChange: "transform, opacity",
  } as const;
  const navStyle = {
    opacity: navProgress,
    transform: `translate3d(0, ${-16 + navProgress * 16}px, 0)`,
    pointerEvents: isNavInteractive ? "auto" : "none",
  } as const;

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <Link
        href="/"
        aria-label="KIM home"
        className="absolute left-0 top-0 origin-top-left text-neutral-950 drop-shadow-[0_1px_12px_rgba(255,255,255,0.55)]"
        style={logoStyle}
      >
        <KimLogo className="block whitespace-nowrap text-[clamp(7.25rem,23vw,20rem)] leading-[0.8]" />
      </Link>

      <div className="mx-auto flex max-w-[1500px] items-center justify-end px-4 py-5 md:px-8 md:py-6">
        <nav
          className="ml-auto flex items-center gap-1 rounded-[0.28rem] border border-white/35 bg-white/[0.18] px-3 py-2.5 text-[12px] font-bold text-black shadow-none backdrop-blur-[2px] md:gap-2 md:px-5 md:py-3 md:text-sm"
          style={navStyle}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group hidden min-w-[6.2rem] whitespace-nowrap rounded-full px-3 py-2 text-center font-bold text-black transition hover:bg-white/24 md:inline-flex md:justify-center md:px-4"
            >
              <span className="block group-hover:hidden">{item.label}</span>
              <span className="hidden group-hover:block">
                {navigationJaLabels[item.label] ?? item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
