"use client";

import { type ReactNode, useEffect } from "react";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const root = document.documentElement;

    root.classList.add("is-smooth-page");

    return () => {
      root.classList.remove("is-smooth-page");
    };
  }, []);

  return <>{children}</>;
}
