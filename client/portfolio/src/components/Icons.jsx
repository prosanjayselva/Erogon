// Hand-built line icons — consistent 1.7 stroke, rounded caps, no external
// icon library, so the whole set reads as one drawn family.
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const PeopleIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 19.5c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" />
    <circle cx="17" cy="7.5" r="2.4" />
    <path d="M15.2 14.6c2.2.2 3.9 1.9 4.3 4.4" />
  </svg>
);

export const PawIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <ellipse cx="12" cy="16.2" rx="4.6" ry="3.6" />
    <ellipse cx="5.6" cy="10.4" rx="1.9" ry="2.4" />
    <ellipse cx="10.2" cy="6.6" rx="1.9" ry="2.5" />
    <ellipse cx="14.6" cy="6.6" rx="1.9" ry="2.5" />
    <ellipse cx="18.6" cy="10.4" rx="1.9" ry="2.4" />
  </svg>
);

export const LeafIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M5 19C5 9 12 4.5 20 4.5c0 9-5 14.5-15 14.5Z" />
    <path d="M6.5 17.5C10 13 13.5 10 18 6.8" />
  </svg>
);

export const HeartHandsIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 20.4C7 17 3.5 13.7 3.5 9.9a4 4 0 0 1 7.3-2.3c.4.5.8 1 1.2 1.6.4-.6.8-1.1 1.2-1.6a4 4 0 0 1 7.3 2.3c0 3.8-3.5 7.1-8.5 10.5Z" />
  </svg>
);

export const UsersGroupIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="8" cy="8.5" r="3" />
    <circle cx="16.3" cy="9" r="2.5" />
    <path d="M2.8 19c.5-3.4 2.6-5.2 5.2-5.2s4.5 1.7 5.1 4.8" />
    <path d="M13.6 14.4c2.4.2 4.2 1.9 4.7 4.6" />
  </svg>
);

export const VolunteerIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 21s-7.5-4.6-10-9.3C.4 8 2 4.6 5.4 4c2-.3 3.7.6 4.9 2.2a1 1 0 0 0 1.4 0C12.9 4.6 14.6 3.7 16.6 4c3.4.6 5 4 3.4 7.7C17.5 16.4 12 21 12 21Z" />
  </svg>
);

export const GiftHeartIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3.5" y="9.5" width="17" height="11" rx="1.5" />
    <path d="M3.5 13.5h17" />
    <path d="M12 9.5v11" />
    <path d="M8.4 9.5c-2.2 0-3-1-3-2.3 0-1.2 1-2.2 2.2-2.2 1.6 0 2.5 1.3 3 2.5.5-1.2 1.4-2.5 3-2.5 1.2 0 2.2 1 2.2 2.2 0 1.3-.8 2.3-3 2.3" />
  </svg>
);

export const GraduationCapIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M2 9.5 12 5l10 4.5-10 4.5-10-4.5Z" />
    <path d="M6.5 11.6v4.2c0 1.5 2.5 2.7 5.5 2.7s5.5-1.2 5.5-2.7v-4.2" />
    <path d="M21 9.5v5.5" />
  </svg>
);

export const HomeVillageIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M3.5 11 12 4l8.5 7" />
    <path d="M5.5 9.8V20h13V9.8" />
    <path d="M10 20v-5.5h4V20" />
  </svg>
);

export const HeartIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 20.4C7 17 3.5 13.7 3.5 9.9a4 4 0 0 1 7.3-2.3c.4.5.8 1 1.2 1.6.4-.6.8-1.1 1.2-1.6a4 4 0 0 1 7.3 2.3c0 3.8-3.5 7.1-8.5 10.5Z" />
  </svg>
);

export const CheckIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 12.5 9.5 18 20 6" />
  </svg>
);

export const ArrowRightIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 12h16" />
    <path d="M14 6l6 6-6 6" />
  </svg>
);

export const PlayIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="9.2" />
    <path d="M10 8.3 15.5 12 10 15.7Z" fill="currentColor" stroke="none" />
  </svg>
);

