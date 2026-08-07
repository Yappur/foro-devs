// lib/errors/handle-api-error.ts
import { NextResponse } from "next/server";
import { Prisma } from "../app/generated/prisma/client";
import { AppError } from "./appError";

export function errorHandler(error: unknown, context?: string) {
  // Log siempre con contexto, para saber en qué endpoint pasó
  console.error(`[API Error]${context ? ` ${context}:` : ""}`, error);

  // 1. Errores de negocio personalizados
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode },
    );
  }

  // 2. Errores conocidos de Prisma (constraint violations, etc.)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": // Unique constraint failed
        return NextResponse.json(
          {
            error: `Ya existe un registro con ese ${error.meta?.target ?? "valor"}`,
          },
          { status: 409 },
        );
      case "P2025": // Record not found (update/delete sobre algo inexistente)
        return NextResponse.json(
          { error: "El registro no existe" },
          { status: 404 },
        );
      default:
        return NextResponse.json(
          { error: "Error de base de datos" },
          { status: 500 },
        );
    }
  }

  // 3. Errores de validación de Prisma (tipos incorrectos, etc.)
  if (error instanceof Prisma.PrismaClientValidationError) {
    return NextResponse.json(
      { error: "Datos inválidos para la operación" },
      { status: 400 },
    );
  }

  // 4. Cualquier otro error (Error nativo o desconocido)
  const message =
    error instanceof Error ? error.message : "Error interno del servidor";
  return NextResponse.json({ error: message }, { status: 500 });
}
