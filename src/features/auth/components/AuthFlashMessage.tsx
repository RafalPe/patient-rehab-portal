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

  useEffect(() => {
    if (message) {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, [message]);

  if (!message) return null;

  const styles = {
    error: "border-amber-200 bg-amber-50 text-amber-700",
    success: "border-green-200 bg-green-50 text-green-700",
    info: "border-blue-200 bg-blue-50 text-blue-700",
  };

  return (
    <div
      className={`mb-4 rounded-lg border p-4 text-center text-sm ${
        styles[message.type]
      }`}
    >
      {message.text}
    </div>
  );
};
