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
    .max(35, "El titulo debe tener como máximo 35 caracteres"),
  content: z
    .string()
    .trim()
    .min(80, "El contenido debe tener al menos 80 caracteres")
    .max(5000, "El contenido debe tener como máximo 5000 caracteres"),
  // categoryId: z.string().cuid(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const session = await requireSession(request);

    const result = postSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          detalles: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const existingPost = await prisma.post.findUnique({
      where: { id },
      select: { id: true, authorId: true },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: "Post no encontrado" },
        { status: 404 },
      );
    }

    if (existingPost.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "No autorizado para editar este post" },
        { status: 403 },
      );
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: result.data,
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return errorHandler(error, "PUT /posts");
  }
}

export async function DELETE(request: NextRequest) {}
