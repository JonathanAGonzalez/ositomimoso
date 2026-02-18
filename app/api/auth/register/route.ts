import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

/**
 * POST /api/auth/register
 * Crea un nuevo usuario para el dashboard.
 *
 * Body: { email, password, name, role? }
 *
 * ⚠️ Este endpoint no tiene auth por ahora — usarlo solo para el setup inicial.
 * Después de crear el primer admin, podés protegerlo o eliminarlo.
 */
export async function POST(req: NextRequest) {
  try {
    const { email, password, name, role = "admin" } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "email, password y name son requeridos" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 8 caracteres" },
        { status: 400 },
      );
    }

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "Ya existe un usuario con ese email" },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      email: email.toLowerCase(),
      passwordHash,
      name,
      role,
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
