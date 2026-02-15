"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const AuthFlashMessage = () => {
  const searchParams = useSearchParams();

  const [message] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(() => {
    if (typeof window === "undefined") return null;

    const expired = searchParams.get("expired");
    const registered = searchParams.get("registered");
    const loggedOut = searchParams.get("loggedOut");

    if (expired) {
      return {
        type: "error",
        text: "Sesja wygasła. Zaloguj się ponownie.",
      };
    } else if (registered) {
      return {
        type: "success",
        text: "Utworzono konto, można się zalogować.",
      };
    } else if (loggedOut) {
      return {
        type: "info",
        text: "Pomyślnie wylogowano.",
      };
    }
    return null;
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setVisible(true), 10);

      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);

      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [message]);

  if (!message) return null;

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

  return (
    <div
      className={`relative mb-4 overflow-hidden rounded-lg border p-4 text-center text-sm transition-all duration-500 ease-in-out ${
        styles[message.type]
      } ${visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
    >
      <div className="relative z-10">{message.text}</div>
      <div
        className={`absolute bottom-0 left-0 h-1 transition-all duration-3000 ease-linear ${
          progressStyles[message.type]
        }`}
        style={{ width: visible ? "0%" : "100%" }}
      />
    </div>
  );
};
