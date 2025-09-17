"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

type NavbarProps = {
  activePage?: string;
  setActivePage?: Dispatch<SetStateAction<string>>;
};

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  // local state for uncontrolled usage
  const [mounted, setMounted] = useState(false);
  const [localActive, setLocalActive] = useState<string>(activePage ?? "dashboard");

  // ensure mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // keep local state in sync if parent supplies activePage
  useEffect(() => {
    if (activePage !== undefined) {
      setLocalActive(activePage);
    }
  }, [activePage]);

  // If both activePage and setActivePage are provided, treat as controlled component
  const isControlled = typeof setActivePage === "function" && activePage !== undefined;
  const currentActive = isControlled ? activePage! : localActive;

  const updateActive = (page: string) => {
    if (isControlled) {
      setActivePage!(page);
    } else {
      setLocalActive(page);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-12 lg:px-24 py-3 bg-[#80b6ff] shadow-md">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/min.svg" alt="Mind Haven" width={40} height={40} priority />
        <div className="text-black">
          <div className="font-semibold text-lg md:text-xl leading-none">Mind</div>
          <div className="text-xs md:text-sm -mt-1 tracking-wide">Haven</div>
        </div>
      </Link>

      {/* Buttons (render after mount to avoid hydration mismatch) */}
      {mounted && (
        <div className="flex gap-3">
          <Link href="/dashboard">
            <Button
              onClick={() => updateActive("dashboard")}
              className={`rounded-full px-5 transition ${
                currentActive === "dashboard"
                  ? "bg-sky-600 text-white"
                  : "bg-sky-400 hover:bg-sky-500 text-white"
              }`}
            >
              Dashboard
            </Button>
          </Link>

          <Link href="/faq">
            <Button
              onClick={() => updateActive("faq")}
              className={`rounded-full px-5 transition ${
                currentActive === "faq"
                  ? "bg-sky-600 text-white"
                  : "bg-sky-400 hover:bg-sky-500 text-white"
              }`}
            >
              FAQ
            </Button>
          </Link>

          <Link href="/about">
            <Button
              onClick={() => updateActive("about")}
              className={`rounded-full px-5 transition ${
                currentActive === "about"
                  ? "bg-sky-600 text-white"
                  : "bg-sky-400 hover:bg-sky-500 text-white"
              }`}
            >
              About
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
