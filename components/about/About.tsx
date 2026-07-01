import { ArrowDownToLine } from "lucide-react";
import { Button } from "../ui/button";
import ExperienceMarquee from "../marquee/ExperienceMarquee";
import { Badge } from "../ui/badge";
import { useContactForm } from "../../hook/useContactForm";
import { useRevealTexts } from "../../hook/useRevealTexts";

export default function About() {
  const { submit, loading, success, error } = useContactForm();
  const ref = useRevealTexts();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    await submit(
      {
        name: formData.get("name") as string,
        phone: formData.get("phone") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
        website: "",
      },
      () => form.reset(),
    );
  };

  return (
    <section
      id="about"
      className="w-full px-4 py-12 sm:py-16 md:py-20 flex justify-center"
    >
      <div ref={ref} className="w-full max-w-[1920px]">
        {/* ── CABECERA ── */}
        <div className="mb-10 sm:mb-12 md:mb-16 flex flex-col gap-1 reveal opacity-0">
          <span className="text-3xl md:text-4xl leading-none font-semibold art">
            Sobre mí
          </span>
          <h3 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase tracking-tighter leading-none">
            Diego García
          </h3>
        </div>

        {/* ── GRID PRINCIPAL ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 items-start">
          {/* ══ COL 1 — FOTO ══ */}
          <div className="w-full">
            <div className="h-[460px] sm:h-[520px] lg:h-[600px] flex flex-col justify-between relative rounded-2xl overflow-hidden bg-[url('/img/diegofoto1.jpg')] bg-center bg-cover bg-no-repeat">
              {/* Overlay sutil */}
              <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

              {/* REDES SOCIALES */}
              <div className="relative z-10 flex items-center justify-center p-4 sm:p-5 gap-2 sm:gap-3"></div>

              {/* BOTÓN CV */}
              <div className="relative z-10 mx-4 mb-4 sm:mx-5 sm:mb-5">
                <a
                  href="/cv/cv-diego-garcia-rocha.pdf"
                  download
                  className="w-full flex items-center justify-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-sm font-medium transition-all hover:bg-white/20 hover:border-white/30 group"
                >
                  <ArrowDownToLine className="w-4 h-4 text-brand transition-transform group-hover:translate-y-0.5" />
                  Descargar CV
                  <span className="ml-auto text-[10px] tracking-widest uppercase text-white/40">
                    PDF
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* ══ COL 2 — BIO ══ */}
          <div className="bg-white rounded-2xl min-h-[460px] sm:min-h-[520px] lg:h-[600px] flex flex-col overflow-hidden relative">
            <div className="p-6 sm:p-8 flex-1 flex flex-col">
              {/* Badge trabajo actual */}
              <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-neutral-100">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-base sm:text-lg text-black tracking-tight">
                      PULULART.
                    </h4>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                      UI/UX Designer · Web Developer
                    </p>
                  </div>
                  <span className="art shrink-0 flex items-center gap-1.5 text-2xl md:text-4xl text-brand font-semibold">
                    <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                    (Activo)
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary">jul. 2024 – hoy</Badge>
                  <Badge variant="secondary">La Coruña, Galicia</Badge>
                  <Badge variant="secondary">Jornada completa</Badge>
                </div>
              </div>

              {/* Texto bio */}
              <div className="flex-1 flex flex-col justify-center space-y-3 sm:space-y-3.5">
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Diseñador UI/UX y desarrollador frontend especializado en la
                  creación de productos digitales centrados en el usuario.
                  Combino investigación, arquitectura de información, diseño de
                  interfaces y desarrollo para transformar necesidades de
                  negocio en experiencias intuitivas, accesibles y escalables.
                </p>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Me apasiona comprender el comportamiento de los usuarios y
                  convertir datos, ideas y objetivos estratégicos en soluciones
                  digitales que generen valor real para las personas y las
                  organizaciones.
                </p>
              </div>
            </div>

            {/* MARQUEE */}
            <div className="mt-auto border-t border-neutral-100 p-2">
              <p className="uppercase font-bold text-xs sm:text-sm px-5 py-4">
                Empresas para las que he trabajado:
              </p>
              <ExperienceMarquee />
            </div>
          </div>

          {/* ══ COL 3 — FORM + EDUCACIÓN ══ */}
          <div className="flex flex-col h-auto lg:h-[600px] gap-3 sm:gap-4">
            {/* ── FORMULARIO ── */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 flex-2 relative">
              <div className="relative mb-6 sm:mb-8 w-fit">
                <p className="text-2xl leading-tighter font-semibold">
                  <span className="text-3xl sm:text-4xl art">
                    ¿Tienes una idea?
                  </span>
                  <br></br>
                  Vamos a darle forma
                </p>
                <img
                  src="/img/arrow-dt.svg"
                  alt="arrow"
                  className="absolute hidden lg:block -top-36 -right-2 w-46 rotate-6 pointer-events-none"
                />
              </div>

              <form onSubmit={handleSubmit} className="space-y-2.5">
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Nombre*"
                  className="w-full rounded-md bg-neutral-50 px-3.5 py-2.5 text-xs placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="Teléfono*"
                    className="w-full rounded-md bg-neutral-50 px-3.5 py-2.5 text-xs placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                  />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Email*"
                    className="w-full rounded-md  bg-neutral-50 px-3.5 py-2.5 text-xs placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                  />
                </div>
                <textarea
                  required
                  name="message"
                  placeholder="Cuéntame tu idea..."
                  rows={3}
                  className="w-full rounded-md bg-neutral-50 px-3.5 py-2.5 text-xs placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all resize-none"
                />
                <Button
                  className="text-sm w-full sm:w-auto cursor-pointer"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar"}
                </Button>
                {success && (
                  <p className="text-green-600 text-xs mt-2">
                    Mensaje enviado correctamente
                  </p>
                )}

                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </form>
            </div>

            {/* ── EDUCACIÓN ── */}
            <div className="bg-white rounded-2xl text-sm flex-1 py-5 sm:py-6 justify-center sm:px-6 flex flex-col gap-0 overflow-hidden">
              <div className="relative ml-1.5">
                {/* Item 1 */}
                <div className="relative pb-6">
                  <div className="pl-6">
                    <p className="font-semibold text-neutral-800 leading-snug">
                      Técnico Superior en Desarrollo de Aplicaciones Web
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant="secondary">2022–2024</Badge>
                      <span className="text-neutral-400 text-xs">
                        CPR Liceo La Paz
                      </span>
                    </div>
                  </div>
                </div>
                {/* Item 2 */}
                <div className="relative">
                  <div className="pl-6">
                    <p className="font-semibold text-neutral-800 leading-snug">
                      Técnico Superior en Gestión de Ventas y Espacios
                      Comerciales
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant="secondary">2015–2017</Badge>
                      <span className="text-neutral-400 text-xs">
                        ES Ramón Menéndez Pidal
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
