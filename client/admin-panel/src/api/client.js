import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('ergon-auth');
  if (stored) {
    const { state } = JSON.parse(stored);
    if (state.token) {
      config.headers.Authorization = `Bearer ${state.token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const stored = localStorage.getItem('ergon-auth');
      if (stored) {
        const { state } = JSON.parse(stored);
        try {
          const { data } = await axios.post('/api/v1/auth/refresh', {
            refreshToken: state.refreshToken,
          });
          const newState = { ...state, token: data.data.accessToken };
          localStorage.setItem('ergon-auth', JSON.stringify({ state: newState }));
          original.headers.Authorization = `Bearer ${data.data.accessToken}`;
          return api(original);
        } catch {
          localStorage.removeItem('ergon-auth');
          window.location.href = `${import.meta.env.BASE_URL}admin-panel/login`;
        }
      }
    }
    return Promise.reject(err);
  },
);

export default api;
