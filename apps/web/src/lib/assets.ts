import aboutReal from '../../../../assets/about-real.jpg';
import galleryFive from '../../../../assets/gallery-five.jpeg';
import galleryFour from '../../../../assets/gallery-four.jpeg';
import galleryOne from '../../../../assets/gallery-one.jpg';
import gallerySix from '../../../../assets/gallery-six.jpg';
import galleryThree from '../../../../assets/gallery-three.jpeg';
import galleryTwo from '../../../../assets/gallery-two.jpg';
import heroGirlDog from '../../../../assets/hero-girl-dog.png';
import logo from '../../../../assets/logo-source.png';
import partnersStrip from '../../../../assets/partners-strip.png';
import projectAnimal from '../../../../assets/project-animal-real.jpeg';
import projectEducation from '../../../../assets/project-education-real.jpeg';
import projectFood from '../../../../assets/project-food-real.jpg';
import projectTree from '../../../../assets/project-tree-real.jpg';
import reportEnvironment from '../../../../assets/report-environment.png';
import reportMedical from '../../../../assets/report-medical.png';
import storyBruno from '../../../../assets/story-bruno.png';
import storyKavya from '../../../../assets/story-kavya.png';
import storyLakshmi from '../../../../assets/story-lakshmi.png';

export const brandAssets: Record<string, string> = {
  aboutReal,
  galleryFive,
  galleryFour,
  galleryOne,
  gallerySix,
  galleryThree,
  galleryTwo,
  heroGirlDog,
  logo,
  partnersStrip,
  projectAnimal,
  projectEducation,
  projectFood,
  projectTree,
  reportEnvironment,
  reportMedical,
  storyBruno,
  storyKavya,
  storyLakshmi,
};

export function getAsset(key: string) {
  return brandAssets[key] ?? brandAssets.logo;
}

