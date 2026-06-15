"use client";
import React, { useRef, useEffect, useState } from "react";
import { Button } from "../ui/button";
import gsap from "gsap";
import { ShieldCheck, X } from "lucide-react";
import { useContactForm } from "../../hook/useContactForm";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalForm({ isOpen, onClose }: ModalFormProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { submit, loading, success, error } = useContactForm();

  useEffect(() => {
    if (isOpen && overlayRef.current && modalRef.current) {
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(modalRef.current, { y: "100%", opacity: 0 });

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });

      gsap.to(modalRef.current, {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.05,
      });
    }
  }, [isOpen]);

  const closeModal = () => {
    if (overlayRef.current && modalRef.current) {
      gsap.to(modalRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        onComplete: onClose,
      });
    }
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);

  await submit(
    {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      website: formData.get("website") as string,
    },
    () => form.reset()
  );
};

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-end md:items-center justify-center"
      onClick={closeModal}
    >
      <div
        ref={modalRef}
        className=" bg-white rounded-t-xl sm:rounded-xl w-full md:w-3/4 max-w-3xl flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hidden md:flex w-full justify-center items-center p-3 overflow-hidden relative">
          <img
            src="/img/pato-form.png"
            alt="Contact Us"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <button
          onClick={closeModal}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="w-full md:w-[800px] p-6 md:p-8 flex flex-col">
          <div className="flex flex-col mb-5">
            <span className="art text-2xl sm:text-3xl font-bold text-tipo mb-1">Cuéntame</span>
            <h2 className="text-4xl w-80 font-bold mb-4 text-tipo leading-none">
              ¿Qué tienes en mente?
            </h2>
          </div>

          <form 
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full text-xs">
            <input
              required
              type="text"
              name="website"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />
            <input
              required
              name="name"
              type="text"
              placeholder="Nombre completo*"
              className="bg-white p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <div className="flex flex-col xl:flex-row gap-4 xl:gap-2">
              <input
                required
                name="phone"
                type="tel"
                placeholder="Teléfono*"
                className="bg-white w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
              />
              <input
                required
                name="email"
                type="email"
                placeholder="Email*"
                className="bg-white w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
              />
            </div>
            <textarea
              required
              name="message"
              placeholder="Cuéntame sobre tu proyecto...*"
              rows={3}
              className="bg-white p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <Button
              className="text-sm cursor-pointer w-full sm:w-auto"
              type="submit"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </Button>
            {success && (
              <p className="text-green-600">
                Mensaje enviado correctamente.
              </p>
            )}

            {error && (
              <p className="text-red-500">
                {error}
              </p>
            )}
            <div className=" flex text-xs text-gray-500 mt-2 w-full justify-center">
              <ShieldCheck className="w-6 h-6 mr-2" />
              Tu información se enviará a mi correo electrónico. Nunca
              compartida con terceros.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
