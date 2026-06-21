import { siteConfig } from "@/constants/site";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6 text-sm text-neutral-500">
        <p className="whitespace-nowrap font-semibold text-neutral-950">
          {siteConfig.name}
        </p>
        <p className="whitespace-nowrap">© 2026 KIM</p>
      </div>
    </footer>
  );
}
