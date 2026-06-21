import { PageHero } from "@/components/common/PageHero";
import { TopServiceMap } from "@/components/sections/TopServiceMap";

export const metadata = {
  title: "事業内容",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="事業内容" />
      <section className="relative overflow-hidden bg-[#f8f6ef]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute left-[-14%] top-[-12%] h-[34rem] w-[34rem] rounded-full bg-white/76 blur-3xl" />
          <div className="absolute right-[-16%] bottom-[8%] h-[30rem] w-[30rem] rounded-full bg-[#c6b892]/16 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 sm:py-16 xl:py-20">
          <div className="relative overflow-hidden rounded-[2.4rem] border border-neutral-900 bg-neutral-950 p-8 text-white shadow-[0_36px_120px_rgba(0,0,0,0.22)] md:p-12 xl:p-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_10%,rgba(255,255,255,0.14),transparent_34%),radial-gradient(circle_at_8%_92%,rgba(198,184,146,0.16),transparent_36%)]"
            />
            <div className="relative grid gap-8 md:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] md:items-center">
              <div className="flex items-center">
                <h2 className="max-w-[12em] text-[clamp(1.9rem,3.2vw,3.6rem)] font-semibold leading-[1.18] tracking-[-0.06em] text-white">
                  戦略から実行まで、
                  <br />
                  売上につながる導線を設計する。
                </h2>
              </div>
              <div className="flex items-center border-t border-white/10 pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                <p className="max-w-xl text-sm leading-8 text-white/72 md:text-base">
                  SNS、動画、WEB、MEO、AI、インフルエンサー施策まで。単体の制作ではなく、目的に応じて必要な手段を組み合わせ、事業成長に向き合います。
                </p>
              </div>
            </div>
          </div>
          <TopServiceMap />
        </div>
      </section>
    </>
  );
}
