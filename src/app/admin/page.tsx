import { query } from '@/lib/db';
import { requireStaff, requireAdmin, currentUser } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface Stat {
  title: string;
  value: string | number;
  href: string;
  icon: React.ElementType;
}

const Stats: Record<string, Stat> = {
  users: { title: 'Total Users', value: '0', href: '/admin/users', icon: UsersIcon },
  projects: { title: 'Projects', value: '0', href: '/admin/projects', icon: ProjectsIcon },
  tickets: { title: 'Support Tickets', value: '0', href: '/admin/tickets', icon: TicketsIcon },
  submissions: { title: 'Contact Submissions', value: '0', href: '/admin/submissions', icon: SubmissionsIcon },
};

function UsersIcon() {
  return (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
function ProjectsIcon() {
  return (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}
function TicketsIcon() {
  return (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
function SubmissionsIcon() {
  return (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}

export default async function DashboardPage() {
  await requireStaff();

  const [
    usersRes,
    projectsRes,
    ticketsRes,
    submissionsRes,
    recentTicketsRes,
  ] = await Promise.all([
    query('SELECT count(*) FROM users'),
    query('SELECT count(*) FROM projects'),
    query('SELECT count(*) FROM tickets'),
    query('SELECT count(*) FROM submissions'),
    query('SELECT id, subject, priority, status, created_at FROM tickets ORDER BY created_at DESC LIMIT 5'),
  ]);

  const isAdmin = (await currentUser())?.role === 'admin';
  const recentActivityRes = isAdmin
    ? await query(
        `SELECT al.action, al.target_type, al.target_id, al.created_at, u.email AS user_email
         FROM activity_logs al
         LEFT JOIN users u ON u.id = al.user_id
         ORDER BY al.created_at DESC
         LIMIT 5`,
      )
    : { rows: [] };

  const stats = [
    { ...Stats.users, value: parseInt(usersRes.rows[0].count, 10) },
    { ...Stats.projects, value: parseInt(projectsRes.rows[0].count, 10) },
    { ...Stats.tickets, value: parseInt(ticketsRes.rows[0].count, 10) },
    { ...Stats.submissions, value: parseInt(submissionsRes.rows[0].count, 10) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your website and business operations.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <Link
                href={stat.href}
                className="mt-2 inline-block text-xs text-primary hover:underline"
              >
                Manage →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:span-8 lg:span-7">
          <Card>
            <CardHeader>
              <CardTitle>Recent Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-muted-foreground">
                    <tr>
                      <th className="pb-3 font-medium">Subject</th>
                      <th className="pb-3 font-medium">Priority</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium text-right">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTicketsRes.rows.map((ticket: any) => (
                      <tr key={ticket.id} className="border-b border-border last:border-0">
                        <td className="py-4">{ticket.subject}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            ticket.priority === 'high'
                              ? 'bg-red-100 text-red-800'
                              : ticket.priority === 'medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            ticket.status === 'open'
                              ? 'bg-blue-100 text-blue-800'
                              : ticket.status === 'in_progress'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {ticket.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-4 text-right text-muted-foreground">
                          {new Date(ticket.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {recentTicketsRes.rows.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-muted-foreground">
                          No tickets yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Link href="/admin/tickets" className="mt-4 block text-sm text-primary hover:underline">
                View all tickets →
              </Link>
            </CardContent>
          </Card>
        </div>

        {isAdmin && (
          <div className="md:span-4 lg:span-3">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivityRes.rows.map((log: any) => (
                    <div key={log.action + log.created_at} className="flex items-start gap-3 text-sm">
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {log.action.replace('.', ' ')}
                      </span>
                      <div className="text-muted-foreground text-xs">
                        {log.user_email || 'System'}
                        <br />
                        {new Date(log.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))}
                  {recentActivityRes.rows.length === 0 && (
                    <div className="text-center text-muted-foreground text-xs py-4">
                      No recent activity.
                    </div>
                  )}
                </div>
                <Link
                  href="/admin/activity-logs"
                  className="mt-4 block text-sm text-primary hover:underline"
                >
                  View full activity log →
                </Link>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="md:span-4 lg:span-5">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/tickets" className="block px-4 py-3 text-sm text-left rounded-lg bg-primary text-white hover:bg-primary-800">
                Respond to tickets
              </Link>
              <Link href="/admin/projects" className="block px-4 py-3 text-sm text-left rounded-lg bg-white border border-border text-gray-900 hover:bg-gray-50">
                Manage projects
              </Link>
              {isAdmin && (
                <>
                  <Link href="/admin/users" className="block px-4 py-3 text-sm text-left rounded-lg bg-white border border-border text-gray-900 hover:bg-gray-50">
                    Manage users & access
                  </Link>
                  <Link href="/admin/activity-logs" className="block px-4 py-3 text-sm text-left rounded-lg bg-white border border-border text-gray-900 hover:bg-gray-50">
                    View activity log
                  </Link>
                </>
              )}
              <Link href="/admin/submissions" className="block px-4 py-3 text-sm text-left rounded-lg bg-white border border-border text-gray-900 hover:bg-gray-50">
                Review contact submissions
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
