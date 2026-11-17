"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, LogOut, User, MapPin, Clock, ArrowRight, Plus, Edit, Download, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";

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

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const statusConfig: Record<string, { bg: string; text: string }> = {
  Completed: { bg: "bg-green-100", text: "text-green-700" },
  "In Progress": { bg: "bg-blue-100", text: "text-blue-700" },
  Planning: { bg: "bg-gray-100", text: "text-gray-700" },
  Open: { bg: "bg-red-100", text: "text-red-700" },
  High: { bg: "bg-red-100", text: "text-red-700" },
  Medium: { bg: "bg-yellow-100", text: "text-yellow-700" },
};

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState("projects");
  const [ticketOpen, setTicketOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    priority: "Medium",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-background border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-background font-bold">
                B
              </div>
              <span className="font-heading font-extrabold text-lg tracking-tight text-foreground italic">
                Bakyson Portal
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {[
                { id: "projects", label: "My Projects" },
                { id: "tickets", label: "Support Tickets" },
                { id: "documents", label: "Documents" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-primary border-b-2 border-primary pb-3"
                      : "text-foreground/60 hover:text-primary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-foreground/60 hover:text-primary">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
              </button>
              <div className="flex items-center gap-2 pl-4 border-l border-border">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-foreground">John Doe</p>
                  <p className="text-xs text-foreground/50">john@company.com</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-foreground/60 font-bold text-xs">
                  JD
                </div>
              </div>
              <button
                onClick={() => (window.location.href = "/portal/login")}
                className="ml-4 text-sm font-bold text-primary hover:text-primary-hover transition-colors flex items-center gap-1"
              >
                Sign Out <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John</h1>
          <p className="text-foreground/60">Here's what's happening with your Bakyson projects.</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Active Projects", value: "2", icon: MapPin, color: "bg-primary/10 text-primary" },
            { label: "Open Tickets", value: "1", icon: Clock, color: "bg-primary/10 text-primary" },
            { label: "Completed", value: "1", icon: CheckCircle, color: "bg-green-100 text-green-600" },
            { label: "Account Manager", value: "Sarah Njeri", icon: User, color: "bg-surface text-foreground" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="bg-background rounded-2xl p-6 border border-border shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/50 uppercase font-bold tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-foreground">
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {activeTab === "projects" && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">My Projects</h2>
              <button className="flex items-center gap-2 text-primary font-bold hover:text-primary-hover transition-colors">
                <Plus className="w-4 h-4" /> New Request
              </button>
            </div>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="bg-background rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-foreground/60 uppercase tracking-wider">
                        {project.location.split(",")[0]}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${statusConfig[project.status].bg} ${statusConfig[project.status].text}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{project.name}</h3>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground/60">Progress</span>
                      <span className="text-foreground font-bold">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-surface/50 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-foreground/60">
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
                  <div className="mt-6 pt-4 border-t border-border">
                    <Link href={`/portal/projects/${project.id}`} className="text-sm font-bold text-primary flex items-center gap-1 hover:text-primary-hover transition-colors">
                      View Details <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {activeTab === "tickets" && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Support Tickets</h2>
              <button
                onClick={() => setTicketOpen(true)}
                className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-xl font-bold text-sm hover:bg-primary-hover transition-colors shadow-lg shadow-primary/25"
              >
                <Plus className="w-4 h-4" /> New Ticket
              </button>
            </div>
            <motion.div variants={itemVariants} initial="hidden" animate="visible" className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-surface border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold text-foreground/60 uppercase tracking-wider">Ticket ID</th>
                    <th className="px-6 py-4 text-sm font-bold text-foreground/60 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-4 text-sm font-bold text-foreground/60 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-sm font-bold text-foreground/60 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-sm font-bold text-foreground/60 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-background">
                  {supportTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-black/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-foreground">{ticket.id}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{ticket.subject}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusConfig[ticket.status].bg} ${statusConfig[ticket.status].text}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusConfig[ticket.priority].bg} ${statusConfig[ticket.priority].text}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/60">{ticket.created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "documents" && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="bg-background rounded-2xl border border-border shadow-sm p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Project Documents</h2>
            <motion.p variants={itemVariants} initial="hidden" animate="visible" className="text-foreground/60 mb-6">
              Download contracts, specifications, and completion certificates for your projects.
            </motion.p>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-3 gap-4">
              {[
                { name: "JW Marriott - Contract.pdf", type: "Contract" },
                { name: "Aga Khan - Completion Cert.pdf", type: "Certificate" },
                { name: "African Reagent - SOW.pdf", type: "Statement of Work" },
              ].map((doc) => (
                <div key={doc.name} className="p-4 rounded-xl border border-border flex items-center gap-4 hover:bg-black/5 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-foreground/60">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{doc.name}</p>
                    <p className="text-xs text-foreground/40 capitalize">{doc.type}</p>
                  </div>
                  <Edit className="w-4 h-4 text-foreground/40 ml-auto" />
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </main>

      {/* New Ticket Modal */}
      {ticketOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setTicketOpen(false)}
              className="absolute top-4 right-4 text-foreground/40 hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.div variants={itemVariants} initial="hidden" animate="visible" className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">New Support Ticket</h3>
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-background/20 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-foreground"
                    placeholder="e.g. IPTV signal issue in Room 402"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-background/20 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-foreground"
                    placeholder="Describe the issue you're experiencing..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-1">Priority</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-background/20 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-foreground bg-background"
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
                  className="w-full bg-foreground text-background py-4 rounded-xl font-bold hover:bg-primary transition-colors flex items-center justify-center gap-2"
                >
                  Submit Ticket <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
