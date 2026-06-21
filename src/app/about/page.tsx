import Link from "next/link";
import Image from "next/image";

import { PageHero } from "@/components/common/PageHero";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { aboutContent, siteConfig } from "@/constants/site";

export const metadata = {
  title: "ミッション",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="ミッション"
        lead={<span className="keep-together-desktop">{aboutContent.introBody}</span>}
      />

      <section className="relative isolate overflow-hidden bg-[#f8f6ef]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute left-[-18%] top-[8%] h-[32rem] w-[32rem] rounded-full bg-white/70 blur-3xl" />
          <div className="absolute right-[-12%] bottom-[4%] h-[34rem] w-[34rem] rounded-full bg-[#c6b892]/18 blur-3xl" />
          <div className="absolute left-6 top-20 h-px w-[calc(100%-3rem)] bg-gradient-to-r from-transparent via-neutral-300/70 to-transparent" />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20 xl:py-24">
          <ScrollReveal>
            <div className="grid gap-10 border-y border-neutral-300/70 py-12 md:py-16 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1fr)] lg:items-start">
              <div className="flex min-h-[220px] items-center">
                <Image
                  src="/images/brand/knowledge-is-money.png"
                  alt="Knowledge is money"
                  width={1240}
                  height={420}
                  className="w-full max-w-[620px] object-contain"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="whitespace-pre-line text-base leading-[2.05] text-neutral-700 md:text-lg">
                {aboutContent.missionBody}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#12110f] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_16%,rgba(255,255,255,0.13),transparent_34%),radial-gradient(circle_at_8%_82%,rgba(198,184,146,0.18),transparent_36%),linear-gradient(180deg,#151411_0%,#0d0d0c_100%)]" />
          <div className="absolute left-[8%] top-[12%] h-[74%] w-px rotate-[18deg] bg-gradient-to-b from-transparent via-white/16 to-transparent" />
          <div className="absolute right-[-18%] top-[12%] h-[36rem] w-[48vw] rounded-full bg-white/6 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 xl:py-28">
          <ScrollReveal>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)]">
              <h2 className="max-w-[7ch] text-[clamp(2.5rem,5vw,5.4rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-white">
                {aboutContent.representativeTitle}
              </h2>
              <div className="max-w-3xl space-y-6 text-base leading-[2.05] text-neutral-300 md:text-lg">
                {aboutContent.representativeMessage.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="pt-6 font-semibold text-white">
                  <p>{siteConfig.name}</p>
                  <p>{siteConfig.representative}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f8f6ef]">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <ScrollReveal>
            <div className="flex flex-col gap-8 rounded-[2rem] border border-neutral-200/80 bg-white/58 p-7 shadow-[0_28px_90px_rgba(36,32,24,0.08),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-md md:flex-row md:items-center md:justify-between md:p-9">
              <p className="max-w-2xl text-[clamp(1.6rem,3vw,2.7rem)] font-semibold leading-[1.15] tracking-[-0.06em] text-neutral-950">
                {siteConfig.mission}
              </p>
              <Link
                href="/services"
                className="inline-flex h-14 items-center justify-center rounded-full bg-neutral-950 px-7 text-sm font-semibold text-white transition duration-300 hover:bg-[#c6b892] hover:text-neutral-950"
              >
                Services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
