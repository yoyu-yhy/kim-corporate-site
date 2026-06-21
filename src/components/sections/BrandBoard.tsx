import { clients } from "@/constants/site";

type BrandBoardProps = {
  tone?: "light" | "dark";
};

export function BrandBoard({ tone = "light" }: BrandBoardProps) {
  const light = tone === "light";

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {clients.map((client) => (
        <div
          key={client}
          className={`flex min-h-16 items-center justify-center rounded-full border px-5 py-4 text-center text-sm font-semibold md:min-h-20 ${
            light
              ? "border-neutral-200 bg-white text-neutral-800"
              : "border-white/10 bg-white/[0.03] text-neutral-200"
          } ${/^[\x00-\x7F]+$/.test(client) ? "tracking-[0.06em]" : "tracking-[0.02em]"}`}
        >
          {client}
        </div>
      ))}
    </div>
  );
}
