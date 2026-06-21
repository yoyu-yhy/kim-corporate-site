import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
};

export function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200/70 bg-[#f8f6ef]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(255,255,255,0.9),transparent_34%),radial-gradient(circle_at_8%_88%,rgba(198,184,146,0.22),transparent_34%),linear-gradient(180deg,#faf8f1_0%,#f3f0e6_100%)]" />
        <div className="absolute inset-x-[-12%] bottom-[-4rem] h-44 -skew-y-6 bg-white/58" />
        <div className="absolute right-[-12rem] top-6 h-[28rem] w-[28rem] rounded-full border border-neutral-200/80" />
        <div className="absolute left-6 top-28 h-px w-[calc(100%-3rem)] bg-gradient-to-r from-transparent via-neutral-300/80 to-transparent" />
        <div className="absolute inset-0 opacity-[0.032] [background-image:radial-gradient(#111_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-14 pt-24 md:pb-16 md:pt-28">
        {eyebrow ? (
          <p className="sr-only">{eyebrow}</p>
        ) : null}
        <h1 className="max-w-[12ch] text-[clamp(2.6rem,5.4vw,5.8rem)] font-semibold leading-[0.95] tracking-[-0.065em] text-neutral-950">
          {title}
        </h1>
        {lead ? (
          <div className="mt-7 max-w-3xl text-base leading-8 text-neutral-600 md:text-lg">
            {lead}
          </div>
        ) : null}
      </div>
    </section>
  );
}
