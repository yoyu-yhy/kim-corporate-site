import { type CSSProperties } from "react";

type KimLogoProps = {
  className?: string;
  style?: CSSProperties;
};

export function KimLogo({ className = "", style }: KimLogoProps) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "Inter, Helvetica Neue, Arial, system-ui, sans-serif",
        fontWeight: 850,
        letterSpacing: "-0.09em",
        ...style,
      }}
    >
      KIM
    </span>
  );
}
