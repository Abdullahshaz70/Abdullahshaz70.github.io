'use client';

import { motion } from 'framer-motion';
import { stats } from '@/data/portfolio';
import SectionHeading from '@/components/ui/SectionHeading';
import Counter from '@/components/ui/Counter';

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          number="01"
          title="About"
          subtitle="Who I am"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-12">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Building{' '}
              <span className="gradient-text">systems</span>. Exploring{' '}
              <span className="italic text-primary">intelligence</span>. Creating{' '}
              <span className="gradient-text">experiences</span>.
            </h2>

            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              I'm a passionate AI engineer and software developer with a focus on
              building intelligent systems and immersive digital experiences. I
              combine frontend craftsmanship with backend scalability and AI
              capabilities to create solutions that matter.
            </p>

            <p className="text-gray-500 text-base leading-relaxed">
              When I'm not coding, I'm exploring new technologies, contributing to
              open source, and pushing the boundaries of what's possible with modern
              web technologies and artificial intelligence.
            </p>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="glass p-6 rounded-lg"
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary mb-2">
                  <Counter end={parseInt(stat.value)} />
                  <span className="text-gray-600">+</span>
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
