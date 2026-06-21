import { PageHero } from "@/components/common/PageHero";
import { CompanyTable } from "@/components/sections/CompanyTable";

export const metadata = {
  title: "会社概要",
};

export default function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="会社概要"
        lead="株式会社KIMの基本情報です。"
      />
      <section className="relative overflow-hidden bg-[#f8f6ef]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute left-[-18%] top-[-18%] h-[34rem] w-[34rem] rounded-full bg-white/72 blur-3xl" />
          <div className="absolute right-[-18%] bottom-[-14%] h-[34rem] w-[34rem] rounded-full bg-[#c6b892]/14 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 sm:py-16 xl:py-20">
          <div className="relative rounded-[2.75rem] border border-white/70 bg-white/58 p-3 shadow-[0_30px_100px_rgba(36,32,24,0.08),inset_0_1px_0_rgba(255,255,255,0.74)] backdrop-blur-md md:p-4">
            <CompanyTable />
          </div>
        </div>
      </section>
    </>
  );
}
