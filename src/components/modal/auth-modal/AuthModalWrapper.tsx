"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ModalLogin, { FormType } from "./index";

interface AuthModalWrapperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultType?: FormType;
}

export const AuthModalWrapper: React.FC<AuthModalWrapperProps> = ({
  open,
  onOpenChange,
  defaultType,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-6xl p-2 gap-0 border-0 bg-transparent"
        showCloseButton={false}
      >
        <ModalLogin onClose={() => onOpenChange(false)} defaultType={defaultType} />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModalWrapper;
