"use client";

import { authClient } from "@/lib/auth-client";

export default function Home() {

  const login = async (provider: ("google" | "github")) => {
    await authClient.signIn.social({ provider: provider, callbackURL: "/" });
  };

  const logout = async () => {
    await authClient.signOut();
    window.location.href = "/";
    window.location.reload();
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xl text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            La Biblia del programador/Desarrollo Web{" "}
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Encontra todos los conceptos mas nombrados para mantenerte al dia
          </p>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Todo lo que necesitas saber para convertirte en un programador web
            apto y capacitado para tener entrevistas de trabajo con conceptos
            claros y sólidos.
          </p>
        </div>


// iniciar sesion con google
        <div>
          <button
            onClick={() => login("google")}
            className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 dark:focus-visible:outline-zinc-50"
          >
            Iniciar sesión con Google
          </button>
        </div>
        // iniciar sesion con github
        <div>
          <button
            onClick={() => login("github")}
            className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 dark:focus-visible:outline-zinc-50"
          >
            Iniciar sesión con Github
          </button>
        </div>
        // cerrar sesion
        <div>
          <button
            onClick={logout}
            className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 dark:focus-visible:outline-zinc-50"
          >
            Cerrar sesión
          </button>
        </div>
      </main>
    </div>
  );
}
