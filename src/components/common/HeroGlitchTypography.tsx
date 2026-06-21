"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type HeroGlitchTypographyProps = {
  src?: string;
  alt?: string;
  className?: string;
};

const DEFAULT_IMAGE_SRC = "/images/home/kim-main-visual-text-pc.png";
const DEFAULT_ALT = "Knowledge becomes growth.";
const IMAGE_ASPECT_RATIO = "aspect-[2076/541]";

const GLITCH_INTERVAL_MS = 5600;
const GLITCH_INTERVAL_RANDOM_MS = 1600;
const GLITCH_DURATION_FRAMES = 14;
const BASE_GLITCH_MAX_OFFSET = 86;
const BASE_GLITCH_MIN_SLICES = 6;
const BASE_GLITCH_MAX_SLICES = 14;
const BASE_GLITCH_WHOLE_OFFSET = 6;
const EFFECT_GLITCH_MAX_OFFSET = 60;
const EFFECT_GLITCH_MIN_SLICES = 4;
const EFFECT_GLITCH_MAX_SLICES = 10;
const LINE_BREAK_MAX_OFFSET = 64;
const LINE_BREAK_STEP = 3;
const LINE_BREAK_KEEP_RATE = 0.34;
const SCAN_BAND_COUNT = 4;
const SCAN_BAND_SPEED = 0.022;
const SCAN_BAND_ALPHA = 0.16;
const SCAN_DASH_ALPHA = 0.13;
const SCAN_DASH_COUNT = 7;
const SCAN_LINE_HEIGHT_MIN = 1.5;
const SCAN_LINE_HEIGHT_MAX = 3.5;
const GLITCH_SCAN_BAND_COUNT = 10;
const GLITCH_SCAN_BAND_ALPHA = 0.32;
const GLITCH_SCAN_DASH_ALPHA = 0.26;
const GLITCH_SCAN_DASH_COUNT = 18;
const SHINE_SPEED = 0.055;
const SHINE_ALPHA = 0.14;
const SHINE_BLUR_WIDTH = 420;
const MAX_DPR = 2;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function randomInt(min: number, max: number) {
  return Math.floor(randomBetween(min, max + 1));
}

function getNextGlitchDelay() {
  return GLITCH_INTERVAL_MS + Math.random() * GLITCH_INTERVAL_RANDOM_MS;
}

