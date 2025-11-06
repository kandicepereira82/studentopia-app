import React, { createContext, useContext } from "react";
import { useToast } from "../hooks/useToast";

interface ToastContextType {
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  show: (message: string, type: "success" | "error" | "warning" | "info", duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      {children}
    </ToastContext.Provider>
  );
};

export const useGlobalToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useGlobalToast must be used within a ToastProvider");
  }
  return context;
};
