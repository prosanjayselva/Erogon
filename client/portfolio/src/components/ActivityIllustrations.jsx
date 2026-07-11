export const PeopleIllustration = (p) => (
  <svg viewBox="0 0 200 200" {...p}>
    <defs>
      <radialGradient id="p-bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(45,106,79,0.12)" /><stop offset="100%" stopColor="rgba(27,67,50,0.04)" /></radialGradient>
      <linearGradient id="p-skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F5E6D3" /><stop offset="100%" stopColor="#E8D5C0" /></linearGradient>
      <linearGradient id="p-green" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2D6A4F" /><stop offset="100%" stopColor="#1B4332" /></linearGradient>
    </defs>
    <circle cx="100" cy="100" r="90" fill="url(#p-bg)" />
    <g transform="translate(30,18)">
      <circle cx="40" cy="30" r="16" fill="url(#p-skin)" />
      <path d="M16 78c2-16 11-26 24-26s22 10 24 26" fill="none" stroke="url(#p-green)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 46l-4 12" fill="none" stroke="url(#p-green)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="34" cy="28" r="2" fill="#1B4332" opacity="0.6" />
      <circle cx="46" cy="28" r="2" fill="#1B4332" opacity="0.6" />
    </g>
    <g transform="translate(95,30)">
      <circle cx="35" cy="22" r="12" fill="url(#p-skin)" />
      <path d="M18 60c1-12 7-20 17-20s16 8 17 20" fill="none" stroke="url(#p-green)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="20" r="1.5" fill="#1B4332" opacity="0.6" />
      <circle cx="40" cy="20" r="1.5" fill="#1B4332" opacity="0.6" />
    </g>
    <path d="M88 108l-16-4M112 108l16-4" fill="none" stroke="url(#p-green)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <circle cx="100" cy="120" r="28" fill="none" stroke="#B8860B" strokeWidth="2" opacity="0.2" strokeDasharray="3 5" />
    <path d="M95 108l-6 12M105 108l6 12" fill="none" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export const PetsIllustration = (p) => (
  <svg viewBox="0 0 200 200" {...p}>
    <defs>
      <radialGradient id="pet-bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(45,106,79,0.12)" /><stop offset="100%" stopColor="rgba(27,67,50,0.04)" /></radialGradient>
      <linearGradient id="pet-fur" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C4956A" /><stop offset="100%" stopColor="#A07850" /></linearGradient>
    </defs>
    <circle cx="100" cy="100" r="90" fill="url(#pet-bg)" />
    <ellipse cx="100" cy="120" rx="32" ry="24" fill="none" stroke="url(#pet-fur)" strokeWidth="2.5" strokeLinecap="round" />
    <ellipse cx="68" cy="82" rx="12" ry="16" fill="none" stroke="url(#pet-fur)" strokeWidth="2.5" strokeLinecap="round" />
    <ellipse cx="92" cy="72" rx="12" ry="16" fill="none" stroke="url(#pet-fur)" strokeWidth="2.5" strokeLinecap="round" />
    <ellipse cx="108" cy="72" rx="12" ry="16" fill="none" stroke="url(#pet-fur)" strokeWidth="2.5" strokeLinecap="round" />
    <ellipse cx="132" cy="82" rx="12" ry="16" fill="none" stroke="url(#pet-fur)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M80 140c4 6 12 10 20 10s16-4 20-10" fill="none" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    <circle cx="92" cy="112" r="3" fill="#1B4332" opacity="0.7" />
    <circle cx="108" cy="112" r="3" fill="#1B4332" opacity="0.7" />
    <path d="M96 116c2 2 6 2 8 0" fill="none" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <circle cx="100" cy="130" r="6" fill="none" stroke="#B8860B" strokeWidth="1.5" opacity="0.3" />
    <path d="M54 90l-8-6M146 90l8-6" fill="none" stroke="url(#pet-fur)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
  </svg>
);

export const PlanetIllustration = (p) => (
  <svg viewBox="0 0 200 200" {...p}>
    <defs>
      <radialGradient id="pl-bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(45,106,79,0.12)" /><stop offset="100%" stopColor="rgba(27,67,50,0.04)" /></radialGradient>
      <linearGradient id="pl-globe" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0%" stopColor="#40916C" /><stop offset="100%" stopColor="#1B4332" /></linearGradient>
    </defs>
    <circle cx="100" cy="100" r="90" fill="url(#pl-bg)" />
    <circle cx="100" cy="96" r="46" fill="none" stroke="url(#pl-globe)" strokeWidth="2.5" />
    <path d="M68 126c16 10 34 6 40-4s2-24-10-30c-8-4-12-2-14 4s2 12 0 16-8 6-14 4" fill="none" stroke="url(#pl-globe)" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="100" cy="96" rx="46" ry="16" fill="none" stroke="url(#pl-globe)" strokeWidth="1.5" opacity="0.4" />
    <ellipse cx="100" cy="96" rx="30" ry="46" fill="none" stroke="url(#pl-globe)" strokeWidth="1.5" opacity="0.3" />
    <path d="M86 54c0 6 3 12 8 14s10-2 12-8" fill="none" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M104 130c0 4-2 8-6 8" fill="none" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <circle cx="96" cy="72" r="4" fill="#40916C" opacity="0.5" />
    <circle cx="110" cy="106" r="3" fill="#40916C" opacity="0.4" />
    <circle cx="84" cy="112" r="2.5" fill="#40916C" opacity="0.3" />
    <path d="M74 68l-6 4M122 118l6 4" fill="none" stroke="#B8860B" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
  </svg>
);

export const CommunityIllustration = (p) => (
  <svg viewBox="0 0 200 200" {...p}>
    <defs>
      <radialGradient id="c-bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(45,106,79,0.12)" /><stop offset="100%" stopColor="rgba(27,67,50,0.04)" /></radialGradient>
      <linearGradient id="c-skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F5E6D3" /><stop offset="100%" stopColor="#E0CCB8" /></linearGradient>
      <linearGradient id="c-green" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2D6A4F" /><stop offset="100%" stopColor="#1B4332" /></linearGradient>
    </defs>
    <circle cx="100" cy="100" r="90" fill="url(#c-bg)" />
    <g transform="translate(18,30)">
      <circle cx="30" cy="24" r="12" fill="url(#c-skin)" />
      <path d="M12 60c2-12 8-20 18-20s16 8 18 20" fill="none" stroke="url(#c-green)" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="25" cy="22" r="1.5" fill="#1B4332" opacity="0.6" />
      <circle cx="35" cy="22" r="1.5" fill="#1B4332" opacity="0.6" />
    </g>
    <g transform="translate(75,25)">
      <circle cx="25" cy="22" r="12" fill="url(#c-skin)" />
      <path d="M7 60c2-12 8-20 18-20s16 8 18 20" fill="none" stroke="url(#c-green)" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="20" cy="20" r="1.5" fill="#1B4332" opacity="0.6" />
      <circle cx="30" cy="20" r="1.5" fill="#1B4332" opacity="0.6" />
    </g>
    <g transform="translate(130,40)">
      <circle cx="20" cy="18" r="10" fill="url(#c-skin)" />
      <path d="M5 50c1-10 7-16 15-16s14 6 15 16" fill="none" stroke="url(#c-green)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="16" r="1.5" fill="#1B4332" opacity="0.6" />
      <circle cx="24" cy="16" r="1.5" fill="#1B4332" opacity="0.6" />
    </g>
    <path d="M70 94c4 8 16 10 24 4M50 88l-6 8M150 94l6 10" fill="none" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <circle cx="100" cy="108" r="18" fill="none" stroke="#B8860B" strokeWidth="1.5" opacity="0.15" strokeDasharray="3 4" />
  </svg>
);

export const VolunteersIllustration = (p) => (
  <svg viewBox="0 0 200 200" {...p}>
    <defs>
      <radialGradient id="v-bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(45,106,79,0.12)" /><stop offset="100%" stopColor="rgba(27,67,50,0.04)" /></radialGradient>
      <linearGradient id="v-heart" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B8860B" /><stop offset="100%" stopColor="#D4A843" /></linearGradient>
    </defs>
    <circle cx="100" cy="100" r="90" fill="url(#v-bg)" />
    <path d="M100 148c-14-9-30-18-30-32a16 16 0 0 1 7-13c-3-8-2-18 5-24s14-7 18-4c4-3 14-3 18 4s8 16 5 24a16 16 0 0 1 7 13c0 14-16 23-30 32Z" fill="none" stroke="url(#v-heart)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M78 116l-12 22M122 116l12 22M90 124l8 14M110 124l-8 14" fill="none" stroke="url(#v-heart)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    <circle cx="84" cy="82" r="3" fill="#B8860B" opacity="0.5" />
    <circle cx="116" cy="82" r="3" fill="#B8860B" opacity="0.5" />
    <path d="M100 100v-8M96 96h8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    <circle cx="100" cy="130" r="24" fill="none" stroke="#B8860B" strokeWidth="1" opacity="0.12" />
    <path d="M54 58l-8-4M146 58l8-4" fill="none" stroke="url(#v-heart)" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
  </svg>
);

export const DonateIllustration = (p) => (
  <svg viewBox="0 0 200 200" {...p}>
    <defs>
      <radialGradient id="d-bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(45,106,79,0.12)" /><stop offset="100%" stopColor="rgba(27,67,50,0.04)" /></radialGradient>
      <linearGradient id="d-heart" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B8860B" /><stop offset="100%" stopColor="#D4A843" /></linearGradient>
    </defs>
    <circle cx="100" cy="100" r="90" fill="url(#d-bg)" />
    <path d="M100 150c-16-10-28-20-28-34a12 12 0 0 1 6.5-11.5A16 16 0 0 1 82 80c6-5 14-6 20-2 6-4 14-3 20 2a16 16 0 0 1 3.5 24.5 12 12 0 0 1 6.5 11.5c0 14-12 24-28 34Z" fill="none" stroke="url(#d-heart)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M100 80v42M84 95h32" fill="none" stroke="url(#d-heart)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="100" cy="56" r="22" fill="none" stroke="url(#d-heart)" strokeWidth="2" opacity="0.2" />
    <path d="M100 42v6M96 46h8" fill="none" stroke="url(#d-heart)" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
    <path d="M62 86l-8-6M138 86l8-6" fill="none" stroke="url(#d-heart)" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
    <circle cx="100" cy="70" r="30" fill="#B8860B" opacity="0.04" />
  </svg>
);
