'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import MagneticButton from '@/components/ui/MagneticButton';
import { portfolioData } from '@/data/portfolio';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          number="05"
          title="Contact"
          subtitle="Let's talk"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Ready to create something{' '}
            <span className="gradient-text">amazing</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a
                    href={`mailto:${portfolioData.email}`}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {portfolioData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Github className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">GitHub</h3>
                  <a
                    href={portfolioData.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    github.com/Abdullahshaz70
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Linkedin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">LinkedIn</h3>
                  <a
                    href={portfolioData.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    linkedin.com/in/[YOUR-LINKEDIN]
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-800 border border-gray-800 rounded-lg focus:border-primary focus:outline-none transition-colors text-white"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-800 border border-gray-800 rounded-lg focus:border-primary focus:outline-none transition-colors text-white"
                  required
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-800 border border-gray-800 rounded-lg focus:border-primary focus:outline-none transition-colors text-white resize-none"
                  required
                />
              </div>

              <MagneticButton type="submit" variant="primary" className="w-full">
                {submitted ? 'Message sent! ✓' : 'Send Message'}
              </MagneticButton>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
