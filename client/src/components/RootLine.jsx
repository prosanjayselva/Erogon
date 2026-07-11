import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function RootLine({ compact = false, labels = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i = 0) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.4, delay: i * 0.25, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.3, delay: i * 0.25 } },
    }),
  };

  const leaf = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i = 0) => ({ scale: 1, opacity: 1, transition: { delay: 0.9 + i * 0.22, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
  };

  const h = compact ? 60 : 90;

  return (
    <div className="root-line-wrap" ref={ref}>
      <svg viewBox={`0 0 900 ${h}`} className="root-line" preserveAspectRatio="none" style={{ height: compact ? 44 : 70 }}>
        <motion.path
          d={`M0 ${h / 2} C 150 ${h / 2}, 200 ${h * 0.2}, 320 ${h * 0.2} S 420 ${h * 0.85}, 450 ${h / 2} S 560 ${h * 0.18}, 620 ${h * 0.18} S 760 ${h / 2}, 900 ${h / 2}`}
          variants={draw}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
        />
        {[
          { cx: 320, cy: h * 0.2, i: 0 },
          { cx: 450, cy: h / 2, i: 1 },
          { cx: 620, cy: h * 0.18, i: 2 },
        ].map((n, idx) => (
          <motion.g key={idx} variants={leaf} initial="hidden" animate={inView ? "visible" : "hidden"} custom={idx}>
            <path
              d={`M${n.cx} ${n.cy} c -8 -10 -22 -10 -28 0 c -6 10 4 20 14 22 c 10 -2 20 -12 14 -22Z`}
              className="leaf"
            />
          </motion.g>
        ))}
      </svg>
      {labels && !compact && (
        <div className="flex-between" style={{ maxWidth: 640, margin: "0 auto", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-500)", fontWeight: 700, padding: "0 8%" }}>
          <span>People</span>
          <span>Pets</span>
          <span>Planet</span>
        </div>
      )}
    </div>
  );
}
