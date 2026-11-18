import Link from "next/link";

export const metadata = {
  title: "Terms of Use | Bakyson",
  description: "Terms of Use for Bakyson ICT Solutions website.",
};

export default function TermsOfUsePage() {
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
          Terms of Use
        </h1>

        <p className="text-foreground/70 text-sm mb-6">
          Last updated: November 17, 2026
        </p>

        <div className="prose prose-lg max-w-none text-foreground/70 leading-relaxed space-y-6">
          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Bakyson website (bakyson.com), you accept and agree to be bound by the terms and
            conditions of use and all applicable laws and regulations. If you do not agree with any of these terms, you
            are prohibited from using or accessing this site.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on Bakyson's website for personal,
            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under
            this license you may not: modify or copy the materials; use the materials for any commercial purpose, or for
            any public display; attempt to decompile or reverse engineer any software contained on Bakyson's website;
            remove any copyright or other proprietary notations from the materials; or transfer the materials to another
            person or "mirror" the materials on any other server.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">3. Disclaimer</h2>
          <p>
            The materials on Bakyson's website are provided on an 'as is' basis. Bakyson makes no warranties, expressed
            or implied, and hereby disclaims and negates all other warranties including, without limitation, implied
            warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
            intellectual property or other violation of rights.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">4. Limitations</h2>
          <p>
            In no event shall Bakyson or its suppliers be liable for any damages (including, without limitation, damages
            for loss of data or profit, or due to business interruption) arising out of the use or inability to use the
            materials on Bakyson's website, even if Bakyson or a Bakyson authorized representative has been notified
            orally or in writing of the possibility of such damage.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">5. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of Kenya and you
            irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">6. Contact Information</h2>
          <p>
            Questions about the Terms of Use should be sent to: support@bakyson.com
          </p>
        </div>
      </div>
    </section>
  );
}
