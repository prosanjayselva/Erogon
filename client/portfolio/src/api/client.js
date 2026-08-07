import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
});

function getCsrfToken() {
  const match = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

api.interceptors.request.use(async (config) => {
  const method = config.method?.toUpperCase();
  if (method && !['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    let token = getCsrfToken();
    if (!token) {
      await axios.get('/api/v1/health', { withCredentials: true });
      token = getCsrfToken();
    }
    if (token) {
      config.headers['X-CSRF-Token'] = token;
    }
  }
  return config;
});

export default api;
