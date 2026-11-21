import { Quote } from 'lucide-react';
import type { TestimonialItem } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';
import { Reveal } from './Reveal';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

/**
 * Renders genuine client or teammate testimonials.
 * Automatically returns null when no genuine testimonials are configured
 * so fabricated reviews are never displayed.
 */
export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="relative py-20 lg:py-28 bg-slate-50 dark:bg-[#0B1426] border-t border-slate-200/70 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Testimonials"
          titlePrefix="Kind Words &"
          titleAccent="Recommendations"
          subtitle="Verified feedback from teammates, mentors, and collaborators."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => {
            const initials = item.authorName
              .split(' ')
              .map((part) => part[0])
              .join('')
              .slice(0, 2)
              .toUpperCase();

            return (
              <Reveal key={item.id} delayMs={idx * 70} className="h-full">
                <blockquote className="h-full flex flex-col justify-between rounded-2xl p-6 bg-white border border-slate-200/90 shadow-sm dark:bg-[#101D35]/75 dark:border-white/10">
                <div>
                  <Quote
                    className="w-8 h-8 text-[#8B5CF6]/60 mb-4"
                    aria-hidden="true"
                  />
                  <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200 mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <footer className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
                  {item.avatarSrc ? (
                    <img
                      src={item.avatarSrc}
                      alt={item.authorName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00BFFF] via-[#8B5CF6] to-[#EC4899] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {initials}
                    </span>
                  )}
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.authorName}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
                      {item.authorRole} · {item.organization}
                    </p>
                  </div>
                </footer>
              </blockquote>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
