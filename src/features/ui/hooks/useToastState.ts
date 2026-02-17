import { useCallback, useState } from "react";

export const useToastState = (
  initialMessage: string | null = null,
  key?: unknown,
) => {
  const [message, setMessage] = useState<string | null>(initialMessage);
  const [isDismissed, setIsDismissed] = useState(false);

  const effectiveTrigger = key !== undefined ? key : initialMessage;
  const [prevTrigger, setPrevTrigger] = useState<unknown>(effectiveTrigger);
  const [toastId, setToastId] = useState(0);
  if (effectiveTrigger !== prevTrigger) {
    setPrevTrigger(effectiveTrigger);
    if (initialMessage) {
      setMessage(initialMessage);
      setIsDismissed(false);
      setToastId((prev) => prev + 1);
    } else {
      setMessage(null);
      setIsDismissed(true);
    }
  }

  const showToast = (newMessage: string) => {
    setMessage(newMessage);
    setIsDismissed(false);
    setToastId((prev) => prev + 1);
  };

  const dismissToast = useCallback(() => {
    setIsDismissed(true);
  }, []);

  const isVisible = !!message && !isDismissed;

  return {
    isVisible,
    message,
    showToast,
    dismissToast,
    toastId,
  };
};
