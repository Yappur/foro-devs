import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 
import { requireSession } from "@/auth/require-session";
import { errorHandler } from "@/utils/errorHandler"; 

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // saca acentos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(40, "El nombre debe tener como máximo 40 caracteres"),
});

export async function GET(_request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { posts: true } }, // útil para mostrar "React (12)"
      },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return errorHandler(error, "GET /categories");
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireSession(request);

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "No tenés permisos para crear categorías" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const result = categorySchema.safeParse(body);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        errors[field] = issue.message;
      });
      return NextResponse.json(errors, { status: 400 });
    }

    const slug = slugify(result.data.name);

    const newCategory = await prisma.category.create({
      data: {
        name: result.data.name,
        slug,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    // Prisma lanza error P2002 si el @unique falla (nombre o slug repetido)
    if ((error as { code?: string }).code === "P2002") {
      return NextResponse.json(
        { error: "Ya existe una categoría con ese nombre" },
        { status: 409 },
      );
    }
    return errorHandler(error, "POST /categories");
  }
}
