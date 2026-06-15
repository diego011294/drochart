import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    console.log("🚀 API /api/contact LLAMADA");
    const body = await req.json();

    const { name, email, phone, message, website } = body;

    console.log("📩 DATOS RECIBIDOS:", { name, email, phone });
    console.log("📨 DESTINO EMAIL:", "drochart.info@gmail.com");

    // Honeypot anti bots
    if (website) {
      return NextResponse.json(
        { error: "Bot detectado" },
        { status: 400 }
      );
    }

    // Validaciones simples
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos" },
        { status: 400 }
      );
    }

    // Regex email básica
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "DROCH.ART <onboarding@resend.dev>",
      to: "diego0112@hotmail.com",

      subject: `Nuevo mensaje de ${name}`,

      html: `
        <h2>Nuevo contacto</h2>

        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error enviando email" },
      { status: 500 }
    );
  }
}