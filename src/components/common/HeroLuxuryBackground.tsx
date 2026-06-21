"use client";

import { useEffect, useRef } from "react";

const MAX_DPR = 2;
const BLOB_COUNT = 4;
const LIGHT_BAND_COUNT = 3;
const CURVE_COUNT = 6;

type FluidBlob = {
  alpha: number;
  radius: number;
  x: number;
  xDrift: number;
  xSpeed: number;
  y: number;
  yDrift: number;
  ySpeed: number;
};

type LightBand = {
  alpha: number;
  angle: number;
  phase: number;
  speed: number;
  width: number;
  y: number;
};

function drawBlob(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  alpha: number,
) {
  const gradient = context.createRadialGradient(x, y, 0, x, y, radius);

  gradient.addColorStop(0, `rgba(185,185,180,${alpha})`);
  gradient.addColorStop(0.38, `rgba(224,224,218,${alpha * 0.48})`);
  gradient.addColorStop(0.72, `rgba(245,245,242,${alpha * 0.18})`);
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  context.fillStyle = gradient;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

function drawLightBand(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  x: number,
  y: number,
  bandWidth: number,
  alpha: number,
  angle: number,
) {
  context.save();
  context.translate(x, y);
  context.rotate(angle);

  const gradient = context.createLinearGradient(-bandWidth, 0, bandWidth, 0);
  gradient.addColorStop(0, "rgba(255,255,255,0)");
  gradient.addColorStop(0.28, "rgba(255,255,255,0)");
  gradient.addColorStop(0.5, `rgba(255,255,255,${alpha})`);
  gradient.addColorStop(0.72, "rgba(255,255,255,0)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  context.fillStyle = gradient;
  context.fillRect(-bandWidth, -height * 1.4, bandWidth * 2, height * 2.8);
  context.restore();
}

function drawSoftCurves(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  context.save();
  context.lineWidth = width < 768 ? 0.6 : 0.8;
  context.lineCap = "round";
  context.strokeStyle = "rgba(24,24,27,0.068)";

  const visibleCurves = width < 768 ? 4 : CURVE_COUNT;

  for (let index = 0; index < visibleCurves; index += 1) {
    const offset = Math.sin(time * 0.00018 + index * 1.2) * 26;
    const y = height * (0.1 + index * 0.14) + offset;

    context.beginPath();
    context.moveTo(-width * 0.1, y + height * 0.08);
    context.bezierCurveTo(
      width * 0.2,
      y - height * 0.16 + offset,
      width * 0.72,
      y + height * 0.16 - offset,
      width * 1.1,
      y - height * 0.05,
    );
    context.globalAlpha = width < 768 ? 0.62 : 1;
    context.stroke();
  }

  context.restore();
}

export function HeroLuxuryBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });

    if (!context) {
      return;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const blobs: FluidBlob[] = [
      { alpha: 0.15, radius: 0.46, x: 0.72, xDrift: 0.05, xSpeed: 0.00018, y: 0.18, yDrift: 0.06, ySpeed: 0.00016 },
      { alpha: 0.1, radius: 0.38, x: 0.34, xDrift: 0.04, xSpeed: 0.00014, y: 0.52, yDrift: 0.05, ySpeed: 0.0002 },
      { alpha: 0.12, radius: 0.34, x: 0.88, xDrift: 0.04, xSpeed: 0.00011, y: 0.7, yDrift: 0.04, ySpeed: 0.00013 },
      { alpha: 0.08, radius: 0.4, x: 0.1, xDrift: 0.04, xSpeed: 0.00012, y: 0.18, yDrift: 0.05, ySpeed: 0.00015 },
    ];
    const bands: LightBand[] = [
      { alpha: 0.08, angle: -0.42, phase: -0.2, speed: 0.000018, width: 240, y: 0.18 },
      { alpha: 0.055, angle: -0.42, phase: 1.1, speed: -0.000014, width: 180, y: 0.62 },
      { alpha: 0.045, angle: -0.42, phase: 0.42, speed: 0.000011, width: 280, y: 0.38 },
    ];

    let animationFrameId = 0;
    let cssWidth = 0;
    let cssHeight = 0;
    let hasCancelled = false;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(rect.width));
      const nextHeight = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      cssWidth = nextWidth;
      cssHeight = nextHeight;
      canvas.width = Math.floor(nextWidth * dpr);
      canvas.height = Math.floor(nextHeight * dpr);
      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (time: number) => {
      const radiusBase = Math.max(cssWidth, cssHeight);

      context.clearRect(0, 0, cssWidth, cssHeight);
      context.globalCompositeOperation = "source-over";
      context.globalAlpha = 1;

      const veil = context.createLinearGradient(0, 0, cssWidth, cssHeight);
      veil.addColorStop(0, "rgba(255,255,255,0)");
      veil.addColorStop(0.45, "rgba(246,246,243,0.22)");
      veil.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = veil;
      context.fillRect(0, 0, cssWidth, cssHeight);

      for (const blob of blobs.slice(0, cssWidth < 768 ? 3 : BLOB_COUNT)) {
        drawBlob(
          context,
          cssWidth * (blob.x + Math.sin(time * blob.xSpeed) * blob.xDrift),
          cssHeight * (blob.y + Math.cos(time * blob.ySpeed) * blob.yDrift),
          radiusBase * blob.radius,
          cssWidth < 768 ? blob.alpha * 0.72 : blob.alpha,
        );
      }

      for (const band of bands.slice(0, cssWidth < 768 ? 2 : LIGHT_BAND_COUNT)) {
        const progress = (time * band.speed + band.phase) % 1.5;
        const x = band.speed >= 0
          ? cssWidth * (progress - 0.24)
          : cssWidth * (1.18 - progress);

        drawLightBand(
          context,
          cssWidth,
          cssHeight,
          x,
          cssHeight * band.y,
          band.width,
          cssWidth < 768 ? band.alpha * 0.68 : band.alpha,
          band.angle,
        );
      }

      drawSoftCurves(context, cssWidth, cssHeight, time);
    };

    const animationLoop = (time: number) => {
      if (hasCancelled) {
        return;
      }

      drawFrame(time);
      animationFrameId = window.requestAnimationFrame(animationLoop);
    };

    resizeCanvas();
    drawFrame(0);

    const observer = new ResizeObserver(() => {
      resizeCanvas();
      drawFrame(performance.now());
    });

    observer.observe(canvas);

    if (!reducedMotionQuery.matches) {
      animationFrameId = window.requestAnimationFrame(animationLoop);
    }

    return () => {
      hasCancelled = true;
      observer.disconnect();

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(180,180,176,0.34),transparent_34%),radial-gradient(circle_at_12%_72%,rgba(30,30,30,0.08),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f8f8f6_48%,#ffffff_100%)]" />
      <div className="absolute right-[-18%] top-[-22%] h-[780px] w-[70vw] rotate-[-14deg] rounded-[999px] bg-white/35 blur-3xl" />
      <div className="absolute left-[-20%] top-[18%] h-[520px] w-[48vw] rotate-[18deg] rounded-[999px] bg-neutral-200/20 blur-3xl" />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-70 md:opacity-90"
      />
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-white via-white/80 to-transparent" />
      <div className="absolute inset-0 opacity-[0.035] mix-blend-multiply [background-image:radial-gradient(rgba(0,0,0,0.35)_0.5px,transparent_0.5px)] [background-size:3px_3px]" />
    </div>
  );
}
