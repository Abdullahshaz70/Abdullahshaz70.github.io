'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.current = e.clientX;
      y.current = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleMouseDown = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('scale-75');
      }
    };

    const handleMouseUp = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('scale-75');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Hide cursor on mobile
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      document.documentElement.style.cursor = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] transition-transform duration-200"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Cursor ring */}
      <div
        ref={cursorRingRef}
        className="fixed w-8 h-8 border-2 border-primary rounded-full pointer-events-none z-[9998] transition-transform duration-300"
        style={{
          transform: 'translate(-50%, -50%)',
          opacity: 0.6,
        }}
      />
    </>
  );
}
