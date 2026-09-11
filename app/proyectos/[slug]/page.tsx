import { notFound } from "next/navigation";

import ProjectsSection from "@/components/projects/ProjectsSection";
import { PROJECTS } from "@/components/projects/projects.data";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = PROJECTS.find(
    (project) => project.slug === slug
  );

  if (!project) {
    notFound();
  }

  return <ProjectsSection activeProject={project} />;
}