import { useEffect, useState } from 'react';
import { ArrowRight, Code2, Cpu, MessageSquare, Terminal } from 'lucide-react';
import type { BadgeColorVariant, ProfileInfo, SocialLink } from '../types/portfolio';
import { PortraitImage } from './PortraitImage';
import { SocialIcon } from './PortfolioIcons';
import { Reveal } from './Reveal';

interface HeroSectionProps {
  profile: ProfileInfo;
  monogram: string;
  socialLinks: SocialLink[];
}

const BADGE_STYLES: Record<BadgeColorVariant, string> = {
  blue: 'bg-sky-500 text-white shadow-[0_4px_14px_rgba(14,165,233,0.35)]',
  pink: 'bg-fuchsia-500 text-white shadow-[0_4px_14px_rgba(217,70,239,0.35)]',
  yellow: 'bg-amber-500 text-slate-950 shadow-[0_4px_14px_rgba(245,158,11,0.35)]',
  cyan: 'bg-cyan-500 text-white shadow-[0_4px_14px_rgba(6,182,212,0.35)]',
  green: 'bg-emerald-500 text-white shadow-[0_4px_14px_rgba(16,185,129,0.35)]',
  purple: 'bg-violet-500 text-white shadow-[0_4px_14px_rgba(139,92,246,0.35)]',
  orange: 'bg-orange-500 text-white shadow-[0_4px_14px_rgba(249,115,22,0.35)]',
  indigo: 'bg-indigo-500 text-white shadow-[0_4px_14px_rgba(99,102,241,0.35)]',
};

const AMBIENT_PARTICLES = [
  { top: '14%', left: '8%', size: 3, delay: '0s', color: 'bg-[#00BFFF]/70' },
  { top: '22%', left: '42%', size: 2.5, delay: '1.2s', color: 'bg-[#8B5CF6]/70' },
  { top: '18%', left: '84%', size: 3, delay: '2.1s', color: 'bg-[#EC4899]/60' },
  { top: '48%', left: '4%', size: 2, delay: '0.7s', color: 'bg-white/50' },
  { top: '62%', left: '46%', size: 2.5, delay: '1.8s', color: 'bg-[#00BFFF]/60' },
  { top: '78%', left: '16%', size: 3, delay: '2.6s', color: 'bg-[#8B5CF6]/65' },
  { top: '82%', left: '72%', size: 2.5, delay: '0.4s', color: 'bg-[#00BFFF]/60' },
  { top: '34%', left: '92%', size: 2, delay: '1.5s', color: 'bg-white/55' },
  { top: '88%', left: '44%', size: 3, delay: '3s', color: 'bg-[#EC4899]/55' },
];

function useTypedRole(roles: string[]) {
  const safeRoles = roles.length > 0 ? roles : ['Software Developer'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(safeRoles[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || safeRoles.length <= 1) {
      setDisplayedText(safeRoles[0]);
      return;
    }

    const currentRole = safeRoles[roleIndex % safeRoles.length];
    let timeoutId: number;

    if (!isDeleting && displayedText === currentRole) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 2100);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % safeRoles.length);
    } else {
      const nextText = isDeleting
        ? currentRole.slice(0, displayedText.length - 1)
        : currentRole.slice(0, displayedText.length + 1);
      timeoutId = window.setTimeout(
        () => setDisplayedText(nextText),
        isDeleting ? 42 : 78
      );
    }

    return () => window.clearTimeout(timeoutId);
  }, [displayedText, isDeleting, roleIndex, safeRoles]);

  return displayedText;
}

