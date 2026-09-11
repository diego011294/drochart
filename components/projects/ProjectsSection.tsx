"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import ProjectsSidebar from "./ProjectsSidebar";
import ProjectContent from "./ProjectContent";

import { PROJECTS, type Project } from "./projects.data";

interface ProjectsSectionProps {
  activeProject?: Project;
}

export default function ProjectsSection({
  activeProject = PROJECTS[0],
}: ProjectsSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (!contentRef.current) return;

    // Evitamos animar la entrada inicial
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: "power2.out",
      }
    );
  }, [activeProject.slug]);

  return (
    <section className="w-full px-2 py-20 md:px-[10px]">
      <div className="mx-auto flex max-w-[1750px] items-start gap-[10px]">

        {/* PROJECTS MENU */}
        <aside className="sticky top-15 z-40">
          <ProjectsSidebar
            projects={PROJECTS}
            activeSlug={activeProject.slug}
          />
        </aside>

        {/* PROJECT CONTENT */}
        <main className="min-w-0 flex-1 pb-24 md:pb-0">
          <div ref={contentRef}>
            <ProjectContent project={activeProject} />
          </div>
        </main>

      </div>
    </section>
  );
}