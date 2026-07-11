import { NavLink } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import { LeafIcon, ArrowRightIcon } from "../components/Icons.jsx";

export default function NotFoundPage() {
  return (
    <section className="section section--paper center" style={{ paddingBlock: "clamp(90px, 14vw, 160px)" }}>
      <div className="wrap center">
        <Reveal as="scale">
          <div className="icon-badge mx-auto" style={{ width: 74, height: 74 }}><LeafIcon style={{ width: 32, height: 32 }} /></div>
          <h1 className="h-lg mt-24">This Root Hasn't Grown Yet</h1>
          <p className="lede mx-auto mt-16">The page you're looking for doesn't exist. Let's get you back to solid ground.</p>
          <NavLink to="/" className="btn btn--primary mt-32">Back To Home <ArrowRightIcon /></NavLink>
        </Reveal>
      </div>
    </section>
  );
}
