'use client';

import { motion } from 'framer-motion';
import { experience } from '@/data/portfolio';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          number="04"
          title="Experience"
          subtitle="My journey"
        />

        <div className="mt-12 relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-20 transform md:-translate-x-1/2" />

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-16">
            {experience.map((item, index) => (
              <motion.div
                key={item.id}
                className={`relative pl-8 md:pl-0 ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:ml-1/2 md:pl-8'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform md:-translate-x-1/2 -translate-y-1 top-2 glow-cyan" />

                <div className="glass p-6 rounded-lg">
                  <div className="text-sm font-mono text-primary mb-2">
                    {item.year}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">{item.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
