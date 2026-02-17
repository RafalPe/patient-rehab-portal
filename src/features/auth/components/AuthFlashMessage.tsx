"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Toast, ToastType } from "@/features/ui/Toast";
import { useToastState } from "@/features/ui/hooks/useToastState";

export const AuthFlashMessage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { isVisible, message, showToast, dismissToast, toastId } =
    useToastState();
  const [type, setType] = useState<ToastType>("info");

  useEffect(() => {
    let checkType: ToastType | null = null;
    let checkMessage: string | null = null;

    if (searchParams.has("expired")) {
      checkType = "error";
      checkMessage = "Sesja wygasła. Zaloguj się ponownie.";
    } else if (searchParams.has("registered")) {
      checkType = "success";
      checkMessage = "Utworzono konto, można się zalogować.";
    } else if (searchParams.has("loggedOut")) {
      checkType = "info";
      checkMessage = "Pomyślnie wylogowano.";
    }

    if (checkType && checkMessage) {
      setTimeout(() => {
        setType(checkType!);
        showToast(checkMessage!);
        router.replace(pathname);
      }, 0);
    }
  }, [searchParams, router, pathname, showToast]);

  if (!isVisible || !message) return null;

  return (
    <Toast
      key={toastId}
      message={message}
      type={type}
      onClose={dismissToast}
      position="fixed"
    />
  );
};
