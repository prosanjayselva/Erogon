const B = import.meta.env.BASE_URL;

export const PHOTOS = {
  logo: `${B}images/ergon-logo-2026.png`,
  logoFooter: `${B}images/people-pets-planet-transparent.png`,

  handsPlant: `${B}images/about-plant.jpg`,
  treePlantingReal: `${B}images/about-real.jpg`,

  projectTree: `${B}images/project-tree.jpg`,
  projectBeachCleanup: `${B}images/project-beach-cleanup.jpg`,
  projectMedicalCamp: `${B}images/project-medical-camp.jpg`,

  reportEnvironment: `${B}images/report-environment-day-2026.jpg`,
  reportMedical: `${B}images/report-medical-camp-2026.jpg`,
  reportMedicalImpact: `${B}images/report-medical-impact.png`,
  reportEnvImpact: `${B}images/report-env-impact.png`,

  ramanathapuramGroup: `${B}images/ramanathapuram-group.jpg`,
  ramanathapuramSaplings: `${B}images/ramanathapuram-saplings.jpg`,
  ramanathapuramTree1: `${B}images/ramanathapuram-tree-1.jpg`,
  ramanathapuramTree2: `${B}images/ramanathapuram-tree-2.jpg`,
  ramanathapuramThumbprint: `${B}images/ramanathapuram-thumbprint.jpg`,
  ramanathapuramBeachClean: `${B}images/ramanathapuram-beach-clean.jpg`,

  yercaudGroup: `${B}images/yercaud-group.jpg`,
  yercaudPledge: `${B}images/yercaud-pledge.jpg`,
  yercaudDance: `${B}images/yercaud-dance.jpg`,
  yercaudActivity: `${B}images/yercaud-activity.jpg`,

  medicalCampGroup: `${B}images/medical-camp-group.jpg`,
  medicalConsultation: `${B}images/medical-consultation.jpg`,
  medicalAwareness: `${B}images/medical-awareness.jpg`,
  medicalMedicine: `${B}images/medical-medicine.jpg`,
  medicalRegistration: `${B}images/medical-registration.jpg`,
  medicalGathered: `${B}images/medical-gathered.jpg`,

  aiCausesBg: `${B}images/ai-causes-bg.png`,
  aiHeroGirlDog: `${B}images/ai-hero-girl-dog.png`,
  aiHero1: `${B}images/ai-hero-1.png`,
  aiHero2: `${B}images/ai-hero-2.png`,
  aiHero3: `${B}images/ai-hero-3.png`,
  aiAboutHero: `${B}images/ai-about-hero.png`,
  aiPetHero: `${B}images/ai-pet-hero.png`,
  aiContactHero: `${B}images/ai-contact-hero.png`,

  heroGirlDog: `${B}images/hero-girl-dog.jpg`,
  galleryBeachGroup: `${B}images/gallery-07-group-beach.jpg`,
  galleryOffice: `${B}images/gallery-08-office.jpg`,
};

export const GALLERY_PHOTOS = [
  { src: PHOTOS.heroGirlDog, caption: "Compassion for every soul", ratio: "4/3" },
  { src: PHOTOS.galleryBeachGroup, caption: "Community beach cleanup drive", ratio: "16/9" },
  { src: PHOTOS.galleryOffice, caption: "ERGON Foundation office", ratio: "16/9" },
  { src: PHOTOS.ramanathapuramGroup, caption: "People gathered for plantation work", ratio: "4/3" },
  { src: PHOTOS.ramanathapuramSaplings, caption: "Neem saplings ready for planting", ratio: "4/3" },
  { src: PHOTOS.ramanathapuramTree1, caption: "Tree plantation drive in action", ratio: "3/4" },
  { src: PHOTOS.ramanathapuramTree2, caption: "People planting trees together", ratio: "3/4" },
  { src: PHOTOS.ramanathapuramThumbprint, caption: "Planet protection pledge", ratio: "4/3" },
  { src: PHOTOS.ramanathapuramBeachClean, caption: "Seashore cleaning drive", ratio: "4/3" },
  { src: PHOTOS.yercaudGroup, caption: "People volunteering at Yercaud", ratio: "4/3" },
  { src: PHOTOS.yercaudPledge, caption: "Planet pledge", ratio: "4/3" },
  { src: PHOTOS.yercaudDance, caption: "Climate dance challenge", ratio: "4/3" },
  { src: PHOTOS.medicalCampGroup, caption: "People receiving care and support", ratio: "4/3" },
  { src: PHOTOS.medicalConsultation, caption: "People consultation support", ratio: "3/4" },
  { src: PHOTOS.medicalAwareness, caption: "People health awareness session", ratio: "4/3" },
  { src: PHOTOS.medicalMedicine, caption: "People care support materials", ratio: "4/3" },
  { src: PHOTOS.medicalRegistration, caption: "People support registration", ratio: "4/3" },
  { src: PHOTOS.medicalGathered, caption: "People gathered for welfare awareness", ratio: "4/3" },
  { src: PHOTOS.medicalCampGroup, caption: "People outreach team", ratio: "4/3" },
  { src: PHOTOS.reportEnvironment, caption: "Planet impact report", ratio: "16/9" },
  { src: PHOTOS.reportMedical, caption: "People impact report", ratio: "16/9" },
];

