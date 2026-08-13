const lanes = [
  { label: "Pendientes", meta: "review" },
  { label: "Aprobados", meta: "merge-ready" },
  { label: "Historial", meta: "archive" },
];

export default function RequestsPage() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <p className="font-mono text-xs font-semibold uppercase text-primary">
          requests/flow
        </p>
        <h1 className="mt-3 font-mono text-4xl font-semibold text-ink">
          Aportes y requests
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-base leading-7 text-ink/75">
          El flujo de contribuciones conecta correcciones, revisiones y futuras
          versiones publicadas de cada documento.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {lanes.map((lane) => (
          <section
            className="min-h-40 border-b border-l border-ink bg-cream p-4"
            key={lane.label}
          >
            <p className="font-mono text-xs uppercase text-primary">
              {lane.meta}
            </p>
            <h2 className="mt-2 font-mono text-xl font-semibold text-ink">
              {lane.label}
            </h2>
            <p className="mt-4 font-sans text-sm leading-6 text-ink/70">
              Preparado para UpdateRequest, diffs e historial versionado.
            </p>
          </section>
        ))}
      </div>
    </section>
  );
}
