'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface CounterProps {
  end: number;
  duration?: number;
}

export default function Counter({ end, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    const increment = end / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, inView]);

  return <span ref={ref}>{count}</span>;
}
