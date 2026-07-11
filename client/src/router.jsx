import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PublicLayout from './components/PublicLayout.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import ProtectedRoute from './components/admin/ProtectedRoute.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import CausesPage from './pages/CausesPage.jsx';
import EduSProPage from './pages/EduSProPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import GetInvolvedPage from './pages/GetInvolvedPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import DonatePage from './pages/DonatePage.jsx';
import LegalPage from './pages/LegalPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoginPage from './pages/admin/LoginPage.jsx';
import DashboardPage from './pages/admin/DashboardPage.jsx';
import DonorManagementPage from './pages/admin/DonorManagementPage.jsx';
import EventManagementPage from './pages/admin/EventManagementPage.jsx';
import AuditLogPage from './pages/admin/AuditLogPage.jsx';
import SettingsPage from './pages/admin/SettingsPage.jsx';

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/causes', element: <CausesPage /> },
      { path: '/eduspro', element: <EduSProPage /> },
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/reports', element: <ReportsPage /> },
      { path: '/gallery', element: <GalleryPage /> },
      { path: '/get-involved', element: <GetInvolvedPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/donate', element: <DonatePage /> },
      { path: '/privacy', element: <LegalPage title="Privacy Policy" crumb="Privacy Policy" /> },
      { path: '/terms', element: <LegalPage title="Terms & Conditions" crumb="Terms & Conditions" /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: '/admin/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'donors', element: <DonorManagementPage /> },
          { path: 'events', element: <EventManagementPage /> },
          { path: 'audit-logs', element: <AuditLogPage /> },
          { path: 'settings', element: <SettingsPage /> },
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
