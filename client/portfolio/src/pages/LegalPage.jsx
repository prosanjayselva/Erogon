import { NavLink } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import { ChevronRightIcon } from "../components/Icons.jsx";

export default function LegalPage({ title, crumb }) {
  return (
    <>
      <section className="doc-header">
        <div className="doc-header__inner">
          <div className="doc-header__breadcrumb">
            <NavLink to="/">Home</NavLink>
            <ChevronRightIcon />
            <span>{crumb}</span>
          </div>
          <h1 className="doc-header__title">{title}</h1>
          <div className="doc-header__divider" />
        </div>
      </section>
      <section className="section section--paper">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <Reveal as="up">
            <p className="lede">
              This page is a placeholder for ERGON Foundation's {title.toLowerCase()}. Final legal copy will be
              supplied by the Foundation and published here.
            </p>
            <div className="divider" />
            <p style={{ color: "var(--text-secondary)" }}>
              For questions in the meantime, please write to <a href="mailto:admin@ergonfoundation.org" className="link-arrow" style={{ display: "inline" }}>admin@ergonfoundation.org</a>.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
