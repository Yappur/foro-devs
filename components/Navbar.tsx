import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { NavbarAuth, type NavbarUser } from "./NavbarAuth";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { NavbarNav, type NavbarLink } from "./NavbarNav";

const primaryLinks: NavbarLink[] = [
  { href: "/", label: "Inicio", meta: "root" },
  { href: "/docs", label: "Biblioteca", meta: "docs" },
  { href: "/categories", label: "Categorias", meta: "tags" },
  { href: "/requests", label: "Aportes", meta: "prs" },
];

async function getNavbarUser(): Promise<NavbarUser | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return null;
    }

    const user = session.user as NavbarUser;

    return {
      email: user.email,
      image: user.image,
      name: user.name,
      role: user.role,
      username: user.username,
    };
  } catch {
    return null;
  }
}

export default async function Navbar() {
  const user = await getNavbarUser();

  return (
    <header className="sticky top-0 z-50 border-b border-ink">
      <div className="dg-navbar-grid relative text-cream">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-cream/35"
        />
        <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            className="dg-focus group flex min-w-0 shrink-0 items-center gap-3 py-3"
            href="/"
          >
            <span
              aria-hidden="true"
              className="relative grid size-11 place-items-center border-b border-l border-ink bg-cream font-mono text-sm font-semibold text-ink"
            >
              DG
              <span className="absolute -right-1 -top-1 size-2 bg-mint" />
              <span className="absolute -bottom-1 left-2 h-1 w-5 bg-ink" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-mono text-lg font-semibold leading-5 text-cream">
                DevsGnosis
              </span>
              <span className="hidden font-mono text-[10px] font-medium uppercase leading-4 text-cream/75 sm:block">
                knowledge://index
              </span>
            </span>
          </Link>

          <div className="hidden h-10 w-px bg-ink/25 min-[920px]:block" />

          <NavbarNav links={primaryLinks} />

          <form
            action="/docs"
            className="ml-auto hidden min-w-52 max-w-xs flex-1 min-[720px]:block"
            role="search"
          >
            <label className="sr-only" htmlFor="navbar-search">
              Buscar documentacion
            </label>
            <div className="flex min-h-11 items-center border-b border-l border-ink bg-cream text-ink transition-colors focus-within:bg-white">
              <span
                aria-hidden="true"
                className="px-3 font-mono text-sm text-ink/60"
              >
                /
              </span>
              <input
                className="min-w-0 flex-1 bg-transparent pr-2 font-sans text-sm text-ink outline-none placeholder:text-ink/55"
                id="navbar-search"
                name="q"
                placeholder="Buscar docs"
                type="search"
              />
              <button
                className="dg-focus mr-1 px-2 py-1 font-mono text-[11px] font-semibold uppercase text-ink hover:bg-mint"
                type="submit"
              >
                Enter
              </button>
            </div>
          </form>

          <div className="hidden items-center gap-2 min-[920px]:flex">
            <Link
              className="dg-focus dg-pressable bg-cream px-3 py-2 font-mono text-sm font-semibold text-ink hover:bg-mint"
              href="/docs/new"
            >
              Publicar doc
            </Link>
            <NavbarAuth user={user} />
          </div>

          <div className="ml-auto flex items-center gap-2 min-[920px]:hidden">
            <Link
              className="dg-focus dg-pressable hidden bg-cream px-3 py-2 font-mono text-sm font-semibold text-ink hover:bg-mint min-[480px]:inline-flex"
              href="/docs/new"
            >
              Publicar
            </Link>
            <NavbarMobileMenu links={primaryLinks} user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}
