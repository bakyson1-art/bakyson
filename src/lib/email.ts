import { Resend } from "resend";

let resendInstance: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

const FROM_EMAIL = process.env.SMTP_FROM || "noreply@bakyson.com";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "support@bakyson.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bakyson.com";

export interface EmailResult {
  success: boolean;
  error?: string;
}

export async function sendContactNotification({
  name,
  email,
  phone,
  company,
  service,
  message,
  submissionId,
}: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  submissionId: string;
}): Promise<EmailResult> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured. Skipping contact notification email.");
    return { success: false, error: "Email provider not configured" };
  }

  try {
    await getResend()?.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject: `New Contact Form Submission: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Submission ID:</strong> ${submissionId}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Service:</strong> ${service || "Not selected"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><a href="${SITE_URL}/portal/dashboard">View in Portal</a></p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Resend contact notification error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function sendContactConfirmation({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<EmailResult> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured. Skipping confirmation email.");
    return { success: false, error: "Email provider not configured" };
  }

  try {
    await getResend()?.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "Thank you for contacting Bakyson",
      html: `
        <h2>Thank you for contacting Bakyson</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p>If you have any urgent matters, please call our Nairobi office at +254 706 897 778.</p>
        <hr>
        <p>Best regards,<br>The Bakyson Team</p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Resend confirmation email error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function sendCareersApplicationNotification({
  name,
  email,
  phone,
  coverLetter,
  resumeFileName,
  applicationId,
}: {
  name: string;
  email: string;
  phone?: string;
  coverLetter: string;
  resumeFileName: string;
  applicationId: string;
}): Promise<EmailResult> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured. Skipping careers notification email.");
    return { success: false, error: "Email provider not configured" };
  }

  try {
    await getResend()?.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject: `New Careers Application: ${name}`,
      html: `
        <h2>New Careers Application</h2>
        <p><strong>Application ID:</strong> ${applicationId}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Resume:</strong> ${resumeFileName}</p>
        <p><strong>Cover Letter:</strong></p>
        <p>${coverLetter}</p>
        <hr>
        <p><a href="${SITE_URL}/portal/dashboard">View in Portal</a></p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Resend careers notification error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function sendCareersConfirmation({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<EmailResult> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured. Skipping careers confirmation email.");
    return { success: false, error: "Email provider not configured" };
  }

  try {
    await getResend()?.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "Thank you for applying to Bakyson",
      html: `
        <h2>Thank you for applying to Bakyson</h2>
        <p>Dear ${name},</p>
        <p>We have received your application and will review it carefully.</p>
        <p>If your profile matches our needs, we will contact you for the next steps.</p>
        <hr>
        <p>Best regards,<br>The Bakyson Team</p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Resend careers confirmation error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function sendSupportTicketNotification({
  ticketId,
  subject,
  priority,
  description,
  userEmail,
}: {
  ticketId: string;
  subject: string;
  priority: string;
  description: string;
  userEmail?: string;
}): Promise<EmailResult> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured. Skipping support ticket notification.");
    return { success: false, error: "Email provider not configured" };
  }

  try {
    await getResend()?.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject: `New Support Ticket: ${subject}`,
      html: `
        <h2>New Support Ticket</h2>
        <p><strong>Ticket ID:</strong> ${ticketId}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Priority:</strong> ${priority}</p>
        <p><strong>Customer Email:</strong> ${userEmail || "Not provided"}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
        <hr>
        <p><a href="${SITE_URL}/portal/dashboard">View in Portal</a></p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Resend support ticket notification error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function sendSupportTicketConfirmation({
  ticketId,
  subject,
  email,
}: {
  ticketId: string;
  subject: string;
  email: string;
}): Promise<EmailResult> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured. Skipping support ticket confirmation.");
    return { success: false, error: "Email provider not configured" };
  }

  try {
    await getResend()?.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: `Support Ticket Received: ${ticketId}`,
      html: `
        <h2>Support Ticket Received</h2>
        <p>Your support ticket <strong>${ticketId}</strong> has been created successfully.</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>Our support team will respond within 24 hours.</p>
        <hr>
        <p>Best regards,<br>The Bakyson Support Team</p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Resend support ticket confirmation error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function sendTwoFACode({
  email,
  code,
}: {
  email: string;
  code: string;
}): Promise<EmailResult> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured. Skipping 2FA code email.");
    return { success: false, error: "Email provider not configured" };
  }

  try {
    await getResend()?.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "Your Bakyson Portal Verification Code",
      html: `
        <h2>Your Verification Code</h2>
        <p>Your verification code is: <strong style="font-size: 24px; letter-spacing: 4px;">${code}</strong></p>
        <p>This code expires in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
        <hr>
        <p>Best regards,<br>The Bakyson Team</p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Resend 2FA code error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
