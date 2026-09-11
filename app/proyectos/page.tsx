import { redirect } from "next/navigation";

import { PROJECTS } from "@/components/projects/projects.data";
export default function ProjectsPage() {
  redirect(`/proyectos/${PROJECTS[0].slug}`);
}