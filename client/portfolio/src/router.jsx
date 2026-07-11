import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CausesPage from "./pages/CausesPage.jsx";
import EduSProPage from "./pages/EduSProPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import GetInvolvedPage from "./pages/GetInvolvedPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import DonatePage from "./pages/DonatePage.jsx";
import LegalPage from "./pages/LegalPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "causes", element: <CausesPage /> },
      { path: "eduspro", element: <EduSProPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "get-involved", element: <GetInvolvedPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "donate", element: <DonatePage /> },
      { path: "privacy", element: <LegalPage title="Privacy Policy" crumb="Privacy Policy" /> },
      { path: "terms", element: <LegalPage title="Terms & Conditions" crumb="Terms & Conditions" /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
