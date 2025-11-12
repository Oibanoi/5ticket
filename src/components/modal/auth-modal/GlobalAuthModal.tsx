"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ModalLogin from "./index";
import { useAuth } from "@/contexts/AuthContext";

export const GlobalAuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalType, closeAuthModal } = useAuth();

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={(open) => !open && closeAuthModal()}>
      <DialogContent
        className="max-w-[90%] lg:max-w-6xl p-0 gap-0 border-0"
        showCloseButton={false}
      >
        <ModalLogin onClose={closeAuthModal} defaultType={authModalType} />
      </DialogContent>
    </Dialog>
  );
};

export default GlobalAuthModal;
