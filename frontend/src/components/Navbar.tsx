"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { setAuthToken } from "@/lib/api";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/resources", label: "Resources" },
  { href: "/peer-support", label: "Peer Support" },
  { href: "/book", label: "Book" },
  { href: "/analytics", label: "Analytics" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setAuthed(Boolean(token));
    setAuthToken(token || undefined);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setAuthToken(undefined);
    setAuthed(false);
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold">MindHaven</Link>

        <nav className="hidden gap-6 md:flex">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm hover:text-blue-600",
                pathname === l.href && "text-blue-600 font-medium"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {!authed ? (
            <Link href="/login">
              <Button variant="default" size="md" aria-label="Login">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            </Link>
          ) : (
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "py-2 text-sm",
                  pathname === l.href && "text-blue-600 font-medium"
                )}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2">
              {!authed ? (
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button className="w-full">Login</Button>
                </Link>
              ) : (
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
