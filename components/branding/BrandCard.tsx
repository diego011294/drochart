import type { BrandCardProps, Color, Typography } from "./types";

export default function BrandCard({
  title,
  description = [],
  mainImage,
  sideImages = [],
  colors = [],
  typography = [],
}: BrandCardProps) {
  return (
    <div className="w-full py-0 lg:py-[100px]">
      <div className="px-2 flex justify-center">
        <div
          className="
            w-full max-w-[1540px]
            bg-white
            rounded-[20px]
            overflow-hidden
            p-4 lg:p-5

            flex flex-col
            xl:flex-row

            gap-4
          "
        >

          {/* LEFT */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <div className="p-2 lg:p-[15px]">
                <h2 className="text-[12px] lg:text-[13px] font-bold uppercase tracking-wide">
                  {title}
                </h2>
              </div>

              <div className="px-2 lg:px-[15px] text-sm lg:text-[14px] text-[#707070] space-y-[10px]">
                {description.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-[10px] opacity-50 text-[11px] lg:text-[12px] mt-6">
              <span className="text-[#717171] font-light">POWERED BY</span>
              <span className="text-[#121212] text-[13px] lg:text-[14px]">
                <span className="font-extrabold">DROCH.</span>
                <span className="art">Art</span>
              </span>
            </div>
          </div>

          {/* CENTER (FIX CLAVE) */}
          <div
            className="
              w-full
              xl:w-[520px]
              2xl:w-[608px]

              aspect-[4/3]
              xl:aspect-[608/565]

              rounded-[10px]
              overflow-hidden
              shrink-0
            "
          >
            <img
              src={mainImage}
              alt="main"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT (FIX CLAVE) */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">

            {/* SIDE IMAGES */}
            <div
              className="
                grid
                grid-cols-2
                md:grid-cols-3
                xl:grid-cols-2
                gap-2
              "
            >
              {sideImages.map((img, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-[10px] overflow-hidden"
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* TYPO + COLORS */}
            <div className="space-y-6">

              {typography.length > 0 && (
                <div className="border border-[#e5e5e5] rounded-[10px] p-3 lg:p-4">
                  <div
                    className="
                      grid
                      grid-cols-2
                      md:grid-cols-4
                      gap-4
                      text-sm
                    "
                  >
                    <div>
                      <p className="font-medium mb-2">Tipografía</p>
                      {typography.map((t, i) => (
                        <p key={i} className="text-[#707070] text-xs">
                          {t.font}
                        </p>
                      ))}
                    </div>

                    <div>
                      <p className="font-medium mb-2">Size</p>
                      {typography.map((t, i) => (
                        <p key={i} className="text-[#707070] text-xs">
                          {t.size}
                        </p>
                      ))}
                    </div>

                    <div>
                      <p className="font-medium mb-2">Weight</p>
                      {typography.map((t, i) => (
                        <p key={i} className="text-[#707070] text-xs">
                          {t.weight}
                        </p>
                      ))}
                    </div>

                    <div>
                      <p className="font-medium mb-2">Spacing</p>
                      {typography.map((t, i) => (
                        <p key={i} className="text-[#707070] text-xs">
                          {t.spacing}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* COLORS */}
              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-4
                "
              >
                {colors.map((color, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-md border border-gray-200"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="text-xs text-[#707070]">
                      <p>{color.hex}</p>
                      <p>{color.name}</p>
                      <p>{color.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}