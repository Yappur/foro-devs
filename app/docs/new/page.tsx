export default function NewDocPage() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <p className="font-mono text-xs font-semibold uppercase text-primary">
          docs/new
        </p>
        <h1 className="mt-3 font-mono text-4xl font-semibold text-ink">
          Publicar documentacion
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-base leading-7 text-ink/75">
          Punto de entrada para crear una pagina tecnica y sumarla al corpus
          compartido de DevsGnosis.
        </p>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2 font-sans text-sm font-semibold text-ink">
          Titulo
          <input
            className="min-h-11 border-b border-l border-ink bg-cream px-3 font-sans font-normal outline-none focus-visible:ring-2 focus-visible:ring-ink"
            disabled
            name="title"
            placeholder="Ej: Server Components en Next.js"
            type="text"
          />
        </label>
        <label className="grid gap-2 font-sans text-sm font-semibold text-ink">
          Contenido
          <textarea
            className="min-h-48 resize-y border-b border-l border-ink bg-cream p-3 font-sans font-normal outline-none focus-visible:ring-2 focus-visible:ring-ink"
            disabled
            name="content"
            placeholder="Escribi la explicacion tecnica..."
          />
        </label>
        <button
          className="dg-focus dg-pressable w-fit cursor-not-allowed bg-muted px-4 py-2 font-mono text-sm font-semibold text-ink opacity-80"
          disabled
          type="button"
        >
          Editor en preparacion
        </button>
      </div>
    </section>
  );
}
