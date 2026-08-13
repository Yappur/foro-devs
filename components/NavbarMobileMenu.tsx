"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { NavbarAuth, type NavbarUser } from "./NavbarAuth";
import type { NavbarLink } from "./NavbarNav";

type NavbarMobileMenuProps = {
  links: NavbarLink[];
  user: NavbarUser | null;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavbarMobileMenu({ links, user }: NavbarMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <div className="min-[920px]:hidden">
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className="dg-focus dg-pressable flex size-11 items-center justify-center bg-cream text-ink"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="sr-only">Abrir navegacion</span>
        <span aria-hidden="true" className="grid gap-1.5">
          <span
            className={[
              "block h-0.5 w-5 bg-ink transition-transform duration-200",
              isOpen ? "translate-y-2 rotate-45" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block h-0.5 w-5 bg-ink transition-opacity duration-200",
              isOpen ? "opacity-0" : "opacity-100",
            ].join(" ")}
          />
          <span
            className={[
              "block h-0.5 w-5 bg-ink transition-transform duration-200",
              isOpen ? "-translate-y-2 -rotate-45" : "",
            ].join(" ")}
          />
        </span>
      </button>

      <div
        className={[
          "absolute inset-x-0 top-full z-40 border-b border-l border-ink bg-primary px-4 pb-4 pt-3 text-cream shadow-none",
          "origin-top transition duration-200",
          isOpen
            ? "pointer-events-auto translate-y-0 scale-y-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-y-95 opacity-0",
        ].join(" ")}
        id={panelId}
      >
        <form action="/docs" className="mb-3">
          <label className="sr-only" htmlFor="mobile-navbar-search">
            Buscar documentacion
          </label>
          <div className="flex border-b border-l border-ink bg-cream">
            <span
              aria-hidden="true"
              className="flex items-center px-3 font-mono text-sm text-ink/60"
            >
              /
            </span>
            <input
              className="min-h-11 min-w-0 flex-1 bg-transparent px-1 font-sans text-sm text-ink outline-none placeholder:text-ink/55"
              id="mobile-navbar-search"
              name="q"
              placeholder="Buscar en la biblioteca"
              type="search"
            />
            <button
              className="dg-focus px-3 font-mono text-xs font-semibold text-ink hover:bg-mint"
              type="submit"
            >
              IR
            </button>
          </div>
        </form>

        <div className="mb-3 grid gap-2">
          <Link
            className="dg-focus dg-pressable bg-cream px-3 py-3 font-mono text-sm font-semibold text-ink hover:bg-mint"
            href="/docs/new"
            onClick={() => setIsOpen(false)}
          >
            Publicar doc
          </Link>
          <Link
            className="dg-focus dg-pressable bg-ink px-3 py-3 font-mono text-sm font-semibold text-cream hover:bg-ink/85"
            href="/requests"
            onClick={() => setIsOpen(false)}
          >
            Revisar aportes
          </Link>
        </div>

        <nav aria-label="Navegacion mobile">
          <ul className="grid gap-1">
            {links.map((link) => {
              const isActive = isActivePath(pathname, link.href);

              return (
                <li key={link.href}>
                  <Link
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "dg-focus flex items-center justify-between px-3 py-3 font-sans text-sm font-semibold transition-colors hover:bg-ink/10",
                      isActive ? "bg-ink/15" : "",
                    ].join(" ")}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-[10px] uppercase text-cream/70">
                      {link.meta}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-3 border-t border-ink/25 pt-3">
          <NavbarAuth compact user={user} />
        </div>
      </div>
    </div>
  );
}
