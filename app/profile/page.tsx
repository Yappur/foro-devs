import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <p className="font-mono text-xs font-semibold uppercase text-primary">
          user/profile
        </p>
        <h1 className="mt-3 font-mono text-4xl font-semibold text-ink">
          Perfil
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-base leading-7 text-ink/75">
          Tu identidad dentro de la biblioteca colaborativa de DevsGnosis.
        </p>
      </div>

      <div className="border-b border-l border-ink bg-cream p-5">
        {session?.user ? (
          <dl className="grid gap-3 font-sans text-sm text-ink">
            <div>
              <dt className="font-mono text-xs uppercase text-primary">
                Nombre
              </dt>
              <dd className="mt-1 font-semibold">{session.user.name}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase text-primary">
                Email
              </dt>
              <dd className="mt-1 font-semibold">{session.user.email}</dd>
            </div>
          </dl>
        ) : (
          <p className="font-sans text-sm leading-6 text-ink/75">
            Inicia sesion desde el navbar para ver tu perfil.
          </p>
        )}
      </div>
    </section>
  );
}
