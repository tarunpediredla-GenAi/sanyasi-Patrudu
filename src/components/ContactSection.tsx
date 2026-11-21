import { useState, type FormEvent } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import type { ContactConfig, ProfileInfo, SocialLink } from '../types/portfolio';
import {
  buildMailtoHref,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../utils/portfolioHelpers';
import { SocialIcon } from './PortfolioIcons';
import { SectionHeader } from './SectionHeader';
import { Reveal } from './Reveal';

interface ContactSectionProps {
  profile: ProfileInfo;
  contact: ContactConfig;
  socialLinks: SocialLink[];
}

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactSection({
  profile,
  contact,
  socialLinks,
}: ContactSectionProps) {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitState, setSubmitState] = useState<
    'idle' | 'submitting' | 'sent-via-endpoint' | 'mailto-ready' | 'endpoint-error'
  >('idle');
  const [endpointErrorMsg, setEndpointErrorMsg] = useState('');
  const [mailtoHref, setMailtoHref] = useState('');
  const [copied, setCopied] = useState(false);

  const hasServerEndpoint = Boolean(contact.formEndpoint.trim());

  const handleChange = (field: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitState !== 'idle') {
      setSubmitState('idle');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateContactForm(values);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setSubmitState('idle');
      return;
    }

    setErrors({});

    if (hasServerEndpoint) {
      setSubmitState('submitting');
      setEndpointErrorMsg('');
      try {
        const response = await fetch(contact.formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error(`Submission failed with status ${response.status}`);
        }

        setSubmitState('sent-via-endpoint');
        setValues(INITIAL_VALUES);
      } catch (err) {
        setEndpointErrorMsg(
          err instanceof Error
            ? err.message
            : 'Unable to reach the configured form endpoint.'
        );
        setMailtoHref(buildMailtoHref(contact.recipientEmail, values));
        setSubmitState('endpoint-error');
      }
      return;
    }

    // Clearly labeled mailto fallback — never pretends a server received the message
    const generatedHref = buildMailtoHref(contact.recipientEmail, values);
    setMailtoHref(generatedHref);
    setSubmitState('mailto-ready');

    // Trigger user's local email client cleanly via anchor click (avoids window.open issues)
    const link = document.createElement('a');
    link.href = generatedHref;
    link.click();
  };

  const handleCopyMessage = async () => {
    const formatted = `To: ${contact.recipientEmail}\nSubject: ${values.subject.trim()}\nFrom: ${values.name.trim()} <${values.email.trim()}>\n\n${values.message.trim()}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20 lg:py-28 bg-slate-50 dark:bg-[#0B1426] border-t border-slate-200/70 dark:border-white/5"
    >
      {/* Subtle bottom blue/purple aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[620px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(0,191,255,0.14)_0%,rgba(139,92,246,0.12)_45%,transparent_75%)] blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Contact"
          titlePrefix="Get"
          titleAccent={contact.headingAccent}
          subtitle={contact.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Side: Direct Contact Info & Social Links */}
          <Reveal className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl p-6 sm:p-7 bg-white border border-slate-200/90 shadow-sm dark:bg-[#101D35]/80 dark:border-white/10 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Let&apos;s Connect
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8]">
                  Reach out directly via email or social channels for roles, freelance inquiries, or technical collaborations.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-600 dark:text-[#38BDF8] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-500 dark:text-[#94A3B8]">
                      Email
                    </p>
                    <a
                      href={`mailto:${contact.recipientEmail}`}
                      className="text-sm font-semibold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-[#38BDF8] break-all transition-colors"
                    >
                      {contact.recipientEmail}
                    </a>
                  </div>
                </div>

                {profile.phone && (
                  <div className="flex items-start gap-3.5">
                    <span className="w-10 h-10 rounded-xl bg-pink-500/15 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-slate-500 dark:text-[#94A3B8]">
                        Phone
                      </p>
                      <a
                        href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                        className="text-sm font-semibold text-slate-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-300 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-[#94A3B8]">
                      Location
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {profile.location}
                    </p>
                  </div>
                </div>
              </div>

              {socialLinks.length > 0 && (
                <div className="pt-5 border-t border-slate-200/80 dark:border-white/10">
                  <p className="text-xs font-semibold text-slate-500 dark:text-[#94A3B8] mb-3">
                    Social Profiles
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {socialLinks.map((social) => (
                      <a
                        key={social.id}
                        href={social.url}
                        target={social.url.startsWith('http') ? '_blank' : undefined}
                        rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-colors"
                      >
                        <SocialIcon platform={social.platform} className="w-3.5 h-3.5" />
                        <span>{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs leading-relaxed text-slate-500 dark:text-[#94A3B8] px-1">
              {contact.responseNote}
            </p>
          </Reveal>

          {/* Right Side: Validated Contact Form */}
          <Reveal delayMs={80} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm dark:bg-[#101D35]/80 dark:border-white/10 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your full name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className="w-full rounded-xl px-4 py-3 text-sm bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-300 focus:border-[#00BFFF] focus:ring-2 focus:ring-[#00BFFF]/25 dark:bg-[#0B1426]/80 dark:text-white dark:placeholder:text-slate-500 dark:border-white/15 dark:focus:border-[#38BDF8] focus:outline-none transition-colors"
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className="w-full rounded-xl px-4 py-3 text-sm bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-300 focus:border-[#00BFFF] focus:ring-2 focus:ring-[#00BFFF]/25 dark:bg-[#0B1426]/80 dark:text-white dark:placeholder:text-slate-500 dark:border-white/15 dark:focus:border-[#38BDF8] focus:outline-none transition-colors"
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={values.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  placeholder="Project inquiry, role, or collaboration"
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                  className="w-full rounded-xl px-4 py-3 text-sm bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-300 focus:border-[#00BFFF] focus:ring-2 focus:ring-[#00BFFF]/25 dark:bg-[#0B1426]/80 dark:text-white dark:placeholder:text-slate-500 dark:border-white/15 dark:focus:border-[#38BDF8] focus:outline-none transition-colors"
                />
                {errors.subject && (
                  <p
                    id="contact-subject-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.subject}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Share a brief overview of your project, timeline, or question..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className="w-full rounded-xl px-4 py-3 text-sm bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-300 focus:border-[#00BFFF] focus:ring-2 focus:ring-[#00BFFF]/25 dark:bg-[#0B1426]/80 dark:text-white dark:placeholder:text-slate-500 dark:border-white/15 dark:focus:border-[#38BDF8] focus:outline-none transition-colors resize-y"
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                <button
                  type="submit"
                  disabled={submitState === 'submitting'}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] hover:brightness-110 disabled:opacity-60 shadow-[0_8px_24px_rgba(139,92,246,0.35)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {submitState === 'submitting'
                      ? 'Sending...'
                      : hasServerEndpoint
                      ? 'Send Message'
                      : 'Compose in Email App (mailto)'}
                  </span>
                </button>

                {!hasServerEndpoint && (
                  <span className="text-xs text-slate-500 dark:text-[#94A3B8]">
                    Opens your email app via <code className="font-mono">mailto:</code>
                  </span>
                )}
              </div>

              {/* Honest delivery feedback states */}
              {submitState === 'sent-via-endpoint' && (
                <div
                  role="status"
                  className="rounded-xl p-4 bg-emerald-50 text-emerald-900 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/30 text-sm"
                >
                  <p className="font-semibold">Message delivered to the configured endpoint.</p>
                  <p className="text-xs mt-1 opacity-90">
                    Thank you for reaching out.
                  </p>
                </div>
              )}

              {submitState === 'mailto-ready' && (
                <div
                  role="status"
                  className="rounded-xl p-4 bg-sky-50 text-sky-950 border border-sky-200 dark:bg-[#0B1426] dark:text-sky-100 dark:border-[#38BDF8]/35 space-y-3"
                >
                  <p className="text-sm font-semibold">
                    Email draft prepared for your mail app (not sent automatically by a server).
                  </p>
                  <p className="text-xs text-slate-700 dark:text-[#94A3B8]">
                    If your default email client did not open, use the direct link below or copy the formatted message.
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Open Email Client</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 dark:text-slate-200 dark:bg-white/10 dark:border-white/15 dark:hover:bg-white/15 transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                          <span>Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy Formatted Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {submitState === 'endpoint-error' && (
                <div
                  role="alert"
                  className="rounded-xl p-4 bg-rose-50 text-rose-900 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-200 dark:border-rose-500/30 space-y-2 text-sm"
                >
                  <p className="font-semibold">
                    Could not submit to the form endpoint ({endpointErrorMsg}).
                  </p>
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Fallback: open pre-filled email draft</span>
                  </a>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
