import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './router.jsx';
import ErrorBoundary from './components/admin/ErrorBoundary.jsx';
import './admin.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 10000 } },
});

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
