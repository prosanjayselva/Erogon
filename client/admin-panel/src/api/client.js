import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

function processQueue(error) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  failedQueue = [];
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(original)).catch((e) => Promise.reject(e));
      }

      original._retry = true;
      isRefreshing = true;

      try {
        await axios.post('/api/v1/auth/refresh', null, { withCredentials: true });
        processQueue(null);
        return api(original);
      } catch {
        processQueue(err);
        try {
          const stored = localStorage.getItem('ergon-auth');
          if (stored) {
            let parsed;
            try { parsed = JSON.parse(stored); } catch { parsed = null; }
            if (parsed?.state?.isAuthenticated) {
              localStorage.removeItem('ergon-auth');
            }
          }
        } catch { /* ignore */ }
        window.location.href = '/admin-panel/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  },
);

export default api;
