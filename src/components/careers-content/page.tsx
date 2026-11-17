"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight, MapPin, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
            <Button variant="primary" size="sm" className="shadow-lg shadow-primary hover:shadow-primary">
              Apply Now
            </Button>
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                variants={itemVariants}
                className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 hover:bg-black/5 transition-all duration-300 group"
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
                <button
                  className="mt-6 w-full bg-foreground text-primary py-3 rounded-xl font-bold hover:bg-primary hover:text-background transition-colors"
                >
                  Apply for this role <ChevronRight className="w-4 h-4 ml-2" />
                </button>
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
            <motion.p variants={itemVariants} initial="hidden" animate="visible" className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Send us your resume anyway. We're always looking for great talent.
            </motion.p>
            <motion.button
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              onClick={() => {}}
              className="border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary hover:text-background transition-all"
            >
              Submit Open Application
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
