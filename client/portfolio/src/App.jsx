import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import CursorFollower from "./components/CursorFollower.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <SmoothScroll>
      <CursorFollower />
      <div className="app">
        <ScrollToTop />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
