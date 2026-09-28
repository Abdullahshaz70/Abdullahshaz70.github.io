'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({
  number,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-4"
    >
      <span className="text-sm font-mono text-primary opacity-60">{number}</span>
      <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
      {subtitle && (
        <>
          <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
          <span className="text-sm text-gray-500 whitespace-nowrap">
            {subtitle}
          </span>
        </>
      )}
    </motion.div>
  );
}
