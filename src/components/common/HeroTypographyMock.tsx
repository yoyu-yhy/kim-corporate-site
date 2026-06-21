import { HeroTypographyImage } from "@/components/common/HeroTypographyImage";

type HeroTypographyMockProps = {
  src?: string;
  className?: string;
};

export function HeroTypographyMock({
  className = "",
}: HeroTypographyMockProps) {
  return (
    <div className={className}>
      <HeroTypographyImage />
    </div>
  );
}
