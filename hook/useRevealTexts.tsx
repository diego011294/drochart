"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export function useRevealTexts(
  selectors: string | string[] = ".reveal"
) {
  const ref = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);

  const selectorsString = Array.isArray(selectors)
    ? selectors.join(",")
    : selectors;

  useLayoutEffect(() => {
    if (playedRef.current) return;

    const container = ref.current;
    if (!container) return;

    const targets = container.querySelectorAll(selectorsString);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        playedRef.current = true;

        const ctx = gsap.context(() => {
          gsap.fromTo(
            targets,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.15,
              onComplete: () => {
                targets.forEach((t) =>
                  t.classList.remove("opacity-0")
                );
              },
            }
          );
        }, container);

        observer.disconnect();

        return () => ctx.revert();
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -15% 0px",
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [selectorsString]);

  return ref;
}