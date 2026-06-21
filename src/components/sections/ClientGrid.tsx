import { clients } from "@/constants/site";

export function ClientGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {clients.map((client) => (
        <div
          key={client}
          className={`flex min-h-16 items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-4 text-center text-sm font-semibold text-neutral-800 md:min-h-20 ${
            /^[\x00-\x7F]+$/.test(client) ? "tracking-[0.08em]" : "tracking-[0.02em]"
          }`}
        >
          {client}
        </div>
      ))}
    </div>
  );
}
