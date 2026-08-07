import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store.js';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [maxAttempts] = useState(5);
  const [locked, setLocked] = useState(false);
  const [lockSecs, setLockSecs] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const attemptsRef = useRef(0);

  const loginFn = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const lockTimer = useRef(null);
  const busy = useRef(false);

  useEffect(() => {
    if (lockSecs <= 0) {
      setLocked(false);
      if (lockTimer.current) clearInterval(lockTimer.current);
      return;
    }
    lockTimer.current = setInterval(() => {
      setLockSecs((prev) => {
        if (prev <= 1) {
          clearInterval(lockTimer.current);
          setLocked(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (lockTimer.current) clearInterval(lockTimer.current); };
  }, [locked]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy.current || locked || loading) return;
    busy.current = true;
    setLoading(true);
    setError('');

    const submittedEmail = email;
    const submittedPassword = password;
    setEmail('');
    setPassword('');

    try {
      await loginFn(submittedEmail, submittedPassword);
      setSuccess(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      const data = err.response?.data;
      setError(data?.error || 'Invalid credentials');

      if (data?.locked) {
        setLocked(true);
        const lockAttempts = data.maxAttempts || maxAttempts;
        attemptsRef.current = lockAttempts;
        setAttempts(lockAttempts);
        setLockSecs(Math.ceil((data.remainingMs || 900000) / 1000));
      } else {
        attemptsRef.current += 1;
        setAttempts(attemptsRef.current);
      }

      setTimeout(() => emailRef.current?.focus(), 50);
    } finally {
      setLoading(false);
      busy.current = false;
    }
  };

  const remaining = Math.max(0, maxAttempts - attempts);

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <img
            src={`${import.meta.env.BASE_URL}assets/ergon-logo-2026.png`}
            alt="ERGON Foundation"
            className="login-brand-logo"
          />
        </div>

        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          {success ? (
            <div className="login-success">
              <div className="login-success-ring">
                <svg className="login-success-check" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="login-success-title">Welcome back!</p>
              <p className="login-success-sub">Redirecting to dashboard</p>
            </div>
          ) : (
            <>
              <h2 className="login-form-title">Sign In</h2>
              <p className="login-form-desc">Enter your credentials to access the admin panel</p>

              {error && <div className="login-error">{error}</div>}

              {locked && (
                <div className="login-lockout">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6, flexShrink: 0 }}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Locked — try again in {formatTime(lockSecs)}
                </div>
              )}

              {!locked && attempts > 0 && remaining > 0 && (
                <div className={`login-attempts ${remaining <= 2 ? 'login-warning' : 'login-info'}`}>
                  {remaining === 1
                    ? '1 attempt remaining'
                    : `${remaining} attempts remaining`}
                </div>
              )}

              <div className="login-field">
                <label className="login-label" htmlFor="login-email">Username</label>
                <div className="login-input-wrap">
                  <svg className="login-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    ref={emailRef}
                    id="login-email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your username"
                    required
                    autoFocus
                    autoComplete="off"
                    disabled={locked || loading}
                  />
                </div>
              </div>

              <div className="login-field">
                <label className="login-label" htmlFor="login-password">Password</label>
                <div className="login-input-wrap">
                  <svg className="login-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    disabled={locked || loading}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="login-eye-btn"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading || locked} className="login-submit">
                {loading ? (
                  <span className="login-spinner-row">
                    <span className="login-spinner" />
                    Signing in...
                  </span>
                ) : 'Sign In'}
              </button>
            </>
          )}
        </form>

        <div className="login-footer">
          <p><span className="admin-footer-brand">ERGON FOUNDATION</span> &copy; 2026</p>
        </div>
      </div>
    </div>
  );
}
