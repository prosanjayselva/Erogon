import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store.js';
import api from '../../api/client.js';

function formatTime(ms) {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attemptInfo, setAttemptInfo] = useState({ attempts: 0, maxAttempts: 5, locked: false, remainingMs: 0 });
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const checkAttempts = useCallback(async () => {
    if (!email) return;
    try {
      const { data } = await api.get('/auth/attempts-check', { params: { email } });
      setAttemptInfo(data.data);
      if (data.data.locked) {
        setLockoutRemaining(data.data.remainingMs);
      }
    } catch {
      // ignore
    }
  }, [email]);

  useEffect(() => {
    checkAttempts();
  }, [checkAttempts]);

  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const interval = setInterval(() => {
      setLockoutRemaining((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          checkAttempts();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutRemaining > 0, checkAttempts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.error || 'Invalid credentials';
      setError(msg);
      if (err.response?.data?.locked) {
        setLockoutRemaining(err.response.data.remainingMs || 900000);
      } else {
        checkAttempts();
      }
    } finally {
      setLoading(false);
    }
  };

  const isLocked = lockoutRemaining > 0 || attemptInfo.locked;
  const remaining = Math.max(0, attemptInfo.maxAttempts - attemptInfo.attempts);

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-header">
          <h1>ERGON</h1>
          <div className="login-subtitle">FOUNDATION — ADMIN PANEL</div>
        </div>

        {error && <div className="login-error">{error}</div>}

        {isLocked && (
          <div className="login-lockout">
            🔒 Account locked. Try again in {formatTime(lockoutRemaining)}
          </div>
        )}

        {!isLocked && email && (
          <div className={`login-attempts ${remaining <= 2 ? 'login-warning' : 'login-info'}`}>
            {remaining > 2
              ? `${remaining} attempts remaining`
              : `⚠️ ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining before lockout`}
          </div>
        )}

        <label>
          <span>Username</span>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            autoComplete="username"
            disabled={isLocked}
          />
        </label>

        <label>
          <span>Password</span>
          <div className="login-password-wrap">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLocked}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="login-eye-btn"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </label>

        <button type="submit" disabled={loading || isLocked}>
          {loading ? 'Signing in...' : isLocked ? `Locked — ${formatTime(lockoutRemaining)}` : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
