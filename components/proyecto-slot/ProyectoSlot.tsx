"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";

interface ProyectoSlotProps {
  image: string;
  logo?: string;   
  title: string;
  subtitle: string;
  tag: string;
  url: string;
}

export default function ProyectoSlot({
  image,
  logo,
  title,
  subtitle,
  tag,
  url

}: ProyectoSlotProps) {
  return (
  <Link target="_blank" rel="noopener noreferrer" href={url}>
    <div className="w-full p-2 bg-white rounded-2xl text-tipo overflow-hidden group transition-all duration-300">
      {/* Imagen */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
      {/* Logo centrado dinámico */}
        {logo && (
          <div className="
            absolute inset-0 flex justify-center items-center 
            z-20 pointer-events-none
          ">
            <Image
              src={logo}
              alt="logo"
              width={120}
              height={120}
              className="
                opacity-80 transition-all duration-500
                group-hover:scale-90 group-hover:opacity-100
              "
            />
          </div>
        )}
        <Image
          src={image}
          alt={title}
          fill
          className="
            object-cover transition-all duration-500
            group-hover:scale-105 group-hover:blur-sm
          "
        />
      </div>

      {/* Contenido */}
      
      <div className="p-4 flex justify-between items-start">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-start gap-2">
              <h1 className="font-semibold text-md">{title}</h1>
              <Badge variant="default" className="order-first">
                {tag}
              </Badge>
            </div>
            <div
              className="text-tipo px-2 py-2 rounded-full bg-brand cursor-pointer"
            >
              <ArrowUpRight size={15} />
            </div>
          </div>
          <p className="text-tipoclara text-sm mt-1">
            {subtitle}
          </p>
        </div>
      </div> 
    </div>
    </Link>
  );
}