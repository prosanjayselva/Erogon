import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../api/client.js';
import { useToastStore } from '../../stores/toast-store.js';

export default function HomeStatsPage() {
  const toast = useToastStore((state) => state.add);
  const queryClient = useQueryClient();
  const [values, setValues] = useState({});
  const [dirty, setDirty] = useState(false);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['home-stats'],
    queryFn: () => api.get('/home-stats').then((response) => response.data.data),
  });

  useEffect(() => {
    if (data && !dirty) setValues(Object.fromEntries(data.map(({ key, value }) => [key, String(value)])));
  }, [data, dirty]);

  const mutation = useMutation({
    mutationFn: (nextValues) => api.put('/home-stats', { values: nextValues }),
    onSuccess: (response) => {
      queryClient.setQueryData(['home-stats'], response.data.data);
      setValues(Object.fromEntries(response.data.data.map(({ key, value }) => [key, String(value)])));
      setDirty(false);
      toast('Homepage statistics updated', 'success');
    },
    onError: (error) => toast(error.response?.data?.error || 'Could not save homepage statistics', 'error'),
  });

  function handleSubmit(event) {
    event.preventDefault();
    const nextValues = Object.fromEntries((data ?? []).map(({ key }) => [key, Number(values[key])]));
    if (Object.values(nextValues).some((value) => !Number.isInteger(value) || value < 0 || value > 2147483647)) {
      toast('Enter a non-negative whole number for each statistic', 'error');
      return;
    }
    mutation.mutate(nextValues);
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Homepage Stats</h1>
        <p className="page-subtitle">Update the numbers shown below the homepage introduction.</p>
      </div>

      {isLoading && <div className="admin-loading">Loading statistics...</div>}
      {isError && <div className="dashboard-panel">Could not load the current statistics. <button type="button" onClick={() => refetch()}>Retry</button></div>}
      {data && !isError && (
        <form className="dashboard-panel" onSubmit={handleSubmit} style={{ maxWidth: 760 }}>
          <div className="home-stats-fields">
            {data.map(({ key, label }) => (
              <label className="home-stats-field" key={key}>
                <span>{label}</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="2147483647"
                  step="1"
                  required
                  value={values[key] ?? ''}
                  onChange={(event) => { setValues((current) => ({ ...current, [key]: event.target.value })); setDirty(true); }}
                />
              </label>
            ))}
          </div>
          <button className="home-stats-save" type="submit" disabled={!dirty || mutation.isPending}>
            {mutation.isPending ? 'Saving...' : 'Save Homepage Stats'}
          </button>
        </form>
      )}
    </div>
  );
}
