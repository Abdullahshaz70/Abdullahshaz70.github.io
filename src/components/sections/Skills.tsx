'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '@/data/portfolio';
import SectionHeading from '@/components/ui/SectionHeading';

const categories = [
  { key: 'languages', label: 'Languages', color: 'from-blue-500' },
  { key: 'frontend', label: 'Frontend', color: 'from-cyan-500' },
  { key: 'backend', label: 'Backend', color: 'from-violet-500' },
  { key: 'ai', label: 'AI / ML', color: 'from-pink-500' },
  { key: 'tools', label: 'Tools', color: 'from-green-500' },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('languages');

  const selectedSkills = skills[selectedCategory as keyof typeof skills];

  return (
    <section id="skills" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          number="02"
          title="Skills"
          subtitle="My toolkit"
        />

        <div className="mt-12">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat.key
                    ? `bg-gradient-to-r ${cat.color} to-transparent text-white`
                    : 'glass text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {/* Skills grid */}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {selectedSkills.map((skill, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="glass p-6 rounded-lg h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1 bg-dark-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
