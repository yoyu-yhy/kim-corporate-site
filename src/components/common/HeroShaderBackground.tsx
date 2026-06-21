"use client";

import { useEffect, useRef } from "react";

const MAX_DPR = 2;

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_dpr;

  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 37.31);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.55;
    mat2 m = mat2(0.80, -0.60, 0.60, 0.80);

    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p = m * p * 2.03 + 0.17;
      a *= 0.52;
    }

    return v;
  }

  float ridge(float x, float center, float width) {
    return 1.0 - smoothstep(0.0, width, abs(x - center));
  }

  float blob(vec2 p, vec2 center, vec2 scale, float radius, float softness) {
    float d = distance((p - center) * scale, vec2(0.0));
    return 1.0 - smoothstep(radius, radius + softness, d);
  }

  void main() {
    vec2 uv = v_uv;
    vec2 p = uv - 0.5;
    p.x *= u_resolution.x / max(u_resolution.y, 1.0);

    float t = u_time;
    float slow = t * 0.035;

    vec2 warpA = vec2(
      fbm(p * 1.08 + vec2(slow * 0.38, -slow * 0.18)),
      fbm(p * 1.08 + vec2(4.4 - slow * 0.20, 2.2 + slow * 0.31))
    );

    vec2 warpB = vec2(
      fbm(p * 1.55 + warpA * 2.4 + vec2(1.7, 6.8) + slow * 0.26),
      fbm(p * 1.55 + warpA * 2.4 + vec2(7.9, 2.6) - slow * 0.22)
    );

    vec2 liquidUv = uv + (warpB - 0.5) * 0.24;
    vec2 liquidP = p + (warpB - 0.5) * 0.52;
    float liquid = fbm(liquidP * 2.05 + warpA * 1.55);
    float liquidDetail = fbm(liquidP * 4.10 - warpB * 1.25 + vec2(2.2, -1.4));

    // Seeded random fluid islands across the whole hero area.
    // The amount is intentionally higher, but positions are not manually fixed.
    float islandMask = 0.0;
    vec2 glassCenter = vec2(0.5);
    float glassWeight = 0.0;

    for (int i = 0; i < 11; i++) {
      float fi = float(i);
      vec2 seed = vec2(
        hash(vec2(fi * 11.17 + 0.31, 2.73)),
        hash(vec2(fi * 7.91 + 4.13, 9.27))
      );
      vec2 seedB = vec2(
        hash(vec2(fi * 5.43 + 8.31, 1.19)),
        hash(vec2(fi * 13.61 + 3.77, 6.41))
      );

      float speed = 0.014 + seedB.x * 0.032;
      vec2 drift = vec2(
        sin(t * speed + seed.y * 6.2831),
        cos(t * (speed * 0.86 + 0.011) + seed.x * 6.2831)
      ) * (0.030 + seedB.y * 0.050);

      vec2 center = fract(seed + vec2(0.13, 0.31) + drift);
      vec2 scale = vec2(
        0.82 + seedB.x * 0.72,
        1.10 + seedB.y * 1.10
      );
      float radius = 0.150 + seed.x * 0.130;
      float softness = 0.145 + seed.y * 0.145;
      float weight = 0.50 + seedB.x * 0.45;
      float island = blob(liquidUv, center, scale, radius, softness) * weight;

      islandMask = max(islandMask, island);
      glassCenter += center * island;
      glassWeight += island;
    }

    glassCenter /= max(glassWeight, 0.001);
    islandMask = clamp(islandMask * 1.16, 0.0, 1.0);
    float textureGate = smoothstep(0.24, 0.68, liquid) * islandMask;
    float fluidMask = smoothstep(0.035, 0.48, textureGate);

    vec3 paper = vec3(0.995, 0.992, 0.972);
    vec3 softPaper = vec3(0.965, 0.960, 0.925);
    vec3 pearl = vec3(0.835, 0.828, 0.780);
    vec3 graphite = vec3(0.250, 0.248, 0.228);
    vec3 ink = vec3(0.105, 0.105, 0.096);

    // Keep empty areas clean. Only liquid islands receive color.
    vec3 color = mix(paper, softPaper, islandMask * 0.10);

    float mass = fluidMask * smoothstep(0.26, 0.86, liquid);
    color = mix(color, pearl, mass * 0.84);
    color = mix(color, graphite, mass * smoothstep(0.52, 0.94, liquidDetail) * 0.46);

    float fold = ridge(liquid + uv.x * 0.16 - uv.y * 0.10, 0.60, 0.095) * fluidMask;
    color = mix(color, ink, fold * 0.24);

    float fineFold = ridge(liquidDetail + uv.x * 0.10, 0.54, 0.038) * fluidMask;
    color += vec3(fineFold * 0.14);

    float glassOval = distance((uv - glassCenter) * vec2(0.78, 1.55), vec2(0.0));
    float glass = (1.0 - smoothstep(0.12, 0.66, glassOval)) * islandMask;
    color += vec3(glass * 0.14);
    color = mix(color, vec3(0.930, 0.925, 0.890), glass * 0.24);

    // Diagonal light travels across the full hero, but only becomes strong on fluid.
    float diag = uv.x * 0.78 + uv.y * 0.54;
    float beamPos = fract(diag - t * 0.022);
    float beam = smoothstep(0.35, 0.43, beamPos) * (1.0 - smoothstep(0.43, 0.66, beamPos));
    color += vec3(beam * (0.055 + fluidMask * 0.30));

    float shadowBeamPos = fract(diag * 0.70 + 0.48 + t * 0.012);
    float shadowBeam = smoothstep(0.50, 0.59, shadowBeamPos) * (1.0 - smoothstep(0.59, 0.78, shadowBeamPos));
    color = mix(color, graphite, shadowBeam * fluidMask * 0.18);

    // Soft motion veil across all areas so the animation is not only on the right.
    float veil = fbm(p * 1.18 + vec2(-slow * 0.11, slow * 0.08));
    color = mix(color, vec3(0.950, 0.945, 0.905), smoothstep(0.58, 0.88, veil) * 0.07);

    float lowerCopySafety = smoothstep(0.56, 1.0, uv.y);
    color = mix(color, paper, lowerCopySafety * 0.50);

    float topAir = 1.0 - smoothstep(0.0, 0.18, uv.y);
    color = mix(color, paper, topAir * 0.16);

    float vignette = distance(uv, vec2(0.55, 0.44));
    color = mix(color, vec3(0.925, 0.918, 0.875), smoothstep(0.50, 1.04, vignette) * 0.08);

    float grain = hash((uv * u_resolution.xy / max(u_dpr, 1.0)) + floor(t * 6.0));
    color += (grain - 0.5) * 0.018;

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Hero shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  if (!vertexShader || !fragmentShader) {
    return null;
  }

  const program = gl.createProgram();

  if (!program) {
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Hero shader link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export function HeroShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
    });

    if (!gl) {
      console.error("Hero shader background: WebGL is not available.");
      return;
    }

    const program = createProgram(gl);

    if (!program) {
      return;
    }

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const dprLocation = gl.getUniformLocation(program, "u_dpr");
    const positionBuffer = gl.createBuffer();

    if (!positionBuffer || positionLocation < 0) {
      gl.deleteProgram(program);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let animationFrameId = 0;
    let cssWidth = 1;
    let cssHeight = 1;
    let dpr = 1;
    let hasCancelled = false;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      cssWidth = Math.max(1, Math.floor(rect.width));
      cssHeight = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = (time: number) => {
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      if (timeLocation) {
        gl.uniform1f(timeLocation, reducedMotionQuery.matches ? 0 : time * 0.001);
      }

      if (resolutionLocation) {
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      }

      if (dprLocation) {
        gl.uniform1f(dprLocation, dpr);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const animationLoop = (time: number) => {
      if (hasCancelled) {
        return;
      }

      render(time);
      animationFrameId = window.requestAnimationFrame(animationLoop);
    };

    resizeCanvas();
    render(0);

    const observer = new ResizeObserver(() => {
      resizeCanvas();
      render(0);
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

      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_74%_18%,rgba(70,70,64,0.18),transparent_42%),radial-gradient(circle_at_10%_70%,rgba(24,24,27,0.10),transparent_36%),linear-gradient(180deg,#fff_0%,#f3f2ec_46%,#fff_100%)]"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-100 [filter:contrast(1.22)_saturate(0.84)]"
      />
      <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-white via-white/54 to-transparent" />
      <div className="absolute inset-0 opacity-[0.042] mix-blend-multiply [background-image:radial-gradient(rgba(0,0,0,0.34)_0.6px,transparent_0.6px)] [background-size:3px_3px]" />
    </div>
  );
}
