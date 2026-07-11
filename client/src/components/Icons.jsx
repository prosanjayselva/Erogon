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
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M14 21v-7.5h2.5l.5-3H14V8.4c0-1 .3-1.6 1.7-1.6H17V4.2C16.7 4.1 15.8 4 14.7 4c-2.3 0-3.9 1.4-3.9 4v2.5H8.3v3H10.8V21" />
  </svg>
);

export const MenuX = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 4l16 16M20 4 4 20" />
  </svg>
);

export const MenuLinkedin = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
    <path d="M7.7 10.2v6.3M7.7 7.7v.1" />
    <path d="M11.6 16.5v-3.7c0-1.4 1-2.4 2.3-2.4s2.1 1 2.1 2.4v3.7" />
    <path d="M11.6 10.2v6.3" />
  </svg>
);

export const MenuInstagram = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const MenuYoutube = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="2.5" y="6" width="19" height="12" rx="3" />
    <path d="M10.5 9.5 15 12l-4.5 2.5Z" fill="currentColor" stroke="none" />
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

export const BriefcaseIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="8" width="18" height="11.5" rx="2" />
    <path d="M8.5 8V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" />
    <path d="M3 13.5h18" />
  </svg>
);

export const PetsIcon = PawIcon;
export const PlanetIcon = LeafIcon;
export const CommunityIcon = UsersGroupIcon;
export const DonateIcon = DonateHeartIcon;
export const EducationIcon = GraduationCapIcon;
export const RescueIcon = PawIcon;
export const TreeIcon = LeafIcon;
export const FoodIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z" />
    <path d="M6 1v3M10 1v3M14 1v3" />
  </svg>
);
export const MedicalIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
export const ProjectIcon = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16l4-3 4 3 4-3 4 3V8Z" />
    <path d="M14 2v6h6" />
  </svg>
);
export const HeartIcon = HeartHandsIcon;
export const HandIcon = VolunteerIcon;
