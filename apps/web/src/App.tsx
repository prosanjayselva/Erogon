import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { AboutPage } from '@/pages/AboutPage';
import { CausesPage } from '@/pages/CausesPage';
import { ContactPage } from '@/pages/ContactPage';
import { DonatePage } from '@/pages/DonatePage';
import { EduSProPage } from '@/pages/EduSProPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { GetInvolvedPage } from '@/pages/GetInvolvedPage';
import { HomePage } from '@/pages/HomePage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { useSiteStore } from '@/store/site-store';

export default function App() {
  const { content, contentState, errorMessage, loadContent } = useSiteStore((state) => ({
    content: state.content,
    contentState: state.contentState,
    errorMessage: state.errorMessage,
    loadContent: state.loadContent,
  }));

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  if (contentState === 'loading' || contentState === 'idle') {
    return (
      <div className="app-loader">
        <div className="loader-orb" />
        <p>Building a better tomorrow...</p>
      </div>
    );
  }

  if (contentState === 'error' || !content) {
    return (
      <div className="app-loader">
        <p>{errorMessage ?? 'Something went wrong while loading the site.'}</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/causes" element={<CausesPage />} />
        <Route path="/eduspro" element={<EduSProPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/get-involved" element={<GetInvolvedPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
