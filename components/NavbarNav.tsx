"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavbarLink = {
  href: string;
  label: string;
  meta: string;
};

type NavbarNavProps = {
  links: NavbarLink[];
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavbarNav({ links }: NavbarNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegacion principal" className="hidden min-[920px]:block">
      <ul className="flex items-center gap-1">
        {links.map((link) => {
          const isActive = isActivePath(pathname, link.href);

          return (
            <li key={link.href}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={[
                  "dg-focus group relative flex min-h-11 flex-col justify-center px-3 py-2 font-sans text-sm font-semibold text-cream",
                  "transition-colors duration-200 hover:bg-ink/10",
                  isActive ? "bg-ink/15" : "",
                ].join(" ")}
                href={link.href}
              >
                <span>{link.label}</span>
                <span className="font-mono text-[10px] font-medium uppercase tracking-normal text-cream/70">
                  {link.meta}
                </span>
                <span
                  aria-hidden="true"
                  className={[
                    "absolute inset-x-3 bottom-1 h-px origin-left bg-cream transition-transform duration-200",
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100",
                  ].join(" ")}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
