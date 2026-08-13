type DocsPageProps = {
  searchParams: Promise<{
    q?: string | string[];
  }>;
};

export default async function DocsPage({ searchParams }: DocsPageProps) {
  const query = (await searchParams).q;
  const normalizedQuery = Array.isArray(query) ? query[0] : query;

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="font-mono text-xs font-semibold uppercase text-primary">
          docs/index
        </p>
        <h1 className="mt-3 font-mono text-4xl font-semibold text-ink">
          Biblioteca DevsGnosis
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-base leading-7 text-ink/75">
          Un indice vivo para documentacion tecnica, organizado para leer,
          revisar y mejorar conocimiento entre developers.
        </p>
      </div>

      {normalizedQuery ? (
        <div className="border-b border-l border-ink bg-cream p-4 font-mono text-sm text-ink">
          Busqueda activa: <span className="font-semibold">{normalizedQuery}</span>
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-3">
        {["Fundamentos", "Backend", "Frontend"].map((section) => (
          <article
            className="border-b border-l border-ink bg-cream p-4"
            key={section}
          >
            <h2 className="font-mono text-lg font-semibold text-ink">
              {section}
            </h2>
            <p className="mt-2 font-sans text-sm leading-6 text-ink/70">
              Coleccion preparada para conectar posts, categorias y versiones.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
