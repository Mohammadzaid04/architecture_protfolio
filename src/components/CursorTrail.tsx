import { useEffect, useRef } from "react";

type TrailPoint = { x: number; y: number; t: number };

const LIFE_MS = 700;
const MAX_WIDTH = 7;
const FOLLOW = 0.2;

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const host = canvas.parentElement;
    if (!host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (reduceMotion || !finePointer) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    const points: TrailPoint[] = [];
    const target = { x: 0, y: 0 };
    const head = { x: 0, y: 0 };
    let inside = false;
    let running = false;
    let rafId = 0;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      if (inside) {
        head.x += (target.x - head.x) * FOLLOW;
        head.y += (target.y - head.y) * FOLLOW;
        const last = points[points.length - 1];
        if (!last || Math.hypot(head.x - last.x, head.y - last.y) > 0.6) {
          points.push({ x: head.x, y: head.y, t: now });
        }
      }

      while (points.length > 0 && now - points[0].t > LIFE_MS) {
        points.shift();
      }

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = "rgba(255, 255, 255, 0.55)";
      ctx.shadowBlur = 14;

      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const life = 1 - (now - p1.t) / LIFE_MS;
        if (life <= 0) continue;
        ctx.strokeStyle = `rgba(255, 255, 255, ${(life * 0.75).toFixed(3)})`;
        ctx.lineWidth = Math.max(0.5, MAX_WIDTH * life);
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }

      if (inside) {
        ctx.shadowBlur = 18;
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.beginPath();
        ctx.arc(head.x, head.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      if (inside || points.length > 0) {
        rafId = requestAnimationFrame(draw);
      } else {
        running = false;
        ctx.clearRect(0, 0, width, height);
      }
    };

    const start = () => {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(draw);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = host.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      if (!inside) {
        inside = true;
        head.x = target.x;
        head.y = target.y;
      }
      start();
    };

    const onLeave = () => {
      inside = false;
    };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />;
}

export { CursorTrail };
