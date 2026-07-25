const B = import.meta.env.BASE_URL;

export const PHOTOS = {
  logo: `${B}images/logo.png`,
  logoFooter: `${B}images/logo-footer.png`,

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
};

export const GALLERY_PHOTOS = [
  { src: `${B}images/footer-pillars.png`, caption: "Pets welfare commitment", ratio: "16/9" },
  { src: `${B}images/footer-pillars.png`, caption: "People, pets and planet commitment", ratio: "16/9" },
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
  { id: "all", label: "All" },
  { id: "pets", label: "Pets" },
  { id: "planet", label: "Planet" },
  { id: "people", label: "People" },
];

export const GALLERY_WITH_CATEGORIES = [
  { ...GALLERY_PHOTOS[0], category: "pets" },
  { ...GALLERY_PHOTOS[1], category: "pets" },
  { ...GALLERY_PHOTOS[2], category: "people" },
  { ...GALLERY_PHOTOS[3], category: "planet" },
  { ...GALLERY_PHOTOS[4], category: "planet" },
  { ...GALLERY_PHOTOS[5], category: "planet" },
  { ...GALLERY_PHOTOS[6], category: "planet" },
  { ...GALLERY_PHOTOS[7], category: "planet" },
  { ...GALLERY_PHOTOS[8], category: "people" },
  { ...GALLERY_PHOTOS[9], category: "planet" },
  { ...GALLERY_PHOTOS[10], category: "people" },
  { ...GALLERY_PHOTOS[11], category: "people" },
  { ...GALLERY_PHOTOS[12], category: "people" },
  { ...GALLERY_PHOTOS[13], category: "people" },
  { ...GALLERY_PHOTOS[14], category: "people" },
  { ...GALLERY_PHOTOS[15], category: "people" },
  { ...GALLERY_PHOTOS[16], category: "people" },
  { ...GALLERY_PHOTOS[17], category: "people" },
  { ...GALLERY_PHOTOS[18], category: "planet" },
  { ...GALLERY_PHOTOS[19], category: "people" },
];