export const QuoteIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p} className={"qmark " + (p.className || "")}>
    <path d="M4 14.5V10a4 4 0 0 1 4-4" />
    <path d="M4 14.5h4v-4H6" />
    <path d="M14 14.5V10a4 4 0 0 1 4-4" />
    <path d="M14 14.5h4v-4h-2" />
  </svg>
);

export const ShieldCheckIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 3.5 19 6v6c0 4.6-3 7.7-7 8.5-4-.8-7-3.9-7-8.5V6l7-2.5Z" />
    <path d="M8.7 12.2 11 14.5l4.3-4.6" />
  </svg>
);

export const LockIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
    <path d="M7.5 10.5V7.8a4.5 4.5 0 0 1 9 0v2.7" />
  </svg>
);

export const DocReceiptIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M6.5 3.5h11v17l-2.5-1.6-2.5 1.6-2.5-1.6-2.5 1.6v-17Z" />
    <path d="M9 8h6M9 11.5h6" />
  </svg>
);

export const BellIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M6 10.5a6 6 0 0 1 12 0c0 4 1.3 5.3 1.3 5.3H4.7S6 14.5 6 10.5Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

export const PinIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 21.5S5 14.8 5 9.8a7 7 0 0 1 14 0c0 5-7 11.7-7 11.7Z" />
    <circle cx="12" cy="9.7" r="2.4" />
  </svg>
);

export const MailIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M4 7l8 6 8-6" />
  </svg>
);

export const PhoneIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M6 4.5 9 5c.6 1.5 1 2.7.4 3.5l-1.3 1.6c1 2.3 2.7 4 5 5l1.6-1.3c.8-.6 2-.2 3.5.4l.5 3c-1.2 1.5-3.4 1.8-5.6 1-4.4-1.5-8-5.1-9.5-9.5-.8-2.2-.5-4.4 1-5.6Z" />
  </svg>
);

export const ImageIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
    <circle cx="9" cy="10" r="1.7" />
    <path d="M4 17.5 9 12l3 3 3.5-4 4.5 6.5" />
  </svg>
);

export const VideoIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="6" width="13" height="12" rx="2" />
    <path d="M16 10l5-2.5v9L16 14" />
  </svg>
);

export const UploadIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 15.5V4.5" />
    <path d="M7.5 8.5 12 4l4.5 4.5" />
    <path d="M4.5 15.5V18a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2.5" />
  </svg>
);

export const ChevronRightIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M9 5.5 15.5 12 9 18.5" />
  </svg>
);

export const MenuFacebook = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const BrandX = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export const MenuX = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 4l16 16M20 4 4 20" />
  </svg>
);

export const MenuLinkedin = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

export const MenuInstagram = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

export const MenuYoutube = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const CloseIcon = MenuX;

export const DonateHeartIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 20.5c-4.6-3-8.2-6.1-8.2-9.9a4.3 4.3 0 0 1 7.8-2.5l.4.5.4-.5a4.3 4.3 0 0 1 7.8 2.5c0 3.8-3.6 6.9-8.2 9.9Z" />
    <path d="M12 8.1V13M9.6 10.5h4.8" />
  </svg>
);

export const BankIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M3 9.5 12 4l9 5.5" />
    <path d="M4.5 9.5V19M9 9.5V19M15 9.5V19M19.5 9.5V19" />
    <path d="M3 19h18" />
  </svg>
);

export const CopyIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2" />
    <path d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5" />
  </svg>
);

export const TargetIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const SparkleIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 3.5 13.6 9l5.4 1.6-5.4 1.6L12 17.7 10.4 12.2 5 10.6 10.4 9Z" />
  </svg>
);

export const GlobeIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17" />
    <path d="M12 3.5c2.5 2.8 3.8 5.8 3.8 8.5s-1.3 5.7-3.8 8.5c-2.5-2.8-3.8-5.8-3.8-8.5s1.3-5.7 3.8-8.5Z" />
  </svg>
);

export const DownloadIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 3.5v11" />
    <path d="M8 10.5 12 15l4-4.5" />
    <path d="M4.5 15.5V18a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2.5" />
  </svg>
);

export const BriefcaseIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="8" width="18" height="11.5" rx="2" />
    <path d="M8.5 8V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" />
    <path d="M3 13.5h18" />
  </svg>
);
