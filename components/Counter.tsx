import React, { useEffect, useRef, useState } from 'react';
import { Text } from 'react-native';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  style?: any;
}

export default function Counter({ end, duration = 2000, suffix = "", style }: CounterProps) {
  const [count, setCount] = useState(0);
  const countingDone = useRef(false);

  useEffect(() => {
    if (countingDone.current) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      setCount(Math.floor(percentage * end));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
        countingDone.current = true;
      }
    };

    // Start animation after a short delay
    const timer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration]);

  return (
    <Text style={style}>
      {count}
      {suffix}
    </Text>
  );
}