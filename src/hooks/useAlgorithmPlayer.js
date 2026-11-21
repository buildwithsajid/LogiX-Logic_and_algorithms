import { useState, useEffect, useRef } from 'react';

/**
 * Custom React hook for controlling algorithm step-by-step animations
 * @param {Array} steps - sequence of generated trace events / snapshots
 * @param {number} initialSpeed - animation speed multiplier
 */
export function useAlgorithmPlayer(steps = [], initialSpeed = 1) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed);
  const timerRef = useRef(null);

  const totalSteps = steps.length;
  const currentStep = steps[currentStepIndex] || null;

  const play = () => {
    if (totalSteps > 0 && currentStepIndex < totalSteps - 1) {
      setIsPlaying(true);
    }
  };

  const pause = () => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const reset = () => {
    pause();
    setCurrentStepIndex(0);
  };

  const stepForward = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      pause();
    }
  };

  const stepBackward = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const delay = Math.max(100, Math.floor(600 / speed));
      timerRef.current = setTimeout(() => {
        if (currentStepIndex < totalSteps - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, delay);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, currentStepIndex, totalSteps, speed]);

  return {
    currentStepIndex,
    currentStep,
    totalSteps,
    isPlaying,
    speed,
    setSpeed,
    play,
    pause,
    reset,
    stepForward,
    stepBackward,
    setCurrentStepIndex
  };
}
