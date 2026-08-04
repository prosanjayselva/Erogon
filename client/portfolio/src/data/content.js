const B = import.meta.env.BASE_URL;

export const HOME_BANNER =
  "ERGON Foundation is a registered charitable trust dedicated to innovation for the welfare of people, animals, and the environment. Guided by the vision, ROOTED IN GOOD DEEDS for the “People • Pets • Planet.”";

export const ABOUT_VISION =
  "The vision of ERGON Foundation is to work for the welfare of People, Pets, and the Planet through charitable and sustainable initiatives. The Foundation is committed to supporting poor and needy communities, caring for animals, and protecting the environment in Tamil Nadu and across India.";

export const ABOUT_MISSION =
  "ERGON Foundation is dedicated to innovation for the welfare of people, animals, and the environment through education support, skill development, women empowerment, healthcare, animal welfare, environmental protection, awareness, volunteer participation and community development programmes.";

export const STATS = [
  { num: "373", label: "Lives Impacted" },
  { num: "01", label: "Free Medical Camp" },
  { num: "03", label: "Education Support" },
  { num: "160", label: "Meals Served" },
  { num: "41", label: "Trees Planted" },
  { num: "00", label: "Placement Support" },
  { num: "00", label: "Women Empowered" },
  { num: "00", label: "Youth Skilled" },
  { num: "00", label: "Animals Rescued & Care" },
];

export const ABOUT_IMPACT_STATS = [
  { num: "373", label: "Lives Impacted" },
  { num: "01", label: "Free Medical Camp" },
  { num: "03", label: "Education Support" },
  { num: "41", label: "Trees Planted" },
];

export const PILLARS = [
  {
    key: "people",
    title: "People",
    desc: "Supporting poor and needy communities with education, livelihood, healthcare, dignity and opportunity.",
    points: [
      "Education Support & Skill Development",
      "Women Empowerment & Livelihood Support",
      "Healthcare & Community Welfare",
      "Career Guidance & Placement Support",
    ],
  },
  {
    key: "pets",
    title: "Pets",
    desc: "Caring for animals through rescue, welfare and compassionate field support.",
    points: ["Animal Rescue & Welfare Activities"],
  },
  {
    key: "planet",
    title: "Planet",
    desc: "Protecting the environment in Tamil Nadu and across India through sustainable initiatives.",
    points: ["Environmental Protection & Sustainability", "Awareness, Volunteer & Community Development Programmes"],
  },
];

export const GOVERNING_BODY = [
  { name: "Mr. S. S. Antony Joseph", role: "Founder & Chairman" },
  { name: "Mrs. Sarah Preethi Antony", role: "Secretary & Treasurer" },
  { name: "Mr. Vinoth Raj Kumar", role: "Member" },
];

export const STAFF = [
  { name: "Chief Executive Officer", role: "CEO" },
  { name: "Ms. A. Sangeetha", role: "Director, Communications & Programmes" },
  { name: "Mr. John Milton", role: "Director, Projects & Resource Mobilisation" },
];

export const PATRONS = [];

export const PARTNERS = [
  { name: "Tech Tycoon Digital Solution LLP", logo: "TT", logoSrc: `${B}images/partners/tech-tycoon.jpeg` },
];

export const DONORS = [
  { name: "LOGOS Constructions PVT Ltd.", logo: "LC", logoSrc: `${B}images/partners/logos-constructions.jpeg` },
  { name: "Rhema Resorts PVT Ltd.", logo: "RR", logoSrc: `${B}images/partners/rhema-resorts.jpeg` },
];

export const NEWSLETTER_CONTENT = {
  title: "Newsletter",
  points: ["Monthly updates", "Impact Stories"],
};

export const CAREER_INTRO =
  "ERGON Foundation supports employers and job seekers by connecting the right talent with the right opportunities. Candidates can submit their profiles and career expectations, while employers can share their manpower requirements. Based on skills, qualifications, and expectations, ERGON Foundation helps facilitate suitable placements and employment opportunities.";

export const PROJECTS = [
  { title: "Tree Plantation Drive", loc: "Ramanathapuram & Yercaud, TN", raised: 2250000, goal: 3000000, tone: "photo-frame--gold", photo: "projectTree" },
  { title: "Beach Clean-Up Drive", loc: "Ramanathapuram, Tamil Nadu", raised: 1450000, goal: 2000000, tone: "", photo: "projectBeachCleanup" },
  { title: "Free Medical Camp", loc: "Avadi, Chennai", raised: 980000, goal: 1500000, tone: "", photo: "projectMedicalCamp" },
  { title: "Animal Rescue & Care", loc: "Chennai, Tamil Nadu", raised: 620000, goal: 2000000, tone: "photo-frame--sage", photo: null },
];

