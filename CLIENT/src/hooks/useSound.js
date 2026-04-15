import { useCallback } from "react";

const getAudioContext = (() => {
  let ctx = null;
  return () => {
    if (!ctx || ctx.state === "closed") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      ctx = new AudioCtx();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  };
})();

const playNote = (ctx, frequency, startTime, duration, peakGain, type = "sine") => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.01);
};

export const useSound = () => {
  const playSend = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    playNote(ctx, 660, t, 0.1, 0.18);
    playNote(ctx, 880, t + 0.07, 0.12, 0.12);
  }, []);

  const playReceive = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    playNote(ctx, 1046, t, 0.18, 0.22);
    playNote(ctx, 1318, t + 0.1, 0.22, 0.18);
  }, []);

  return { playSend, playReceive };
};
