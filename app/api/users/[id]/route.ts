import { User } from "@/app/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { error } from "console";
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

const getUser = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    // findUnique es un método de Prisma que busca un registro único en la base de datos según el criterio especificado. En este caso, se busca un usuario con un id específico.
    where: { id: parseInt(id) }, // Nuestro ID esta en formato string, por lo que debemos convertirlo a número entero usando parseInt antes de pasarlo al método findUnique.
  });
  return user;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await getUser(id);
    if (!user) {
      return NextResponse.json(
        { message: `Usuario con ID: ${id} no encontrado` },
        { status: 404 },
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al obtener el usuario" },
      { status: 500 },
    );
  }
}

// Metodo PUT

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await getUser(id); // Se utiliza lo mismo ya que es el mismo proceso para encontrar un usuario con el id

    if (!user) {
      return NextResponse.json(
        { message: `Usuario con ID: ${id} no encontrado` },
        { status: 404 },
      );
    }
    // Buscamos el body y Validamos lo que enviamos usando Zod
    const body = await request.json();

    const result = userSchema.safeParse(body);
    if (!result.success) {
      const errors: Record<string, string> = {}; // creamos un diccionario para almacenar los errores de validación

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        errors[field] = issue.message;
      });
      return NextResponse.json(errors, { status: 400 });
    }

    //Aca actualizamos los datos mediante el id del usuario que nos llega por params y el body que nos llega por request
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: result.data, // result.data contiene los datos validados por Zod
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al actualizar el usuario" },
      { status: 500 },
    );
  }
}

// Metodo DELETE

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await getUser(id);

    if (!user) {
      return NextResponse.json(
        { message: `Usuario con ID: ${id} no encontrado` },
        { status: 404 },
      );
    }

    // Aca eliminamos el usuario mediante el id que nos llega por params
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { message: `Usuario "${user.username}" eliminado correctamente` },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al eliminar el usuario" },
      { status: 500 },
    );
  }
}
