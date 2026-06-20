"use client";
import About from "@/components/about/About";
import BrandCard from "@/components/branding/BrandCard";
import BrandStack from "@/components/branding/BrandStack";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import ModalForm from "@/components/modalform/ModalForm";
import Proyectos from "@/components/proyectos/Proyectos";
import Servicios from "@/components/servicios/Servicios";
import { useState } from "react";
import {useEffect} from "react";
import { useSearchParams } from "next/navigation";
import Ilustracion from "@/components/ilustracion/Ilustracion";

export default function Home() {
  const [modalFormOpen, setModalFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const searchParams = useSearchParams();

   useEffect(() => {
    const service = searchParams.get("service");
    if (!service) return;

    window.dispatchEvent(
      new CustomEvent("open-service", {
        detail: service,
      })
    );
  }, [searchParams]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const el = document.getElementById(hash);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-center w-full gap-5">
      <Header />
      <Proyectos />
      <Servicios openModal={() => setModalFormOpen(true)} />
      <BrandStack
        brands={[
          {
            title: "DOBLEUVE ARTESANÍA",
            description: ["DOBLEUVE Artesanía es una marca gallega de joyería artesanal fundada en 2021, centrada en la creación de pendientes únicos en arcilla polimérica.", "El sistema visual se construye a partir del juego con formas orgánicas de arcilla, que dan lugar a una composición central donde conviven los tres colores característicos de la marca, aportando equilibrio, personalidad y coherencia gráfica."],
            mainImage: "/img/brand/brand-1.jpg",
            sideImages: ["/img/brand/brand1-s2.jpg", "/img/brand/brand1-s1.jpg"],
            colors: [
              { hex: "#1d1d1d", name: "text-font", desc: "Texto principal" },
              { hex: "#a989ae", name: "primary", desc: "Primera forma" },
              { hex: "#ffa07d", name: "secondary", desc: "Segunda forma" },
              { hex: "#fcbf80", name: "tertiary", desc: "Tercera forma" },
            ],
            typography: [
              { font: "Pontano Sans", size: "25px", weight: "400", spacing: "30%" },
              { font: "Lato", size: "15px", weight: "300", spacing: "10%" },
            ],
          },
          
          {
            title: "DOMUBOX IMPORT",
            description: ["Domubox es una empresa distribuidora de casas modulares, especializada en ofrecer soluciones de vivienda eficientes, modernas y adaptables.", "El logo refleja la idea de simplicidad y modularidad. Sus formas geométricas representan la estructura de una casa tipo “caja”, haciendo referencia directa al concepto de construcción modular. La identidad busca transmitir orden, funcionalidad y modernidad, valores clave de la marca."],
            mainImage: "/img/brand/brand2.jpg",
            sideImages: ["/img/brand/brand2-s1.jpg", "/img/brand/brand2-s2.jpg"],
            colors: [
              { hex: "#4f5516", name: "Primary", desc: "Color acento" },
              { hex: "#94A11A", name: "Secondary", desc: "Color texto" },
              { hex: "#FAF4E8", name: "Tertiary", desc: "Color fondo" },
            ],
            typography: [
              { font: "Lexend", size: "42px", weight: "700", spacing: "-3%" },
            ],
          },

          {
            title: "BIELA COMPETICIÓN",
            description: ["Diseño de identidad visual y creación de personaje para una escudería de rally en Galicia. El proyecto se desarrolló con el objetivo de crear una marca reconocible, dinámica y adaptable tanto a merchandising como a rotulación de competición.", "El logotipo combina un enfoque “character design” con estética racing, utilizando un pistón antropomórfico como elemento principal para transmitir personalidad, cercanía y pasión por el motor. La identidad fue pensada para funcionar en diferentes soportes como camisetas, pegatinas y decoración de carrocería, manteniendo siempre un estilo agresivo, divertido y fácilmente reconocible dentro del entorno del rally."],
            mainImage: "/img/brand/brand3.jpg",
            sideImages: ["/img/brand/brand3-s1.jpg", "/img/brand/brand3-s2.jpg"],
            colors: [
              { hex: "#D5E221", name: "Custom deg", desc: "Color de marca" },
              { hex: "#ADB2B6", name: "Custom deg", desc: "Escala de grises" },
            ],
            typography: [
              { font: "Bangers", size: "90px", weight: "300", spacing: "0%" },
            ],
          },

          {
            title: "FREEZ",
            description: ["Freez es una identidad visual creada para un proyecto ficticio de una heladería desarrollado durante mi etapa de Formación Profesional. El concepto parte de la combinación entre la silueta de un helado derritiéndose y una cereza que aporta personalidad y carácter al conjunto. A través de formas simples y dinámicas, el logotipo busca transmitir diversión, frescura y una imagen desenfadada, alineada con el espíritu de una marca joven y cercana."],
            mainImage: "/img/brand/brand4.jpg",
            sideImages: ["/img/brand/brand4-s1.jpg", "/img/brand/brand4-s2.jpg"],
            colors: [
              { hex: "#F2FFD5", name: "Variant 1", desc: "Color de marca" },
              { hex: "#404099", name: "Variant 2", desc: "Color de marca" },
            ],
            typography: [
              { font: "Custom", size: "--", weight: "--", spacing: "--" },
            ],
          },
        ]}
      />
      {/*<Ilustracion />*/}
      <About />

      {/* Modales */}
      <ModalForm
        isOpen={modalFormOpen}
        onClose={() => setModalFormOpen(false)}
      />
    </main>
  );
}
