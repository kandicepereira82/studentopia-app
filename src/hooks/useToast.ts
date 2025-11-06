import { useState, useCallback } from "react";
import { Toast } from "../components/Toast";

const generateId = () => Date.now().toString() + Math.random().toString(36);

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback(
    (
      message: string,
      type: "success" | "error" | "warning" | "info" = "info",
      duration = 3000
    ) => {
      const id = generateId();
      const toast: Toast = { id, message, type, duration };

      setToasts((prev) => [...prev, toast]);

      return id;
    },
    []
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const success = useCallback(
    (message: string, duration?: number) =>
      show(message, "success", duration),
    [show]
  );

  const error = useCallback(
    (message: string, duration?: number) => show(message, "error", duration),
    [show]
  );

  const warning = useCallback(
    (message: string, duration?: number) =>
      show(message, "warning", duration),
    [show]
  );

  const info = useCallback(
    (message: string, duration?: number) => show(message, "info", duration),
    [show]
  );

  return {
    toasts,
    show,
    dismiss,
    dismissAll,
    success,
    error,
    warning,
    info,
  };
};
