import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";

export default function LegalPage({ title, crumb }) {
  return (
    <>
      <PageHero crumb={crumb} eyebrow="Legal" title={title} />
      <section className="section section--paper">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <Reveal as="up">
            <p className="lede">
              This page is a placeholder for ERGON Foundation's {title.toLowerCase()}. Final legal copy will be
              supplied by the Foundation and published here.
            </p>
            <div className="divider" />
            <p style={{ color: "var(--ink-500)" }}>
              For questions in the meantime, please write to <a href="mailto:admin@ergonfoundation.org" className="link-arrow" style={{ display: "inline" }}>admin@ergonfoundation.org</a>.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
