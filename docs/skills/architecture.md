---
name: devsgnosis-architecture
description: Guía de arquitectura de software para DevsGnosis, plataforma de documentación técnica colaborativa construida con Next.js, PostgreSQL, Prisma, Better Auth, Redis, TailwindCSS, TypeScript y Docker. Usar SIEMPRE que se diseñe o modifique estructura de carpetas, modelos de base de datos/Prisma schema, API routes o Server Actions, lógica de autenticación/autorización, caching con Redis, el flujo de "requests" de actualización de documentación (tipo pull request), la generación del "libro virtual" a partir de páginas de documentación, versionado de contenido, configuración de Docker/docker-compose, o cualquier decisión de backend/infraestructura del proyecto — incluso si el usuario no menciona la palabra "arquitectura" explícitamente.
---

# DevsGnosis — Arquitectura de Software

Guía de arquitectura para **DevsGnosis**: plataforma donde developers publican documentación técnica, proponen actualizaciones (tipo pull request) y consumen todo como un "libro virtual" navegable.

Stack: **Next.js (App Router) + TypeScript + PostgreSQL + Prisma + Better Auth + Redis + TailwindCSS + Docker**.

Usa esta skill como checklist arquitectónico antes de generar schema, endpoints, o estructura de carpetas.

## 1. Modelo de datos (Prisma) — Dominio central

Entidades núcleo del producto:

- `User` — gestionado por Better Auth (no reinventar tablas de sesión/cuenta a mano).
- `Category` — categorías/tags (Next.js, Prisma, Docker, etc.).
- `Post` — una página de documentación individual, pertenece a una `Category` y opcionalmente a un `Book`.

// Faltan agregar las siguientes: 
- `PostVersion` — snapshot versionado de cada `Post` (necesario para mostrar diffs e historial).
- `UpdateRequest` — propuesta de cambio tipo "PR" sobre un `Post`, con `status` (`PENDING`, `APPROVED`, `REJECTED`, `MERGED`).
- `Book` — agrupación ordenada de `Post`s que arma el "libro virtual".
- `BookSection` — tabla pivote con orden explícito entre `Book` y `Post`.

## 2. Autenticación y autorización (Better Auth)

- Instancia única de Better Auth en `server/auth/auth.ts`, montada en `app/api/auth/[...all]/route.ts`.
- Usar el adaptador de Prisma oficial de Better Auth (`better-auth/adapters/prisma`) contra el mismo `PrismaClient` singleton.

## 3. Caching y Rate Limiting (Redis)

- **Rate limiting**: limitar cuántas `UpdateRequest` puede crear un usuario por hora (evitar spam) usando un contador con TTL en Redis (`ratelimit:update-request:{userId}`).
- **Caché de contenido**: cachear el resultado de la compilación de MDX/Markdown ya renderizado a HTML bajo la clave `post:rendered:{postId}:{versionId}`.

## 4. Construcción del "libro virtual"

- `book-builder.service.ts` es responsable de ensamblar un `Book` completo: trae `BookSections` ordenadas, resuelve el `Post` de cada una (usando `currentVersionId` para asegurar contenido publicado) y arma la estructura de navegación (TOC).
- La navegación entre páginas del libro (prev/next) se calcula desde el `order` de `BookSection`, no desde los IDs.

## 5. Docker y entornos

- `Dockerfile` debe usar build multi-stage (deps → build → runtime).
- Las migraciones (`npx prisma migrate deploy`) corren en el pipeline de CI/deploy, nunca al bootear el contenedor en producción.

## 6. Principios generales

- **Server Actions delgadas, servicios gordos**: la Server Action valida input (`zod`) + sesión y delega a un servicio en `lib/services/`.
- **Un solo `PrismaClient` y un solo cliente Redis** por proceso (singletons en `lib/`).
- **Nunca confiar en el cliente**: validar permisos server-side en cada Server Action.