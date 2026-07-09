import { PageHero } from '@/components/PageHero';
import { getAsset } from '@/lib/assets';
import { useSiteStore } from '@/store/site-store';

export function ProjectsPage() {
  const projects = useSiteStore((state) => state.content!.projects);

  return (
    <>
      <PageHero hero={projects.hero} />
      <section className="section">
        <div className="shell project-grid">
          {projects.items.map((project) => (
            <article className="project-card" key={project.title} data-reveal>
              <img src={getAsset(project.imageKey)} alt={project.title} loading="lazy" decoding="async" />
              <div className="project-card-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
