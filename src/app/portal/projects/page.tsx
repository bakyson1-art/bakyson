import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/db";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function PortalProjectsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    notFound();
  }

  const userRes = await query('SELECT id FROM users WHERE email = $1', [session.user.email]);
  if (!userRes.rows[0]) {
    notFound();
  }

  const userId = userRes.rows[0].id;
  const projectsRes = await query(
    'SELECT id, name, status, progress, location, start_date, end_date, manager, created_at FROM projects WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );

  const statusColors: Record<string, string> = {
    planning: "bg-blue-100 text-blue-700",
    "in-progress": "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
    "on-hold": "bg-gray-100 text-gray-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-2">
              My Projects
            </h1>
            <p className="text-muted-foreground">
              Track the progress of your ICT installations and upgrades.
            </p>
          </div>
          <a href="/contact" className="inline-flex items-center justify-center rounded-md bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-orange-700 transition">
            New Project Inquiry
          </a>
        </div>

        {projectsRes.rows.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-semibold mb-4">No projects yet</p>
            <p className="text-muted-foreground mb-6">
              You don't have any active projects. Contact us to start a new installation.
            </p>
            <a href="/contact" className="inline-flex items-center justify-center rounded-md bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-orange-700 transition">
              Request a Quote
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsRes.rows.map((project) => {
              const statusColor = statusColors[project.status] || "bg-gray-100 text-gray-700";
              const progress = project.progress ?? 0;
              return (
                <Card key={project.id} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold">{project.name}</CardTitle>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColor}`}>
                        {project.status?.replace(/-/g, " ") || "Unknown"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {project.location || "Location not specified"}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs uppercase">Start Date</p>
                        <p className="text-foreground">
                          {project.start_date ? new Date(project.start_date).toLocaleDateString() : "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs uppercase">End Date</p>
                        <p className="text-foreground">
                          {project.end_date ? new Date(project.end_date).toLocaleDateString() : "—"}
                        </p>
                      </div>
                    </div>
                    {project.manager && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Project Manager:</span>
                        <span className="text-foreground font-medium">{project.manager}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}