'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Only attract if close enough
    const distance = Math.sqrt(x * x + y * y);
    if (distance < 100) {
      setPosition({ x: x * 0.3, y: y * 0.3 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50'
      : 'border-2 border-gray-700 hover:border-primary hover:text-primary';

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={position}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`relative px-8 py-3 font-semibold rounded-lg transition-all duration-300 ${baseStyles} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span
        className={variant === 'primary' ? 'text-dark-950' : 'text-white'}
      >
        {children}
      </span>
    </motion.button>
  );
}
