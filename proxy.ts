// CUAndo alguien haga una consulta a cualquiera de nuestros endpoints, se va a ejecutar este proxy

//NextUrl envia un monton de informacion sobre la url

import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { ratelimit } from "./lib/rate-limit";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl; // La porcion de una URL hacia donde se esta enviando la solicitud
  const method = request.method; // El metodo HTTP de la solicitud (GET, POST, etc.)
  const timestamp = new Date().toLocaleTimeString(); // La fecha y hora en que se recibio la solicitud

  // Imprime en la consola la informacion de la solicitud

  console.log(`[${timestamp}] ${method} request to ${pathname}`);

  // Logica Redis

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ?? "anonymous";

  const { success, limit, remaining, reset } = await ratelimit.limit(ip);

  if (!success) {
    console.warn(
      `[${timestamp}] Rate limit excedido para IP ${ip} en ${pathname}`,
    );
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      },
    );
  }

  if (pathname.startsWith("/api/users")) {
    if (method === "GET") {
      console.log(
        `[${timestamp}] Acceso publico concedido (GET) en ${pathname}`,
      );
      return NextResponse.next(); // Permite que la solicitud continue la ejecucion
    }
  }

  if (pathname.startsWith("/api/posts")) {
    if (method === "GET") {
      console.log(
        `[${timestamp}] Acceso publico concedido (GET) en ${pathname}`,
      );
      return NextResponse.next(); // Permite que la solicitud continue la ejecucion
    }
  }

  if (pathname.startsWith("/api/auth")) {
    console.log(
      `[${timestamp}] Acceso publico concedido (GET/POST) en ${pathname}`,
    );
    return NextResponse.next(); // Permite que la solicitud continue la ejecucion
  }

  // Obtiene el encabezado de autorizacion de la solicitud

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    console.warn(`[${timestamp}] Acceso no autorizado a ${pathname}`);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.info(
    `[${timestamp}] Acceso autorizado a ${pathname} para el usuario ${session.user.id}`,
  );

  // const authHeader = request.headers.get("Authorization");
  // if  (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   console.warn(`[${timestamp}] Acceso no autorizado a ${pathname}`);
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  // Extrae el token del encabezado de autorizacion
  // const token = authHeader.split(" ")[1];
  // if(token!== "hola-mundo"){
  //   console.warn(`[${timestamp}] Token invalido para ${pathname}`);
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  return NextResponse.next(); // Permite que la solicitud continue la ejecucion
}

export const config = {
  // Indica que este proxy se ejecutara para cualquier solicitud que comience con /api/

  matcher: ["/api/:path*"],
};
