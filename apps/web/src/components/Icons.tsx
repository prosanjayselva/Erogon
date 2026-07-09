import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  name: string;
};

export function Icon({ name, ...props }: IconProps) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
    ...props,
  };

  switch (name) {
    case 'sprout':
      return (
        <svg {...common}>
          <path d="M12 20v-8" />
          <path d="M12 13c-1.2-3.8-4.1-5.7-8-6 0 4.9 3.1 8 8 8Z" />
          <path d="M12 10c1.2-3.2 3.9-5 8-5 0 4.6-3 7-8 7Z" />
        </svg>
      );
    case 'people':
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20a6 6 0 0 1 12 0" />
          <circle cx="17" cy="9" r="2.4" />
          <path d="M15 20a5 5 0 0 1 6 0" />
        </svg>
      );
    case 'graduation':
      return (
        <svg {...common}>
          <path d="m3 8 9-4 9 4-9 4-9-4Z" />
          <path d="M7 10.5v4.2c0 1.8 2.2 3.3 5 3.3s5-1.5 5-3.3v-4.2" />
          <path d="M21 9.5v5" />
        </svg>
      );
    case 'paw':
      return (
        <svg {...common}>
          <circle cx="7" cy="8" r="1.7" />
          <circle cx="12" cy="6.5" r="1.7" />
          <circle cx="17" cy="8" r="1.7" />
          <path d="M12 20c-3 0-5-1.7-5-4 0-2 1.4-3.6 3.4-4.1.8-.2 1.4.6 1.6 1.2.2-.6.8-1.4 1.6-1.2C15.6 12.4 17 14 17 16c0 2.3-2 4-5 4Z" />
        </svg>
      );
    case 'home':
      return (
        <svg {...common}>
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5.5 10.5V20h13v-9.5" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case 'leaf':
      return (
        <svg {...common}>
          <path d="M12 21c4.6-2 7.5-6.8 7.5-11.1A5.3 5.3 0 0 0 14.3 5C13.4 5 12 5.3 12 6.9 12 5.3 10.6 5 9.7 5A5.3 5.3 0 0 0 4.5 9.9C4.5 14.2 7.4 19 12 21Z" />
          <path d="M12 7v10" />
          <path d="M8.5 11.5H15" />
        </svg>
      );
    case 'community':
      return (
        <svg {...common}>
          <circle cx="6" cy="8" r="2" />
          <circle cx="18" cy="8" r="2" />
          <circle cx="12" cy="13" r="2.4" />
          <path d="M2.5 19a4 4 0 0 1 7 0" />
          <path d="M14.5 19a4 4 0 0 1 7 0" />
          <path d="M7 20a5.5 5.5 0 0 1 10 0" />
        </svg>
      );
    case 'heartShield':
      return (
        <svg {...common}>
          <path d="M12 21c4.5-1.8 8-5.9 8-10V5l-8-2-8 2v6c0 4.1 3.5 8.2 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'heartHand':
      return (
        <svg {...common}>
          <path d="M12 9.5c0-2 1.7-3.5 3.7-3.5S19 7.4 19 9.5c0 4-7 8.5-7 8.5S5 13.5 5 9.5C5 7.4 6.6 6 8.6 6S12 7.5 12 9.5Z" />
          <path d="M3 21c1.2-1.7 2.8-2.5 5-2.5h8.3c1.8 0 2.7-.7 4.7-2.5" />
        </svg>
      );
    case 'shieldCheck':
      return (
        <svg {...common}>
          <path d="M12 21c4.5-1.8 8-5.9 8-10V5l-8-2-8 2v6c0 4.1 3.5 8.2 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 1 1 8 0v3" />
        </svg>
      );
    case 'document':
      return (
        <svg {...common}>
          <path d="M7 3h7l5 5v13H7z" />
          <path d="M14 3v5h5" />
          <path d="M10 13h6" />
          <path d="M10 17h6" />
        </svg>
      );
    case 'bell':
      return (
        <svg {...common}>
          <path d="M6 17h12l-1.4-1.7A2 2 0 0 1 16 14v-3.5a4 4 0 1 0-8 0V14a2 2 0 0 1-.6 1.3L6 17Z" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

