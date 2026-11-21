import { useMemo, useState } from 'react';
import { ArrowUpRight, Eye, FolderCode, Image as ImageIcon } from 'lucide-react';
import type { ProjectItem } from '../types/portfolio';
import {
  filterProjectsByCategory,
  getImageFrameStyle,
  getProjectCategories,
} from '../utils/portfolioHelpers';
import { SocialIcon } from './PortfolioIcons';
import { SectionHeader } from './SectionHeader';
import { Reveal } from './Reveal';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

function ProjectCover({ project }: { project: ProjectItem }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = Boolean(project.coverImage.src.trim()) && !imgError;

  if (hasImage) {
    return (
      <img
        src={project.coverImage.src}
        alt={project.coverImage.alt || project.title}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setImgError(true)}
        style={getImageFrameStyle(project.coverImage)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50/70 dark:from-[#0F1B33] dark:via-[#132240] dark:to-[#181B3A] overflow-hidden">
      {/* Subtle blueprint grid lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-25 bg-[linear-gradient(to_right,rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.16)_1px,transparent_1px)] bg-[size:24px_24px]"
      />
      {/* Architectural pipeline preview card when no project screenshot is uploaded yet */}
      <div className="relative z-10 w-full max-w-[280px] rounded-xl bg-white/95 dark:bg-[#0B1426]/92 border border-slate-200 dark:border-white/10 shadow-md p-3.5">
        <div className="flex items-center gap-1.5 mb-2.5 pb-2 border-b border-slate-200/80 dark:border-white/10">
          <span className="w-2 h-2 rounded-full bg-rose-400" aria-hidden="true" />
          <span className="w-2 h-2 rounded-full bg-amber-400" aria-hidden="true" />
          <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
          <span className="ml-auto text-[10px] font-mono text-slate-500 dark:text-slate-400">
            {project.category.toLowerCase().replace(/\s+/g, '-')}.arch
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-2 text-center">
          <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00BFFF]/20 via-[#8B5CF6]/20 to-[#EC4899]/20 flex items-center justify-center text-sky-600 dark:text-[#38BDF8] mb-2">
            <ImageIcon className="w-4 h-4" aria-hidden="true" />
          </span>
          <span className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1">
            {project.statusLabel}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-1 line-clamp-1">
            {project.technologies.slice(0, 3).join(' · ')}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection({
  projects,
  onSelectProject,
}: ProjectsSectionProps) {
  const categories = useMemo(() => getProjectCategories(projects), [projects]);
  const [activeCategory, setActiveCategory] = useState('All');

  const visibleProjects = useMemo(
    () => filterProjectsByCategory(projects, activeCategory),
    [projects, activeCategory]
  );

  return (
    <section
      id="projects"
      className="relative py-20 lg:py-28 bg-slate-50 dark:bg-[#0B1426] border-t border-slate-200/70 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Featured Work"
          titlePrefix="Enterprise"
          titleAccent="Implementations"
          subtitle="Key cloud data platforms, Medallion lakehouses, and migration architectures delivered across enterprise roles. Select any card for full technical details."
        />

        {/* Category filter tabs */}
        {categories.length > 2 && (
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center justify-center gap-2 mb-10"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF] ${
                    isActive
                      ? 'bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] text-white shadow-[0_6px_20px_rgba(139,92,246,0.35)]'
                      : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-[#101D35] dark:text-[#94A3B8] dark:hover:text-white border border-slate-200 dark:border-white/10'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}

        {/* Project Cards Grid */}
        {visibleProjects.length === 0 ? (
          <div className="rounded-2xl p-10 text-center bg-white dark:bg-[#101D35]/70 border border-slate-200 dark:border-white/10">
            <FolderCode
              className="w-8 h-8 mx-auto text-slate-400 mb-3"
              aria-hidden="true"
            />
            <p className="text-sm text-slate-600 dark:text-[#94A3B8]">
              No projects match this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {visibleProjects.map((project, index) => (
              <Reveal key={project.id} delayMs={index * 65} className="h-full">
                <article className="group h-full flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-xl dark:bg-[#101D35]/80 dark:border-white/10 dark:hover:border-[#8B5CF6]/45 transition-all duration-300 hover:-translate-y-1.5">
                {/* Screenshot Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-200/70 dark:border-white/10">
                  <ProjectCover project={project} />
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-[#94A3B8] mb-2">
                    <span className="font-semibold text-sky-700 dark:text-[#38BDF8]">
                      {project.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{project.statusLabel}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-[#38BDF8] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8] mb-4 flex-1">
                    {project.summary}
                  </p>

                  {/* Clean typographic tech stack line */}
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-5">
                    {project.technologies.join(' · ')}
                  </div>

                  {/* Action Row */}
                  <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-100 dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      aria-label={`View details for ${project.title}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] hover:brightness-110 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]"
                    >
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>View Details</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} GitHub repository`}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-950 hover:bg-slate-100 dark:text-[#94A3B8] dark:hover:text-white dark:hover:bg-white/10 transition-colors"
                        >
                          <SocialIcon platform="github" className="w-4 h-4" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          aria-label={`Add GitHub link for ${project.title}`}
                          title="Open details to configure repository link"
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-500 dark:hover:text-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <SocialIcon platform="github" className="w-4 h-4" />
                        </button>
                      )}

                      {project.liveDemoUrl ? (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live demo`}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-950 hover:bg-slate-100 dark:text-[#94A3B8] dark:hover:text-white dark:hover:bg-white/10 transition-colors"
                        >
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          aria-label={`Preview ${project.title}`}
                          title="Open details to view gallery and configure live URL"
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-500 dark:hover:text-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
