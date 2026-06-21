import { PartnerGlobeAnimation } from "@/components/common/PartnerGlobeAnimation";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { messageContent } from "@/constants/site";

export function MessageSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#12110f] py-24 text-white md:py-32 xl:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_14%,rgba(255,255,255,0.14),transparent_38%),radial-gradient(circle_at_8%_80%,rgba(214,198,158,0.18),transparent_38%),linear-gradient(180deg,#151411_0%,#0e0e0d_100%)]" />
        <div className="absolute left-[8%] top-[16%] h-[72%] w-px rotate-[18deg] bg-gradient-to-b from-transparent via-white/18 to-transparent" />
        <div className="absolute right-[-12%] top-[10%] h-[620px] w-[54vw] rounded-[999px] bg-white/6 blur-3xl" />
      </div>

      <div className="pointer-events-none absolute left-[4vw] top-1/2 z-0 hidden w-[min(31vw,430px)] -translate-y-1/2 lg:block 2xl:left-[6vw]">
        <PartnerGlobeAnimation />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 md:px-10 xl:px-16">
        <div className="ml-auto max-w-4xl">
          <ScrollReveal delay={120}>
            <p className="text-[clamp(1.45rem,2.7vw,3rem)] font-semibold leading-[1.45] tracking-[-0.065em] text-white">
              {messageContent.title}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={260}>
            <p className="mt-10 max-w-3xl text-base leading-9 text-neutral-300 md:text-lg">
              {messageContent.body}
            </p>
            <p className="mt-6 max-w-3xl text-base leading-9 text-neutral-300 md:text-lg">
              価値の整理、伝わる表現、成果につながる実装まで。KIMは、クライアントの状況に合わせて必要な支援を組み合わせ、伴走します。
            </p>
          </ScrollReveal>
          <ScrollReveal delay={420}>
            <div className="mt-14 border-l border-[#c6b892]/36 pl-6 text-sm font-medium leading-7 text-neutral-200">
              {messageContent.signature.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
