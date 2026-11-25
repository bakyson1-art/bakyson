import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/db";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function PortalTicketsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    notFound();
  }

  const userRes = await query('SELECT id FROM users WHERE email = $1', [session.user.email]);
  if (!userRes.rows[0]) {
    notFound();
  }

  const userId = userRes.rows[0].id;
  const ticketsRes = await query(
    'SELECT id, subject, status, priority, created_at FROM tickets WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );

  const priorityColors: Record<string, string> = {
    low: "bg-green-100 text-green-700",
    medium: "bg-blue-100 text-blue-700",
    high: "bg-orange-100 text-orange-700",
    critical: "bg-red-100 text-red-700",
  };

  const statusColors: Record<string, string> = {
    open: "bg-blue-100 text-blue-700",
    "in-progress": "bg-yellow-100 text-yellow-700",
    resolved: "bg-green-100 text-green-700",
    closed: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-2">
              Support Tickets
            </h1>
            <p className="text-muted-foreground">
              View and track your support requests.
            </p>
          </div>
          <a href="/support" className="inline-flex items-center justify-center rounded-md bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-orange-700 transition">
            New Ticket
          </a>
        </div>

        {ticketsRes.rows.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-semibold mb-4">No support tickets</p>
            <p className="text-muted-foreground mb-6">
              You haven&apos;t submitted any support tickets yet.
            </p>
            <a href="/support" className="inline-flex items-center justify-center rounded-md bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-orange-700 transition">
              Submit a Ticket
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-4 text-sm font-semibold text-muted-foreground">Subject</th>
                  <th className="pb-4 text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="pb-4 text-sm font-semibold text-muted-foreground">Priority</th>
                  <th className="pb-4 text-sm font-semibold text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {ticketsRes.rows.map((ticket) => {
                  const statusColor = statusColors[ticket.status] || "bg-gray-100 text-gray-700";
                  const priorityColor = priorityColors[ticket.priority] || "bg-gray-100 text-gray-700";
                  return (
                    <tr key={ticket.id} className="border-b border-border hover:bg-muted transition">
                      <td className="py-4 text-sm font-medium">{ticket.subject}</td>
                      <td className="py-4 text-sm">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColor}`}>
                          {ticket.status?.replace(/-/g, " ") || "Unknown"}
                        </span>
                      </td>
                      <td className="py-4 text-sm">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${priorityColor}`}>
                          {ticket.priority?.charAt(0).toUpperCase() + ticket.priority.slice(1) || "—"}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-muted-foreground">
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}