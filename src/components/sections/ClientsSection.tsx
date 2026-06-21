import Image from "next/image";

import { ScrollReveal } from "@/components/common/ScrollReveal";

const clientLogos = [
  { name: "VT COSMETICS", src: "/images/clients/vt-cosmetics.png" },
  { name: "新日本製薬", src: "/images/clients/shinnihon-seiyaku.png" },
  { name: "medicube", src: "/images/clients/medicube.png" },
  { name: "Torriden", src: "/images/clients/torriden.png" },
  { name: "MEDIHEAL", src: "/images/clients/mediheal.png" },
  { name: "cos:mura", src: "/images/clients/cosmura.png" },
  { name: "obsero", src: "/images/clients/obsero.png" },
  { name: "ONE THING", src: "/images/clients/one-thing.png" },
  { name: "REJURAN", src: "/images/clients/rejuran.png" },
  { name: "Anua", src: "/images/clients/anua.png" },
  { name: "Easydew", src: "/images/clients/easydew.png" },
  { name: "mixsoon", src: "/images/clients/mixsoon.png" },
  { name: "Laka", src: "/images/clients/laka.png" },
  { name: "hince", src: "/images/clients/hince.png" },
  { name: "AMUSE", src: "/images/clients/amuse.png" },
  { name: "dasique", src: "/images/clients/dasique.png" },
];

const marqueeStyles = `
@keyframes clientMarqueeLeft {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}

@keyframes clientMarqueeRight {
  from { transform: translate3d(-50%, 0, 0); }
  to { transform: translate3d(0, 0, 0); }
}
`;

export function ClientsSection() {
  const reversedLogos = clientLogos.slice().reverse();

  return (
    <section className="relative isolate overflow-hidden bg-[#f4f1e8] py-24 md:py-32 xl:py-40">
      <style>{marqueeStyles}</style>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.96),transparent_34%),radial-gradient(circle_at_86%_76%,rgba(37,35,31,0.11),transparent_40%),linear-gradient(180deg,#fbfaf6_0%,#ede7d8_100%)]" />
        <div className="absolute left-[-8%] top-[18%] h-px w-[116%] rotate-[5deg] bg-gradient-to-r from-transparent via-neutral-950/14 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 md:px-10 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] lg:items-end">
          <ScrollReveal>
            <h2 className="text-[clamp(2.4rem,5vw,5.8rem)] font-semibold leading-[0.95] tracking-[-0.08em] text-neutral-950">
              Clients
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className="max-w-2xl text-base leading-8 text-neutral-500 md:text-lg">
              美容・スキンケア領域を中心に、ブランドの認知拡大と販売促進を支援しています。
            </p>
          </ScrollReveal>
        </div>

        <div className="relative mt-16 overflow-hidden py-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f4f1e8] to-transparent md:w-36" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#f4f1e8] to-transparent md:w-36" />

          <ScrollReveal>
            <div className="flex w-max gap-5 [animation:clientMarqueeLeft_44s_linear_infinite]">
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <div
                  key={`left-${logo.name}-${index}`}
                  className="flex h-24 w-48 shrink-0 items-center justify-center rounded-[1.6rem] border border-white/45 bg-white/28 px-4 shadow-[0_24px_80px_rgba(36,32,24,0.07),inset_0_1px_0_rgba(255,255,255,0.62)] backdrop-blur-md transition duration-300 hover:bg-white/42 md:h-28 md:w-56 md:px-5"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                      width={180}
                      height={72}
                      className="max-h-16 max-w-[10.5rem] object-contain opacity-90 mix-blend-multiply transition duration-300 hover:opacity-100 md:max-h-20 md:max-w-[13.5rem]"
                      style={{ width: "auto", height: "auto" }}
                    />
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <div className="mt-5 flex w-max gap-5 [animation:clientMarqueeRight_52s_linear_infinite]">
              {[...reversedLogos, ...reversedLogos].map((logo, index) => (
                <div
                  key={`right-${logo.name}-${index}`}
                  className="flex h-24 w-48 shrink-0 items-center justify-center rounded-[1.6rem] border border-white/45 bg-white/28 px-4 shadow-[0_24px_80px_rgba(36,32,24,0.07),inset_0_1px_0_rgba(255,255,255,0.62)] backdrop-blur-md transition duration-300 hover:bg-white/42 md:h-28 md:w-56 md:px-5"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                      width={180}
                      height={72}
                      className="max-h-16 max-w-[10.5rem] object-contain opacity-90 mix-blend-multiply transition duration-300 hover:opacity-100 md:max-h-20 md:max-w-[13.5rem]"
                      style={{ width: "auto", height: "auto" }}
                    />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
