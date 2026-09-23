import Image from "next/image";
import { SquareArrowOutUpRight, Figma } from "lucide-react";

import type { Project } from "./projects.data";

interface ProjectContentProps {
  project: Project;
}

export default function ProjectContent({ project }: ProjectContentProps) {
  return (
    <article className="min-w-0 rounded-[10px] bg-white">
      <div className="flex flex-col gap-5 p-[10px]">
        {/* HEADER */}

        <header className="px-[10px] py-[20px]">
          <div className="flex flex-wrap items-start gap-[40px]">
            <h1 className="text-[clamp(42px,6vw,80px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-[#333]">
              {project.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-[5px]"
                >
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#a1ff62]">
                    <SquareArrowOutUpRight size={15} />
                  </span>

                  <span className="text-[13px] text-tipoclara">
                    Visitar sitio web
                  </span>
                </a>
              )}

              {project.figmaUrl && (
                <a
                  href={project.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-[5px]"
                >
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#a1ff62]">
                    <Figma size={15} />
                  </span>

                  <span className="text-[13px] text-tipoclara">
                    Ver prototipo en Figma
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* CATEGORÍAS */}

          <div className="mt-8 flex flex-wrap gap-x-[50px] gap-y-6">
            {project.categories.map((category) => (
              <div key={category.title} className="flex flex-col gap-[8px]">
                <p className="text-[13px] font-semibold text-tipo">
                  {category.title}
                </p>

                <div>
                  {category.items.map((item) => (
                    <p key={item} className="text-[13px] text-tipoclara">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* HERO */}

        <div className="relative aspect-11/6 md:aspect-16/6 w-full overflow-hidden rounded-lg bg-[#d9d9d9]">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
          />
        </div>

        {/* SECCIONES */}

        {project.sections.map((section, index) => (
          <section
            key={`${section.title}-${index}`}
            className="flex flex-col gap-5"
          >
            {/* TEXTO */}

            <div className="flex min-h-[350px] items-center justify-center px-[20px] py-[70px]">
              <div className="w-full max-w-[820px]">
                <h2 className="mb-5 text-[30px] font-bold text-black">
                  {section.title}
                </h2>

                <div className="space-y-[10px] text-[14px] leading-[1.5] text-tipoclara">
                  {section.text.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* GALERÍA */}

            {section.images?.length ? (
              <div className="grid grid-cols-1 gap-[10px] md:grid-cols-2">
                {section.images.map((image, index) => (
                  <div
                    key={image}
                    className="relative aspect-3/3 overflow-hidden rounded-[8px] bg-[#d9d9d9]"
                  >
                    <Image
                      src={image}
                      alt={`${project.title} ${section.title} ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}
