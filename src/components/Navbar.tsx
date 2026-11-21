import { useEffect, useState } from 'react';
import { ArrowRight, Menu, Moon, Sun, X } from 'lucide-react';
import type { ProfileInfo } from '../types/portfolio';
import type { NavItem } from '../utils/portfolioHelpers';

interface NavbarProps {
  profile: ProfileInfo;
  monogram: string;
  navItems: NavItem[];
  activeSection: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Navbar({
  profile,
  monogram,
  navItems,
  activeSection,
  theme,
  onToggleTheme,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-[#0B1426]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.28)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[74px] flex items-center justify-between gap-4">
        {/* Left: Square gradient logo + brand + small subtitle */}
        <a
          href="#home"
          className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF] rounded-xl"
        >
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#38BDF8] via-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white font-extrabold text-sm tracking-tight shadow-[0_6px_20px_rgba(139,92,246,0.35)] group-hover:scale-105 transition-transform duration-200">
            {monogram}
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
              {profile.brandName}
            </span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-[#94A3B8] whitespace-nowrap">
              {profile.brandSubtitle}
            </span>
          </span>
        </a>

        {/* Center: Clean single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF] rounded ${
                  isActive
                    ? 'text-slate-950 dark:text-white'
                    : 'text-slate-600 hover:text-slate-950 dark:text-[#CBD5E1] dark:hover:text-white'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-[#00BFFF] via-[#8B5CF6] to-[#EC4899] transition-all duration-200 ${
                    isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right: Theme toggle + Pink gradient Hire Me button + Mobile menu trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-slate-200/70 dark:text-[#CBD5E1] dark:hover:text-white dark:hover:bg-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF] cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-[18px] h-[18px]" aria-hidden="true" />
            ) : (
              <Moon className="w-[18px] h-[18px]" aria-hidden="true" />
            )}
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white whitespace-nowrap shrink-0 bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#EC4899] hover:brightness-110 shadow-[0_6px_22px_rgba(236,72,153,0.35)] hover:shadow-[0_8px_28px_rgba(236,72,153,0.5)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]"
          >
            <span>Hire Me</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-slate-700 hover:bg-slate-200/70 dark:text-white dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF] cursor-pointer"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="lg:hidden bg-white/95 dark:bg-[#0E1930]/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-4 pt-3 pb-5 shadow-xl"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 dark:bg-white/10 dark:text-white'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-[#CBD5E1] dark:hover:bg-white/5 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#EC4899] shadow-lg"
            >
              <span>Hire Me</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
