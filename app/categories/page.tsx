const categories = ["Next.js", "Prisma", "Auth", "Redis", "Docker", "TypeScript"];

export default function CategoriesPage() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <p className="font-mono text-xs font-semibold uppercase text-primary">
          tags/catalog
        </p>
        <h1 className="mt-3 font-mono text-4xl font-semibold text-ink">
          Categorias tecnicas
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-base leading-7 text-ink/75">
          Los temas ordenan la biblioteca y ayudan a encontrar documentacion por
          stack, problema o capa de arquitectura.
        </p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <li
            className="border-b border-l border-ink bg-cream p-4 font-mono text-sm font-semibold text-ink"
            key={category}
          >
            #{category}
          </li>
        ))}
      </ul>
    </section>
  );
}
