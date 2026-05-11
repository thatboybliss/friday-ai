import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'vox-room-state-v2';

const defaultState = {
  playersOnline: 1,
  lastAction: 'Room initialized',
  totalAnswers: 0
};

export function useSharedRoom() {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return defaultState;

    const cached = window.localStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : defaultState;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const channel = 'BroadcastChannel' in window ? new BroadcastChannel('vox-room') : null;

    const onStorage = (event) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        setState(JSON.parse(event.newValue));
      }
    };

    if (channel) {
      channel.onmessage = ({ data }) => {
        setState(data);
      };
    }

    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
      channel?.close();
    };
  }, []);

  const updateState = (patch) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      if ('BroadcastChannel' in window) {
        const channel = new BroadcastChannel('vox-room');
        channel.postMessage(next);
        channel.close();
      }
      return next;
    });
  };

  const boardSummary = useMemo(
    () => `Players: ${state.playersOnline} • Answers: ${state.totalAnswers}`,
    [state.playersOnline, state.totalAnswers]
  );

  return { state, boardSummary, updateState };
}
