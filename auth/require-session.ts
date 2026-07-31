import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function requireSession(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}
