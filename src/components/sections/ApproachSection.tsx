import { Section } from "@/components/common/Section";
import { approachItems } from "@/constants/site";

export function ApproachSection() {
  return (
    <Section
      eyebrow="Approach"
      title="知識 × 発信 × テクノロジー"
      description="KIMは、価値の整理から伝達、成果につながる運用基盤までを一気通貫で設計します。"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {approachItems.map((item) => (
          <article
            key={item.title}
            className="rounded-[2rem] border border-neutral-200 bg-white p-7 md:p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-neutral-400">
              {item.title}
            </p>
            <p className="mt-8 text-lg leading-8 text-neutral-800">{item.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
