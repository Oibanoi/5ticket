"use client";

import { ReactNode } from "react";
import { AuthProvider as AuthContextProvider } from "@/contexts/AuthContext";
import { GlobalAuthModal } from "@/components/modal/auth-modal/GlobalAuthModal";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <AuthContextProvider>
      {children}
      <GlobalAuthModal />
    </AuthContextProvider>
  );
}
