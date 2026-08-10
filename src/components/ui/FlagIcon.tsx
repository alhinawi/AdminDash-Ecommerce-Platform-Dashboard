import type { SupportedLanguage } from "../../i18n/types";

interface FlagIconProps {
  code: SupportedLanguage;
  className?: string;
}

export default function FlagIcon({
  code,
  className = "h-3.5 w-5",
}: FlagIconProps) {
  switch (code) {
    case "en":
      return (
        <svg
          viewBox="0 0 60 30"
          className={`shrink-0 rounded-xs border border-black/15 object-cover shadow-xs ${className}`}
          aria-hidden="true"
        >
          <clipPath id="gb-flag-clip">
            <rect width="60" height="30" rx="2" />
          </clipPath>
          <g clipPath="url(#gb-flag-clip)">
            <rect width="60" height="30" fill="#012169" />
            <path
              d="M0,0 L60,30 M60,0 L0,30"
              stroke="#ffffff"
              strokeWidth="6"
            />
            <path
              d="M0,0 L60,30 M60,0 L0,30"
              stroke="#C8102E"
              strokeWidth="2.5"
            />
            <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
          </g>
        </svg>
      );
    case "ar":
      return (
        <svg
          viewBox="0 0 60 40"
          className={`shrink-0 rounded-xs border border-black/15 object-cover shadow-xs ${className}`}
          aria-hidden="true"
        >
          <rect width="60" height="13.33" fill="#C8102E" />
          <rect y="13.33" width="60" height="13.33" fill="#FFFFFF" />
          <rect y="26.66" width="60" height="13.34" fill="#000000" />
          {/* Eagle of Saladin emblem */}
          <g transform="translate(24, 13.5) scale(0.24)">
            <path
              d="M12,2 L16,8 L20,2 L24,12 L30,12 L26,20 L32,28 L22,28 L22,38 L18,42 L18,44 L30,44 L30,48 L14,48 L14,44 L14,42 L10,38 L10,28 L0,28 L6,20 L2,12 L8,12 Z"
              fill="#C09300"
            />
            <rect x="12" y="24" width="20" height="14" fill="#C09300" rx="1" />
            <rect x="15" y="26" width="4.5" height="10" fill="#C8102E" />
            <rect x="19.5" y="26" width="4.5" height="10" fill="#FFFFFF" />
            <rect x="24" y="26" width="4.5" height="10" fill="#000000" />
          </g>
        </svg>
      );
    case "es":
      return (
        <svg
          viewBox="0 0 60 40"
          className={`shrink-0 rounded-xs border border-black/15 object-cover shadow-xs ${className}`}
          aria-hidden="true"
        >
          <rect width="60" height="10" fill="#AA151B" />
          <rect y="10" width="60" height="20" fill="#F1BF00" />
          <rect y="30" width="60" height="10" fill="#AA151B" />
          {/* Coat of arms detail */}
          <g transform="translate(13, 14) scale(0.3)">
            <rect
              width="24"
              height="28"
              fill="#AA151B"
              rx="3"
              stroke="#000000"
              strokeWidth="1.5"
            />
            <rect x="3" y="3" width="18" height="22" fill="#F1BF00" />
            <path d="M6 6h12v16H6z" fill="#AA151B" opacity="0.6" />
          </g>
        </svg>
      );
    case "de":
      return (
        <svg
          viewBox="0 0 60 40"
          className={`shrink-0 rounded-xs border border-black/15 object-cover shadow-xs ${className}`}
          aria-hidden="true"
        >
          <rect width="60" height="13.33" fill="#000000" />
          <rect y="13.33" width="60" height="13.33" fill="#DD0000" />
          <rect y="26.66" width="60" height="13.34" fill="#FFCE00" />
        </svg>
      );
    case "fr":
      return (
        <svg
          viewBox="0 0 60 40"
          className={`shrink-0 rounded-xs border border-black/15 object-cover shadow-xs ${className}`}
          aria-hidden="true"
        >
          <rect width="20" height="40" fill="#00209F" />
          <rect x="20" width="20" height="40" fill="#FFFFFF" />
          <rect x="40" width="20" height="40" fill="#F42942" />
        </svg>
      );
    default:
      return null;
  }
}