export function HeroSection({ profile, monogram, socialLinks }: HeroSectionProps) {
  const typedRole = useTypedRole(profile.roles);
  const [projectsStat, experienceStat] = profile.heroStats;
  const maxNameLineLen = Math.max(
    profile.firstName.trim().length,
    profile.lastName.trim().length
  );
  const nameSizeClass =
    maxNameLineLen > 12
      ? 'text-[clamp(1.65rem,3.1vw,3.15rem)]'
      : 'text-[clamp(2.5rem,4.8vw,4.5rem)]';

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-2rem)] flex items-center pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24 overflow-hidden bg-slate-50 dark:bg-[#0B1426]"
    >
      {/* Ambient DevPort Background Lighting & Glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Central-top soft purple/magenta radial aura matching screenshot */}
        <div className="absolute top-[8%] left-[38%] -translate-x-1/2 w-[560px] h-[560px] sm:w-[760px] sm:h-[760px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.28)_0%,rgba(236,72,153,0.14)_40%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(139,92,246,0.34)_0%,rgba(236,72,153,0.16)_42%,transparent_72%)] blur-3xl" />

        {/* Right portrait ambient purple/pink halo */}
        <div className="absolute top-[30%] right-[8%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.22)_0%,rgba(236,72,153,0.12)_50%,transparent_72%)] blur-3xl" />

        {/* Bottom electric blue lighting */}
        <div className="absolute -bottom-32 left-[32%] -translate-x-1/2 w-[680px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(0,191,255,0.20)_0%,rgba(59,130,246,0.10)_50%,transparent_75%)] dark:bg-[radial-gradient(circle,rgba(0,191,255,0.25)_0%,rgba(59,130,246,0.12)_50%,transparent_75%)] blur-3xl" />

        {/* Subtle decorative particles */}
        {AMBIENT_PARTICLES.map((particle, index) => (
          <span
            key={index}
            style={{
              top: particle.top,
              left: particle.left,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: particle.delay,
            }}
            className={`hidden dark:block absolute rounded-full animate-particle-twinkle ${particle.color}`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-center">
          {/* LEFT SIDE — HERO CONTENT */}
          <Reveal
            immediate
            className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left"
          >
            {/* Availability Badge with glowing blue dot */}
            <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-5 sm:mb-6 bg-white/90 border border-slate-200/90 shadow-sm dark:bg-[#101D35]/85 dark:border-white/10 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#00BFFF] opacity-60 blur-[2px]" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00BFFF] shadow-[0_0_8px_#00BFFF]" />
              </span>
              <span className="text-xs sm:text-[13px] font-medium text-slate-700 dark:text-slate-200">
                {profile.availabilityText}
              </span>
            </div>

            {/* Greeting */}
            <p className="text-base sm:text-xl font-medium text-slate-600 dark:text-[#94A3B8] mb-1.5 sm:mb-2">
              {profile.greeting}
            </p>

            {/* Very large bold two-line display name */}
            <h1
              className={`font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.08] mb-3.5 sm:mb-4 ${nameSizeClass}`}
            >
              <span className="block whitespace-nowrap">{profile.firstName}</span>
              <span className="block whitespace-nowrap">{profile.lastName}</span>
            </h1>

            {/* Animated professional role line */}
            <div className="flex flex-wrap items-baseline gap-x-2 text-xl sm:text-2xl md:text-[28px] font-bold mb-5 min-h-[2.25rem]">
              <span className="text-slate-800 dark:text-white">
                {/^[aeiou]/i.test(typedRole.trim()) ? "I'm an" : "I'm a"}
              </span>
              <span
                className="text-sky-600 dark:text-[#38BDF8] dark:drop-shadow-[0_0_16px_rgba(0,191,255,0.45)]"
                aria-live="polite"
              >
                {typedRole}
                <span
                  aria-hidden="true"
                  className="inline-block ml-1 w-[3px] h-[0.9em] align-[-0.1em] bg-sky-500 dark:bg-[#00BFFF] animate-cursor-blink rounded-full"
                />
              </span>
            </div>

            {/* Introductory paragraph */}
            <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-[#94A3B8] max-w-xl mb-7">
              {profile.heroIntro}
            </p>

            {/* Colorful rounded technology badges */}
            {profile.heroBadges.length > 0 && (
              <div
                aria-label="Core technologies"
                className="flex flex-wrap items-center gap-2.5 mb-8"
              >
                {profile.heroBadges.map((badge) => (
                  <span
                    key={badge.label}
                    className={`inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide transition-transform duration-200 hover:-translate-y-0.5 ${BADGE_STYLES[badge.variant]}`}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-8 w-full sm:w-auto">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-[15px] font-semibold text-white whitespace-nowrap bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] hover:brightness-110 shadow-[0_10px_28px_rgba(139,92,246,0.38)] hover:shadow-[0_14px_34px_rgba(236,72,153,0.48)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-[15px] font-semibold whitespace-nowrap text-slate-900 bg-white border border-slate-300 hover:bg-slate-100 hover:border-slate-400 dark:text-white dark:bg-[#101D35]/70 dark:border-white/15 dark:hover:bg-[#162746] dark:hover:border-white/30 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF]"
              >
                <span>Let&apos;s Talk</span>
                <MessageSquare className="w-4 h-4 opacity-80" aria-hidden="true" />
              </a>
            </div>

            {/* Follow Me social links matching reference layout */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-500 dark:text-[#94A3B8]">
                  Follow me:
                </span>
                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target={social.url.startsWith('http') ? '_blank' : undefined}
                      rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={social.label}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 bg-white border border-slate-200 hover:text-slate-950 hover:border-purple-400 dark:text-[#94A3B8] dark:bg-[#101D35]/80 dark:border-white/10 dark:hover:text-white dark:hover:border-[#8B5CF6]/60 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF]"
                    >
                      <SocialIcon platform={social.platform} className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </Reveal>

          {/* RIGHT SIDE — CIRCULAR PORTRAIT + FLOATING CODE CARD + FLOATING STATS */}
          <Reveal
            immediate
            className="lg:col-span-6 xl:col-span-6 flex flex-col items-center justify-center"
          >
            {/* Visual Stage Container */}
            <div className="relative w-full max-w-[480px] sm:max-w-[560px] flex items-center justify-center pt-4 pb-6 sm:pt-20 sm:pb-14 lg:pt-24 lg:pb-16">
              {/* Outer ambient glow ring behind circle */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute w-[260px] h-[260px] sm:w-[370px] sm:h-[370px] rounded-full bg-gradient-to-tr from-[#00BFFF]/35 via-[#8B5CF6]/45 to-[#EC4899]/40 blur-2xl animate-ring-glow"
              />

              {/* Circular Portrait Frame with glowing pink-purple border & pale interior */}
              <div className="relative z-10 animate-float-slow">
                <div className="w-[235px] h-[235px] sm:w-[320px] sm:h-[320px] xl:w-[348px] xl:h-[348px] rounded-full p-[5px] bg-gradient-to-br from-[#60A5FA] via-[#C084FC] to-[#EC4899] shadow-[0_0_55px_rgba(168,85,247,0.42),0_16px_45px_rgba(11,20,38,0.48)]">
                  <div className="w-full h-full rounded-full p-1 bg-white dark:bg-[#F1F5F9] overflow-hidden">
                    <PortraitImage
                      frame={profile.heroPhoto}
                      initials={monogram}
                      shape="circle"
                      placeholderCaption="Upload Portrait"
                    />
                  </div>
                </div>

                {/* 4 Floating Decorative Icons Orbiting Portrait — matching attached screenshot */}
                <div
                  aria-hidden="true"
                  className="hidden sm:flex absolute left-[12%] -top-1 z-20 w-9 h-9 rounded-xl bg-[#8B5CF6] text-white items-center justify-center shadow-[0_8px_22px_rgba(139,92,246,0.5)] -rotate-12 animate-float-reverse"
                >
                  <Code2 className="w-4 h-4 rotate-12" />
                </div>

                <div
                  aria-hidden="true"
                  className="hidden sm:flex absolute -left-3.5 bottom-[24%] z-20 w-9 h-9 rounded-full bg-[#EC4899] text-white items-center justify-center shadow-[0_8px_22px_rgba(236,72,153,0.5)] animate-float-card"
                >
                  <Terminal className="w-4 h-4" />
                </div>

                <div
                  aria-hidden="true"
                  className="hidden sm:flex absolute right-[28%] -bottom-3.5 z-20 w-9 h-9 rounded-full bg-[#10B981] text-white items-center justify-center shadow-[0_8px_22px_rgba(16,185,129,0.5)] animate-float-reverse"
                >
                  <Cpu className="w-4 h-4" />
                </div>

                <div
                  aria-hidden="true"
                  className="hidden sm:flex absolute -right-3 top-[40%] z-20 w-9 h-9 rounded-xl bg-[#00BFFF] text-white items-center justify-center shadow-[0_8px_22px_rgba(0,191,255,0.5)] rotate-12 animate-float-card"
                >
                  <MessageSquare className="w-4 h-4 -rotate-12" />
                </div>
              </div>

              {/* FLOATING CODE EDITOR CARD (Positioned clearly above & right of portrait with full legibility) */}
              <div
                aria-label="Developer code preview"
                className="hidden sm:block absolute -top-3 right-0 xl:-right-6 z-20 w-[290px] xl:w-[310px] rounded-xl bg-[#0D182D]/95 border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.48)] backdrop-blur-md p-3.5 animate-float-card"
              >
                <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" aria-hidden="true" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" aria-hidden="true" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" aria-hidden="true" />
                  <span className="ml-auto text-[10px] font-mono text-slate-400">
                    profile.js
                  </span>
                </div>
                <pre className="font-mono text-[11px] leading-[1.6] text-slate-200 whitespace-pre-wrap break-words">
                  <code>
                    <span className="text-[#C084FC]">const</span>{' '}
                    <span className="text-[#38BDF8]">developer</span>{' '}
                    <span className="text-slate-400">=</span>{' '}
                    <span className="text-amber-300">{'{'}</span>
                    {'\n  '}
                    <span className="text-sky-300">name</span>
                    <span className="text-slate-400">:</span>{' '}
                    <span className="text-emerald-300">
                      &quot;{profile.codeSnippet.name}&quot;
                    </span>
                    <span className="text-slate-400">,</span>
                    {'\n  '}
                    <span className="text-sky-300">role</span>
                    <span className="text-slate-400">:</span>{' '}
                    <span className="text-pink-300">
                      &quot;{profile.codeSnippet.role}&quot;
                    </span>
                    <span className="text-slate-400">,</span>
                    {'\n  '}
                    <span className="text-sky-300">passion</span>
                    <span className="text-slate-400">:</span>{' '}
                    <span className="text-amber-200">
                      &quot;{profile.codeSnippet.passion}&quot;
                    </span>
                    {'\n'}
                    <span className="text-amber-300">{'}'}</span>
                    <span className="text-slate-400">;</span>
                  </code>
                </pre>
              </div>

              {/* FLOATING STAT CARD 1 — PROJECTS (Bottom-Left on sm+) */}
              <div className="hidden sm:flex flex-col items-center justify-center absolute left-0 xl:-left-2 bottom-4 z-20 min-w-[116px] rounded-2xl px-4 py-3.5 bg-white/90 border border-slate-200/90 shadow-lg dark:bg-[#101D35]/85 dark:border-white/12 dark:shadow-[0_14px_36px_rgba(0,0,0,0.4)] backdrop-blur-md animate-float-reverse">
                <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] bg-clip-text text-transparent">
                  {projectsStat.value}
                </span>
                <span className="text-xs font-medium text-slate-600 dark:text-[#94A3B8] mt-0.5">
                  {projectsStat.label}
                </span>
              </div>

              {/* FLOATING STAT CARD 2 — EXPERIENCE (Bottom-Right on sm+) */}
              <div className="hidden sm:flex flex-col items-center justify-center absolute right-2 xl:right-0 bottom-2 z-20 min-w-[116px] rounded-2xl px-4 py-3.5 bg-white/90 border border-slate-200/90 shadow-lg dark:bg-[#101D35]/85 dark:border-white/12 dark:shadow-[0_14px_36px_rgba(0,0,0,0.4)] backdrop-blur-md animate-float-card">
                <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-[#A855F7] to-[#EC4899] bg-clip-text text-transparent">
                  {experienceStat.value}
                </span>
                <span className="text-xs font-medium text-slate-600 dark:text-[#94A3B8] mt-0.5">
                  {experienceStat.label}
                </span>
              </div>
            </div>

            {/* Mobile-only Non-Overlapping Code & Stat Cards Stack */}
            <div className="sm:hidden w-full max-w-sm mt-2 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center justify-center rounded-2xl px-4 py-3 bg-white border border-slate-200 shadow-sm dark:bg-[#101D35]/90 dark:border-white/10">
                  <span className="text-base font-extrabold bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] bg-clip-text text-transparent">
                    {projectsStat.value}
                  </span>
                  <span className="text-xs font-medium text-slate-600 dark:text-[#94A3B8]">
                    {projectsStat.label}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl px-4 py-3 bg-white border border-slate-200 shadow-sm dark:bg-[#101D35]/90 dark:border-white/10">
                  <span className="text-base font-extrabold bg-gradient-to-r from-[#A855F7] to-[#EC4899] bg-clip-text text-transparent">
                    {experienceStat.value}
                  </span>
                  <span className="text-xs font-medium text-slate-600 dark:text-[#94A3B8]">
                    {experienceStat.label}
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-[#0D182D] border border-white/12 p-3.5 shadow-lg">
                <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444]" aria-hidden="true" />
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" aria-hidden="true" />
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" aria-hidden="true" />
                  <span className="ml-auto text-[10px] font-mono text-slate-400">
                    profile.js
                  </span>
                </div>
                <pre className="font-mono text-[11px] leading-[1.55] text-slate-200 overflow-x-auto">
                  <code>
                    <span className="text-[#C084FC]">const</span>{' '}
                    <span className="text-[#38BDF8]">developer</span> = {'{\n  '}
                    <span className="text-sky-300">name</span>:{' '}
                    <span className="text-emerald-300">
                      &quot;{profile.codeSnippet.name}&quot;
                    </span>
                    ,{'\n  '}
                    <span className="text-sky-300">role</span>:{' '}
                    <span className="text-pink-300">
                      &quot;{profile.codeSnippet.role}&quot;
                    </span>
                    ,{'\n  '}
                    <span className="text-sky-300">passion</span>:{' '}
                    <span className="text-amber-200">
                      &quot;{profile.codeSnippet.passion}&quot;
                    </span>
                    {'\n}'};
                  </code>
                </pre>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
