"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMemo } from "react";

const logos = [
    { src: "/img/deca.png", name: "Decathlon" },
    { src: "/img/louzao.png", name: "Louzao" },
    { src: "/img/springfield.png", name: "Springfield" },
    { src: "/img/pululart.png", name: "Pululart" },
];

export default function ExperienceMarquee() {
    // Triplicamos los logos para el efecto infinito suave
    const repeatedLogos = useMemo(() => [...logos, ...logos, ...logos], []);

    return (
        <>
            <style>{`
                @keyframes marquee {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }

                .marquee-track {
                    animation: marquee 15s linear infinite;
                    will-change: transform;
                    transform: translateZ(0);
                    backface-visibility: hidden;
                }

                .marquee-track:hover {
                    animation-play-state: paused;
                }

                /* Velocidad adaptativa según tamaño de pantalla */
                @media (max-width: 640px) {
                    .marquee-track {
                        animation-duration: 20s;
                    }
                }

                @media (min-width: 641px) and (max-width: 1024px) {
                    .marquee-track {
                        animation-duration: 17s;
                    }
                }
            `}</style>

            {/* Container que se ajusta al padre sin márgenes negativos */}
            <div className="relative w-full py-4 sm:py-8 overflow-hidden bg-gray-50 rounded-lg">
                {/* Gradientes de desvanecimiento - ajustados al contenedor */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-linear-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-linear-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

                {/* TRACK - Logos más grandes en móvil */}
                <div className="marquee-track flex gap-10 sm:gap-12 md:gap-14 lg:gap-16">
                    {repeatedLogos.map((logo, index) => (
                        <Tooltip key={`${logo.name}-${index}`} delayDuration={100}>
                            <TooltipTrigger asChild>
                                <div
                                    className="flex items-center justify-center shrink-0 cursor-pointer transition-transform duration-300 ease-out hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 rounded-lg"
                                    role="img"
                                    aria-label={`Logo de ${logo.name}`}
                                >
                                    <img
                                        src={logo.src}
                                        alt={`Logo de ${logo.name}`}
                                        className="h-10 sm:h-11 md:h-12 w-auto opacity-40 transition-opacity duration-300 ease-out hover:opacity-100 drop-shadow-sm"
                                        loading="lazy"
                                        draggable="false"
                                    />
                                </div>
                            </TooltipTrigger>

                            <TooltipContent
                                side="top"
                                align="center"
                                className="bg-black text-white px-3 py-2 rounded-md shadow-lg text-xs font-semibold tracking-wide"
                            >
                                <p>{logo.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>
            </div>
        </>
    );
}