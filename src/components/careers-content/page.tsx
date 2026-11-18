"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, MapPin, CheckCircle, FileText, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motionTokens, springs } from "@/lib/motion-tokens";
import { useSafeMotion } from "@/hooks/use-reduced-motion";

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
  const [submitError, setSubmitError] = useState("");

  const safeMotion = useSafeMotion(motionTokens.distance.md);

  const handleApplyClick = (job = selectedJob) => {
    setSelectedJob(job);
    setApplicationOpen(true);
    setSubmitted(false);
    setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

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
        setSubmitError(data.error || "Failed to submit application");
      }
    } catch {
      setSubmitting(false);
      setSubmitError("Failed to submit application. Please try again.");
    }
  };

  const closeModal = () => {
    setApplicationOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      coverLetter: "",
      resume: null,
    });
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative pt-20 lg:py-32 pb-24 overflow-hidden" aria-labelledby="careers-heading">
        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mb-4">
            <Badge variant="primary">Join Our Team</Badge>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl lg:text-6xl font-extrabold leading-tight text-foreground mb-6"
            id="careers-heading"
          >
            Build the Future of<br />
            ICT in Africa
          </motion.h1>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-lg max-w-2xl mx-auto leading-relaxed text-foreground/70"
          >
            We're looking for passionate, talented professionals who want to
            make an impact. Join Bakyson and help transform businesses across
            Sub-Saharan Africa.
          </motion.p>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20 bg-surface" aria-labelledby="jobs-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-12">
            <div className="space-y-2">
              <motion.h2 variants={sectionVariants} initial="hidden" animate="visible" className="text-3xl font-bold text-foreground">
                Open Positions
              </motion.h2>
              <motion.p variants={sectionVariants} initial="hidden" animate="visible" className="text-foreground/60 mt-2">
                Explore our current job openings and apply online.
              </motion.p>
            </div>
            <Button variant="primary" size="sm" className="shadow-lg shadow-primary hover:shadow-primary" onClick={() => handleApplyClick()}>
              Apply Now
            </Button>
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                variants={itemVariants}
                className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-300 group"
                whileHover={{ y: -4 }}
                transition={springs.gentle}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-primary font-bold text-xs uppercase tracking-wider">
                      {job.department}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mt-1 group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-surface text-foreground/70 text-xs font-bold">
                    {job.type}
                  </span>
                </div>
                <p className="text-foreground/60 text-sm mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  {job.location}
                </p>
                <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                  {job.description}
                </p>
                <div className="space-y-2">
                  {job.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-foreground/70">
                      <CheckCircle className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                      {req}
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="mt-6 w-full"
                  onClick={() => handleApplyClick(job)}
                  whileTap={{ scale: motionTokens.scale.press }}
                  transition={springs.snappy}
                >
                  Apply for this role <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Application Section */}
      <section className="py-20 bg-foreground" aria-labelledby="open-app-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2 variants={sectionVariants} initial="hidden" animate="visible" className="text-3xl font-bold text-foreground mb-6">
              Don't See a Match?
            </motion.h2>
            <motion.p variants={itemVariants} initial="hidden" animate="visible" className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Send us your resume anyway. We're always looking for great talent.
            </motion.p>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
              onClick={() => handleApplyClick()}
            >
              Submit Open Application
            </Button>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {applicationOpen && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionTokens.duration.fast }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-title"
          >
            <motion.div
              initial={safeMotion.initial}
              animate={safeMotion.animate}
              exit={safeMotion.exit}
              transition={springs.gentle}
              className="bg-background rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close application"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 id="application-title" className="text-xl font-bold text-foreground">
                      Apply for {selectedJob.title}
                    </h3>
                    <p className="text-sm text-primary font-medium">
                      {selectedJob.location} • {selectedJob.department}
                    </p>
                  </div>
                </div>

                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-4">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Application Submitted!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you for your interest in joining Bakyson. We'll review your application and get back to you soon.
                    </p>
                    <Button
                      variant="primary"
                      className="mt-6"
                      onClick={() => {
                        setSubmitted(false);
                        closeModal();
                      }}
                    >
                      Apply for Another Role
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {submitError && (
                      <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm" role="alert">
                        {submitError}
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <Label htmlFor="careers-name">Full Name</Label>
                        <Input
                          id="careers-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          disabled={submitting}
                        />
                      </div>
                      <div>
                        <Label htmlFor="careers-email">Email Address</Label>
                        <Input
                          id="careers-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          disabled={submitting}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="careers-phone">Phone Number</Label>
                      <Input
                        id="careers-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+254 7XX XXX XXX"
                        disabled={submitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="careers-cover-letter">Cover Letter</Label>
                      <Textarea
                        id="careers-cover-letter"
                        required
                        rows={4}
                        value={formData.coverLetter}
                        onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                        placeholder="Tell us why you want to join Bakyson..."
                        disabled={submitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="careers-resume">Upload Resume (PDF, max 5MB)</Label>
                      <Input
                        id="careers-resume"
                        type="file"
                        accept=".pdf"
                        required
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            const file = e.target.files[0];
                            if (file.size > 5 * 1024 * 1024) {
                              setSubmitError("Resume must be under 5MB");
                              e.target.value = "";
                              return;
                            }
                            if (file.type !== "application/pdf") {
                              setSubmitError("Resume must be a PDF file");
                              e.target.value = "";
                              return;
                            }
                            setFormData({ ...formData, resume: file });
                            setSubmitError("");
                          }
                        }}
                        disabled={submitting}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full"
                      whileTap={{ scale: motionTokens.scale.press }}
                      transition={springs.snappy}
                    >
                      {submitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}