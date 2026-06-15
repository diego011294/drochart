"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MorphingBlobResponsive() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const calcDimensions = () => {
      const w = window.innerWidth;
      const h = w < 768 ? 140 : 220;
      const baseRadius = w < 768 ? 35 : 60;
      const steps = Math.floor(Math.max(50, baseRadius * 2));
      return { w, h, baseRadius, steps };
    };

    let { w, h, baseRadius, steps } = calcDimensions();
    canvas.width = w;
    canvas.height = h;

    function makeCircle() {
      return Array.from({ length: steps }, (_, i) => {
        const a = (i / steps) * Math.PI * 2;
        return { x: Math.cos(a) * baseRadius, y: Math.sin(a) * baseRadius };
      });
    }
    function makeTriangle() {
      return Array.from({ length: steps }, (_, i) => {
        const angle = (i / steps) * Math.PI * 2;
        const r = baseRadius * (1 + 0.45 * Math.sin(3 * angle));
        return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
      });
    }
    function makeFlower() {
      return Array.from({ length: steps }, (_, i) => {
        const angle = (i / steps) * Math.PI * 2;
        const r = baseRadius * (1 + 0.3 * Math.sin(6 * angle));
        return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
      });
    }

    let shapes = [makeCircle(), makeTriangle(), makeFlower()];
    let current = 0;
    let next = 1;
    const morphProgress = { t: 0 };

    function morphToNext() {
      gsap.to(morphProgress, {
        t: 1,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
          morphProgress.t = 0;
          current = next;
          next = (next + 1) % shapes.length;
          morphToNext();
        },
      });
    }
    morphToNext();

    // Blob con movimiento lineal en X constante
    const blob = { x: -baseRadius * 2, y: h / 2 };

    const totalDistance = w + baseRadius * 4;
    const speed = 120; // px por segundo (ajusta para hacerlo más lento o rápido)
    gsap.to(blob, {
      x: w + baseRadius * 2,
      duration: totalDistance / speed, // duración calculada para velocidad constante
      ease: "linear",
      repeat: -1,
      onRepeat: () => {
        blob.x = -baseRadius * 2; // reinicia al inicio
      },
    });

    // Oscilación en Y independiente, suave y orgánica
    function animateY() {
      const nextY = h / 2 + (Math.random() * 80 - 40); // ±40px
      gsap.to(blob, {
        y: nextY,
        duration: 3 + Math.random() * 2, // tiempo variable para más naturalidad
        ease: "power1.inOut",
        onComplete: animateY,
      });
    }
    animateY();

    const colorShift = { hue: 0 };
    gsap.to(colorShift, { hue: 360, duration: 8, repeat: -1, ease: "none" });

    function render() {
      ctx.clearRect(0, 0, w, h);
      const shapeA = shapes[current];
      const shapeB = shapes[next];

      ctx.beginPath();
      for (let i = 0; i < steps; i++) {
        const ax = shapeA[i].x;
        const ay = shapeA[i].y;
        const bx = shapeB[i].x;
        const by = shapeB[i].y;
        const x = blob.x + ax + (bx - ax) * morphProgress.t;
        const y = blob.y + ay + (by - ay) * morphProgress.t;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      const grad = ctx.createLinearGradient(
        blob.x - baseRadius,
        blob.y - baseRadius,
        blob.x + baseRadius * 1.3,
        blob.y + baseRadius * 1.3
      );
      grad.addColorStop(0, `hsl(${colorShift.hue}, 85%, 55%)`);
      grad.addColorStop(1, `hsl(${(colorShift.hue + 120) % 360}, 80%, 45%)`);

      ctx.fillStyle = grad;
      ctx.fill();

      rafRef.current = requestAnimationFrame(render);
    }
    render();

    const onResize = () => {
      ({ w, h, baseRadius, steps } = calcDimensions());
      canvas.width = w;
      canvas.height = h;
      shapes = [makeCircle(), makeTriangle(), makeFlower()];
      blob.y = h / 2;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current!);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full pointer-events-none"
    />
  );
}
