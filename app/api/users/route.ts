import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import z from "zod";

const userSchema = z.object({
  username: z
    .string()
    .trim()
    .min(5, "El nombre debe tener al menos 5 caracteres")
    .max(20, "El nombre debe tener como máximo 20 caracteres"),
  email: z.email("El correo electrónico no es válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(20, "La contraseña debe tener como máximo 20 caracteres"),
});

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    ); // El NextResponse.json() es una función de utilidad proporcionada por Next.js para crear respuestas JSON de manera más sencilla. En este caso, se utiliza para devolver un objeto JSON que contiene un mensaje de error y un código de estado HTTP 500 (Internal Server Error) en caso de que ocurra un error al intentar obtener los usuarios desde la base de datos.
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar el body usando Zod
    const result = userSchema.safeParse(body);
    if (!result.success) {
      // const errors = z.treeifyError(result.error);

      const errors: Record<string, string> = {}; // creamos un diccionario para almacenar los errores de validación

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        errors[field] = issue.message;
      });
      return NextResponse.json(errors, { status: 400 });
    }

    const newUser = await prisma.user.create({
      // me conecto a mi modelo de usuario para hacer un create
      data: body, // le paso el body que me llega del request
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to CREATE user" },
      { status: 500 },
    );
  }
}
