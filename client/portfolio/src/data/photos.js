export const PHOTOS = {
  logo: "/images/logo.png",
  logoFooter: "/images/logo-footer.png",

  handsPlant: "/images/about-plant.jpg",
  treePlantingReal: "/images/about-real.jpg",

  projectTree: "/images/project-tree.jpg",
  projectBeachCleanup: "/images/project-beach-cleanup.jpg",
  projectMedicalCamp: "/images/project-medical-camp.jpg",

  reportEnvironment: "/images/report-environment-day-2026.jpg",
  reportMedical: "/images/report-medical-camp-2026.jpg",
  reportMedicalImpact: "/images/report-medical-impact.png",
  reportEnvImpact: "/images/report-env-impact.png",

  ramanathapuramGroup: "/images/ramanathapuram-group.jpg",
  ramanathapuramSaplings: "/images/ramanathapuram-saplings.jpg",
  ramanathapuramTree1: "/images/ramanathapuram-tree-1.jpg",
  ramanathapuramTree2: "/images/ramanathapuram-tree-2.jpg",
  ramanathapuramThumbprint: "/images/ramanathapuram-thumbprint.jpg",
  ramanathapuramBeachClean: "/images/ramanathapuram-beach-clean.jpg",

  yercaudGroup: "/images/yercaud-group.jpg",
  yercaudPledge: "/images/yercaud-pledge.jpg",
  yercaudDance: "/images/yercaud-dance.jpg",
  yercaudActivity: "/images/yercaud-activity.jpg",

  medicalCampGroup: "/images/medical-camp-group.jpg",
  medicalConsultation: "/images/medical-consultation.jpg",
  medicalAwareness: "/images/medical-awareness.jpg",
  medicalMedicine: "/images/medical-medicine.jpg",
  medicalRegistration: "/images/medical-registration.jpg",
  medicalGathered: "/images/medical-gathered.jpg",

  aiCausesBg: "/images/ai-causes-bg.png",
  aiHeroGirlDog: "/images/ai-hero-girl-dog.png",
  aiHero1: "/images/ai-hero-1.png",
  aiHero2: "/images/ai-hero-2.png",
  aiHero3: "/images/ai-hero-3.png",
  aiAboutHero: "/images/ai-about-hero.png",
  aiPetHero: "/images/ai-pet-hero.png",
  aiContactHero: "/images/ai-contact-hero.png",
};

export const GALLERY_PHOTOS = [
  { src: PHOTOS.ramanathapuramGroup, caption: "Environment Day - Ramanathapuram Group", ratio: "4/3" },
  { src: PHOTOS.ramanathapuramSaplings, caption: "Neem saplings ready for planting", ratio: "4/3" },
  { src: PHOTOS.ramanathapuramTree1, caption: "Tree plantation drive in action", ratio: "3/4" },
  { src: PHOTOS.ramanathapuramTree2, caption: "Community tree planting", ratio: "3/4" },
  { src: PHOTOS.ramanathapuramThumbprint, caption: "Environmental pledge commitment", ratio: "4/3" },
  { src: PHOTOS.ramanathapuramBeachClean, caption: "Seashore cleaning drive", ratio: "4/3" },
  { src: PHOTOS.yercaudGroup, caption: "Environment Day - Yercaud volunteers", ratio: "4/3" },
  { src: PHOTOS.yercaudPledge, caption: "Taking the environmental pledge", ratio: "4/3" },
  { src: PHOTOS.yercaudDance, caption: "Climate dance challenge", ratio: "4/3" },
  { src: PHOTOS.medicalCampGroup, caption: "Medical Camp - Team and patients", ratio: "4/3" },
  { src: PHOTOS.medicalConsultation, caption: "Doctor consultation at camp", ratio: "3/4" },
  { src: PHOTOS.medicalAwareness, caption: "Health awareness session", ratio: "4/3" },
  { src: PHOTOS.medicalMedicine, caption: "Medicine distribution", ratio: "4/3" },
  { src: PHOTOS.medicalRegistration, caption: "Patient registration", ratio: "4/3" },
  { src: PHOTOS.medicalGathered, caption: "Migrant workers gathered for awareness", ratio: "4/3" },
  { src: PHOTOS.medicalCampGroup, caption: "Medical outreach team", ratio: "4/3" },
  { src: PHOTOS.reportEnvironment, caption: "World Environment Day 2026", ratio: "16/9" },
  { src: PHOTOS.reportMedical, caption: "Medical Camp 2026", ratio: "16/9" },
];

export const GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "environment", label: "Environment" },
  { id: "medical", label: "Medical" },
  { id: "community", label: "Community" },
];

export const GALLERY_WITH_CATEGORIES = [
  { ...GALLERY_PHOTOS[0], category: "environment" },
  { ...GALLERY_PHOTOS[1], category: "environment" },
  { ...GALLERY_PHOTOS[2], category: "environment" },
  { ...GALLERY_PHOTOS[3], category: "environment" },
  { ...GALLERY_PHOTOS[4], category: "community" },
  { ...GALLERY_PHOTOS[5], category: "environment" },
  { ...GALLERY_PHOTOS[6], category: "environment" },
  { ...GALLERY_PHOTOS[7], category: "community" },
  { ...GALLERY_PHOTOS[8], category: "community" },
  { ...GALLERY_PHOTOS[9], category: "medical" },
  { ...GALLERY_PHOTOS[10], category: "medical" },
  { ...GALLERY_PHOTOS[11], category: "medical" },
  { ...GALLERY_PHOTOS[12], category: "medical" },
  { ...GALLERY_PHOTOS[13], category: "medical" },
  { ...GALLERY_PHOTOS[14], category: "medical" },
  { ...GALLERY_PHOTOS[15], category: "medical" },
  { ...GALLERY_PHOTOS[16], category: "environment" },
  { ...GALLERY_PHOTOS[17], category: "medical" },
];
