import Image from "next/image";

type VisualFrameProps = {
  src?: string;
  alt?: string;
  aspect?: "wide" | "portrait" | "square";
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

const aspectClassMap = {
  wide: "aspect-[3/2]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
} as const;

export function VisualFrame({
  src,
  alt,
  aspect = "wide",
  className = "",
  imageClassName = "object-cover",
  priority = false,
  sizes = "(min-width: 1024px) 520px, 100vw",
}: VisualFrameProps) {
  const normalizedSrc = src?.trim() ? src : undefined;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-neutral-100 shadow-[0_18px_48px_-34px_rgba(10,10,10,0.18)] ${className}`}
    >
      <div className={`relative w-full ${aspectClassMap[aspect]}`}>
        {normalizedSrc ? (
          <Image
            fill
            src={normalizedSrc}
            alt={alt ?? ""}
            priority={priority}
            sizes={sizes}
            className={`object-cover ${imageClassName}`}
          />
        ) : null}
      </div>
    </div>
  );
}
