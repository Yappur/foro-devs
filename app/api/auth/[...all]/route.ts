import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Estos handlers se encargan de manejar las rutas de autenticación en Next.js,
// delegando la lógica a la librería better-auth.

export const { GET, POST } = toNextJsHandler(auth);