export function HeroGlitchTypography({
  src = DEFAULT_IMAGE_SRC,
  alt = DEFAULT_ALT,
  className = "",
}: HeroGlitchTypographyProps) {
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const displayCanvas = canvasRef.current;

    if (!container || !displayCanvas) {
      return;
    }

    const displayContext = displayCanvas.getContext("2d", { alpha: true });

    if (!displayContext) {
      return;
    }

    const baseCanvas = document.createElement("canvas");
    const effectCanvas = document.createElement("canvas");
    const baseContext = baseCanvas.getContext("2d", { alpha: true });
    const effectContext = effectCanvas.getContext("2d", { alpha: true });

    if (!baseContext || !effectContext) {
      return;
    }

    let animationFrameId = 0;
    let glitchFramesLeft = 0;
    let nextGlitchAt = 0;
    let wasGlitching = false;
    let cssWidth = 0;
    let cssHeight = 0;
    let currentDpr = 1;
    let hasCancelled = false;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const image = new window.Image();
    image.decoding = "async";
    image.src = src;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(rect.width));
      const nextHeight = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      cssWidth = nextWidth;
      cssHeight = nextHeight;
      currentDpr = dpr;
      displayCanvas.width = Math.round(nextWidth * dpr);
      displayCanvas.height = Math.round(nextHeight * dpr);
      displayCanvas.style.width = `${nextWidth}px`;
      displayCanvas.style.height = `${nextHeight}px`;
      baseCanvas.width = displayCanvas.width;
      baseCanvas.height = displayCanvas.height;
      effectCanvas.width = displayCanvas.width;
      effectCanvas.height = displayCanvas.height;
      displayContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      baseContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      effectContext.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawBaseBuffer = () => {
      baseContext.clearRect(0, 0, cssWidth, cssHeight);
      baseContext.globalAlpha = 1;
      baseContext.globalCompositeOperation = "source-over";
      baseContext.drawImage(image, 0, 0, cssWidth, cssHeight);
    };

    const drawBaseImageGlitchSlices = (intensity: number) => {
      const sliceCount = randomInt(BASE_GLITCH_MIN_SLICES, BASE_GLITCH_MAX_SLICES);
      const maxOffset =
        cssWidth < 768 ? BASE_GLITCH_MAX_OFFSET * 0.72 : BASE_GLITCH_MAX_OFFSET;

      displayContext.save();
      displayContext.globalCompositeOperation = "source-over";

      for (let index = 0; index < sliceCount; index += 1) {
        const sliceHeight = randomBetween(8, 64);
        const y = randomBetween(0, Math.max(1, cssHeight - sliceHeight));
        const offsetX = randomBetween(-maxOffset, maxOffset) * intensity;

        displayContext.globalAlpha = randomBetween(0.92, 1);
        displayContext.drawImage(
          baseCanvas,
          0,
          y * currentDpr,
          cssWidth * currentDpr,
          sliceHeight * currentDpr,
          offsetX,
          y,
          cssWidth,
          sliceHeight,
        );
      }

      displayContext.restore();
    };

    const drawHorizontalLineBreakGlitch = (intensity: number) => {
      const maxOffset =
        (cssWidth < 768 ? LINE_BREAK_MAX_OFFSET * 0.72 : LINE_BREAK_MAX_OFFSET) *
        intensity;

      displayContext.save();
      displayContext.globalCompositeOperation = "source-over";

      for (let y = 0; y < cssHeight; y += LINE_BREAK_STEP) {
        if (Math.random() > LINE_BREAK_KEEP_RATE) {
          continue;
        }

        const sliceHeight = randomBetween(1, 3.2);
        const offsetX = randomBetween(-maxOffset, maxOffset);

        displayContext.globalAlpha = randomBetween(0.35, 0.9);
        displayContext.drawImage(
          baseCanvas,
          0,
          y * currentDpr,
          cssWidth * currentDpr,
          sliceHeight * currentDpr,
          offsetX,
          y,
          cssWidth,
          sliceHeight,
        );
      }

      displayContext.restore();
    };

    const composeFrame = (isGlitching: boolean, intensity: number) => {
      const wholeImageOffsetX = isGlitching
        ? randomBetween(-BASE_GLITCH_WHOLE_OFFSET, BASE_GLITCH_WHOLE_OFFSET) *
          intensity
        : 0;

      displayContext.clearRect(0, 0, cssWidth, cssHeight);
      displayContext.globalAlpha = isGlitching ? 0.55 : 1;
      displayContext.globalCompositeOperation = "source-over";
      displayContext.drawImage(
        baseCanvas,
        0,
        0,
        cssWidth * currentDpr,
        cssHeight * currentDpr,
        wholeImageOffsetX,
        0,
        cssWidth,
        cssHeight,
      );

      if (isGlitching) {
        drawHorizontalLineBreakGlitch(intensity);
        drawBaseImageGlitchSlices(intensity);
      }

      displayContext.globalAlpha = 1;
      displayContext.drawImage(effectCanvas, 0, 0, cssWidth, cssHeight);
    };

    const maskEffectToTextAlpha = () => {
      effectContext.globalAlpha = 1;
      effectContext.globalCompositeOperation = "destination-in";
      effectContext.drawImage(baseCanvas, 0, 0, cssWidth, cssHeight);
      effectContext.globalCompositeOperation = "source-over";
    };

    const drawScanNoise = (timestamp: number, isGlitching: boolean) => {
      const isMobile = cssWidth < 768;
      const baseBandCount = isGlitching ? GLITCH_SCAN_BAND_COUNT : SCAN_BAND_COUNT;
      const baseDashCount = isGlitching ? GLITCH_SCAN_DASH_COUNT : SCAN_DASH_COUNT;
      const bandCount = isMobile ? Math.max(3, Math.round(baseBandCount * 0.7)) : baseBandCount;
      const dashCount = isMobile ? Math.max(4, Math.round(baseDashCount * 0.65)) : baseDashCount;
      const scanBandAlpha = isGlitching ? GLITCH_SCAN_BAND_ALPHA : SCAN_BAND_ALPHA;
      const scanDashAlpha = isGlitching ? GLITCH_SCAN_DASH_ALPHA : SCAN_DASH_ALPHA;
      const bandAlpha = isMobile ? scanBandAlpha * 0.7 : scanBandAlpha;
      const dashAlpha = isMobile ? scanDashAlpha * 0.7 : scanDashAlpha;

      effectContext.save();
      effectContext.globalCompositeOperation = "source-over";
      effectContext.fillStyle = "rgba(245,245,245,1)";

      for (let index = 0; index < bandCount; index += 1) {
        const y =
          (timestamp * SCAN_BAND_SPEED + index * (cssHeight / bandCount)) %
          cssHeight;
        const lineHeight = isGlitching
          ? randomBetween(1, 4)
          : randomBetween(SCAN_LINE_HEIGHT_MIN, SCAN_LINE_HEIGHT_MAX);

        effectContext.globalAlpha = bandAlpha;
        effectContext.fillRect(0, y, cssWidth, lineHeight);

        for (let dashIndex = 0; dashIndex < dashCount; dashIndex += 1) {
          const x = Math.random() * cssWidth;
          const dashWidth = isGlitching
            ? randomBetween(32, 212)
            : randomBetween(24, 144);
          const dashY = y + randomBetween(
            isGlitching ? -10 : -6,
            isGlitching ? 10 : 6,
          );

          effectContext.globalAlpha = dashAlpha;
          effectContext.fillRect(x, dashY, dashWidth, 1);
        }
      }

      effectContext.restore();
    };

    const drawMovingShine = (timestamp: number) => {
      const cycleWidth = cssWidth + SHINE_BLUR_WIDTH;
      const x = (timestamp * SHINE_SPEED) % cycleWidth - SHINE_BLUR_WIDTH;
      const gradient = effectContext.createLinearGradient(
        x,
        0,
        x + SHINE_BLUR_WIDTH,
        0,
      );

      gradient.addColorStop(0, "rgba(255,255,255,0)");
      gradient.addColorStop(0.42, "rgba(255,255,255,0)");
      gradient.addColorStop(0.5, `rgba(255,255,255,${SHINE_ALPHA})`);
      gradient.addColorStop(0.58, "rgba(255,255,255,0)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");

      effectContext.save();
      effectContext.globalCompositeOperation = "source-over";
      effectContext.globalAlpha = 1;
      effectContext.fillStyle = gradient;
      effectContext.fillRect(0, 0, cssWidth, cssHeight);
      effectContext.restore();
    };

    const drawEffectGlitchSlices = (intensity: number) => {
      const sliceCount = randomInt(EFFECT_GLITCH_MIN_SLICES, EFFECT_GLITCH_MAX_SLICES);
      const isMobile = cssWidth < 768;
      const maxOffset =
        isMobile ? EFFECT_GLITCH_MAX_OFFSET * 0.72 : EFFECT_GLITCH_MAX_OFFSET;

      effectContext.save();
      effectContext.globalCompositeOperation = "source-over";

      for (let index = 0; index < sliceCount; index += 1) {
        const sliceHeight = randomBetween(4, 34);
        const y = randomBetween(0, Math.max(1, cssHeight - sliceHeight));
        const offsetX = randomBetween(
          -maxOffset,
          maxOffset,
        ) * intensity;

        effectContext.globalAlpha = randomBetween(0.48, 0.72);
        effectContext.drawImage(
          baseCanvas,
          0,
          y * currentDpr,
          cssWidth * currentDpr,
          sliceHeight * currentDpr,
          offsetX,
          y,
          cssWidth,
          sliceHeight,
        );

        effectContext.globalAlpha = 0.08;
        effectContext.fillStyle = "rgba(255,255,255,1)";
        effectContext.fillRect(offsetX, y, cssWidth, Math.max(1, sliceHeight * 0.16));
      }

      effectContext.restore();
    };

    const drawFrame = (timestamp: number, isGlitching: boolean) => {
      drawBaseBuffer();
      effectContext.clearRect(0, 0, cssWidth, cssHeight);
      drawScanNoise(timestamp, isGlitching);
      if (!isGlitching) {
        drawMovingShine(timestamp);
      }
      let intensity = 0;

      if (isGlitching) {
        intensity =
          glitchFramesLeft > 0
            ? Math.max(0.3, glitchFramesLeft / GLITCH_DURATION_FRAMES)
            : 0.3;

        drawEffectGlitchSlices(intensity);
      }

      maskEffectToTextAlpha();
      composeFrame(isGlitching, intensity);
    };

    const animationLoop = (timestamp: number) => {
      if (hasCancelled) {
        return;
      }

      if (timestamp >= nextGlitchAt) {
        glitchFramesLeft = GLITCH_DURATION_FRAMES;
        nextGlitchAt = timestamp + getNextGlitchDelay();
      }

      if (glitchFramesLeft > 0) {
        drawFrame(timestamp, true);
        glitchFramesLeft -= 1;
        wasGlitching = true;
      } else if (wasGlitching) {
        drawFrame(timestamp, false);
        wasGlitching = false;
      } else {
        drawFrame(timestamp, false);
      }

      animationFrameId = window.requestAnimationFrame(animationLoop);
    };

    const handleResize = () => {
      resizeCanvas();
      drawFrame(performance.now(), false);
    };

    const startCanvas = () => {
      if (hasCancelled) {
        return;
      }

      resizeCanvas();
      drawFrame(performance.now(), false);
      setIsReady(true);

      if (!reducedMotionQuery.matches) {
        nextGlitchAt = performance.now() + getNextGlitchDelay();
        animationFrameId = window.requestAnimationFrame(animationLoop);
      }
    };

    image.addEventListener("load", startCanvas);
    window.addEventListener("resize", handleResize);

    if (image.complete && image.naturalWidth > 0) {
      startCanvas();
    }

    return () => {
      hasCancelled = true;
      image.removeEventListener("load", startCanvas);
      window.removeEventListener("resize", handleResize);

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [src]);

  return (
    <div
      className={`relative z-10 w-full max-w-[1500px] min-w-0 ${className}`}
    >
      <div
        ref={containerRef}
        className={`relative w-full overflow-visible ${IMAGE_ASPECT_RATIO}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1600px) 1500px, calc(100vw - 48px)"
          className={`object-contain object-left transition-opacity duration-300 ${
            isReady ? "opacity-0" : "opacity-100"
          }`}
        />
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-10 h-full w-full transition-opacity duration-300 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
