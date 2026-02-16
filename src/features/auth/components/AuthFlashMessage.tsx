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

    const messages = {
      expired: {
        type: "error" as ToastType,
        text: "Sesja wygasła. Zaloguj się ponownie.",
      },
      registered: {
        type: "success" as ToastType,
        text: "Utworzono konto, można się zalogować.",
      },
      loggedOut: {
        type: "info" as ToastType,
        text: "Pomyślnie wylogowano.",
      },
    };

    if (searchParams.has("expired")) {
      setMessageData(messages.expired);
    } else if (searchParams.has("registered")) {
      setMessageData(messages.registered);
    } else if (searchParams.has("loggedOut")) {
      setMessageData(messages.loggedOut);
    }
  }

  useEffect(() => {
    if (
      searchParams.has("expired") ||
      searchParams.has("registered") ||
      searchParams.has("loggedOut")
    ) {
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
