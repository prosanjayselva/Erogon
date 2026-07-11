import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './router.jsx';
import './admin.css';
import './styles.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 10000 } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}
