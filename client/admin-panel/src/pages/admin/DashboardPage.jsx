import { useQuery } from '@tanstack/react-query';
import api from '../../api/client.js';

const statConfig = [
  { id: 'totalDonors', title: 'Total Donors', icon: '👥', iconBg: '#E8F5E9', format: 'number' },
  { id: 'totalDonations', title: 'Total Donations', icon: '₹', iconBg: '#E3F2FD', format: 'currency' },
  { id: 'totalVolunteers', title: 'Volunteers', icon: '🤝', iconBg: '#F3E8FF', format: 'number' },
  { id: 'totalJobSeekers', title: 'Job Seekers', icon: '👔', iconBg: '#E0F2FE', format: 'number' },
  { id: 'totalEmployers', title: 'Employers', icon: '🏢', iconBg: '#FEF3C7', format: 'number' },
  { id: 'totalContacts', title: 'Contacts', icon: '✉️', iconBg: '#FCE7F3', format: 'number' },
  { id: 'totalNewsletter', title: 'Newsletter Subs', icon: '📬', iconBg: '#D1FAE5', format: 'number' },
  { id: 'upcomingEvents', title: 'Upcoming Events', icon: '📅', iconBg: '#FFF3E0', format: 'number' },
];

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => api.get('/dashboard/stats').then((r) => r.data.data),
    refetchInterval: 30000,
  });

  if (isLoading) return <div className="admin-loading">Loading...</div>;

  const formatCurrency = (val) => (val > 0 ? `\u20B9${val.toLocaleString('en-IN')}` : '\u20B90');

  const stats = [
    { ...statConfig[0], value: data?.totalDonors ?? 0 },
    { ...statConfig[1], value: formatCurrency(data?.totalDonations ?? 0) },
    { ...statConfig[2], value: data?.totalVolunteers ?? 0 },
    { ...statConfig[3], value: data?.totalJobSeekers ?? 0 },
    { ...statConfig[4], value: data?.totalEmployers ?? 0 },
    { ...statConfig[5], value: data?.totalContacts ?? 0 },
    { ...statConfig[6], value: data?.totalNewsletter ?? 0 },
    { ...statConfig[7], value: data?.upcomingEvents ?? 0 },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back, Admin! 👋</p>
      </div>

      <div className="stat-cards">
        {stats.map((s) => (
          <div key={s.id} className="stat-card">
            <div className="stat-card-left">
              <div className="stat-card-icon" style={{ background: s.iconBg }}>{s.icon}</div>
              <span className="stat-card-value">{s.value}</span>
              <span className="stat-card-title">{s.title}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-panels">
        <div className="dashboard-panel">
          <h2>Recent Donations</h2>
          {data?.recentDonations?.length === 0 && <p className="empty-state">No donations yet</p>}
          {data?.recentDonations?.map((d) => (
            <div key={d.id} className="activity-row">
              <span className="activity-detail">{d.name}</span>
              <span className="activity-meta">₹{d.amount} — {new Date(d.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>

        <div className="dashboard-panel">
          <h2>Recent Activity</h2>
          {data?.recentActivities?.length === 0 && <p className="empty-state">No recent activity</p>}
          {data?.recentActivities?.map((a) => (
            <div key={a.id} className="activity-row">
              <span className="activity-detail">{a.details || a.action}</span>
              <span className="activity-meta">{new Date(a.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
