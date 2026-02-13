"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export const useExerciseTimer = (
  initialSeconds: number,
  onComplete: () => void,
) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  const onCompleteRef = useRef(onComplete);
  // Synchronizing the ref in useEffect to avoid side-effects during the render phase.
  // This ensures compatibility with React 19's concurrent rendering and the React Compiler.
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const start = useCallback(() => setIsActive(true), []);
  const pause = useCallback(() => setIsActive(false), []);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const timeout = setTimeout(() => {
      const newTime = timeLeft - 1;
      setTimeLeft(newTime);

      if (newTime === 0) {
        setIsActive(false);
        onCompleteRef.current();
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isActive, timeLeft]);

  return { timeLeft, isActive, start, pause };
};
