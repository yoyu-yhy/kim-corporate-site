import { companyProfile } from "@/constants/site";

export function CompanyTable() {
  const visibleCompanyProfile = companyProfile.filter(
    (row) => row.label !== "英語名",
  );

  return (
    <div className="overflow-hidden rounded-[1.9rem] border border-neutral-200 bg-white">
      {visibleCompanyProfile.map((row) => (
        <div
          key={row.label}
          className="grid border-b border-neutral-200 last:border-b-0 md:grid-cols-[180px_1fr]"
        >
          <div className="bg-neutral-50 px-5 py-4 text-sm font-semibold text-neutral-700 md:px-6 md:py-5">
            {row.label}
          </div>
          <div className="px-5 py-4 text-sm leading-7 text-neutral-700 text-pretty md:px-6 md:py-5">
            {row.label === "会社名" ? (
              <span className="keep-together">{row.value}</span>
            ) : row.label === "代表" ? (
              <span className="keep-together-desktop">{row.value}</span>
            ) : row.label === "所在地" ? (
              <>
                <span className="keep-together-desktop">
                  東京都新宿区西新宿３丁目３−１３
                </span>
                <br className="hidden md:block" />
                <span className="keep-together-desktop">西新宿 水間ビル 6階</span>
              </>
            ) : (
              row.value
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
