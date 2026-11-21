interface SectionHeaderProps {
  kicker: string;
  titlePrefix: string;
  titleAccent: string;
  subtitle: string;
  align?: 'center' | 'left';
}

export function SectionHeader({
  kicker,
  titlePrefix,
  titleAccent,
  subtitle,
  align = 'center',
}: SectionHeaderProps) {
  const isCentered = align === 'center';

  return (
    <div
      className={`mb-12 md:mb-16 ${
        isCentered ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-2xl'
      }`}
    >
      <div
        className={`inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide mb-4 border bg-sky-50 text-sky-700 border-sky-200 dark:bg-[#101D35]/90 dark:text-[#38BDF8] dark:border-[#38BDF8]/25`}
      >
        {kicker}
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
        {titlePrefix}{' '}
        <span className="bg-gradient-to-r from-[#00BFFF] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
          {titleAccent}
        </span>
      </h2>
      <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-[#94A3B8]">
        {subtitle}
      </p>
    </div>
  );
}
