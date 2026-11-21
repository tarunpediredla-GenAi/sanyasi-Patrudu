import { Check } from 'lucide-react';
import type { ServiceItem } from '../types/portfolio';
import { PortfolioIcon } from './PortfolioIcons';
import { SectionHeader } from './SectionHeader';
import { Reveal } from './Reveal';

interface ServicesSectionProps {
  services: ServiceItem[];
}

const ACCENT_STYLES: Record<ServiceItem['accent'], { iconBg: string; ringHover: string }> = {
  blue: {
    iconBg: 'from-[#00BFFF] to-[#3B82F6]',
    ringHover: 'hover:border-[#00BFFF]/50 dark:hover:border-[#00BFFF]/45',
  },
  purple: {
    iconBg: 'from-[#6366F1] to-[#8B5CF6]',
    ringHover: 'hover:border-[#8B5CF6]/50 dark:hover:border-[#8B5CF6]/45',
  },
  pink: {
    iconBg: 'from-[#A855F7] to-[#EC4899]',
    ringHover: 'hover:border-[#EC4899]/50 dark:hover:border-[#EC4899]/45',
  },
  cyan: {
    iconBg: 'from-[#06B6D4] to-[#0EA5E9]',
    ringHover: 'hover:border-cyan-400/50 dark:hover:border-cyan-400/45',
  },
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="relative py-20 lg:py-28 bg-slate-50 dark:bg-[#0B1426] border-t border-slate-200/70 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Services"
          titlePrefix="What I"
          titleAccent="Offer"
          subtitle="End-to-end cloud data engineering capabilities focused on scalable ETL/ELT pipelines, lakehouse architecture, governance, and reliable analytics delivery."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const accent = ACCENT_STYLES[service.accent];
            return (
              <Reveal key={service.id} delayMs={index * 70}>
                <article
                  className={`group h-full rounded-2xl p-6 sm:p-7 bg-white border border-slate-200/90 shadow-sm hover:shadow-lg dark:bg-[#101D35]/75 dark:border-white/10 dark:shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-all duration-200 hover:-translate-y-1 ${accent.ringHover}`}
                >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent.iconBg} text-white flex items-center justify-center shadow-md mb-5 group-hover:scale-105 transition-transform duration-200`}
                >
                  <PortfolioIcon name={service.icon} className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5">
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8] mb-5">
                  {service.description}
                </p>

                {service.deliverables.length > 0 && (
                  <ul className="space-y-2 pt-4 border-t border-slate-100 dark:border-white/10">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-xs sm:text-[13px] font-medium text-slate-700 dark:text-slate-300"
                      >
                        <Check
                          className="w-3.5 h-3.5 text-sky-600 dark:text-[#00BFFF] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
