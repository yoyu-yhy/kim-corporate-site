import Image from "next/image";

import { PageHero } from "@/components/common/PageHero";
import { clientsNote } from "@/constants/site";

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

export const metadata = {
  title: "実績",
};

export default function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Clients"
        title="実績"
        lead="ブランドや企業の価値を、SNS・コンテンツ・WEBを通じて正しく届ける支援を行っています。"
      />
      <section className="relative overflow-hidden bg-[#f8f6ef]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute left-[-12%] top-[-14%] h-[34rem] w-[34rem] rounded-full bg-white/70 blur-3xl" />
          <div className="absolute right-[-18%] bottom-[-16%] h-[36rem] w-[36rem] rounded-full bg-[#c6b892]/16 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 sm:py-16 xl:py-20">
          <div className="relative overflow-hidden rounded-[2.75rem] border border-white/65 bg-white/36 p-5 shadow-[0_30px_100px_rgba(36,32,24,0.08),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-md md:p-7 xl:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_12%,rgba(255,255,255,0.7),transparent_34%),radial-gradient(circle_at_6%_88%,rgba(198,184,146,0.14),transparent_36%)]"
            />
            <div className="relative z-10">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {clientLogos.map((logo) => (
                  <div
                    key={logo.src}
                    className="flex h-28 items-center justify-center rounded-[1.5rem] border border-white/45 bg-white/35 px-5 shadow-[0_24px_80px_rgba(36,32,24,0.07),inset_0_1px_0_rgba(255,255,255,0.62)] backdrop-blur-md transition duration-300 hover:bg-white/48"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={240}
                      height={120}
                      className="max-h-16 max-w-[12rem] object-contain opacity-90 mix-blend-multiply transition duration-300 hover:opacity-100"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-8 text-xs leading-6 text-neutral-500">{clientsNote}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