export const TESTIMONIALS = [
  { quote: "Because of ERGON Foundation, I can go to school and chase my dreams without fear.", name: "Kavya", role: "Student, EduSPro" },
  { quote: "They rescued me when no one else would stop. Now I live with love, warmth and a full bowl every day.", name: "Bruno", role: "Rescued Pet" },
  { quote: "Their support helped me start a new journey and rebuild a life for my family.", name: "Lakshmi", role: "Livelihood Beneficiary" },
];

export const BANK_DETAILS = [
  { label: "Name of the Account", value: "ERGON FOUNDATION" },
  { label: "Name of the Bank", value: "STATE BANK OF INDIA" },
  { label: "Account Number", value: "45185422472" },
  { label: "Branch", value: "SBI HNI Ashok Nagar, Chennai" },
  { label: "IFSC Code", value: "SBIN0018228" },
];

export const CONTACT = {
  address: ["ERGON Foundation", "10/13, 2nd Floor, 1st Street,", "Dr. Subbarayan Nagar,", "Kodambakkam,", "Chennai - 600024"],
  email: "admin@ergonfoundation.org",
  secretaryEmail: "secretary@ergonfoundation.org",
  phone: "+91 8438540850",
  social: {
    facebook: "https://www.facebook.com/share/14r5MoatD84/",
    x: "https://x.com/ERGONFoundation",
    linkedin: "https://www.linkedin.com/company/ergon-foundation/",
    instagram: "https://www.instagram.com/ergonfoundation?igsh=YjlkMHFnaG9waW8y",
    youtube: "https://youtube.com/@ergonfoundation",
  },
};

export const REPORTS = [
  {
    id: "environment-day-ramanathapuram-2026",
    category: "Activity Report",
    title: "Environment Day 2026 – Ramanathapuram",
    desc: "Detailed narrative report covering tree plantation, environmental awareness and beach clean-up activities in Ramanathapuram.",
    image: "reportEnvImpact",
    primaryUrl: `${B}reports/world-environment-day-2026-ramanathapuram.pdf`,
    files: [
      { label: "Ramanathapuram Activity Report", type: "PDF", url: `${B}reports/world-environment-day-2026-ramanathapuram.pdf` },
      { label: "Impact Infographic", type: "Image", url: `${B}reports/environment-day-2026-impact-infographic.png` },
    ],
  },
  {
    id: "environment-day-yercaud-2026",
    category: "Activity Report",
    title: "Environment Day 2026 – Yercaud",
    desc: "Detailed narrative report covering the Environment Day awareness and community activities held in Yercaud.",
    image: "yercaudActivity",
    primaryUrl: `${B}reports/yercaud-environment-day-activity-report-2026.pdf`,
    files: [
      { label: "Yercaud Activity Report", type: "PDF", url: `${B}reports/yercaud-environment-day-activity-report-2026.pdf` },
    ],
  },
  {
    id: "medical-camp-2026",
    category: "Activity Report",
    title: "Medical Camp 2026",
    desc: "Free medical camp for migrant workers in Avadi, Chennai.",
    image: "reportMedicalImpact",
    primaryUrl: `${B}reports/medical-camp-report.pdf`,
    files: [
      { label: "Medical Camp Report", type: "PDF", url: `${B}reports/medical-camp-report.pdf` },
      { label: "Pictorial Impact Report", type: "Image", url: `${B}reports/medical-camp-impact-pictorial-report.png` },
    ],
  },
  {
    id: "annual-report-2025-2026",
    category: "Annual Report",
    title: "2025-2026 Report",
    desc: "Full annual record of programmes, finances and community impact.",
    image: "reportEnvironment",
    primaryUrl: "",
    files: [],
  },
];

export const FEATURED_REPORTS = [
  {
    title: "Environment Day 2026",
    subtitle: "Activity Report",
    date: "Activity Report",
    desc: "Tree plantation and beach clean-up drives across Ramanathapuram and Yercaud.",
    image: "reportEnvironment",
  },
  {
    title: "Medical Camp 2026",
    subtitle: "Activity Report",
    date: "Activity Report",
    desc: "First community welfare programme - a free medical camp for migrant workers in Avadi, Chennai.",
    image: "reportMedical",
  },
];

export const EDUSPRO_CONTENT = {
  title: "EduSpro – Educational Sponsorship Programme",
  subtitle:
    "It is an EDUCATIONAL SUPPORT Programme that will reach out to young students at the school level who are in the most difficult situation of their lives, particularly without parents or with single parents in absolute poverty and raise 100,000/- (One lakh only) from various sponsors for their education.",
  amount: "100,000/-",
  amountLabel: "One lakh only",
};
