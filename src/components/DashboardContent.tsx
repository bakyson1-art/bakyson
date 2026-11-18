"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bell,
  LogOut,
  User,
  MapPin,
  Clock,
  Tag,
  ArrowRight,
  Phone,
  Mail,
  ShieldCheck,
  Plus,
  Edit,
  Download,
  CheckCircle,
} from "lucide-react";

const projects = [
  {
    id: "PRJ-001",
    name: "JW Marriott Nairobi - IPTV Deployment",
    status: "In Progress",
    progress: 65,
    location: "Nairobi, Kenya",
    startDate: "2024-01-15",
    endDate: "2024-03-30",
    manager: "Sarah Njeri",
  },
  {
    id: "PRJ-002",
    name: "Aga Khan Hospital Kisumu - Nurse Call",
    status: "Completed",
    progress: 100,
    location: "Kisumu, Kenya",
    startDate: "2024-02-01",
    endDate: "2024-04-15",
    manager: "James Otieno",
  },
  {
    id: "PRJ-003",
    name: "African Reagent Accra - Network Upgrade",
    status: "Planning",
    progress: 20,
    location: "Accra, Ghana",
    startDate: "2024-05-01",
    endDate: "2024-06-15",
    manager: "Kwame Asante",
  },
];

const supportTickets = [
  {
    id: "TKT-101",
    subject: "IPTV signal issue in Room 402",
    status: "Open",
    priority: "High",
    created: "2024-11-10",
  },
  {
    id: "TKT-102",
    subject: "Access control card not working",
    status: "In Progress",
    priority: "Medium",
    created: "2024-11-08",
  },
];

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState("projects");
  const [ticketOpen, setTicketOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    priority: "Medium",
  });

  return (
    <div className="min-h-screen bg-bakyson-gray">
      <nav className="bg-bakyson-white border-b border-black/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-bakyson-orange flex items-center justify-center text-white font-bold">
                B
              </div>
              <span className="font-extrabold text-lg tracking-tight text-bakyson-black italic">
                Bakyson Portal
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveTab("projects")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "projects"
                    ? "text-bakyson-orange border-b-2 border-bakyson-orange pb-3"
                    : "text-bakyson-black/60 hover:text-bakyson-orange"
                }`}
              >
                My Projects
              </button>
              <button
                onClick={() => setActiveTab("tickets")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "tickets"
                    ? "text-bakyson-orange border-b-2 border-bakyson-orange pb-3"
                    : "text-bakyson-black/60 hover:text-bakyson-orange"
                }`}
              >
                Support Tickets
              </button>
              <button
                onClick={() => setActiveTab("documents")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "documents"
                    ? "text-bakyson-orange border-b-2 border-bakyson-orange pb-3"
                    : "text-bakyson-black/60 hover:text-bakyson-orange"
                }`}
              >
                Documents
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-bakyson-black/60 hover:text-bakyson-orange">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-bakyson-orange" />
              </button>
              <div className="flex items-center gap-2 pl-4 border-l border-black/10">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-bakyson-black">John Doe</p>
                  <p className="text-xs text-bakyson-black/50">john@company.com</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-bakyson-gray flex items-center justify-center text-bakyson-black/60 font-bold text-xs">
                  JD
                </div>
              </div>
              <button
                onClick={async () => {
                  await fetch("/api/auth/signout", { method: "POST" });
                  window.location.href = "/portal/login";
                }}
                className="ml-4 text-sm font-bold text-primary hover:text-primary-foreground transition-colors flex items-center gap-1 bg-background border border-border px-3 py-1.5 rounded-lg hover:bg-accent"
              >
                Sign Out <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-bakyson-black mb-2">
            Welcome back, John
          </h1>
          <p className="text-bakyson-black/60">
            Here's what's happening with your Bakyson projects.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-black/10 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-bakyson-black/50 uppercase font-bold tracking-wider">
                  Active Projects
                </p>
                <p className="text-3xl font-bold text-bakyson-black mt-1">2</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-bakyson-orange/10 flex items-center justify-center text-bakyson-orange">
                <MapPin className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-black/10 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-bakyson-black/50 uppercase font-bold tracking-wider">
                  Open Tickets
                </p>
                <p className="text-3xl font-bold text-bakyson-black mt-1">1</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-bakyson-orange/10 flex items-center justify-center text-bakyson-orange">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-black/10 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-bakyson-black/50 uppercase font-bold tracking-wider">
                  Completed
                </p>
                <p className="text-3xl font-bold text-bakyson-black mt-1">1</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-black/10 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-bakyson-black/50 uppercase font-bold tracking-wider">
                  Account Manager
                </p>
                <p className="text-3xl font-bold text-bakyson-black mt-1">
                  Sarah Njeri
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-bakyson-gray flex items-center justify-center text-bakyson-black font-bold text-xs">
                SN
              </div>
            </div>
          </div>
        </div>

        {activeTab === "projects" && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-bakyson-black">
                My Projects
              </h2>
              <button className="flex items-center gap-2 text-bakyson-orange font-semibold hover:text-bakyson-orange-dark transition-colors">
                <Plus className="w-4 h-4" />
                New Request
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl p-6 border border-black/10 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-bakyson-orange/10 flex items-center justify-center text-bakyson-orange">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-bakyson-black/60 uppercase tracking-wider">
                        {project.location.split(",")[0]}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : project.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-bakyson-black mb-2">
                    {project.name}
                  </h3>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-bakyson-black/60">Progress</span>
                      <span className="text-bakyson-black font-bold">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-black/10 rounded-full h-2">
                      <div
                        className="bg-bakyson-orange h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-bakyson-black/60">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>
                        {new Date(project.startDate).toLocaleDateString()} -
                        {new Date(project.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      <span>{project.manager}</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-black/10">
                    <Link
                      href={`/portal/projects/${project.id}`}
                      className="text-sm font-bold text-bakyson-orange flex items-center gap-1 hover:text-bakyson-orange-dark transition-colors"
                    >
                      View Details <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "tickets" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-bakyson-black">
                Support Tickets
              </h2>
              <button
                onClick={() => setTicketOpen(true)}
                className="flex items-center gap-2 bg-bakyson-orange text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-bakyson-orange-dark transition-colors shadow-lg shadow-orange/25"
              >
                <Plus className="w-4 h-4" />
                New Ticket
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-bakyson-gray border-b border-black/10">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold text-bakyson-black/60 uppercase tracking-wider">
                      Ticket ID
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-bakyson-black/60 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-bakyson-black/60 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-bakyson-black/60 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-bakyson-black/60 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {supportTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-black/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-bakyson-black">
                        {ticket.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-bakyson-black">
                        {ticket.subject}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            ticket.status === "Open"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            ticket.priority === "High"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-bakyson-black/60">
                        {ticket.created}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "documents" && (
          <div className="bg-white rounded-2xl border border-black/10 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-bakyson-black mb-6">
              Project Documents
            </h2>
            <p className="text-bakyson-black/60 mb-6">
              Download contracts, specifications, and completion certificates
              for your projects.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: "JW Marriott - Contract.pdf", type: "Contract" },
                { name: "Aga Khan - Completion Cert.pdf", type: "Certificate" },
                { name: "African Reagent - SOW.pdf", type: "Statement of Work" },
              ].map((doc) => (
                <div
                  key={doc.name}
                  className="p-4 rounded-xl border border-black/10 flex items-center gap-4 hover:bg-black/5 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-bakyson-gray flex items-center justify-center text-bakyson-black/60">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-bakyson-black">
                      {doc.name}
                    </p>
                    <p className="text-xs text-bakyson-black/40 capitalize">
                      {doc.type}
                    </p>
                  </div>
                  <Edit className="w-4 h-4 text-bakyson-black/40 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {ticketOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setTicketOpen(false)}
              className="absolute top-4 right-4 text-bakyson-black/40 hover:text-bakyson-black transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8">
              <h3 className="text-xl font-bold text-bakyson-black mb-6">
                New Support Ticket
              </h3>
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-bakyson-black mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-black/20 focus:ring-2 focus:ring-bakyson-orange focus:border-bakyson-orange outline-none text-bakyson-black"
                    placeholder="e.g. IPTV signal issue in Room 402"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-bakyson-black mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-black/20 focus:ring-2 focus:ring-bakyson-orange focus:border-bakyson-orange outline-none text-bakyson-black"
                    placeholder="Describe the issue you're experiencing..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-bakyson-black mb-1">
                    Priority
                  </label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-black/20 focus:ring-2 focus:ring-bakyson-orange focus:border-bakyson-orange outline-none text-bakyson-black bg-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTicketOpen(false);
                    setNewTicket({ subject: "", description: "", priority: "Medium" });
                  }}
                  className="w-full bg-bakyson-black text-white py-4 rounded-xl font-bold hover:bg-bakyson-orange transition-colors flex items-center justify-center gap-2"
                >
                  Submit Ticket <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
