import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import type { ProjectItem } from '../types/portfolio';
import { SocialIcon } from './PortfolioIcons';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedIndices, setFailedIndices] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setActiveIndex(0);
    setFailedIndices({});
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight' && project.screenshots.length > 1) {
        setActiveIndex((prev) => (prev + 1) % project.screenshots.length);
      } else if (event.key === 'ArrowLeft' && project.screenshots.length > 1) {
        setActiveIndex(
          (prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const screenshots =
    project.screenshots.length > 0
      ? project.screenshots
      : [{ src: project.coverImage.src, caption: project.title }];

  const currentSlide = screenshots[activeIndex] ?? screenshots[0];
  const hasSlideImage = Boolean(currentSlide.src.trim()) && !failedIndices[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % screenshots.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0E1A30] border border-slate-200 dark:border-white/15 shadow-2xl">
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 py-4 bg-white/95 dark:bg-[#0E1A30]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
          <div>
            <p className="text-xs font-semibold text-sky-700 dark:text-[#38BDF8]">
              {project.category} · {project.statusLabel}
            </p>
            <h3
              id="project-modal-title"
              className="text-xl font-bold text-slate-900 dark:text-white"
            >
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Multi-Screenshot Gallery Viewer */}
          <div>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#0B1426] border border-slate-200 dark:border-white/10">
              {hasSlideImage ? (
                <img
                  src={currentSlide.src}
                  alt={currentSlide.caption}
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setFailedIndices((prev) => ({ ...prev, [activeIndex]: true }))
                  }
                  style={{
                    objectPosition: `${currentSlide.objectPositionX ?? 50}% ${
                      currentSlide.objectPositionY ?? 50
                    }%`,
                  }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-100 via-white to-indigo-50/70 dark:from-[#0B1426] dark:via-[#101D35] dark:to-[#181B3A]">
                  <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00BFFF]/20 via-[#8B5CF6]/20 to-[#EC4899]/20 flex items-center justify-center text-sky-600 dark:text-[#38BDF8] mb-3">
                    <ImageIcon className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    Screenshot {activeIndex + 1} of {screenshots.length}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1 max-w-md">
                    {currentSlide.caption}
                  </p>
                </div>
              )}

              {screenshots.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous screenshot"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/75 text-white hover:bg-slate-900 flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF]"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/75 text-white hover:bg-slate-900 flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF]"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {/* Slide Caption & Thumbnail Selector */}
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-xs text-slate-600 dark:text-[#94A3B8]">
                {currentSlide.caption}
              </p>

              {screenshots.length > 1 && (
                <div className="flex items-center gap-2 shrink-0">
                  {screenshots.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Show screenshot ${idx + 1}`}
                      aria-pressed={activeIndex === idx}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        activeIndex === idx
                          ? 'bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/15'
                      }`}
                    >
                      View {idx + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Full Overview */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              Project Overview
            </h4>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8]">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Highlights */}
          {project.highlights.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2.5">
                Key Highlights
              </h4>
              <ul className="space-y-2">
                {project.highlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2
                      className="w-4 h-4 mt-0.5 text-sky-600 dark:text-[#38BDF8] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              Technologies Used
            </h4>
            <p className="text-sm font-medium text-slate-600 dark:text-[#94A3B8]">
              {project.technologies.join(' · ')}
            </p>
          </div>

          {/* Links Footer */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
            {project.liveDemoUrl ? (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] hover:brightness-110 transition-all"
              >
                <span>Open Live Demo</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            ) : (
              <span className="text-xs text-slate-500 dark:text-[#94A3B8]">
                Live demo link: add <code className="font-mono">liveDemoUrl</code> in{' '}
                <code className="font-mono">portfolioConfig.ts</code>
              </span>
            )}

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 dark:text-white dark:bg-white/10 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 transition-colors"
              >
                <SocialIcon platform="github" className="w-4 h-4" />
                <span>View Source on GitHub</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
