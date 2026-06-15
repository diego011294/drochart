"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NoiseBackground() {
  const canvasRef = useRef(null);
  const noiseData = useRef(null);
  const frame = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      noiseData.current = ctx.createImageData(
        canvas.width,
        canvas.height
      );
    };

    resize();
    window.addEventListener("resize", resize);

    function paintNoise() {
      frame.current++;

      // ⏱️ SOLO repintamos cada X frames → ralentiza el grano
      if (frame.current % 4 !== 0) return;

      const data = noiseData.current.data;

      for (let i = 0; i < data.length; i += 4) {
        // 🌑 ruido más oscuro (menos blancos puros)
        const v = Math.random() * 180;

        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 75; // intensidad (sube/baja aquí)
      }

      ctx.putImageData(noiseData.current, 0, 0);
    }

    gsap.ticker.add(paintNoise);

    return () => {
      gsap.ticker.remove(paintNoise);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="
        absolute inset-0 w-full h-full
        pointer-events-none
        z-0
        mix-blend-overlay
        opacity-70
      "
    />
  );
}
