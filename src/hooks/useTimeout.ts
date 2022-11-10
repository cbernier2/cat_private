import {useState, useRef, useEffect, useCallback, useMemo} from 'react';

const useTimeout = (callback_: () => void, firstTimeoutDelayMs = -1) => {
  const [isActive, setIsActive] = useState(firstTimeoutDelayMs >= 0);
  const savedRefCallback = useRef<typeof callback>();
  const timeDelayMsRef = useRef(firstTimeoutDelayMs);

  useEffect(() => {
    savedRefCallback.current = callback_;
  }, [callback_]);

  const clear = useCallback(() => {
    setIsActive(false);
  }, []);

  const callback = useCallback(() => {
    clear();
    savedRefCallback.current && savedRefCallback.current();
  }, [clear]);

  const start = useCallback((newTimeoutDelayMs?: number) => {
    if (newTimeoutDelayMs !== undefined) {
      timeDelayMsRef.current = newTimeoutDelayMs;
    }
    setIsActive(true);
  }, []);

  useEffect(() => {
    if (isActive) {
      const timeout = setTimeout(callback, timeDelayMsRef.current);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [callback, isActive]);

  return useMemo(
    () => ({
      clear,
      isActive,
      start,
    }),
    [start, clear, isActive],
  );
};

export default useTimeout;
