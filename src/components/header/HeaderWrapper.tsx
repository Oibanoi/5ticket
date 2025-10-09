"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header/Header";

export function HeaderWrapper() {
  const pathname = usePathname();
  const isAdminPage = pathname?.includes("/admin");

  if (isAdminPage) {
    return null;
  }

  return <Header />;
}
