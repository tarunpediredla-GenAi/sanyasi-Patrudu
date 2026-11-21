import { useMemo, useState } from 'react';
import type { BadgeColorVariant, SkillItem } from '../types/portfolio';
import { filterSkillsByCategory } from '../utils/portfolioHelpers';
import { PortfolioIcon } from './PortfolioIcons';
import { SectionHeader } from './SectionHeader';
import { Reveal } from './Reveal';

interface SkillsSectionProps {
  skills: SkillItem[];
}

const SKILL_ICON_TINTS: Record<BadgeColorVariant, string> = {
  blue: 'bg-sky-500/15 text-sky-600 dark:text-[#38BDF8] border-sky-500/25',
  pink: 'bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/25',
  yellow: 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/25',
  cyan: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border-cyan-500/25',
  green: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
  purple: 'bg-violet-500/15 text-violet-600 dark:text-violet-300 border-violet-500/25',
  orange: 'bg-orange-500/15 text-orange-600 dark:text-orange-300 border-orange-500/25',
  indigo: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/25',
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(skills.map((s) => s.category)));
    return ['All', ...unique];
  }, [skills]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const visibleSkills = useMemo(
    () => filterSkillsByCategory(skills, selectedCategory),
    [skills, selectedCategory]
  );

  return (
    <section
      id="skills"
      className="relative py-20 lg:py-28 bg-white dark:bg-[#0D172B] border-t border-slate-200/70 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Technical Skills"
          titlePrefix="Tools &"
          titleAccent="Technologies"
          subtitle="Production-tested Azure cloud services, big data frameworks, databases, DevOps tooling, and Generative AI technologies."
        />

        {/* Interactive Category Filter Bar */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF] ${
                  isActive
                    ? 'bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] text-white shadow-[0_6px_20px_rgba(139,92,246,0.35)]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-[#101D35] dark:text-[#94A3B8] dark:hover:text-white border border-slate-200 dark:border-white/10'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Responsive Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {visibleSkills.map((skill, index) => (
            <Reveal
              key={skill.id}
              delayMs={Math.min(index * 40, 220)}
              className="group rounded-2xl p-5 bg-slate-50 border border-slate-200/90 hover:border-purple-300 dark:bg-[#101D35]/75 dark:border-white/10 dark:hover:border-[#8B5CF6]/45 transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-start justify-between gap-3 mb-3.5">
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${SKILL_ICON_TINTS[skill.accent]}`}
                >
                  <PortfolioIcon name={skill.icon} className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-medium text-slate-500 dark:text-[#94A3B8]">
                  {skill.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                {skill.name}
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                {skill.focus}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
