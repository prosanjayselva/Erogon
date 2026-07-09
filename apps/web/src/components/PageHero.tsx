import { getAsset } from '@/lib/assets';
import type { HeroContent } from '@/types/site';

type PageHeroProps = {
  hero: HeroContent;
};

export function PageHero({ hero }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="shell page-hero-grid">
        <div className="page-hero-copy" data-reveal>
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1 className="page-title">
            {hero.title}
            <span>{hero.highlight}</span>
          </h1>
          <p className="section-copy">{hero.description}</p>
          {hero.banner ? <div className="hero-banner">{hero.banner}</div> : null}
        </div>
        <div className="page-hero-visual" data-reveal>
          <div className="media-frame tall">
            <img src={getAsset(hero.imageKey)} alt={hero.highlight} decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
}
