import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const careersFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  coverLetter: z.string().min(10, "Cover letter must be at least 10 characters"),
  resume: z.instanceof(File, { message: "Resume is required" }),
});

export const supportTicketSchema = z.object({
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priority: z.enum(["Low", "Medium", "High", "Critical"]).default("Medium"),
});

export const projectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  status: z.enum(["Planning", "In Progress", "Completed", "On Hold"]),
  progress: z.number().min(0).max(100),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  manager: z.string().optional(),
  description: z.string().optional(),
});

export const ticketSchema = z.object({
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priority: z.enum(["Low", "Medium", "High", "Critical"]).default("Medium"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const twoFactorSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits").regex(/^\d{6}$/, "Code must contain only digits"),
});

export const documentSchema = z.object({
  projectId: z.string().optional(),
  fileName: z.string().min(1, "File name is required"),
  fileUrl: z.string().url("Invalid file URL"),
  fileType: z.string().min(1, "File type is required"),
  fileSize: z.number().optional(),
});

export const chatMessageSchema = z.object({
  sender: z.enum(["user", "agent"]),
  text: z.string().min(1, "Message cannot be empty"),
});
