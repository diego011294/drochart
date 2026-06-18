import ProyectoSlot from "../proyecto-slot/ProyectoSlot";
import { useRevealTexts } from "../../hook/useRevealTexts";

export default function Proyectos() {
  const ref = useRevealTexts();
  const proyectos = [
    {
      title: "DOBLEUVE ARTESANÍA",
      subtitle: "Branding | Desarrollo web | Ecommerce",
      image: "/img/dobleuve1.png",
      logo: "/img/logo-doblev.svg",
      tag: "PRODUCCIÓN",
      url: "https://dobleuveartesania.es/"
    },
    {
      title: "DOMUBOX IMPORT",
      subtitle: "Branding | Desarrollo web | RRSS",
      image: "/img/img-domubox.jpg",
      logo: "/img/logo-domu.svg",
      tag: "PRODUCCIÓN",
      url: "https://www.domuboximport.com/"
    }
  ];

  return (
    <section id="proyectos" className="flex flex-col justify-center items-start lg:items-end px-5 py-5 sm:py-20 gap-10 w-full max-w-[1920px]">
      
      {/* Cabecera */}
      <div ref={ref} className="flex flex-col justify-start w-full items-end sm:flex-row gap-5 sm:gap-20">
        <div className="flex flex-col tracking-tighter w-full sm:w-auto reveal opacity-0">
          <span className="text-3xl md:text-4xl leading-none font-semibold art">Visita mis</span>
          <h3 className="font-extrabold text-5xl md:text-8xl uppercase tracking-tighter leading-none">Proyectos</h3>
        </div>
        <p className="text-tipoclara text-sm leading-tight w-full lg:w-70">
          Estos son algunos de mis proyectos personales finalizados y en producción.
          ¡Échales un vistazo!
        </p>
      </div>
      
      {/* Lista de Proyectos - Grid Responsive */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {proyectos.map((p, i) => (
          <ProyectoSlot
            key={`proyecto-1-${i}`}
            title={p.title}
            subtitle={p.subtitle}
            image={p.image}
            logo={p.logo}
            tag={p.tag}
            url={p.url}
          />
        ))}
      </div>
    </section>
  );
}