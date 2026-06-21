import Image from "next/image";

const HERO_TYPOGRAPHY_IMAGE = {
  pc: "/images/home/kim-main-visual-text-pc.png",
  sp: "/images/home/kim-main-visual-text-pc.png",
} as const;

export function HeroTypographyImage() {
  return (
    <div className="relative z-10 w-full max-w-[1500px] min-w-0 overflow-hidden">
      <div className="relative aspect-[2076/541] w-full">
        <Image
          src={HERO_TYPOGRAPHY_IMAGE.pc}
          alt="Knowledge becomes growth."
          fill
          priority
          sizes="(min-width: 1600px) 1500px, calc(100vw - 48px)"
          className="object-contain object-left"
        />
      </div>
    </div>
  );
}
