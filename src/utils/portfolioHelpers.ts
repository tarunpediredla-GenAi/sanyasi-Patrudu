import type { CSSProperties } from 'react';
import type {
  ImageFrameSettings,
  ProjectItem,
  SkillItem,
  TestimonialItem,
} from '../types/portfolio';

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactForm(values: ContactFormValues): {
  isValid: boolean;
  errors: ContactFormErrors;
} {
  const errors: ContactFormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (name.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (subject.length < 3) {
    errors.subject = 'Please add a short subject (at least 3 characters).';
  }

  if (message.length < 10) {
    errors.message = 'Please write a message of at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildMailtoHref(
  recipientEmail: string,
  values: ContactFormValues
): string {
  const safeRecipient = recipientEmail.trim() || 'hello@example.com';
  const subject = values.subject.trim();
  const body = [
    `Hi,`,
    '',
    values.message.trim(),
    '',
    `— ${values.name.trim()} (${values.email.trim()})`,
  ].join('\n');

  const params = new URLSearchParams({
    subject,
    body,
  });

  // URLSearchParams encodes spaces as '+', which some mail clients render literally; use %20
  const query = params.toString().replace(/\+/g, '%20');
  return `mailto:${safeRecipient}?${query}`;
}

export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) {
    return min;
  }
  return Math.min(max, Math.max(min, value));
}

export function getImageFrameStyle(frame: ImageFrameSettings): CSSProperties {
  const posX = clamp(frame.objectPositionX, 0, 100);
  const posY = clamp(frame.objectPositionY, 0, 100);
  const scale = clamp(frame.scale, 1, 2.2);

  return {
    objectPosition: `${posX}% ${posY}%`,
    transform: scale === 1 ? undefined : `scale(${scale})`,
  };
}

export function getVisibleNavItems(testimonials: TestimonialItem[]): NavItem[] {
  const items: NavItem[] = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'projects', label: 'Projects', href: '#projects' },
  ];

  if (testimonials.length > 0) {
    items.push({ id: 'testimonials', label: 'Testimonials', href: '#testimonials' });
  }

  items.push({ id: 'contact', label: 'Contact', href: '#contact' });
  return items;
}

export function getProjectCategories(projects: ProjectItem[]): string[] {
  const unique = new Set<string>();
  for (const project of projects) {
    if (project.category.trim()) {
      unique.add(project.category.trim());
    }
  }
  return ['All', ...Array.from(unique)];
}

export function filterProjectsByCategory(
  projects: ProjectItem[],
  category: string
): ProjectItem[] {
  if (!category || category === 'All') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}

export function filterSkillsByCategory(
  skills: SkillItem[],
  category: string
): SkillItem[] {
  if (!category || category === 'All') {
    return skills;
  }
  return skills.filter((skill) => skill.category === category);
}

export function getDisplayInitials(
  firstName: string,
  lastName: string,
  fallback = 'DP'
): string {
  const cleanFirst = firstName.replace(/[\[\]]/g, '').trim();
  const cleanLast = lastName.replace(/[\[\]]/g, '').trim();

  if (
    !cleanFirst ||
    cleanFirst.toUpperCase().startsWith('COUSIN')
  ) {
    return fallback.slice(0, 2).toUpperCase();
  }

  const firstInitial = cleanFirst[0] ?? '';
  const lastInitial = cleanLast && !cleanLast.toUpperCase().startsWith('COUSIN')
    ? cleanLast[0]
    : cleanFirst[1] ?? '';

  return `${firstInitial}${lastInitial}`.toUpperCase() || fallback.slice(0, 2).toUpperCase();
}
