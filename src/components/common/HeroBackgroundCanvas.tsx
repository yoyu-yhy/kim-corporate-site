"use client";

import { useEffect, useRef } from "react";

const MAX_DPR = 2;
const GRADIENT_ALPHA = 0.14;
const CURVE_ALPHA = 0.11;
const PAPER_STREAK_ALPHA = 0.1;
const CURVE_COUNT = 10;
const PAPER_STREAK_COUNT = 72;

type PaperStreak = {
  base: number;
  y: number;
  length: number;
  speed: number;
  alpha: number;
  tilt: number;
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createPaperStreaks(): PaperStreak[] {
  return Array.from({ length: PAPER_STREAK_COUNT }, () => ({
    base: Math.random(),
    y: Math.random(),
    length: randomBetween(42, 180),
    speed: randomBetween(0.000018, 0.00005),
    alpha: randomBetween(PAPER_STREAK_ALPHA * 0.35, PAPER_STREAK_ALPHA),
    tilt: randomBetween(-0.28, -0.12),
  }));
}

function drawLightBlobs(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const radiusBase = Math.max(width, height);
  const alphaScale = width < 768 ? 0.75 : 1;
  const blobs = [
    {
      x: width * (0.72 + Math.sin(time * 0.0004) * 0.06),
      y: height * (0.22 + Math.cos(time * 0.0005) * 0.06),
      radius: radiusBase * 0.5,
      alpha: GRADIENT_ALPHA * alphaScale,
    },
    {
      x: width * (0.28 + Math.cos(time * 0.00035) * 0.05),
      y: height * (0.72 + Math.sin(time * 0.00045) * 0.05),
      radius: radiusBase * 0.38,
      alpha: GRADIENT_ALPHA * 0.82 * alphaScale,
    },
    {
      x: width * (0.46 + Math.sin(time * 0.0003) * 0.04),
      y: height * (0.5 + Math.cos(time * 0.00038) * 0.05),
      radius: radiusBase * 0.32,
      alpha: GRADIENT_ALPHA * 0.62 * alphaScale,
    },
  ];

  for (const blob of blobs) {
    const gradient = context.createRadialGradient(
      blob.x,
      blob.y,
      0,
      blob.x,
      blob.y,
      blob.radius,
    );

    gradient.addColorStop(0, `rgba(24,24,27,${blob.alpha})`);
    gradient.addColorStop(0.58, `rgba(24,24,27,${blob.alpha * 0.25})`);
    gradient.addColorStop(1, "rgba(24,24,27,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }
}

function drawSoftCurves(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const isMobile = width < 768;
  const curveCount = isMobile ? 7 : CURVE_COUNT;
  const alphaScale = isMobile ? 0.78 : 1;

  context.save();
  context.lineWidth = 0.8;
  context.lineCap = "round";
  context.strokeStyle = "rgba(24,24,27,1)";

  for (let index = 0; index < curveCount; index += 1) {
    const progress = (time * 0.000012 + index * 0.08) % 1;
    const drift = (progress - 0.5) * width * 0.28;
    const yBase =
      height * (0.1 + index * 0.072) +
      Math.sin(time * 0.00022 + index * 1.4) * 22;
    const controlLift = Math.sin(time * 0.00018 + index) * 30;

    context.beginPath();
    context.moveTo(-width * 0.16 + drift, yBase + height * 0.18);
    context.bezierCurveTo(
      width * 0.18 + drift,
      yBase - height * 0.1 + controlLift,
      width * 0.58 + drift,
      yBase + height * 0.13 - controlLift,
      width * 1.14 + drift,
      yBase - height * 0.18,
    );
    context.globalAlpha = (CURVE_ALPHA + index * 0.004) * alphaScale;
    context.stroke();
  }

  context.restore();
}

function drawPaperStreaks(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  streaks: PaperStreak[],
) {
  const isMobile = width < 768;

  context.save();
  context.lineWidth = 0.8;
  context.lineCap = "round";
  context.strokeStyle = "rgba(24,24,27,1)";

  for (const [index, streak] of streaks.entries()) {
    if (isMobile && index % 3 === 1) {
      continue;
    }

    const progress = (streak.base + time * streak.speed) % 1;
    const x = width * (1.12 - progress * 1.42);
    const y =
      height * (0.12 + streak.y * 0.8) +
      Math.sin(time * 0.00008 + index) * 5;
    const length = streak.length;

    context.globalAlpha = isMobile ? streak.alpha * 0.76 : streak.alpha;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + length, y + length * streak.tilt);
    context.stroke();
  }

  context.restore();
}

export function HeroBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });

    if (!context) {
      return;
    }

    const streaks = createPaperStreaks();
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let animationFrameId = 0;
    let cssWidth = 0;
    let cssHeight = 0;
    let hasCancelled = false;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      cssWidth = width;
      cssHeight = height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (time: number) => {
      context.clearRect(0, 0, cssWidth, cssHeight);
      context.globalCompositeOperation = "source-over";
      drawLightBlobs(context, cssWidth, cssHeight, time);
      drawSoftCurves(context, cssWidth, cssHeight, time);
      drawPaperStreaks(context, cssWidth, cssHeight, time, streaks);
    };

    const animationLoop = (time: number) => {
      if (hasCancelled) {
        return;
      }

      drawFrame(time);
      animationFrameId = window.requestAnimationFrame(animationLoop);
    };

    const handleResize = () => {
      resizeCanvas();
      drawFrame(performance.now());
    };

    resizeCanvas();
    drawFrame(performance.now());
    window.addEventListener("resize", handleResize);

    if (!reducedMotionQuery.matches) {
      animationFrameId = window.requestAnimationFrame(animationLoop);
    }

    return () => {
      hasCancelled = true;
      window.removeEventListener("resize", handleResize);

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="h-full w-full"
    />
  );
}
