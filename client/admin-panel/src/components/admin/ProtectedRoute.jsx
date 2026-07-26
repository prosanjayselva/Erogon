import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store.js';
import axios from 'axios';

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    axios.get('/api/v1/auth/me', { withCredentials: true })
      .then(({ data }) => {
        if (cancelled) return;
        useAuthStore.setState({ user: data.data.user, isAuthenticated: true });
      })
      .catch(() => {
        if (cancelled) return;
        useAuthStore.setState({ user: null, isAuthenticated: false });
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (checking) return <div className="admin-loading">Verifying session...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}
