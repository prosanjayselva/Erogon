import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store.js';
import NotificationBell from './NotificationBell.jsx';
import Toasts from './Toasts.jsx';

const menu = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/' },
  { id: 'donors', label: 'Donor Management', icon: '👥', path: '/donors' },
  { id: 'volunteers', label: 'Volunteers', icon: '🤝', path: '/volunteers' },
  { id: 'job-seekers', label: 'Job Seekers', icon: '👔', path: '/job-seekers' },
  { id: 'employers', label: 'Employers', icon: '🏢', path: '/employers' },
  { id: 'contacts', label: 'Contacts', icon: '✉️', path: '/contacts' },
  { id: 'newsletter', label: 'Newsletter', icon: '📬', path: '/newsletter' },
  { id: 'events', label: 'Event Management', icon: '📅', path: '/events' },
  { id: 'gallery', label: 'Gallery Management', icon: '🖼️', path: '/gallery' },
  { id: 'reports', label: 'Report Management', icon: '📄', path: '/reports' },
  { id: 'audit', label: 'Audit Logs', icon: '📋', path: '/audit-logs' },
  { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
  { id: 'website', label: 'View Website', icon: '🌐', path: import.meta.env.PROD ? '/' : 'http://localhost:5174/Erogon/' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `sidebar-nav-link${isActive ? ' active' : ''}`;

  const avatarLetter = user?.name?.charAt(0)?.toUpperCase() || 'A';

  return (
    <div className="admin-shell">
      <Toasts />

      {/* ─── Mobile overlay ─── */}
      <div className={`admin-sidebar-overlay ${sidebarOpen ? 'is-open' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* ─── Sidebar ─── */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="sidebar-logo">
          <img src={`${import.meta.env.BASE_URL}assets/ergon-logo-header.png`} alt="ERGON Foundation" className="sidebar-logo-img" />
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-name">ERGON</span>
            <span className="sidebar-logo-sub">FOUNDATION</span>
          </div>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">&times;</button>
        </div>
        <div className="sidebar-tagline">ROOTED IN GOOD DEEDS</div>

        <nav className="sidebar-nav">
          {menu.map((item) => (
            item.id === 'website' ? (
              <a key={item.id} href={item.path} className="sidebar-nav-link" target="_blank" rel="noopener noreferrer" onClick={() => setSidebarOpen(false)}>
                <span className="sidebar-nav-icon">{item.icon}</span>
                {item.label}
              </a>
            ) : (
              <NavLink key={item.id} to={item.path} end={item.id === 'dashboard'} className={linkClass} onClick={() => setSidebarOpen(false)}>
                <span className="sidebar-nav-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            )
          ))}
        </nav>

        <div className="sidebar-footer-card">
          <img src={`${import.meta.env.BASE_URL}assets/people-pets-planet-transparent.png`} alt="The People, The Pets, The Planet" className="admin-pillars-art" />
        </div>
      </aside>

      {/* ─── Main ─── */}
      <div className="admin-main">
        <header className="admin-header">
          <div className="admin-header-left">
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
              &#9776;
            </button>
          </div>
          <div className="admin-header-brand">
            <img src={`${import.meta.env.BASE_URL}assets/ergon-logo-header.png`} alt="ERGON Foundation" className="admin-header-logo" />
            <div className="admin-header-brand-text">
              <span className="admin-header-title">Admin Panel</span>
              <span className="admin-header-subtitle">Welcome back, Admin! 👋</span>
            </div>
          </div>
          <div className="admin-header-right">
            <NotificationBell />
            <div className="admin-user-wrap">
              <div className="admin-user-avatar">{avatarLetter}</div>
              <div className="admin-user-info">
                <span className="admin-user-name">{user?.name || 'Admin User'}</span>
                <span className="admin-user-role">Administrator</span>
              </div>
            </div>
            <button className="admin-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>

        <footer className="admin-footer">
          <p>© 2026 <span className="admin-footer-brand">ERGON FOUNDATION</span>. All rights reserved.</p>
          <img src={`${import.meta.env.BASE_URL}assets/people-pets-planet-transparent.png`} alt="The People, The Pets, The Planet" className="admin-footer-pillars" />
        </footer>
      </div>
    </div>
  );
}
