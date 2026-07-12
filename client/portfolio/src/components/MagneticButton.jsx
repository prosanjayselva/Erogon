import { useRef, useCallback, useEffect, useState } from "react";

export default function MagneticButton({ children, className = "", as: Tag = "div", strength = 0.3, ...rest }) {
  const ref = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsTouch(!mq.matches);
    const handler = (e) => setIsTouch(!e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }, [strength]);

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  }, []);

  return (
    <Tag ref={ref} className={`magnetic-btn ${className}`} onMouseMove={isTouch ? undefined : onMove} onMouseLeave={isTouch ? undefined : onLeave} {...rest}>
      {children}
    </Tag>
  );
}
