import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Bakyson",
  description: "Privacy Policy for Bakyson ICT Solutions website.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-background text-foreground min-h-screen py-20 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-12">
          <Link
            href="/"
            className="text-sm text-foreground/60 hover:text-primary transition-colors"
          >
            ← Back to Home
          </Link>
        </nav>

        <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-8">
          Privacy Policy
        </h1>

        <p className="text-foreground/70 text-sm mb-6">
          Last updated: November 17, 2026
        </p>

        <div className="prose prose-lg max-w-none text-foreground/70 leading-relaxed space-y-6">
          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Introduction</h2>
          <p>
            Bakyson is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website or use our services.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Information We Collect</h2>
          <p>
            We may collect personal information that you voluntarily provide when:
          </p>
          <ul className="list-disc list-inside text-foreground/70 mb-4 space-y-2">
            <li>Filling out a contact form</li>
            <li>Submitting a careers application</li>
            <li>Creating a client portal account</li>
            <li>Submitting a support ticket</li>
            <li>Subscribing to our newsletter</li>
          </ul>
          <p>
            Personal information may include your name, email address, phone number, company name, and any other
            information you choose to provide.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-foreground/70 mb-4 space-y-2">
            <li>Respond to your inquiries and requests</li>
            <li>Process job applications</li>
            <li>Provide portal access and project updates</li>
            <li>Send newsletters and service updates (with your consent)</li>
            <li>Improve our website and services</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share information with
            trusted service providers who assist us in operating our website and delivering our services, provided they
            agree to keep this information confidential.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
            internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-foreground/70 mb-4 space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Withdraw consent for marketing communications</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Contact Information</h2>
          <p>
            Questions about the Privacy Policy should be sent to: support@bakyson.com
          </p>
        </div>
      </div>
    </section>
  );
}
