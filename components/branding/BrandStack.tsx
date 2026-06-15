"use client";

import { useState } from "react";
import BrandCard from "./BrandCard";
import type { Brand } from "./types";

type Props = {
  brands: Brand[];
};

export default function BrandStack({ brands }: Props) {
  const [active, setActive] = useState(0);

  // =========================
  // 📱 MOBILE VIEW
  // =========================
  const MobileView = () => (
    <div className="w-full flex flex-col items-center">
      {/* THUMBNAILS */}
      <div className="w-full overflow-x-auto px-2 py-2 sticky top-15 z-10">
        <div className="flex gap-3 w-max p-1 bg-white/50 rounded-lg backdrop-blur-sm shadow-xs">
          {brands.map((brand, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`
                w-18 h-18 rounded-md overflow-hidden shrink-0 border-2
                ${
                  i === active
                    ? "shadow-xs border-gray-200"
                    : "border-transparent opacity-50"
                }
              `}
            >
              <img
                src={brand.mainImage}
                className="w-full h-full object-cover object-center scale-200"
              />
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="w-full flex items-center justify-center py-3">
        <BrandCard {...brands[active]} />
      </div>
    </div>
  );

  // =========================
  // 💻 DESKTOP VIEW (CLEAN STACK)
  // =========================
  const DesktopView = () => (
    <div className="relative">
      {brands.map((brand, i) => (
        <div
          key={i}
          className="
            md:sticky md:top-0 md:h-screen
            flex items-center justify-center
            mb-10 md:mb-0
          "
        >
          <BrandCard {...brand} />
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="block xl:hidden">
        <MobileView />
      </div>

      <div className="hidden xl:block">
        <DesktopView />
      </div>
    </>
  );
}