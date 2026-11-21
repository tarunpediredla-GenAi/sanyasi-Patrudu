export type BadgeColorVariant =
  | 'blue'
  | 'pink'
  | 'yellow'
  | 'cyan'
  | 'green'
  | 'purple'
  | 'orange'
  | 'indigo';

export type SkillCategory =
  | 'Azure & Big Data'
  | 'Languages & Databases'
  | 'DevOps & Monitoring'
  | 'AI & Gen AI';

export type IconKey =
  | 'code'
  | 'layout'
  | 'server'
  | 'smartphone'
  | 'database'
  | 'layers'
  | 'terminal'
  | 'globe'
  | 'cpu'
  | 'git-branch'
  | 'sparkles'
  | 'shield'
  | 'palette'
  | 'zap';

export type SocialPlatform = 'github' | 'linkedin' | 'twitter' | 'dribbble' | 'email' | 'website';

export interface ImageFrameSettings {
  /** Path to local image inside /public or /src/assets/images, or empty string for neutral placeholder */
  src: string;
  alt: string;
  /** Horizontal focal point percentage (0 = left, 50 = center, 100 = right) */
  objectPositionX: number;
  /** Vertical focal point percentage (0 = top, 50 = center, 100 = bottom) */
  objectPositionY: number;
  /** Zoom scale factor (1 = 100%, e.g. 1.05 to 1.4 for tighter portrait crop) */
  scale: number;
}

export interface HeroTechBadge {
  label: string;
  variant: BadgeColorVariant;
}

export interface HeroStatCard {
  id: 'projects' | 'experience';
  value: string;
  label: string;
  accent: 'blue-purple' | 'pink-purple';
}

export interface ProfileInfo {
  brandName: string;
  brandSubtitle: string;
  brandMonogram: string;
  firstName: string;
  lastName: string;
  availabilityText: string;
  greeting: string;
  roles: string[];
  heroIntro: string;
  codeSnippet: {
    name: string;
    role: string;
    passion: string;
  };
  heroPhoto: ImageFrameSettings;
  aboutPhoto: ImageFrameSettings;
  heroBadges: HeroTechBadge[];
  heroStats: [HeroStatCard, HeroStatCard];
  aboutHeadlineAccent: string;
  aboutSubtitle: string;
  biography: string[];
  backgroundHighlights: {
    label: string;
    value: string;
  }[];
  location: string;
  phone?: string;
  email: string;
  resumeUrl: string;
  resumeFileName: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
  accent: 'blue' | 'purple' | 'pink' | 'cyan';
  deliverables: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  focus: string;
  icon: IconKey;
  accent: BadgeColorVariant;
}

export interface ProjectScreenshot {
  src: string;
  caption: string;
  objectPositionX?: number;
  objectPositionY?: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  fullDescription: string;
  technologies: string[];
  highlights: string[];
  githubUrl: string;
  liveDemoUrl: string;
  coverImage: ImageFrameSettings;
  screenshots: ProjectScreenshot[];
  statusLabel: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  details: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  organization: string;
  avatarSrc?: string;
}

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  label: string;
  url: string;
}

export interface ContactConfig {
  headingAccent: string;
  subtitle: string;
  recipientEmail: string;
  /**
   * Optional real form endpoint (e.g. Formspree or Web3Forms URL).
   * When left empty, the contact form uses a clearly labeled mailto: fallback
   * and copy-to-clipboard option so it never falsely claims delivery.
   */
  formEndpoint: string;
  responseNote: string;
}

export interface PortfolioConfig {
  profile: ProfileInfo;
  services: ServiceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  testimonials: TestimonialItem[];
  socialLinks: SocialLink[];
  contact: ContactConfig;
}
