import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

export type Queue = () => { id: NodeJS.Timeout | null, promise: Promise<string> };
type Return = {
  log: string[];
  addQueue: Dispatch<SetStateAction<Queue[]>>;
  setReset: () => void;
}

export function useQueue(): Return {
  const [queue, setQueue] = useState<Queue[]>([]);
  const [pending, setPending] = useState<boolean>(false);
  const [log, setLog] = useState<string[]>([]);

  const [timeout, setTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (pending) {
      return;
    }

    const queueItem = queue.shift();
    if (!queueItem) {
      return;
    }
    setPending(true);

    const { id, promise } = queueItem();
    setTimeout(id);

    promise.then(res => {
      setLog((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${res}`]);
      setPending(false);
    })
  }, [queue, pending]);

  const handleReset = useCallback(() => {
    setQueue([]);
    setLog([]);
    setPending(false);
    if (timeout) {
      clearTimeout(timeout);
    }
  }, [timeout])

  return {log, addQueue: setQueue, setReset: handleReset};
}