import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

type Return = {
  log: string[];
  addQueue: Dispatch<SetStateAction<(() => Promise<string>)[]>>;
  setReset: () => void;
}

export function useQueue(): Return {
  const [queue, setQueue] = useState<(() => Promise<string>)[]>([]);
  const [pending, setPending] = useState<boolean>(false);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    if (pending) {
      return;
    }

    const promise = queue.shift();
    if (!promise) {
      return;
    }
    setPending(true);

    promise().then(res => {
      setLog((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${res}`]);
      setPending(false);
    })
  }, [queue, pending]);

  const handleReset = useCallback(() => {
    setQueue([]);
    setLog([]);
    setPending(false);
  }, [])

  return {log, addQueue: setQueue, setReset: handleReset};
}