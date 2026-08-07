import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import z from "zod";
import { requireSession } from "@/auth/require-session";
import { errorHandler } from "@/utils/errorHandler";

const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "El titulo debe tener al menos 3 caracteres")
    .max(20, "El titulo debe tener como máximo 35 caracteres"),
  content: z
    .string()
    .trim()
    .min(80, "El contenido debe tener al menos 80 caracteres")
    .max(5000, "El contenido debe tener como máximo 5000 caracteres"),
  // categoryId: z.string().cuid(),
});

export async function GET(_request: NextRequest) {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return errorHandler(error, "GET /posts");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Usuario Logueado - de aca sacamos el authorID
    const session = await requireSession(request);

    // Validar el body usando Zod
    const result = postSchema.safeParse(body);
    if (!result.success) {
      const errors: Record<string, string> = {}; // creamos un diccionario para almacenar los errores de validación

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        errors[field] = issue.message;
      });

      return NextResponse.json(errors, { status: 400 });
    }

    console.log("Session User:", session?.user);
    console.log("Validated Data:", result.data);

    const newPost = await prisma.post.create({
      data: {
        ...result.data,
        authorId: session.user.id,
      },
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return errorHandler(error, "POST /posts");
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Usuario Logueado - de aca sacamos el authorID
    const session = await requireSession(request);

    // Validar el body usando Zod
    const result = postSchema.safeParse(body);
    if (!result.success) {
      const errors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        errors[field] = issue.message;
      });

      return NextResponse.json(errors, { status: 400 });
    }

    const updatedPost = await prisma.post.update({
      where: { id: body.id },
      data: {
        ...result.data,
        authorId: session.user.id,
      },
    });
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return errorHandler(error, "PUT /posts");
  }
}

export async function DELETE(request: NextRequest) {}
