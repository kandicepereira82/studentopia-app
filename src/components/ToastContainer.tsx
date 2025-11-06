import React from "react";
import { View } from "react-native";
import Toast, { Toast as ToastType } from "./Toast";

interface ToastContainerProps {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        pointerEvents: "box-none",
      }}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onDismiss={onDismiss}
        />
      ))}
    </View>
  );
};

export default ToastContainer;
