type SectionProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function Section({
  eyebrow,
  title,
  description,
  children,
  className,
  contentClassName,
}: SectionProps) {
  return (
    <section className={className}>
      <div className={`mx-auto max-w-6xl px-6 py-14 md:py-20 ${contentClassName ?? ""}`}>
        {eyebrow && (
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-neutral-500">
            {eyebrow}
          </p>
        )}

        <h2 className="max-w-4xl text-[2rem] font-semibold tracking-tight text-neutral-950 text-balance md:text-[3.4rem] md:leading-[1.08]">
          {title}
        </h2>

        {description && (
          <div className="mt-5 max-w-[42rem] text-base leading-8 text-neutral-600 text-pretty md:text-[1.05rem] md:leading-8">
            {description}
          </div>
        )}

        {children && <div className="mt-9 md:mt-10">{children}</div>}
      </div>
    </section>
  );
}
