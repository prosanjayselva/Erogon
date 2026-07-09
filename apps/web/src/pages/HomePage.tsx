import { NavLink } from 'react-router-dom';
import { Icon } from '@/components/Icons';
import { SectionHeading } from '@/components/SectionHeading';
import { getAsset } from '@/lib/assets';
import { useSiteStore } from '@/store/site-store';

export function HomePage() {
  const { home, activeStoryIndex, setActiveStory } = useSiteStore((state) => ({
    home: state.content!.home,
    activeStoryIndex: state.activeStoryIndex,
    setActiveStory: state.setActiveStory,
  }));

  const activeStory = home.stories[activeStoryIndex];

  return (
    <>
      <section className="hero-section">
        <div className="shell hero-grid">
          <div className="hero-copy" data-reveal>
            <span className="eyebrow">{home.hero.eyebrow}</span>
            <h1 className="display-title">
              {home.hero.title}
              <span>{home.hero.highlight}</span>
            </h1>
            <p className="hero-subline">{home.hero.subline}</p>
            <p className="section-copy">{home.hero.description}</p>

            <div className="button-row">
              <NavLink className="button button-primary" to={home.hero.primaryAction!.href}>
                {home.hero.primaryAction!.label}
              </NavLink>
              <NavLink className="button button-secondary" to={home.hero.secondaryAction!.href}>
                {home.hero.secondaryAction!.label}
              </NavLink>
            </div>
          </div>

          <div className="hero-visual" data-reveal>
            <div className="hero-image-card">
              <img src={getAsset(home.hero.imageKey)} alt={home.hero.highlight} decoding="async" />
              <div className="watch-pill">
                <div className="play-button" />
                <span>{home.hero.badge}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="shell stats-strip" data-reveal>
          {home.stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <div className="icon-chip">
                <Icon name={stat.icon} width={28} height={28} />
              </div>
              <div>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell about-grid">
          <div className="media-frame" data-reveal>
            <img src={getAsset(home.about.imageKey)} alt="ERGON Foundation impact" loading="lazy" decoding="async" />
          </div>

          <div className="content-stack" data-reveal>
            <SectionHeading
              eyebrow={home.about.eyebrow}
              title={home.about.title}
              highlight={home.about.highlight}
              description={home.about.description}
            />
            <ul className="check-list">
              {home.about.bullets.map((bullet) => (
                <li key={bullet}>
                  <span className="check-mark">✓</span>
                  {bullet}
                </li>
              ))}
            </ul>
            <NavLink className="button button-primary" to="/about">
              Read More About Us
            </NavLink>
          </div>

          <aside className="quote-panel" data-reveal>
            <span className="quote-glyph">“</span>
            <p>{home.about.quote.text}</p>
            <strong>{home.about.quote.author}</strong>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            centered
            title="Our Key Activities"
            description="ERGON Foundation serves people, pets, and the planet through focused, measurable, and community-led action."
          />

          <div className="pillar-grid">
            {home.pillars.map((pillar) => (
              <article className="pillar-card" key={pillar.title} data-reveal>
                <div className="icon-chip soft">
                  <Icon name={pillar.icon ?? 'sprout'} width={32} height={32} />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
                <ul>
                  {pillar.bullets?.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="impact-band">
        <div className="shell impact-band-grid">
          <div data-reveal>
            <h2>{home.impactBand.title}</h2>
            <NavLink className="button button-secondary" to={home.impactBand.action.href}>
              {home.impactBand.action.label}
            </NavLink>
          </div>
          <div className="impact-metrics" data-reveal>
            {home.impactBand.metrics.map((metric) => (
              <div className="impact-metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-row" data-reveal>
            <SectionHeading title="Featured Projects" />
            <NavLink className="text-link" to="/projects">
              View All Projects
            </NavLink>
          </div>

          <div className="project-grid">
            {home.featuredProjects.map((project) => (
              <article className="project-card" key={project.title} data-reveal>
                <img src={getAsset(project.imageKey)} alt={project.title} loading="lazy" decoding="async" />
                <div className="project-card-body">
                  <h3>{project.title}</h3>
                  <p className="meta-line">{project.location}</p>
                  <p>{project.description}</p>
                  <div className="funding-line">
                    <span>
                      {project.raised} raised of {project.target}
                    </span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-bar" style={{ width: `${project.progress}%` }} />
                  </div>
                  <NavLink className="button button-secondary" to="/donate">
                    Support Project
                  </NavLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="shell trust-grid">
          {home.trustSignals.map((signal) => (
            <article className="trust-card" key={signal.title} data-reveal>
              <div className="icon-chip">
                <Icon name={signal.icon ?? 'shieldCheck'} width={28} height={28} />
              </div>
              <h3>{signal.title}</h3>
              <p>{signal.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell stories-layout">
          <div data-reveal>
            <SectionHeading title="Stories of Hope" description="Real voices from the people and animals whose lives were touched by timely support." />
            <div className="story-tabs">
              {home.stories.map((story, index) => (
                <button
                  key={story.author}
                  type="button"
                  className={`story-tab${activeStoryIndex === index ? ' active' : ''}`}
                  onClick={() => setActiveStory(index)}
                >
                  {story.author}
                </button>
              ))}
            </div>
          </div>

          <article className="story-feature" data-reveal>
            <img src={getAsset(activeStory.imageKey)} alt={activeStory.author} loading="lazy" decoding="async" />
            <blockquote>{activeStory.quote}</blockquote>
            <strong>{activeStory.author}</strong>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="shell" data-reveal>
          <SectionHeading title="Our Partners" />
          <div className="partner-frame">
            <img src={getAsset(home.partnersImageKey)} alt="ERGON Foundation partners" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>
    </>
  );
}
