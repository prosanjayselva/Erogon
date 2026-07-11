import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const cursorRef = useRef(null);
  const visibleRef = useRef(false);
  const rafRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) {
        visibleRef.current = true;
        cursor.classList.add("is-visible");
      }
      cursor.style.left = pos.current.x + "px";
      cursor.style.top = pos.current.y + "px";
    };

    const onLeaveDoc = () => {
      visibleRef.current = false;
      cursor.classList.remove("is-visible");
    };

    const addListeners = () => {
      document.querySelectorAll("a, button, .btn, .card, .project-card, .trust-card, .photo-frame, .sponsor-card, .partner-item, .amount-pill").forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("is-hovering"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("is-hovering"));
      });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeaveDoc);
    addListeners();

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeaveDoc);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div className="cursor-follower" ref={cursorRef} />;
}
