'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {portfolioData.name}
            </div>
            <p className="text-gray-500 text-sm mt-2">
              AI Engineer & Full Stack Developer
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-semibold mb-4">Navigate</h3>
            <nav className="flex flex-col gap-2 text-sm text-gray-500">
              <a href="#home" className="hover:text-primary transition-colors">
                Home
              </a>
              <a href="#about" className="hover:text-primary transition-colors">
                About
              </a>
              <a href="#projects" className="hover:text-primary transition-colors">
                Projects
              </a>
              <a href="#contact" className="hover:text-primary transition-colors">
                Contact
              </a>
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold mb-4">Follow</h3>
            <div className="flex gap-4">
              <a
                href={portfolioData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href={portfolioData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={portfolioData.social.email}
                className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2024 {portfolioData.name}. All rights reserved.</p>
            <p>Built with React, Next.js & Three.js</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
