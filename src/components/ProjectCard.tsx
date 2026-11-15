import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Box, ExternalLink, Maximize2 } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { TiltCard } from './TiltCard';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onPreview: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onPreview,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.55,
        delay: Math.min((index % 3) * 0.08, 0.24),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <TiltCard className="glass-panel group flex h-full flex-col overflow-hidden rounded-[20px]">
        <div
          onClick={() => onPreview(project)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onPreview(project);
            }
          }}
          aria-label={`Preview ${project.title}`}
          className="relative h-[245px] w-full cursor-pointer overflow-hidden border-b border-[#f26522]/30 bg-[radial-gradient(circle_at_center,rgba(30,32,38,0.9)_0%,rgba(19,20,22,0.96)_100%)] focus-visible:outline-2 focus-visible:outline-[#f26522]"
        >
          {!imgError ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1a1c20] via-[#131416] to-[#261214] p-6 text-center">
              <Box className="h-10 w-10 text-[#f26522]/80" />
              <span className="font-heading text-sm font-semibold text-white/80">
                {project.title}
              </span>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#131416]/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

          <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#131416]/85 px-2.5 py-1 text-xs font-medium text-[#d0d1d6] opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
            <Maximize2 className="h-3.5 w-3.5 text-[#f26522]" />
            <span>Quick View</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="mb-1.5 font-heading text-xs font-medium tracking-wide text-[#f26522]">
            {project.category} <span aria-hidden="true">·</span> {project.type}
          </p>

          <h3 className="mb-2.5 font-heading text-xl font-bold text-white transition-colors group-hover:text-[#ff8a4c]">
            {project.title}
          </h3>

          <p className="mb-4 flex-1 text-sm leading-relaxed text-[#d0d1d6]">
            {project.description}
          </p>

          <div className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#8c8f9a]">
            {project.tags.map((tag, idx) => (
              <React.Fragment key={tag}>
                {idx > 0 && <span aria-hidden="true">·</span>}
                <span>{tag}</span>
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/20 bg-gradient-to-br from-[#800606] to-[#a80909] px-4 py-2.5 font-heading text-sm font-semibold text-white shadow-[0_10px_24px_rgba(128,6,6,0.38)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#f26522] hover:from-[#990707] hover:to-[#f26522] hover:shadow-[0_0_24px_rgba(242,101,34,0.32)]"
            >
              <ExternalLink className="h-4 w-4 shrink-0" />
              <span>Google Drive Link</span>
            </a>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};
