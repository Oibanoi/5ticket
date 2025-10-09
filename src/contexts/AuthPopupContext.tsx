import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthPopupContextType {
  isLoginPopupVisible: boolean;
  isRegisterPopupVisible: boolean;
  showLoginPopup: () => void;
  showRegisterPopup: () => void;
  hideLoginPopup: () => void;
  hideRegisterPopup: () => void;
  switchToRegister: () => void;
  switchToLogin: () => void;
}

const AuthPopupContext = createContext<AuthPopupContextType | undefined>(undefined);

export const useAuthPopup = () => {
  const context = useContext(AuthPopupContext);
  if (!context) {
    throw new Error("useAuthPopup must be used within an AuthPopupProvider");
  }
  return context;
};

interface AuthPopupProviderProps {
  children: ReactNode;
}

export const AuthPopupProvider: React.FC<AuthPopupProviderProps> = ({ children }) => {
  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false);
  const [isRegisterPopupVisible, setIsRegisterPopupVisible] = useState(false);

  const showLoginPopup = (pendingActionCallback?: () => void) => {
    setIsLoginPopupVisible(true);
    setIsRegisterPopupVisible(false);
  };

  // Listen for global events to show login popup
  useEffect(() => {
    const handleShowLoginPopup = () => {
      showLoginPopup();
    };

    window.addEventListener("showLoginPopup", handleShowLoginPopup);

    return () => {
      window.removeEventListener("showLoginPopup", handleShowLoginPopup);
    };
  }, [showLoginPopup]);

  const showRegisterPopup = () => {
    setIsRegisterPopupVisible(true);
    setIsLoginPopupVisible(false);
  };

  const hideLoginPopup = () => {
    setIsLoginPopupVisible(false);
  };

  const hideRegisterPopup = () => {
    setIsRegisterPopupVisible(false);
  };

  const switchToRegister = () => {
    setIsLoginPopupVisible(false);
    setIsRegisterPopupVisible(true);
  };

  const switchToLogin = () => {
    setIsRegisterPopupVisible(false);
    setIsLoginPopupVisible(true);
  };

  const value: AuthPopupContextType = {
    isLoginPopupVisible,
    isRegisterPopupVisible,
    showLoginPopup,
    showRegisterPopup,
    hideLoginPopup,
    hideRegisterPopup,
    switchToRegister,
    switchToLogin,
  };

  return <AuthPopupContext.Provider value={value}>{children}</AuthPopupContext.Provider>;
};
