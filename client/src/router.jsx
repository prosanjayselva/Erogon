import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout.jsx';
import ProtectedRoute from './components/admin/ProtectedRoute.jsx';
import LoginPage from './pages/admin/LoginPage.jsx';
import DashboardPage from './pages/admin/DashboardPage.jsx';
import DonorManagementPage from './pages/admin/DonorManagementPage.jsx';
import EventManagementPage from './pages/admin/EventManagementPage.jsx';
import AuditLogPage from './pages/admin/AuditLogPage.jsx';
import SettingsPage from './pages/admin/SettingsPage.jsx';

const router = createBrowserRouter([
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
  {
    path: '*',
    element: (
      <div className="login-page">
        <div className="login-form" style={{ textAlign: 'center' }}>
          <h1>404</h1>
          <p>Page not found</p>
          <a href="/admin/login" style={{ color: '#3b82f6' }}>Go to Login</a>
        </div>
      </div>
    ),
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
