import Image from "next/image";

type HeroBackgroundMockProps = {
  noiseSrc?: string;
};

export function HeroBackgroundMock({ noiseSrc }: HeroBackgroundMockProps) {
  const normalizedNoiseSrc = noiseSrc?.trim() ? noiseSrc : undefined;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,245,245,0.9),rgba(255,255,255,0)_42%),radial-gradient(circle_at_82%_22%,rgba(244,244,245,0.75),rgba(255,255,255,0)_34%)]" />
      <div className="absolute inset-0 opacity-70 bg-[linear-gradient(118deg,rgba(24,24,27,0.045)_0%,rgba(255,255,255,0)_24%,rgba(255,255,255,0)_64%,rgba(24,24,27,0.035)_100%)]" />
      <div className="absolute inset-x-[-18%] top-[4%] h-[36rem] rotate-[-11deg] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(24,24,27,0.04)_46%,rgba(255,255,255,0)_72%)] opacity-80" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(245,245,245,0.8))]" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(116deg,rgba(10,10,10,0.18)_1px,transparent_1px)] [background-size:180px_72px]" />
      {normalizedNoiseSrc ? (
        <Image
          src={normalizedNoiseSrc}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.06] mix-blend-multiply"
        />
      ) : (
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(10,10,10,0.55)_0.55px,transparent_0.55px)] [background-size:12px_12px]" />
      )}
    </div>
  );
}
