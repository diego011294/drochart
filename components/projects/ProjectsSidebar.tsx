import Image from "next/image";
import Link from "next/link";

import type { Project } from "./projects.data";
import { Plus } from "lucide-react";

interface ProjectsSidebarProps {
  projects: Project[];
  activeSlug: string;
}

export default function ProjectsSidebar({
  projects,
  activeSlug,
}: ProjectsSidebarProps) {
  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}

      <div className="hidden w-[320px] shrink-0 md:block">
        <div className="sticky top-6 space-y-[10px]">

          {projects.map((project) => {
            const isActive = project.slug === activeSlug;

            return (
              <Link
                key={project.id}
                href={`/proyectos/${project.slug}`}
                className="block w-full transition-opacity duration-300"
                style={{
                  opacity: isActive ? 1 : 0.5,
                }}
              >
                <div className="relative flex h-[91px] w-full flex-col gap-[5px] overflow-hidden rounded-[10px] bg-white p-[5px]">

                  {/* HEADER */}

                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#707070]">
                      {project.type}
                    </span>

                    <span className="flex size-[20px] items-center justify-center rounded-full bg-[#a1ff62] text-[14px]">
                      <Plus size={12} />
                    </span>
                  </div>

                  {/* CONTENT */}

                  <div className="flex min-h-0 flex-1 items-center gap-[10px]">

                    {/* THUMBNAIL */}

                    <div className="relative size-[56px] shrink-0 overflow-hidden rounded-[8px] bg-[#d9d9d9]">
                      <Image
                        src={project.thumbnail}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover object-center"
                      />
                    </div>

                    {/* TEXT */}

                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-[5px]">

                      <p className="truncate text-[13px] font-semibold uppercase text-[#121212]">
                        {project.title}
                      </p>

                      <p className="line-clamp-2 text-[12px] text-[#707070]">
                        {project.shortDescription}
                      </p>

                    </div>

                  </div>
                </div>
              </Link>
            );
          })}

        </div>
      </div>


      {/* =====================================================
          MOBILE PROJECT SELECTOR
      ====================================================== */}

      <div className="fixed bottom-0 left-0 right-0 z-50 w-full pb-[env(safe-area-inset-bottom)] md:hidden">

        <div className="w-full overflow-x-auto px-2 py-2">

          <div className="flex w-max gap-3 rounded-lg bg-white/50 backdrop-blur-md p-1 shadow-xs">

            {projects.map((project) => {
              const isActive = project.slug === activeSlug;

              return (
                <Link
                  key={project.id}
                  href={`/proyectos/${project.slug}`}
                  className={`
                    size-[50px]
                    shrink-0
                    overflow-hidden
                    rounded-lg
                    border-2
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "border-gray-200 shadow-xs"
                        : "border-transparent opacity-50"
                    }
                  `}
                >
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={72}
                    height={72}
                    sizes="72px"
                    className="h-full w-full object-cover object-center"
                  />
                </Link>
              );
            })}

          </div>

        </div>

      </div>
    </>
  );
}