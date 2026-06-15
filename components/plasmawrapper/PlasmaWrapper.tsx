"use client";

import React, { useRef, useEffect, useState } from "react";
import Plasma from "@/components/Plasma";

export default function PlasmaWrapper({
  color = "#F1BD62",
  speed = 0.4,
  direction = "forward",
  scale = 0.6,
  opacity = 0.3,
  mouseInteractive = false,
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Inicializa plasma solo cuando el contenedor existe y tiene tamaño
    if (containerRef.current) {
      setMounted(true);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 w-full h-full"
      style={{ minWidth: "300px", minHeight: "300px" }}
    >
      {mounted && (
        <Plasma
          color={color}
          speed={speed}
          direction={direction}
          scale={scale}
          opacity={opacity}
          mouseInteractive={mouseInteractive}
        />
      )}
    </div>
  );
}
