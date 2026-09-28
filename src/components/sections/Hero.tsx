'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import HeroScene from '@/components/three/HeroScene';
import MagneticButton from '@/components/ui/MagneticButton';
import { portfolioData } from '@/data/portfolio';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)]">
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Subtitle */}
            <motion.p
              className="text-sm md:text-base font-mono text-primary mb-4 uppercase tracking-wider"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              ✦ Welcome to my digital workspace
            </motion.p>

            {/* Main heading */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="block text-white">{portfolioData.name}</span>
              <span className="gradient-text">AI Engineer</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {portfolioData.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <MagneticButton
                onClick={() => scrollToSection('#projects')}
                variant="primary"
              >
                View My Work
                <span className="ml-2">→</span>
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollToSection('#contact')}
                variant="secondary"
              >
                Get In Touch
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 mt-12 pt-8 border-t border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div>
                <div className="text-3xl font-bold text-primary">12+</div>
                <div className="text-sm text-gray-500">Projects Delivered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">3+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">20+</div>
                <div className="text-sm text-gray-500">Technologies</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full h-[500px] rounded-xl glass overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">💻</div>
                  <p className="text-gray-400">3D Scene Ready</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-primary w-6 h-6" />
      </motion.div>
    </section>
  );
}
