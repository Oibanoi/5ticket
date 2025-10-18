"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { useSession } from "next-auth/react";
import { FormType } from "@/components/auth-modal";

interface AuthContextType {
  // Modal state
  isAuthModalOpen: boolean;
  authModalType: FormType;

  // Actions
  showLoginModal: () => void;
  showRegisterModal: () => void;
  closeAuthModal: () => void;
  loginRequired: (callback?: () => void) => void;

  // Pending action after login
  pendingAction: (() => void) | null;
  setPendingAction: (action: (() => void) | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<FormType>(FormType.Login);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const { data: session } = useSession();

  const showLoginModal = useCallback(() => {
    setAuthModalType(FormType.Login);
    setIsAuthModalOpen(true);
  }, []);

  const showRegisterModal = useCallback(() => {
    setAuthModalType(FormType.Register);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    // Execute pending action if exists after modal closes
    if (pendingAction) {
      setTimeout(() => {
        pendingAction();
        setPendingAction(null);
      }, 300); // Wait for modal close animation
    }
  }, [pendingAction]);

  const loginRequired = useCallback(
    (callback?: () => void) => {
      if (session) {
        // User is already logged in, execute callback immediately
        callback?.();
      } else {
        // User needs to login, save callback and show login modal
        if (callback) {
          setPendingAction(() => callback);
        }
        showLoginModal();
      }
    },
    [session, showLoginModal]
  );

  const value: AuthContextType = {
    isAuthModalOpen,
    authModalType,
    showLoginModal,
    showRegisterModal,
    closeAuthModal,
    loginRequired,
    pendingAction,
    setPendingAction,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
