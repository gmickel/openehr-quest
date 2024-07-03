import { useCallback } from 'react';

const useSoundEffects = () => {
  const playSound = useCallback((frequency: number, duration: number) => {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(
      0,
      audioContext.currentTime + duration
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }, []);

  const playCorrectSound = useCallback(() => playSound(800, 0.1), [playSound]);
  const playWrongSound = useCallback(() => playSound(300, 0.2), [playSound]);
  const playCompletionSound = useCallback(() => {
    playSound(523.25, 0.1); // C5
    setTimeout(() => playSound(659.25, 0.1), 100); // E5
    setTimeout(() => playSound(783.99, 0.2), 200); // G5
  }, [playSound]);

  return { playCorrectSound, playWrongSound, playCompletionSound };
};

export default useSoundEffects;
