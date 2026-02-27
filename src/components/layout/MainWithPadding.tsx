"use client";

import { usePathname } from "next/navigation";

export function MainWithPadding({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <main className={`flex-1 min-w-0 w-full min-h-screen ${!isHome ? "pt-20 sm:pt-22 md:pt-24" : ""}`}>
      {children}
    </main>
  );
}
