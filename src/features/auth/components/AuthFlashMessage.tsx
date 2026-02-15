"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Toast, ToastType } from "@/features/ui/Toast";

export const AuthFlashMessage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [messageData, setMessageData] = useState<{
    type: ToastType;
    text: string;
  } | null>(null);

  const [prevParams, setPrevParams] = useState("");

  const currentParamsStr = searchParams.toString();

  if (currentParamsStr !== prevParams) {
    setPrevParams(currentParamsStr);

    const expired = searchParams.get("expired");
    const registered = searchParams.get("registered");
    const loggedOut = searchParams.get("loggedOut");

    if (expired || registered || loggedOut) {
      const type: ToastType = expired
        ? "error"
        : registered
          ? "success"
          : "info";
      const text = expired
        ? "Sesja wygasła. Zaloguj się ponownie."
        : registered
          ? "Utworzono konto, można się zalogować."
          : "Pomyślnie wylogowano.";

      setMessageData({ type, text });
    }
  }

  useEffect(() => {
    const hasFlashParam =
      searchParams.get("expired") ||
      searchParams.get("registered") ||
      searchParams.get("loggedOut");

    if (hasFlashParam) {
      router.replace(pathname);
    }
  }, [searchParams, router, pathname]);

  if (!messageData) return null;

  return (
    <Toast
      message={messageData.text}
      type={messageData.type}
      onClose={() => setMessageData(null)}
      position="fixed"
    />
  );
};
