import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | Bakyson",
  description: "Cookie Policy for Bakyson ICT Solutions website.",
};

export default function CookiePolicyPage() {
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
          Cookie Policy
        </h1>

        <p className="text-foreground/70 text-sm mb-6">
          Last updated: November 17, 2026
        </p>

        <div className="prose prose-lg max-w-none text-foreground/70 leading-relaxed space-y-6">
          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">What are cookies?</h2>
          <p>
            Cookies are small text files placed on your device to store data that can be used by web servers. We use
            cookies for technical, functional, analytical, and marketing purposes to improve your experience on our
            website.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Types of cookies we use</h2>

          <h3 className="text-lg font-bold text-foreground mt-6 mb-2">Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function and cannot be switched off. They are usually set in
            response to actions you make, such as setting your privacy preferences, logging in, or filling in forms.
          </p>

          <h3 className="text-lg font-bold text-foreground mt-6 mb-2">Analytics Cookies</h3>
          <p>
            We use Plausible Analytics, a privacy-friendly analytics tool that does not use cookies or collect personal
            data. No tracking cookies are set for analytics purposes.
          </p>

          <h3 className="text-lg font-bold text-foreground mt-6 mb-2">Third-Party Cookies</h3>
          <p>
            We may embed content from third parties (e.g., social media sharing buttons). These third parties may set
            their own cookies. We do not control these cookies and encourage you to check the third party's website for
            more information.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Managing cookies</h2>
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your
            device and set most browsers to prevent them from being placed. If you do this, you may have to manually
            adjust some preferences every time you visit a site, and some services and functionalities may not work.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Contact Information</h2>
          <p>
            Questions about the Cookie Policy should be sent to: support@bakyson.com
          </p>
        </div>
      </div>
    </section>
  );
}
