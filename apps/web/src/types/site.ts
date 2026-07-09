export type ActionLink = {
  label: string;
  href: string;
};

export type NavLink = ActionLink;

export type SocialLink = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  imageKey: string;
  subline?: string;
  banner?: string;
  badge?: string;
  primaryAction?: ActionLink;
  secondaryAction?: ActionLink;
};

export type StatItem = {
  value: string;
  label: string;
  icon: string;
};

export type ListCard = {
  title: string;
  description?: string;
  icon?: string;
  bullets?: string[];
  imageKey?: string;
};

export type ProjectItem = {
  title: string;
  location?: string;
  raised?: string;
  target?: string;
  progress?: number;
  imageKey: string;
  description: string;
};

export type StoryItem = {
  imageKey: string;
  quote: string;
  author: string;
};

export type SiteContent = {
  meta: {
    siteName: string;
    tagline: string;
    description: string;
  };
  navigation: NavLink[];
  footer: {
    about: string;
    quickLinks: ActionLink[];
    address: string[];
    email: string;
    phone: string;
    socialLinks: SocialLink[];
    newsletterLabel: string;
  };
  home: {
    hero: HeroContent;
    stats: StatItem[];
    about: {
      eyebrow: string;
      title: string;
      highlight: string;
      description: string;
      imageKey: string;
      bullets: string[];
      quote: { text: string; author: string };
    };
    pillars: ListCard[];
    impactBand: {
      title: string;
      action: ActionLink;
      metrics: Array<{ value: string; label: string }>;
    };
    featuredProjects: ProjectItem[];
    trustSignals: ListCard[];
    stories: StoryItem[];
    partnersImageKey: string;
  };
  about: {
    hero: HeroContent;
    values: Array<{ title: string; description?: string; bullets?: string[] }>;
    teamGroups: Array<{ title: string; members: string[] }>;
  };
  causes: {
    hero: HeroContent;
    cards: ListCard[];
  };
  eduspro: {
    hero: HeroContent;
    panels: Array<{ title: string; description: string }>;
    highlightStats: Array<{ value: string; label: string }>;
  };
  projects: {
    hero: HeroContent;
    items: ProjectItem[];
  };
  reports: {
    hero: HeroContent;
    reports: Array<{ title: string; imageKey: string; description: string }>;
  };
  gallery: {
    hero: HeroContent;
    items: Array<{ imageKey: string; label: string }>;
  };
  getInvolved: {
    hero: HeroContent;
    panels: Array<{ title: string; description: string }>;
    lists: Array<{ title: string; bullets: string[] }>;
  };
  contact: {
    hero: HeroContent;
    address: string[];
    email: string;
    phone: string;
    socialLinks: SocialLink[];
  };
  donate: {
    hero: HeroContent;
    bankDetails: Array<{ label: string; value: string }>;
    givingReasons: string[];
  };
};

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type InterestPayload = {
  name: string;
  email: string;
  phone: string;
  interestArea: 'Volunteer' | 'Partner' | 'Career';
  note: string;
};

