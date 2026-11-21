import { useState } from 'react';
import { Camera } from 'lucide-react';
import type { ImageFrameSettings } from '../types/portfolio';
import { getImageFrameStyle } from '../utils/portfolioHelpers';

interface PortraitImageProps {
  frame: ImageFrameSettings;
  initials: string;
  shape?: 'circle' | 'rounded';
  placeholderCaption?: string;
  className?: string;
}

/**
 * Displays the developer's real uploaded portrait with configurable crop/zoom
 * settings (objectPositionX, objectPositionY, scale). When no photo is set yet,
 * renders a refined, neutral studio silhouette placeholder — never a random person.
 */
export function PortraitImage({
  frame,
  initials,
  shape = 'circle',
  placeholderCaption = 'Portrait Photo Slot',
  className = '',
}: PortraitImageProps) {
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(frame.src.trim()) && !hasError;
  const frameStyle = getImageFrameStyle(frame);

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none ${
        shape === 'circle' ? 'rounded-full' : 'rounded-2xl'
      } ${className}`}
    >
      {showImage ? (
        <img
          src={frame.src}
          alt={frame.alt}
          referrerPolicy="no-referrer"
          loading="eager"
          onError={() => setHasError(true)}
          style={frameStyle}
          className="w-full h-full object-cover transition-transform duration-300"
        />
      ) : (
        <div
          className="relative w-full h-full flex flex-col items-center justify-end bg-gradient-to-b from-[#F8FAFC] via-[#EEF2F7] to-[#E2E8F0] text-slate-600"
          role="img"
          aria-label={frame.alt || 'Developer portrait placeholder'}
        >
          {/* Subtle studio lighting radial behind neutral silhouette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(139,92,246,0.12),rgba(0,191,255,0.06)_55%,transparent_75%)]"
          />

          {/* Clean geometric studio silhouette */}
          <svg
            viewBox="0 0 260 260"
            className="relative z-10 w-[86%] h-[86%] translate-y-2"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="portraitSilhouetteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#CBD5E1" />
                <stop offset="55%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#64748B" />
              </linearGradient>
              <linearGradient id="portraitRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00BFFF" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#EC4899" stopOpacity="0.45" />
              </linearGradient>
            </defs>
            {/* Soft shoulder silhouette */}
            <path
              d="M42 256 C46 196 84 166 130 166 C176 166 214 196 218 256 Z"
              fill="url(#portraitSilhouetteGrad)"
              opacity="0.88"
            />
            {/* Neck */}
            <rect
              x="113"
              y="138"
              width="34"
              height="34"
              rx="14"
              fill="#94A3B8"
              opacity="0.85"
            />
            {/* Head */}
            <circle
              cx="130"
              cy="98"
              r="46"
              fill="url(#portraitSilhouetteGrad)"
              stroke="url(#portraitRimGrad)"
              strokeWidth="2.5"
            />
            {/* Minimalist monogram inside head area for clean identity */}
            <text
              x="130"
              y="108"
              textAnchor="middle"
              fill="#F8FAFC"
              fontSize="28"
              fontWeight="700"
              letterSpacing="2"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              {initials}
            </text>
          </svg>

          {/* Subtle bottom pill caption for clarity until photo is uploaded */}
          <div className="absolute bottom-5 z-20 inline-flex items-center gap-1.5 rounded-full bg-slate-900/75 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm shadow-sm">
            <Camera className="w-3 h-3 text-[#38BDF8]" aria-hidden="true" />
            <span>{placeholderCaption}</span>
          </div>
        </div>
      )}
    </div>
  );
}
