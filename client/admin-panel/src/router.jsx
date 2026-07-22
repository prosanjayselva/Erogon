import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout.jsx';
import ProtectedRoute from './components/admin/ProtectedRoute.jsx';
import LoginPage from './pages/admin/LoginPage.jsx';
import DashboardPage from './pages/admin/DashboardPage.jsx';
import DonorManagementPage from './pages/admin/DonorManagementPage.jsx';
import EventManagementPage from './pages/admin/EventManagementPage.jsx';
import AuditLogPage from './pages/admin/AuditLogPage.jsx';
import VolunteerManagementPage from './pages/admin/VolunteerManagementPage.jsx';
import JobSeekerManagementPage from './pages/admin/JobSeekerManagementPage.jsx';
import EmployerManagementPage from './pages/admin/EmployerManagementPage.jsx';
import ContactManagementPage from './pages/admin/ContactManagementPage.jsx';
import NewsletterManagementPage from './pages/admin/NewsletterManagementPage.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'donors', element: <DonorManagementPage /> },
          { path: 'volunteers', element: <VolunteerManagementPage /> },
          { path: 'job-seekers', element: <JobSeekerManagementPage /> },
          { path: 'employers', element: <EmployerManagementPage /> },
          { path: 'contacts', element: <ContactManagementPage /> },
          { path: 'newsletter', element: <NewsletterManagementPage /> },
          { path: 'events', element: <EventManagementPage /> },
          { path: 'audit-logs', element: <AuditLogPage /> },
        ],
      },
    ],
  },
], { basename: `${import.meta.env.BASE_URL}admin-panel` });

export default function Router() {
  return <RouterProvider router={router} />;
}
