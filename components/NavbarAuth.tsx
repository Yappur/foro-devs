"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export type NavbarUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
  username?: string | null;
};

type NavbarAuthProps = {
  user: NavbarUser | null;
  compact?: boolean;
};

function getInitials(user: NavbarUser) {
  const source = user.username || user.name || user.email || "DG";
  const parts = source.split(/[ ._-]+/).filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function NavbarAuth({ user, compact = false }: NavbarAuthProps) {
  const router = useRouter();
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const signIn = async (provider: "github" | "google") => {
    setPendingAction(provider);
    await authClient.signIn.social({ provider, callbackURL: "/" });
    setPendingAction(null);
  };

  const signOut = async () => {
    setPendingAction("sign-out");
    await authClient.signOut();
    router.refresh();
    setPendingAction(null);
  };

  if (!user) {
    return (
      <div
        className={[
          "flex items-center",
          compact ? "grid grid-cols-2 gap-2" : "gap-2",
        ].join(" ")}
      >
        <button
          className="dg-focus dg-pressable bg-cream px-3 py-2 font-mono text-sm font-semibold text-ink hover:bg-mint disabled:cursor-not-allowed disabled:opacity-60"
          disabled={pendingAction !== null}
          onClick={() => signIn("github")}
          type="button"
        >
          GitHub
        </button>
        <button
          className="dg-focus dg-pressable bg-primary/20 px-3 py-2 font-mono text-sm font-semibold text-cream hover:bg-ink/15 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={pendingAction !== null}
          onClick={() => signIn("google")}
          type="button"
        >
          Google
        </button>
      </div>
    );
  }

  const displayName = user.username || user.name || user.email || "Perfil";

  return (
    <div
      className={[
        "flex items-center",
        compact ? "grid gap-2" : "gap-2",
      ].join(" ")}
    >
      <Link
        className="dg-focus group flex min-w-0 items-center gap-2 px-2 py-1.5 text-cream transition-colors hover:bg-ink/10"
        href="/profile"
      >
        <span className="flex size-9 shrink-0 items-center justify-center bg-ink font-mono text-xs font-semibold text-cream">
          {getInitials(user)}
        </span>
        <span className="min-w-0 text-left">
          <span className="block truncate font-sans text-sm font-semibold leading-4">
            {displayName}
          </span>
          <span className="block font-mono text-[10px] uppercase leading-4 text-cream/70">
            {user.role || "USER"}
          </span>
        </span>
      </Link>
      <button
        className="dg-focus dg-pressable bg-cream px-3 py-2 font-mono text-sm font-semibold text-ink hover:bg-mint disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pendingAction !== null}
        onClick={signOut}
        type="button"
      >
        Salir
      </button>
    </div>
  );
}
