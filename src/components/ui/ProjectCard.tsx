'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  github: string;
  live: string | null;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      className="group h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="glass p-6 rounded-lg h-full flex flex-col hover:border-primary/50 transition-colors">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-2">
            {project.name}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-dark-800 rounded text-gray-400"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-gray-800">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
            whileHover={{ x: 2 }}
          >
            <Github size={16} />
            <span>Code</span>
          </motion.a>

          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors ml-auto"
              whileHover={{ x: 2 }}
            >
              <span>Live</span>
              <ExternalLink size={16} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
