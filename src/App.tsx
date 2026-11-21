import { useEffect, useMemo, useState } from 'react';
import { portfolioConfig } from './config/portfolioConfig';
import type { ProjectItem } from './types/portfolio';
import {
  getDisplayInitials,
  getVisibleNavItems,
} from './utils/portfolioHelpers';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ExperienceSection } from './components/ExperienceSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    try {
      const saved = localStorage.getItem('devport-theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const navItems = useMemo(
    () => getVisibleNavItems(portfolioConfig.testimonials),
    []
  );

  const monogram = useMemo(
    () =>
      getDisplayInitials(
        portfolioConfig.profile.firstName,
        portfolioConfig.profile.lastName,
        portfolioConfig.profile.brandMonogram
      ),
    []
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('devport-theme', theme);
    } catch {
      // Ignore storage failures in restricted contexts
    }
  }, [theme]);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navItems]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50 text-slate-900 dark:bg-[#0B1426] dark:text-white transition-colors duration-300">
      <Navbar
        profile={portfolioConfig.profile}
        monogram={monogram}
        navItems={navItems}
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main>
        <HeroSection
          profile={portfolioConfig.profile}
          monogram={monogram}
          socialLinks={portfolioConfig.socialLinks}
        />

        <AboutSection
          profile={portfolioConfig.profile}
          education={portfolioConfig.education}
          monogram={monogram}
        />

        <ServicesSection services={portfolioConfig.services} />

        <SkillsSection skills={portfolioConfig.skills} />

        <ProjectsSection
          projects={portfolioConfig.projects}
          onSelectProject={setSelectedProject}
        />

        <ExperienceSection
          experience={portfolioConfig.experience}
          education={portfolioConfig.education}
        />

        <TestimonialsSection testimonials={portfolioConfig.testimonials} />

        <ContactSection
          profile={portfolioConfig.profile}
          contact={portfolioConfig.contact}
          socialLinks={portfolioConfig.socialLinks}
        />
      </main>

      <Footer
        profile={portfolioConfig.profile}
        monogram={monogram}
        navItems={navItems}
        socialLinks={portfolioConfig.socialLinks}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
