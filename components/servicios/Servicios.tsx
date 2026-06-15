"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import MagmaBall from "../magmaball/MagmaBall";
import NoiseBackground from "../noisebackground/NoiseBackground";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useRevealTexts } from "../../hook/useRevealTexts";

interface ServiciosProps {
  openModal: () => void;
}

const servicios = [
  {
    numero: "01.",
    titulo: "UI/UX para producto digital",
    textoCorto: "Interfaces limpias, claras y pensadas para convertir.",
    bullets: [
      "Figma, Design Systems y uso inteligente de design tokens.",
      "Prototipado ágil con foco en usabilidad y accesibilidad.",
      "Experiencia en productos SaaS, dashboards y flujos complejos.",
    ],
    icon: "/img/slot2.png",
    bgImage: "/img/img-acordeon1.jpg",
  },
  {
    numero: "02.",
    titulo: "Frontend moderno",
    textoCorto: "Interfaces funcionales, optimizadas y pixel-perfect.",
    bullets: [
      "React, Next.js y Typescript.",
      "TailwindCSS y componentes escalables.",
      "Integración con APIs y animaciones fluidas.",
    ],
    icon: "/img/slot3.png",
    bgImage: "/img/img-acordeon2.jpg",
  },
  {
    numero: "03.",
    titulo: "Ecommerce & CMS",
    textoCorto: "Tiendas rápidas, fiables y enfocadas a la conversión.",
    bullets: [
      "Shopify, WooCommerce y WordPress.",
      "Headless Commerce cuando el proyecto lo necesita.",
      "Procesos de compra simples, seguros y escalables.",
    ],
    icon: "/img/slot4.png",
    bgImage: "/img/img-acordeon3.jpg",
  },
  {
    numero: "04.",
    titulo: "Identidad Digital",
    textoCorto: "Identidades modernas aplicadas a producto digital.",
    bullets: [
      "Diseño en Figma, Illustrator y sistemas visuales sólidos.",
      "Aplicaciones coherentes en web, SaaS y ecommerce.",
      "Construcción de una estética consistente y reconocible.",
    ],
    icon: "/img/slot5.png",
    bgImage: "/img/img-acordeon4.jpg",
  },
  {
    numero: "05.",
    titulo: "UX Research & Briefing",
    textoCorto: "Colaboración cercana, claridad y seguimiento constante.",
    bullets: [
      "Investigación y análisis inicial del proyecto.",
      "Reuniones de seguimiento para alinear objetivos.",
      "Definición conjunta del alcance y metodología.",
    ],
    icon: "/img/slot1.png",
    bgImage: "/img/img-acordeon5.jpg",
  },
];

