"use client";

import { useEffect, useRef } from "react";
import { buildHorizonSvg } from "@/lib/horizon";

// Floating diyas (perfect for Tihar!)
const DIYA_SPOTS = [
  { l: 18, t: 38, s: 1 },
  { l: 36, t: 56, s: 1.2 },
  { l: 64, t: 48, s: 1.1 },
  { l: 82, t: 62, s: 1.3 },
  { l: 50, t: 72, s: 1.45 },
  { l: 9, t: 66, s: 1.15 },
  { l: 91, t: 42, s: 0.9 },
];

const HORIZON_SVG = buildHorizonSvg();

export default function Background() {
  const starsRef = useRef<HTMLDivElement>(null);
  const diyasRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = starsRef.current;
    if (!wrap) return;
    wrap.innerHTML = "";
    for (let i = 0; i < 70; i++) {
      const s = document.createElement("div");
      s.className = "star";
      const top = Math.pow(Math.random(), 1.5) * 100;
      s.style.top = top + "%";
      s.style.left = Math.random() * 100 + "%";
      const sz = Math.random() * 1.6 + 0.6;
      s.style.width = sz + "px";
      s.style.height = sz + "px";
      s.style.opacity = String((0.15 + Math.random() * 0.5) * (1 - top / 130));
      s.style.animation =
        "twinkle " +
        (2.5 + Math.random() * 4) +
        "s ease-in-out " +
        Math.random() * 4 +
        "s infinite";
      wrap.appendChild(s);
    }
  }, []);

  useEffect(() => {
    const wrap = diyasRef.current;
    if (!wrap) return;
    wrap.innerHTML = "";
    DIYA_SPOTS.forEach((p, i) => {
      const d = document.createElement("div");
      d.className = "diya";
      d.style.left = p.l + "%";
      d.style.top = p.t + "%";
      d.style.transform = "scale(" + p.s + ")";
      d.style.animation =
        "diyafloat " +
        (7 + Math.random() * 6) +
        "s ease-in-out " +
        -Math.random() * 6 +
        "s infinite";
      d.innerHTML =
        '<div class="glow" style="animation-delay:' +
        -Math.random() * 1.1 +
        's"></div>' +
        '<svg width="34" height="20" viewBox="0 0 34 20">' +
        '<defs><radialGradient id="fl' +
        i +
        '" cx="50%" cy="30%" r="70%">' +
        '<stop offset="0%" stop-color="#fff6d0"/><stop offset="45%" stop-color="#ffcf5e"/>' +
        '<stop offset="100%" stop-color="#ff7a1e"/></radialGradient></defs>' +
        '<path d="M2,10 Q17,20 32,10 Q17,15 2,10 Z" fill="#3a1f12"/>' +
        '<path d="M4,10 Q17,17 30,10 Q17,13 4,10 Z" fill="#7a4a2a"/>' +
        '<path d="M17,9 C15,5 16,2 17,0 C18,2 19,5 17,9 Z" fill="url(#fl' +
        i +
        ')"/></svg>';
      wrap.appendChild(d);
    });
  }, []);

  useEffect(() => {
    const cv = shimmerRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    // Added window. prefix for safer TypeScript in Next.js
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let W = 0,
      H = 0;
    let glints: {
      d: number;
      off: number;
      len: number;
      ph: number;
      sp: number;
    }[] = [];

    function buildGlints() {
      glints = [];
      const n = Math.round(W / 34) + 10;
      for (let i = 0; i < n; i++) {
        glints.push({
          d: Math.pow(Math.random(), 0.7),
          off: Math.random() * 2 - 1,
          len: 8 + Math.random() * 22,
          ph: Math.random() * 6.28,
          sp: 0.6 + Math.random() * 1.4,
        });
      }
    }

    function size() {
      if (!cv || !ctx) return;
      const r = cv.getBoundingClientRect();
      // Added window. prefix
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGlints();
    }

    function draw(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2,
        colH = H * 0.82;
      ctx.globalCompositeOperation = "lighter";
      for (let y = 0; y < colH; y += 2) {
        const depth = y / colH,
          a = Math.pow(1 - depth, 1.7) * 0.42;
        if (a <= 0.002) continue;
        const spread = 18 + depth * W * 0.14;
        const wob =
          Math.sin(y * 0.045 + t * 0.0014) * 3 +
          Math.sin(y * 0.11 - t * 0.0021) * 1.5;
        const g = ctx.createLinearGradient(
          cx - spread + wob,
          0,
          cx + spread + wob,
          0,
        );
        g.addColorStop(0, "rgba(255,150,60,0)");
        g.addColorStop(
          0.5,
          "rgba(255," +
            (196 - ((depth * 70) | 0)) +
            "," +
            (120 - ((depth * 50) | 0)) +
            "," +
            a.toFixed(3) +
            ")",
        );
        g.addColorStop(1, "rgba(255,150,60,0)");
        ctx.fillStyle = g;
        ctx.fillRect(cx - spread + wob, y, spread * 2, 2.2);
      }
      for (const gl of glints) {
        const y = gl.d * colH,
          spread = 18 + gl.d * W * 0.14;
        const tw = 0.5 + 0.5 * Math.sin(t * 0.003 * gl.sp + gl.ph);
        const a = tw * Math.pow(1 - gl.d, 1.4) * 0.5;
        if (a <= 0.02) continue;
        const x =
          cx + gl.off * spread * 0.9 + Math.sin(y * 0.05 + t * 0.0016) * 3;
        const half = (gl.len * (0.6 + 0.4 * tw)) / 2;
        const g = ctx.createLinearGradient(x - half, 0, x + half, 0);
        g.addColorStop(0, "rgba(255,224,150,0)");
        g.addColorStop(0.5, "rgba(255,240,200," + a.toFixed(3) + ")");
        g.addColorStop(1, "rgba(255,224,150,0)");
        ctx.fillStyle = g;
        ctx.fillRect(x - half, y, half * 2, 1.6);
      }
      ctx.globalCompositeOperation = "source-over";
    }

    size();
    window.addEventListener("resize", size);

    if (reduce) {
      draw(0);
      return () => window.removeEventListener("resize", size);
    }

    let raf = 0;
    function loop(ts: number) {
      draw(ts);
      raf = window.requestAnimationFrame(loop);
    }
    raf = window.requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", size);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="sky" />
      <div className="stars" ref={starsRef} aria-hidden="true" />

      <div className="sun-wrap" aria-hidden="true">
        <div className="halo" />
        <div className="sun" />
      </div>

      <div className="mist" aria-hidden="true">
        <span
          style={{ left: "-40%", animation: "mistmove 46s linear infinite" }}
        />
        <span
          style={{
            left: "-40%",
            top: "40%",
            height: "55%",
            animation: "mistmove 63s linear infinite",
            animationDelay: "-20s",
          }}
        />
      </div>

      <div className="water" />
      <div className="waves" aria-hidden="true">
        <div className="wave-strip wave-strip--slow">
          <svg viewBox="0 0 800 60" preserveAspectRatio="none">
            <path d="M0,32 Q100,18 200,32 T400,32 T600,32 T800,32" />
          </svg>
          <svg viewBox="0 0 800 60" preserveAspectRatio="none">
            <path d="M0,32 Q100,18 200,32 T400,32 T600,32 T800,32" />
          </svg>
        </div>
        <div className="wave-strip wave-strip--fast">
          <svg viewBox="0 0 640 60" preserveAspectRatio="none">
            <path d="M0,42 Q80,52 160,42 T320,42 T480,42 T640,42" />
          </svg>
          <svg viewBox="0 0 640 60" preserveAspectRatio="none">
            <path d="M0,42 Q80,52 160,42 T320,42 T480,42 T640,42" />
          </svg>
        </div>
      </div>
      <div
        className="horizon"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: HORIZON_SVG }}
      />
      <canvas id="shimmer" ref={shimmerRef} aria-hidden="true" />
      <div className="diyas" ref={diyasRef} aria-hidden="true" />
    </>
  );
}
