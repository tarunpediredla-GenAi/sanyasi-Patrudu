import { useState } from 'react';
import { Download, GraduationCap, MapPin, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import type { EducationItem, ProfileInfo } from '../types/portfolio';
import { PortraitImage } from './PortraitImage';
import { SectionHeader } from './SectionHeader';
import { Reveal } from './Reveal';

interface AboutSectionProps {
  profile: ProfileInfo;
  education: EducationItem[];
  monogram: string;
}

export function AboutSection({ profile, education, monogram }: AboutSectionProps) {
  const [resumeNotice, setResumeNotice] = useState(false);

  const handleResumeClick = () => {
    if (!profile.resumeUrl.trim()) {
      setResumeNotice(true);
    }
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 lg:py-28 bg-white dark:bg-[#0D172B] border-t border-slate-200/70 dark:border-white/5"
    >
      {/* Subtle section aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[540px] h-[220px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.14)_0%,transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="About Me"
          titlePrefix="Know More"
          titleAccent={profile.aboutHeadlineAccent}
          subtitle={profile.aboutSubtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left column: Uploaded Portrait Frame */}
          <Reveal className="lg:col-span-5 flex flex-col items-center lg:items-stretch">
            <div className="relative w-full max-w-[380px] mx-auto">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#00BFFF]/25 via-[#8B5CF6]/25 to-[#EC4899]/25 blur-xl"
              />
              <div className="relative p-[2px] rounded-3xl bg-gradient-to-tr from-[#00BFFF]/50 via-[#8B5CF6]/50 to-[#EC4899]/50">
                <div className="aspect-[4/4.4] rounded-[22px] overflow-hidden bg-slate-100 dark:bg-[#101D35]">
                  <PortraitImage
                    frame={profile.aboutPhoto}
                    initials={monogram}
                    shape="rounded"
                    placeholderCaption="About Photo Slot"
                  />
                </div>
              </div>
            </div>

            {/* Quick Summary Strip under Portrait */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-[380px] mx-auto">
              <div className="rounded-xl p-3.5 bg-slate-50 border border-slate-200 dark:bg-[#101D35]/80 dark:border-white/10">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-[#94A3B8] mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#00BFFF]" aria-hidden="true" />
                  <span>Location</span>
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {profile.location}
                </p>
              </div>

              <div className="rounded-xl p-3.5 bg-slate-50 border border-slate-200 dark:bg-[#101D35]/80 dark:border-white/10">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-[#94A3B8] mb-1">
                  <Briefcase className="w-3.5 h-3.5 text-[#EC4899]" aria-hidden="true" />
                  <span>Status</span>
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                  {profile.availabilityText}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right column: Biography, Background, Education & Resume Download */}
          <Reveal delayMs={80} className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                Biography &amp; Background
              </h3>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                {profile.biography.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Key Background Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {profile.backgroundHighlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-4 bg-slate-50 border border-slate-200/90 dark:bg-[#101D35]/70 dark:border-white/10"
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-[#94A3B8] mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Education Summary */}
            {education.length > 0 && (
              <div className="rounded-2xl p-5 bg-slate-50 border border-slate-200/90 dark:bg-[#101D35]/70 dark:border-white/10">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00BFFF]/20 to-[#8B5CF6]/20 flex items-center justify-center text-sky-600 dark:text-[#38BDF8]">
                    <GraduationCap className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Education Snapshot
                  </h4>
                </div>
                <div className="space-y-2.5">
                  {education.slice(0, 2).map((edu) => (
                    <div
                      key={edu.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-sm border-b last:border-b-0 border-slate-200/70 dark:border-white/10 pb-2.5 last:pb-0"
                    >
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {edu.degree}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-[#94A3B8]">
                          {edu.institution} · {edu.location}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-sky-700 dark:text-[#38BDF8] shrink-0">
                        {edu.period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resume Download Button */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              {profile.resumeUrl.trim() ? (
                <a
                  href={profile.resumeUrl}
                  download={profile.resumeFileName}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] hover:brightness-110 shadow-[0_8px_24px_rgba(139,92,246,0.35)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Download Resume</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleResumeClick}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] hover:brightness-110 shadow-[0_8px_24px_rgba(139,92,246,0.35)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899] cursor-pointer"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Download Resume</span>
                </button>
              )}

              <a
                href="#experience"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 dark:text-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-colors"
              >
                <span>View Full Timeline</span>
              </a>
            </div>

            {resumeNotice && !profile.resumeUrl.trim() && (
              <div
                role="status"
                className="flex items-start gap-2.5 rounded-xl p-3.5 text-xs sm:text-sm bg-sky-50 text-sky-900 border border-sky-200 dark:bg-[#101D35] dark:text-sky-200 dark:border-[#38BDF8]/30"
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-sky-600 dark:text-[#38BDF8]" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Resume file not attached yet.</p>
                  <p className="mt-0.5 opacity-90">
                    Place your PDF at <code className="font-mono">/public/resume.pdf</code> and set{' '}
                    <code className="font-mono">profile.resumeUrl: &quot;/resume.pdf&quot;</code> in{' '}
                    <code className="font-mono">src/config/portfolioConfig.ts</code> to enable one-click downloads.
                  </p>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
