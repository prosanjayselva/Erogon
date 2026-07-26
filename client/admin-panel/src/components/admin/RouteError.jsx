import { useRouteError, useNavigate } from 'react-router-dom';

export default function RouteError() {
  const error = useRouteError();
  const navigate = useNavigate();

  const message = error?.status === 404
    ? 'Page not found.'
    : error?.message || 'Something went wrong.';

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', fontFamily: 'system-ui, sans-serif', background: '#FAFBF8', color: '#111827',
      padding: 24, textAlign: 'center',
    }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>
        {error?.status === 404 ? '🔍' : '⚠️'}
      </div>
      <h1 style={{ fontSize: 24, marginBottom: 8, fontWeight: 700 }}>
        {error?.status === 404 ? 'Page Not Found' : 'Something Went Wrong'}
      </h1>
      <p style={{ color: '#6B7280', marginBottom: 24, maxWidth: 400, lineHeight: 1.5 }}>
        {message}
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 24px', background: '#2E7D32', color: '#fff', border: 'none',
          borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600,
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
}
