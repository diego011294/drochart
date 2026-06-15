"use client";

import { useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LottieLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null);
  const played = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !played.current) {
          played.current = true;

          if (lottieRef.current) {
            lottieRef.current.play();

            lottieRef.current.addEventListener("complete", () => {
              lottieRef.current?.pause();
            }, { once: true });
          }

          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex items-center justify-center w-52 h-52 sm:w-72 sm:h-72">
      <DotLottieReact
        src="https://lottie.host/400f7fa7-cb48-4f4d-aad1-c6e52d141026/uru3OTMpCf.lottie"
        dotLottieRefCallback={(instance) => { lottieRef.current = instance; }}
        autoplay={false}
        loop={false}
        speed={0.5} 
      />
    </div>
  );
}