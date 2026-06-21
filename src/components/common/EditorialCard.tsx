type EditorialCardProps = {
  index: string;
  label: string;
  body: string;
};

export function EditorialCard({ index, label, body }: EditorialCardProps) {
  return (
    <article className="rounded-[1.5rem] border border-neutral-200 bg-white/80 p-4 backdrop-blur-sm md:p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-400">
        {index}
      </p>
      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-800">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-neutral-600">{body}</p>
    </article>
  );
}
