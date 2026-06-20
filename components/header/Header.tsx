"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "../ui/button";
import ModalForm from "../modalform/ModalForm";
import HeaderScene from "./HeaderScene";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const drochRef = useRef<HTMLSpanElement>(null);
  const artRef = useRef<HTMLSpanElement>(null);
  const staticContentRef = useRef<HTMLDivElement>(null);
  const bottomSlotRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // ─────────────────────────────
  // PRELOADER END
  // ─────────────────────────────
  const handlePreloaderFinish = () => {
    const tl = gsap.timeline();

    // 🔥 primero animas entrada real
    startHeaderAnimation();

    // 🔥 luego quitas overlay (evita gap visual)
    tl.to("#preloader", {
      autoAlpha: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
      requestAnimationFrame(() => {
        setLoading(false);
      });
    },
    });
  };

  useEffect(() => {
  if (loading) {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }
}, [loading]);

  // ─────────────────────────────
  // HEADER ANIMATION
  // ─────────────────────────────
  const startHeaderAnimation = () => {
    const header = headerRef.current;
    const video = videoRef.current;
    const droch = drochRef.current;
    const art = artRef.current;
    const staticContent = staticContentRef.current;
    const bottomSlot = bottomSlotRef.current;

    if (!header || !video || !droch || !art || !staticContent || !bottomSlot)
      return;

    gsap.set(header, { autoAlpha: 0 });

    gsap.set(video, {
      scale: 0.12,
      transformOrigin: "50% 50%",
      borderRadius: "9999px",
    });

    gsap.set([droch, art], {
      autoAlpha: 0,
      filter: "blur(60px)",
      y: 20,
    });

    gsap.set(sceneRef.current, {
      autoAlpha: 0,
      y: 120,
      scale: 0.9,
    });

    gsap.set([staticContent, bottomSlot], {
      autoAlpha: 0,
      y: 10,
    });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
    });

    tl.to(header, {
      autoAlpha: 1,
      duration: 0.2,
    })

      // 🔥 video entra primero
      .to(video, {
        scale: 1,
        borderRadius: "24px",
        duration: 1.05,
        ease: "power3.inOut",
      })

      // 🔥 3D entra casi en paralelo (sin delay muerto)
      .to(
        sceneRef.current,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.15"
      )

      // 🔥 texto principal
      .to(
        droch,
        {
          autoAlpha: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.9,
        },
        "-=0.6"
      )

      .to(
        art,
        {
          autoAlpha: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.85,
        },
        "-=0.7"
      )

      .to(
        [staticContent, bottomSlot],
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
        },
        "-=0.4"
      );
  };

  return (
    <>
      {/* ───────────────── PRELOADER ───────────────── */}
      <div
        id="preloader"
        className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
      >
        <div className="relative w-[300px]">
          <video
            autoPlay
            muted
            playsInline
            onEnded={handlePreloaderFinish}
            className="w-full h-full object-contain mix-blend-multiply"
          >
            <source src="/img/preloader-video.mp4" type="video/mp4" />
          </video>

          <div className="absolute -inset-1 pointer-events-none bg-linear-to-t from-white via-white/20 to-transparent" />
        </div>
      </div>

      {/* ───────────────── HEADER ───────────────── */}
      <header
        ref={headerRef}
        className="h-screen w-full flex flex-col overflow-hidden"
      >
        <div className="h-16 w-full" />

        <div className="relative flex-1 min-h-0 overflow-hidden">
          {/* 3D SCENE (SIEMPRE MONTADO) */}
          <div
            ref={sceneRef}
            className="absolute inset-0 z-20 pointer-events-none opacity-0"
          >
            <HeaderScene />
          </div>

          {/* VIDEO */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="rounded-3xl z-0 absolute top-0 left-0 w-full p-2 h-full object-cover"
          >
            <source src="/video/BurbujasHeader.mp4" type="video/mp4" />
          </video>

          {/* OVERLAY */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full w-full gap-8">
            {/* TOP */}
            <div className="text-tipo font-black flex flex-col-reverse sm:flex-col items-center leading-none gap-5">
              <div
                ref={staticContentRef}
                className="flex flex-col sm:flex-row w-full justify-evenly items-end text-sm sm:text-lg sm:gap-5"
              >
                <span className="font-bold">Diseño UI/UX</span>
                <h1 className="font-bold">Desarrollo web</h1>
                <span className="font-bold">Branding</span>
              </div>

              <div className="flex flex-col items-end -space-y-4 lg:-space-y-10">
                <span
                  ref={drochRef}
                  className="texto tracking-[-5px] lg:tracking-[-15px]
                  text-[80px] sm:text-[140px] md:text-[160px]
                  lg:text-[180px] xl:text-[190px] 2xl:text-[250px]"
                >
                  DROCH
                </span>

                <span
                  ref={artRef}
                  className="art rotate-10 text-6xl md:text-7xl xl:text-[120px]"
                >
                  .Art
                </span>
              </div>
            </div>

            {/* BOTTOM */}
            <div
              ref={bottomSlotRef}
              className="max-w-[1900px] flex flex-col-reverse md:flex-row w-full justify-between items-end px-5 sm:px-10 gap-5"
            >
              <div className="text-lg md:text-xl lg:text-2xl font-bold w-full md:w-1/3 leading-tight">
                <p>
                  Transformo lo complejo en interfaces claras y funcionales,{" "}
                  <span className="text-tipoclara">
                    creando experiencias fluidas que guían al usuario y
                    convierten mejor.
                  </span>
                </p>
              </div>

              <div className="inline-flex items-center bg-white rounded-2xl p-2 ml-auto w-full md:w-auto gap-2">
                <img
                  className="rounded-xl h-30 object-cover"
                  src="img/yo-small.jpg"
                  alt="Foto carnet"
                />
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-tipoclara">
                    UI/UX designer | Web developer
                  </span>
                  <h3 className="text-lg font-bold">DIEGO GARCÍA</h3>
                  <Button className="text-sm cursor-pointer" onClick={openModal}>Vamos a diseñarlo</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <ModalForm isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}