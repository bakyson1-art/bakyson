"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Mail, Phone, MapPin, Clock, FileText, CheckCircle } from "lucide-react";

const jobs = [
  {
    id: "senior-network-engineer",
    title: "Senior Network Engineer",
    location: "Nairobi, Kenya",
    department: "Engineering",
    type: "Full-time",
    description:
      "Design and deploy network infrastructure for enterprise clients across Sub-Saharan Africa. Experience with HSIA, structured cabling, and IP telephony required.",
    requirements: [
      "5+ years in network engineering",
      "CCNP or equivalent certification",
      "Experience with structured cabling",
      "Willingness to travel across Africa",
    ],
  },
  {
    id: "sales-executive",
    title: "Sales Executive",
    location: "Lagos, Nigeria",
    department: "Sales",
    type: "Full-time",
    description:
      "Drive sales of ICT solutions for Hospitality, Healthcare, and Corporate clients. Build relationships and close deals across West Africa.",
    requirements: [
      "3+ years in B2B sales",
      "Proven track record in technology sales",
      "Strong communication and negotiation skills",
      "Valid driver's license",
    ],
  },
  {
    id: "security-systems-technician",
    title: "Security Systems Technician",
    location: "Johannesburg, South Africa",
    department: "Technical",
    type: "Full-time",
    description:
      "Install and maintain access control, CCTV, and fire alarm systems for commercial and residential clients.",
    requirements: [
      "3+ years in security systems installation",
      "Knowledge of CCTV and access control",
      "Ability to read technical schematics",
      "Safety certification preferred",
    ],
  },
  {
    id: "project-coordinator",
    title: "Project Coordinator",
    location: "Accra, Ghana",
    department: "Operations",
    type: "Full-time",
    description:
      "Coordinate ICT project timelines, resources, and client communications. Ensure on-time delivery of ELV system deployments.",
    requirements: [
      "2+ years in project coordination",
      "Excellent organizational skills",
      "Experience with construction or technology projects",
      "Proficiency with project management tools",
    ],
  },
];

export default function CareersContent() {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-bakyson-white">
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-bakyson-orange rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-bakyson-orange font-bold text-sm uppercase tracking-wider inline-block mb-4">
            Join Our Team
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-bakyson-black leading-tight mb-6">
            Build the Future of<br />
            ICT in Africa
          </h1>
          <p className="text-bakyson-black/60 text-lg max-w-2xl mx-auto leading-relaxed">
            We're looking for passionate, talented professionals who want to
            make an impact. Join Bakyson and help transform businesses across
            Sub-Saharan Africa.
          </p>
        </div>
      </section>

      <section className="py-20 bg-bakyson-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-bakyson-black">
                Open Positions
              </h2>
              <p className="text-bakyson-black/60 mt-2">
                Explore our current job openings and apply online.
              </p>
            </div>
            <button
              onClick={() => setApplicationOpen(true)}
              className="bg-bakyson-orange text-white px-6 py-3 rounded-xl font-bold hover:bg-bakyson-orange-dark transition-colors shadow-lg shadow-orange/25"
            >
              Apply Now
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-8 rounded-2xl bg-white border border-black/10 hover:border-bakyson-orange/50 hover:bg-black/5 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-bakyson-orange font-bold text-xs uppercase tracking-wider">
                      {job.department}
                    </span>
                    <h3 className="text-xl font-bold text-bakyson-black mt-1 group-hover:text-bakyson-orange transition-colors">
                      {job.title}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-bakyson-gray text-bakyson-black/70 text-xs font-bold">
                    {job.type}
                  </span>
                </div>
                <p className="text-bakyson-black/60 text-sm mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </p>
                <p className="text-bakyson-black/70 text-sm leading-relaxed mb-6">
                  {job.description}
                </p>
                <div className="space-y-2">
                  {job.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-bakyson-black/70">
                      <CheckCircle className="w-3 h-3 text-bakyson-orange mt-0.5 shrink-0" />
                      {req}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setApplicationOpen(true);
                  }}
                  className="mt-6 w-full bg-bakyson-black text-white py-3 rounded-xl font-bold hover:bg-bakyson-orange hover:text-bakyson-black transition-colors"
                >
                  Apply for this role
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-bakyson-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-bakyson-white mb-6">
              Don't See a Match?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Send us your resume anyway. We're always looking for great talent.
            </p>
            <button
              onClick={() => setApplicationOpen(true)}
              className="border-2 border-bakyson-orange text-bakyson-orange px-8 py-4 rounded-xl font-bold text-lg hover:bg-bakyson-orange hover:text-white transition-all"
            >
              Submit Open Application
            </button>
          </div>
        </div>
      </section>

      {applicationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setApplicationOpen(false)}
              className="absolute top-4 right-4 text-bakyson-black/40 hover:text-bakyson-black transition-colors"
              aria-label="Close application"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-bakyson-orange/10 flex items-center justify-center text-bakyson-orange">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-bakyson-black">
                    Apply for {selectedJob.title}
                  </h3>
                  <p className="text-sm text-bakyson-orange font-medium">
                    {selectedJob.location} • {selectedJob.department}
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-bakyson-black mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-bakyson-black/60">
                    Thank you for your interest in joining Bakyson. We'll review your application and get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 bg-bakyson-orange text-white px-6 py-3 rounded-xl font-bold hover:bg-bakyson-orange-dark transition-colors"
                  >
                    Apply for Another Role
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setSubmitting(true);
                    try {
                      const formDataToSend = new FormData();
                      formDataToSend.append("name", formData.name);
                      formDataToSend.append("email", formData.email);
                      formDataToSend.append("phone", formData.phone);
                      formDataToSend.append("coverLetter", formData.coverLetter);
                      if (formData.resume) {
                        formDataToSend.append("resume", formData.resume);
                      }
                      const res = await fetch("/api/careers", {
                        method: "POST",
                        body: formDataToSend,
                      });
                      const data = await res.json();
                      if (res.ok) {
                        setSubmitted(true);
                      } else {
                        setSubmitting(false);
                        alert(data.error || "Failed to submit application");
                      }
                    } catch (err) {
                      setSubmitting(false);
                      alert("Failed to submit application. Please try again.");
                    }
                  }}
                  className="space-y-5"
                >
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-bakyson-black mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-black/20 focus:ring-2 focus:ring-bakyson-orange focus:border-bakyson-orange outline-none text-bakyson-black"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-bakyson-black mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-black/20 focus:ring-2 focus:ring-bakyson-orange focus:border-bakyson-orange outline-none text-bakyson-black"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-bakyson-black mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-black/20 focus:ring-2 focus:ring-bakyson-orange focus:border-bakyson-orange outline-none text-bakyson-black"
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-bakyson-black mb-1">
                      Cover Letter
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-black/20 focus:ring-2 focus:ring-bakyson-orange focus:border-bakyson-orange outline-none text-bakyson-black"
                      placeholder="Tell us why you want to join Bakyson..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-bakyson-black mb-1">
                      Upload Resume (PDF)
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      required
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setFormData({ ...formData, resume: e.target.files[0] });
                        }
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-black/20 focus:ring-2 focus:ring-bakyson-orange focus:border-bakyson-orange outline-none text-bakyson-black"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-bakyson-orange text-white py-4 rounded-xl font-bold text-lg hover:bg-bakyson-orange-dark transition-all disabled:opacity-50 shadow-lg shadow-orange/25"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
