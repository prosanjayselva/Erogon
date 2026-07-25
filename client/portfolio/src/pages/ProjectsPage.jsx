import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import { LeafIcon, HeartHandsIcon } from "../components/Icons.jsx";

export default function ProjectsPage() {
  return (
    <>
      <section className="bento-hero">
        <div className="bento-hero__inner bento-hero__inner--simple">
          <motion.div
            className="bento-hero__featured"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="projects-empty-visual">
              <LeafIcon />
            </div>
            <div className="bento-hero__featured-overlay">
              <span className="pill">Projects</span>
              <h2>Projects Will Be Updated Soon</h2>
              <p>ERGON Foundation will publish verified project details after official project activity begins.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container--narrow text-center">
          <Reveal as="up">
            <div className="icon-badge mx-auto"><HeartHandsIcon /></div>
            <div className="eyebrow mt-16" style={{ justifyContent: "center" }}>No Dummy Project Data</div>
            <h1 className="h-lg">We Haven't Started Publishing Projects Yet</h1>
            <p className="lede mt-16">
              Project information, impact numbers and support details will be added here only after they are verified by ERGON Foundation.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
