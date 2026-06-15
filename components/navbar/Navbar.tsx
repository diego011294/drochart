"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import gsap from "gsap";
import Link from "next/link";
import ModalForm from "../modalform/ModalForm";

export default function Navbar() {
  const [open, setOpen] = useState(false); // menú móvil
  const [servicesOpen, setServicesOpen] = useState(false); // panel fullscreen
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const navRef = useRef<HTMLElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  /* ────────────────────────────────────────────────
     ANIMACIÓN FULLSCREEN GSAP
  ───────────────────────────────────────────────── */
useEffect(() => {
  if (!dropRef.current) return;

  const el = dropRef.current;

  if (servicesOpen) {
    gsap.set(el, {
      display: "flex",
      pointerEvents: "auto",
    });

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: -10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      }
    );
  } else {
    gsap.to(el, {
      opacity: 0,
      y: -10,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(el, {
          pointerEvents: "none",
          display: "none",
        });
      },
    });
  }
}, [servicesOpen]);

  /* ────────────────────────────────────────────────
     CERRAR AL HACER CLICK FUERA
  ───────────────────────────────────────────────── */
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        dropRef.current &&
        !dropRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest("#quehago-btn")
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  /* ────────────────────────────────────────────────
     OVERLAY NEGRO
  ───────────────────────────────────────────────── */
  useEffect(() => {
    if (!overlayRef.current) return;

    if (servicesOpen) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0, display: "none" },
        { opacity: 0.4, duration: 0.4, ease: "power2.out", display: "block" },
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = "none";
        },
      });
    }
  }, [servicesOpen]);

  /* ────────────────────────────────────────────────
     SCROLL SUAVE
  ───────────────────────────────────────────────── */
  const handleScrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  const yOffset = -100;
  const y =
    el.getBoundingClientRect().top + window.scrollY + yOffset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });

  setOpen(false);
  setServicesOpen(false);
  };
  /* ────────────────────────────────────────────────
   ABRIR SERVICIO
──────────────────────────────────────────────── */
 const handleOpenService = (service: string) => {
  window.dispatchEvent(
    new CustomEvent("open-service", {
      detail: service,
    })
  );

  setOpen(false);
  setServicesOpen(false);
};

  return (
    <>
      {/* NAVBAR PRINCIPAL */}
      <nav
        ref={navRef}
        className="w-full fixed top-0 left-0 z-60 bg-fondoclaro"
      >
        <div className="w-full px-10 py-1 mx-auto flex justify-between items-center">
          {/* NAV DESKTOP */}
          <div className="w-full hidden text-md md:flex justify-between py-2 sm:py-3 space-x-6 text-tipo font-medium ">
            <div className="flex items-center">
              <Link href="/">
                <img
                  src="/img/logo2-droch.svg"
                  alt="logo"
                  className="w-8 md:w-42"
                />
              </Link>
            </div>

            <button
              onClick={() => handleScrollTo("proyectos")}
              className="hover:text-brand transition-colors duration-300 cursor-pointer"
            >
              Proyectos
            </button>

            {/* BOTÓN “¿Qué hago?” */}
            <button
              id="quehago-btn"
              onClick={() => setServicesOpen(!servicesOpen)}
              className="hover:text-brand cursor-pointer flex items-center gap-2 transition-colors duration-300"
            >
              ¿Qué hago?
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <button
              onClick={() => handleScrollTo("about")}
              className="hover:text-brand transition-colors duration-300 cursor-pointer"
            >
              Sobre mí
            </button>

            <button
              onClick={openModal}
              className="hover:text-brand transition-colors duration-300 cursor-pointer"
            >
              Contacto
            </button>
          </div>

          {/* BOTÓN MOBILE */}
          <div className="md:hidden flex justify-between py-2 w-full">
            <Link href="/">
              <img src="/img/logo2-droch.svg" alt="logo" className="w-40" />
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700 hover:text-gray-900"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL */}
        <div
          className={`text-3xl flex flex-col py-24 justify-between font-bold md:hidden bg-fondoclaro absolute z-20 w-full h-screen transition-all duration-300
            ${
              open
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-5 pointer-events-none"
            }
          `}
        >
          <div className="flex flex-col gap-4 justify-center">
            <button
              onClick={() => handleScrollTo("proyectos")}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Proyectos
            </button>

            <button
              onClick={() => {
                setOpen(false);
                setServicesOpen(true);
              }}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              ¿Qué hago?
            </button>

            <button
              onClick={() => handleScrollTo("about")}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Sobre mí
            </button>

            <button
              onClick={() => {
              openModal();
              setOpen(false);
            }}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Contacto
            </button>
          </div>

          {/* FOOTER MOBILE */}
          <div className="flex flex-col gap-5 justify-center text-sm text-center text-tipoclara font-light pb-10">
            <span className="text-tipo text-lg font-bold">
              drochart.info@gmail.com
            </span>
            <span>
              © 2026 Diseño y desarrollo{" "}
              <span className="font-black text-tipo">DROCH</span>
              <span className="art text-tipo">.Art</span>
            </span>
          </div>
        </div>
      </nav>

      {/* OVERLAY NEGRO */}
      <div
        ref={overlayRef}
        onClick={() => setServicesOpen(false)}
        className="fixed inset-0 bg-black/40 z-30"
        style={{ display: "none", opacity: 0 }}
      ></div>

      {/* FULLSCREEN SERVICES PANEL */}
      <div
        ref={dropRef}
        className="w-full h-screen md:h-auto pt-20 sm:pt-30 pb-20 fixed bg-fondoclaro backdrop-blur-md z-50 flex-col items-center opacity-0 pointer-events-none"      >
        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-10 w-full max-w-6xl mx-auto text-tipo font-medium">
          {/* Slot 1 */}
          <button
            className="flex items-center gap-4 group hover:bg-white transition-colors duration-300 p-2 rounded-xl cursor-pointer"
            onClick={() => handleOpenService("item-0")}
          >
            <div className="bg-gray-100 rounded-lg w-16 h-16 flex items-center justify-center overflow-hidden flex-shrink-0">
              <img
                src="/img/slot2.png"
                className="w-10 object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col items-start text-start">
              <span className="text-tipo font-medium">Diseño UI/UX</span>
              <span className="text-sm font-normal text-tipoclara">
                Interfaces claras y enfocadas en conversión.
              </span>
            </div>
          </button>

          {/* Slot 2 */}
          <button
            className="flex items-center gap-4 group hover:bg-white transition-colors duration-300 p-2 rounded-lg cursor-pointer"
            onClick={() => handleOpenService("item-1")}
          >
            <div className="bg-gray-100 rounded-lg w-16 h-16 flex items-center justify-center overflow-hidden flex-shrink-0">
              <img
                src="/img/slot3.png"
                className="w-10 object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col items-start text-start">
              <span className="text-tipo font-medium">
                Desarrollo Front-end
              </span>
              <span className="text-sm font-normal text-tipoclara">
                Webs rápidas, escalables y fieles al diseño.
              </span>
            </div>
          </button>

          {/* Slot 3 */}
          <button
            className="flex items-center gap-4 group hover:bg-white transition-colors duration-300 p-2 rounded-lg cursor-pointer"
            onClick={() => handleOpenService("item-2")}
          >
            <div className="bg-gray-100 rounded-lg w-16 h-16 flex items-center justify-center overflow-hidden flex-shrink-0">
              <img
                src="/img/slot4.png"
                className="w-10 object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col items-start text-start">
              <span className="text-tipo font-medium">Ecommerce & CMS</span>
              <span className="text-sm font-normal text-tipoclara">
                Tiendas online optimizadas y fáciles de gestionar.
              </span>
            </div>
          </button>

          {/* Slot 4 */}
          <button
            className="flex items-center gap-4 group hover:bg-white transition-colors duration-300 p-2 rounded-lg cursor-pointer"
            onClick={() => handleOpenService("item-3")}
          >
            <div className="bg-gray-100 rounded-lg w-16 h-16 flex items-center justify-center overflow-hidden flex-shrink-0">
              <img
                src="/img/slot5.png"
                className="w-10 object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col items-start text-start">
              <span className="text-tipo font-medium">Identidad Digital</span>
              <span className="text-sm font-normal text-tipoclara">
                Diseño de logotipos e identidad.
              </span>
            </div>
          </button>

          {/* Slot 5 */}
          <button
            className="flex items-center gap-4 group hover:bg-white transition-colors duration-300 p-2 rounded-lg cursor-pointer"
            onClick={() => handleOpenService("item-4")}
          >
            <div className="bg-gray-100 rounded-lg w-16 h-16 flex items-center justify-center overflow-hidden flex-shrink-0">
              <img
                src="/img/slot1.png"
                className="w-10 object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col items-start text-start">
              <span className="text-tipo font-medium">
                UX Research & Briefing
              </span>
              <span className="text-sm font-normal text-tipoclara">
                Descubramos juntos las necesidades de tu proyecto.
              </span>
            </div>
          </button>
        </div>
      </div>
      <ModalForm isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