export default function Servicios({ openModal }: ServiciosProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const bulletRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgImageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [openValue, setOpenValue] = useState("item-0");
  const [scrollToSection, setScrollToSection] = useState(false);
  const ref = useRevealTexts();


useEffect(() => {
  const handleOpenService = (e: Event) => {
    const customEvent = e as CustomEvent<string>;
    const service = customEvent.detail;

    if (!service) return;

    setOpenValue(service);
    setScrollToSection(true);
  };

  window.addEventListener("open-service", handleOpenService);

  return () => {
    window.removeEventListener("open-service", handleOpenService);
  };
}, []);

useEffect(() => {
  if (!scrollToSection) return;

  const index = parseInt(openValue.split("-")[1]);
  const el = itemRefs.current[index];

  if (!el) return;

  const timeout = setTimeout(() => {
    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const isMobile = window.innerWidth < 768;

    // 👇 clave: diferente estrategia móvil vs desktop
    let offsetTop;

    if (isMobile) {
      // móvil: alineado arriba con margen cómodo
      offsetTop = rect.top + scrollTop - 120;
    } else {
      // desktop: centrado bonito
      offsetTop =
        rect.top +
        scrollTop -
        (window.innerHeight / 2 - rect.height / 2);
    }

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });

    setScrollToSection(false);
  }, 350); // 👈 importante: esperar a que el accordion abra

  return () => clearTimeout(timeout);
}, [scrollToSection, openValue]);

  useEffect(() => {
    const handleAccordionChange = (index: number, isOpen: boolean) => {
      // Animar imagen de fondo (extremo derecho)
      const bgImage = bgImageRefs.current[index];
      if (bgImage) {
        if (isOpen) {
          gsap.fromTo(
            bgImage,
            {
              opacity: 0,
              x: 150,
              scale: 0.8,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
            }
          );
        } else {
          gsap.to(bgImage, {
            opacity: 0,
            x: 150,
            scale: 0.8,
            duration: 0.5,
            ease: "power2.in",
          });
        }
      }

      // Animar contenido principal
      const content = contentRefs.current[index];
      if (content) {
        if (isOpen) {
          gsap.killTweensOf(content);
          gsap.fromTo(
            content,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
            }
          );
        } else {
          gsap.killTweensOf(content);
          gsap.to(content, {
            opacity: 0,
            y: 20,
            duration: 0.4,
            ease: "power2.in",
          });
        }
      }

      // Animar imagen del ícono
      const image = imageRefs.current[index];
      if (image && isOpen) {
        gsap.killTweensOf(image);
        gsap.fromTo(
          image,
          {
            opacity: 0,
            scale: 0.8,
            rotate: -10,
          },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.7,
            ease: "back.out(1.2)",
            delay: 0.1,
          }
        );
      }

      // Animar bullets con stagger
      const bullets = bulletRefs.current[index];
      if (bullets && isOpen) {
        const bulletItems = bullets.querySelectorAll("p");
        gsap.killTweensOf(bulletItems);
        gsap.fromTo(
          bulletItems,
          {
            opacity: 0,
            x: -15,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            delay: 0.2,
          }
        );
      }

      // Animar botón
      const button = content?.querySelector("button");
      if (button && isOpen) {
        gsap.killTweensOf(button);
        gsap.fromTo(
          button,
          {
            opacity: 0,
            scale: 0.9,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.5)",
            delay: 0.35,
          }
        );
      }
    };

    // Observar cambios en items del acordeón
    const accordionItems = document.querySelectorAll('[role="region"]');
    accordionItems.forEach((item, index) => {
      const observer = new MutationObserver(() => {
        const isOpen = item.getAttribute("data-state") === "open";
        handleAccordionChange(index, isOpen);
      });

      observer.observe(item, {
        attributes: true,
        attributeFilter: ["data-state"],
      });
    });

    // Trigger initial animation for default open item
    setTimeout(() => {
      handleAccordionChange(0, true);
    }, 100);
  }, []);

  return (
    <section 
    id="servicios"
    className="w-full p-2">
      <div ref={ref} className="bg-tipo relative flex flex-col justify-center items-center mx-auto w-full rounded-3xl py-10 md:py-24 px-4 overflow-visible">
        <NoiseBackground />
        <MagmaBall />

        <div className="text-white text-center z-5 tracking-tighter leading-none reveal opacity-0">
          <h2 className="text-3xl md:text-4xl leading-none font-semibold art">Mi forma de</h2>
          <h3 className="text-center text-5xl md:text-8xl font-extrabold uppercase font-dmsans mb-10 sm:mb-20">
            Crear
          </h3>
        </div>

        <Accordion
          type="single"
          value={openValue}
          collapsible
          className="w-full max-w-[1920px]"
          onValueChange={(value) => {
            if (value) {
              setOpenValue(value);
            }
          }}
        >
          {servicios.map((serv, index) => (
            <div
              key={serv.numero}
              ref={(el) => {
                if (el) itemRefs.current[index] = el;
              }}
              className="relative"
            >
              <AccordionItem
                value={`item-${index}`}
                className="border-b border-white/2 px-6 py-5 rounded-2xl transition-colors duration-300 data-[state=open]:bg-white/5"
              >
                <AccordionTrigger className="flex items-center w-full gap-5 text-left hover:opacity-75 transition-opacity">
                  <div className="flex flex-col sm:flex-row items-start gap-5 md:gap-8">
                    {/* Número */}
                    <span className="text-gray-500 text-xs md:text-sm shrink-0">
                      {serv.numero}
                    </span>

                    {/* Titulo y resumen */}
                    <div className="flex-1 text-left cursor-pointer">
                      <h4 className="text-xl md:text-3xl font-bold text-white">
                        {serv.titulo}
                      </h4>
                      <p className="text-gray-300 mt-2">{serv.textoCorto}</p>
                    </div>
                  </div>
                </AccordionTrigger>

                {/* Contenido interno */}
                <AccordionContent>
                  <div
                    ref={(el) => {
                      if (el) contentRefs.current[index] = el;
                    }}
                    className="mt-6 flex flex-col md:flex-row gap-8 px-0 md:px-10 items-start justify-between"
                  >
                    {/* CONTENIDO IZQUIERDO */}
                    <div className="flex-1 flex flex-col sm:flex-row gap-5">
                      {/* Icono */}
                      <img
                        ref={(el) => {
                          if (el) imageRefs.current[index] = el;
                        }}
                        src={serv.icon}
                        alt=""
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg bg-white/10 p-2 border border-white/10 shrink-0"
                      />

                      {/* Bullets */}
                      <div
                        ref={(el) => {
                          if (el) bulletRefs.current[index] = el;
                        }}
                        className="text-gray-300 text-sm leading-relaxed space-y-2"
                      >
                        {serv.bullets.map((b, idx) => (
                          <p key={idx}>• {b}</p>
                        ))}

                        <Button
                          className="mt-6 bg-brand hover:bg-hover cursor-pointer transition-all duration-300 active:scale-95"
                          onClick={openModal}
                        >
                          ¿Hablamos?
                        </Button>
                      </div>
                    </div>

                    {/* Espacio invisible para la imagen */}
                    <div className="hidden md:block w-auto shrink-0" />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* IMAGEN - DESBORDAMIENTO DERECHO (Solo Desktop) */}
              <img
                ref={(el) => {
                  if (el) bgImageRefs.current[index] = el;
                }}
                src={serv.bgImage}
                alt={serv.titulo}
                className="hidden xl:block absolute top-1/2 -translate-y-1/2 right-52 w-96 rotate-6 h-96 object-cover rounded-2xl pointer-events-none z-20 border-8 border-gray-200/10"
                style={{
                  opacity: 0,
                }}
              />
            </div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}