export const GALLERY_CATEGORIES = [
  { id: "people", label: "People" },
  { id: "pets", label: "Pets" },
  { id: "planet", label: "Planet" },
];

export const GALLERY_SUBCATEGORIES = {
  people: ["All", "Free Medical Camp", "Community Activities", "Foundation"],
  pets: ["All", "Animal Welfare"],
  planet: ["All", "Environment Day", "Beach Clean-Up"],
};

export const VIDEOS = [
  { src: `${B}videos/ramanathapuram-glimpses.mp4`, title: "Ramanathapuram Glimpses", desc: "Tree planting and coastal care moments from Ramanathapuram.", category: "planet", subcategory: "Environment Day" },
  { src: `${B}videos/yercaud-climate-dance.mp4`, title: "Yercaud Climate Dance", desc: "Children and volunteers taking part in climate awareness activities.", category: "people", subcategory: "Community Activities" },
  { src: `${B}videos/medical-camp-avadi.mp4`, title: "Medical Camp — Avadi", desc: "Free health support and care for migrant workers in Avadi, Chennai.", category: "people", subcategory: "Free Medical Camp" },
];

export const GALLERY_WITH_CATEGORIES = [
  { ...GALLERY_PHOTOS[0], category: "pets", subcategory: "Animal Welfare" },
  { ...GALLERY_PHOTOS[1], category: "people", subcategory: "Community Activities" },
  { ...GALLERY_PHOTOS[2], category: "people", subcategory: "Foundation" },
  { ...GALLERY_PHOTOS[3], category: "people", subcategory: "Community Activities" },
  { ...GALLERY_PHOTOS[4], category: "planet", subcategory: "Environment Day" },
  { ...GALLERY_PHOTOS[5], category: "planet", subcategory: "Environment Day" },
  { ...GALLERY_PHOTOS[6], category: "planet", subcategory: "Environment Day" },
  { ...GALLERY_PHOTOS[7], category: "planet", subcategory: "Environment Day" },
  { ...GALLERY_PHOTOS[8], category: "planet", subcategory: "Beach Clean-Up" },
  { ...GALLERY_PHOTOS[9], category: "people", subcategory: "Community Activities" },
  { ...GALLERY_PHOTOS[10], category: "planet", subcategory: "Environment Day" },
  { ...GALLERY_PHOTOS[11], category: "people", subcategory: "Community Activities" },
  { ...GALLERY_PHOTOS[12], category: "people", subcategory: "Free Medical Camp" },
  { ...GALLERY_PHOTOS[13], category: "people", subcategory: "Free Medical Camp" },
  { ...GALLERY_PHOTOS[14], category: "people", subcategory: "Free Medical Camp" },
  { ...GALLERY_PHOTOS[15], category: "people", subcategory: "Free Medical Camp" },
  { ...GALLERY_PHOTOS[16], category: "people", subcategory: "Free Medical Camp" },
  { ...GALLERY_PHOTOS[17], category: "people", subcategory: "Free Medical Camp" },
  { ...GALLERY_PHOTOS[18], category: "people", subcategory: "Free Medical Camp" },
];
