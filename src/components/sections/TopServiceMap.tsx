import { services } from "@/constants/site";

function renderServiceTitle(title: string) {
  switch (title) {
    case "SNSコンサルティング / 運用代行":
      return (
        <>
          <span className="block">SNSコンサルティング</span>
          <span className="block">/ 運用代行</span>
        </>
      );
    case "WEBサイト、LP制作":
      return (
        <>
          <span className="block">WEBサイト、</span>
          <span className="block">LP制作</span>
        </>
      );
    default:
      return title;
  }
}

export function TopServiceMap() {
  return (
    <div className="mt-6 overflow-hidden rounded-[2rem] border border-neutral-200 bg-neutral-50">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <article
            key={service.title}
            className="border-b border-neutral-200 p-5 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0 md:p-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-400">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 text-lg font-semibold leading-7 tracking-[-0.03em] text-neutral-950">
              {renderServiceTitle(service.title)}
            </h3>
            {service.description ? (
              <p className="mt-3 text-sm leading-7 text-neutral-600">
                {service.description}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
