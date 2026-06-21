import { services } from "@/constants/site";

function renderServiceTitle(title: string) {
  switch (title) {
    case "SNSコンサルティング / 運用代行":
      return (
        <span className="md:whitespace-nowrap">
          <span className="keep-together-desktop">SNSコンサルティング</span>
          {" / "}
          <span className="keep-together-desktop">運用代行</span>
        </span>
      );
    case "動画制作・動画編集":
    case "Google MEO対策":
    case "AIテレフォンサービス":
    case "インフルエンサーマーケティング":
      return <span className="keep-together-desktop">{title}</span>;
    case "WEBサイト、LP制作":
      return (
        <span className="md:whitespace-nowrap">
          <span className="keep-together-desktop">WEBサイト、</span>
          <span className="keep-together-desktop">LP制作</span>
        </span>
      );
    default:
      return title;
  }
}

export function ServiceGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service, index) => (
        <article
          key={service.title}
          className="rounded-[1.75rem] border border-neutral-200 bg-white p-6 transition hover:bg-neutral-50 md:p-8"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-400">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-neutral-950 md:text-[1.32rem] md:leading-8">
            {renderServiceTitle(service.title)}
          </h3>
          <p className="mt-3 text-sm leading-7 text-neutral-600 text-pretty md:text-[15px]">
            {service.description}
          </p>
        </article>
      ))}
    </div>
  );
}
