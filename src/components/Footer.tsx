import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import type { ProfileInfo, SocialLink } from '../types/portfolio';
import type { NavItem } from '../utils/portfolioHelpers';
import { SocialIcon } from './PortfolioIcons';

interface FooterProps {
  profile: ProfileInfo;
  monogram: string;
  navItems: NavItem[];
  socialLinks: SocialLink[];
}

export function Footer({
  profile,
  monogram,
  navItems,
  socialLinks,
}: FooterProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 420);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const currentYear = new Date().getFullYear();
  const displayName = `${profile.firstName} ${profile.lastName}`.trim();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-white dark:bg-[#080F1E] border-t border-slate-200/80 dark:border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200/80 dark:border-white/10">
            {/* Brand */}
            <a href="#home" className="flex items-center gap-3 shrink-0">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#38BDF8] via-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white font-extrabold text-xs">
                {monogram}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {profile.brandName}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-[#94A3B8]">
                  {profile.brandSubtitle}
                </p>
              </div>
            </a>

            {/* Navigation */}
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            >
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-950 dark:text-[#94A3B8] dark:hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target={social.url.startsWith('http') ? '_blank' : undefined}
                  rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-950 dark:text-[#94A3B8] dark:bg-white/5 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
                >
                  <SocialIcon platform={social.platform} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-[#94A3B8]">
            <p>
              &copy; {currentYear} {displayName}. All rights reserved.
            </p>
            <p>Built with React, TypeScript &amp; Tailwind CSS.</p>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center text-white bg-gradient-to-tr from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] shadow-[0_8px_24px_rgba(139,92,246,0.45)] hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF]"
        >
          <ArrowUp className="w-5 h-5" aria-hidden="true" />
        </button>
      )}
    </>
  );
}
