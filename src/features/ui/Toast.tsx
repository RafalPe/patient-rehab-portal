"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
  position?: "inline" | "fixed";
}

export const Toast = ({
  message,
  type,
  duration = 3000,
  onClose,
  position = "inline",
}: ToastProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 10);

    const closeTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500);
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  const styles = {
    error: "border-amber-200 bg-amber-50 text-amber-700",
    success: "border-green-200 bg-green-50 text-green-700",
    info: "border-blue-200 bg-blue-50 text-blue-700",
  };

  const progressStyles = {
    error: "bg-amber-300/50",
    success: "bg-green-300/50",
    info: "bg-blue-300/50",
  };

  const positionStyles =
    position === "fixed"
      ? "absolute -top-20 left-0 right-0 z-50 shadow-lg mx-auto w-full"
      : "relative mb-4";

  return (
    <div
      className={`overflow-hidden rounded-lg border p-4 text-center text-sm transition-all duration-500 ease-in-out ${
        styles[type]
      } ${positionStyles} ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      }`}
    >
      <div className="relative z-10 font-medium">{message}</div>
      <div
        className={`absolute bottom-0 left-0 h-1 transition-all ease-linear ${
          progressStyles[type]
        }`}
        style={{
          width: visible ? "0%" : "100%",
          transitionDuration: `${duration}ms`,
        }}
      />
    </div>
  );
};
