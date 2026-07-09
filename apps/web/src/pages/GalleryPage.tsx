import { PageHero } from '@/components/PageHero';
import { getAsset } from '@/lib/assets';
import { useSiteStore } from '@/store/site-store';

export function GalleryPage() {
  const gallery = useSiteStore((state) => state.content!.gallery);

  return (
    <>
      <PageHero hero={gallery.hero} />
      <section className="section">
        <div className="shell gallery-grid">
          {gallery.items.map((item) => (
            <figure className="gallery-card" key={item.label} data-reveal>
              <img src={getAsset(item.imageKey)} alt={item.label} loading="lazy" decoding="async" />
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
