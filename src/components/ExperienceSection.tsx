import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import type { EducationItem, ExperienceItem } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { Reveal } from './Reveal';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  education: EducationItem[];
}

export function ExperienceSection({
  experience,
  education,
}: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="relative py-20 lg:py-28 bg-white dark:bg-[#0D172B] border-t border-slate-200/70 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Journey"
          titlePrefix="Experience &"
          titleAccent="Education"
          subtitle="4.7 years of hands-on progression across cloud data engineering, database reliability, enterprise lakehouses, and academic foundations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Experience Column */}
          <div>
            <div className="flex items-center gap-3 mb-7">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00BFFF] to-[#8B5CF6] text-white flex items-center justify-center shadow-md">
                <Briefcase className="w-5 h-5" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Work &amp; Project Experience
              </h3>
            </div>

            <ol className="relative space-y-6 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#00BFFF] before:via-[#8B5CF6] before:to-transparent">
              {experience.map((item, idx) => (
                <li key={item.id} className="relative pl-11">
                  <Reveal delayMs={idx * 70}>
                  {/* Timeline Node */}
                  <span
                    aria-hidden="true"
                    className="absolute left-[8px] top-5 w-4 h-4 rounded-full bg-[#00BFFF] ring-4 ring-white dark:ring-[#0D172B] shadow-[0_0_12px_rgba(0,191,255,0.65)]"
                  />

                  <div className="rounded-2xl p-5 sm:p-6 bg-slate-50 border border-slate-200/90 dark:bg-[#101D35]/75 dark:border-white/10">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
                      <span className="font-mono font-semibold text-sky-700 dark:text-[#38BDF8]">
                        {item.period}
                      </span>
                      <span className="inline-flex items-center gap-1 text-slate-500 dark:text-[#94A3B8]">
                        <MapPin className="w-3 h-3" aria-hidden="true" />
                        {item.location}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {item.role}
                    </h4>
                    <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-3">
                      {item.organization}
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8] mb-3">
                      {item.description}
                    </p>

                    {item.highlights.length > 0 && (
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc pl-4">
                        {item.highlights.map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          {/* Education Column */}
          <div>
            <div className="flex items-center gap-3 mb-7">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] text-white flex items-center justify-center shadow-md">
                <GraduationCap className="w-5 h-5" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Education &amp; Credentials
              </h3>
            </div>

            <ol className="relative space-y-6 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#EC4899] before:via-[#8B5CF6] before:to-transparent">
              {education.map((edu, idx) => (
                <li key={edu.id} className="relative pl-11">
                  <Reveal delayMs={idx * 70}>
                  {/* Timeline Node */}
                  <span
                    aria-hidden="true"
                    className="absolute left-[8px] top-5 w-4 h-4 rounded-full bg-[#EC4899] ring-4 ring-white dark:ring-[#0D172B] shadow-[0_0_12px_rgba(236,72,153,0.65)]"
                  />

                  <div className="rounded-2xl p-5 sm:p-6 bg-slate-50 border border-slate-200/90 dark:bg-[#101D35]/75 dark:border-white/10">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
                      <span className="font-mono font-semibold text-pink-700 dark:text-pink-400">
                        {edu.period}
                      </span>
                      <span className="inline-flex items-center gap-1 text-slate-500 dark:text-[#94A3B8]">
                        <MapPin className="w-3 h-3" aria-hidden="true" />
                        {edu.location}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-sm font-medium text-sky-700 dark:text-[#38BDF8] mb-3">
                      {edu.institution}
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                      {edu.details}
                    </p>
                  </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
