"use client";

import { MapPin } from "lucide-react";
import LottieLogo from "@/components/lottielogo/LottieLogo";

// --- Data ---
const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/droch.art/", },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/diego-garcía-rocha" },
  { label: "GitHub",    href: "https://github.com/diego011294"},
  { label: "Behance",   href: "https://www.behance.net/droch" },
];

const LEGAL_LINKS = [
  { label: "Política de privacidad", href: "/politica-privacidad" },
];

const linkHover = "opacity-70 hover:opacity-100 hover:text-brand transition-all duration-200";

// --- Sub-components ---
function ContactSection() {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-bold text-tipo text-xs tracking-widest uppercase">Correo</p>
      <a href="mailto:drochart.info@gmail.com" className={`text-tipoclara text-sm ${linkHover}`}>
        drochart.info@gmail.com
      </a>
    </div>
  );
}

function SocialSection() {
  return (
    <div className="flex flex-col gap-1 md:items-end">
      <p className="font-bold text-tipo text-xs tracking-widest uppercase">RRSS</p>
      <div className="flex gap-4 text-tipoclara text-sm flex-wrap md:justify-end">
        {SOCIAL_LINKS.map(({ label, href }) => (
          <a target="_blank" rel="noopener noreferrer" key={label} href={href} className={linkHover}>{label}</a>
        ))}
      </div>
    </div>
  );
}

function BottomBar() {
  return (
    <div className="bg-white rounded-xl w-full">
      {/* Desktop: space-between con copyright centrado en absolute */}
      <div className="hidden sm:flex relative items-center justify-between px-5 py-3 text-sm">
        <div className="flex gap-3 text-tipo font-light flex-wrap">
          {LEGAL_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="opacity-70 hover:opacity-100 transition-opacity">
              {label}
            </a>
          ))}
        </div>

        <p className="absolute left-1/2 -translate-x-1/2 text-tipoclara font-light whitespace-nowrap pointer-events-none">
          Diseño y desarrollo
          <span className="font-extrabold text-tipo"> DROCH</span>
          <span className="art text-tipo">.Art</span>
          <span className="text-tipoclara"> | 2026</span>
        </p>

        <div className="flex items-center gap-1.5 text-tipoclara font-light">
          <MapPin size={13} className="text-tipo shrink-0" />
          <span>Galicia | España</span>
        </div>
      </div>

      {/* Mobile: apilado */}
      <div className="flex sm:hidden flex-col items-center gap-2 px-4 py-3 text-sm text-center">
        <p className="text-tipoclara font-light whitespace-nowrap">
          Diseño y desarrollo
          <span className="font-black text-tipo"> DROCH</span>
          <span className="art text-tipo">.Art</span>
          <span className="text-tipoclara"> | 2026</span>
        </p>
        <div className="flex items-center gap-1.5 text-tipoclara font-light">
          <MapPin size={13} className="text-tipo shrink-0" />
          <span>Galicia | España</span>
        </div>
        <div className="flex gap-3 text-tipo font-light flex-wrap justify-center pt-1">
          {LEGAL_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="opacity-70 hover:opacity-100 transition-opacity text-xs">
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Main ---
export default function Footer() {
  return (
    <footer className="w-full px-3 py-5 
    bg-[url('/img/bg-footer-movil.jpg')]
    lg:bg-[url('/img/bg-footer.jpg')]
    bg-cover
    bg-center
    bg-no-repeat">
      <div className="flex flex-col gap-8 w-full max-w-[1920px] mx-auto">

        {/* Desktop: grid 3 columnas iguales — Móvil: apilado centrado */}
        <div className="hidden md:grid grid-cols-3 items-end w-full gap-4">
          <ContactSection />
          <div className="flex justify-center py-20">
            <LottieLogo />
          </div>
          <SocialSection />
        </div>

        {/* Mobile layout */}
        <div className="flex md:hidden flex-col items-center gap-6 w-full">
          <LottieLogo />
          <div className="flex flex-col gap-5 justify-between w-full px-2">
            <ContactSection />
            <SocialSection />
          </div>
        </div>

        <BottomBar />

      </div>
    </footer>
  );
}