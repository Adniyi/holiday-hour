import Link from 'next/link';
import { Clock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Clock className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-900">HolidyHours</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
          <p className="text-sm text-slate-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                1. Information We Collect
              </h2>
              <p className="text-slate-700">
                We collect information you provide directly to us when creating your
                holiday hours page, including:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-1">
                <li>Business name and contact information (email, phone, address)</li>
                <li>Holiday schedules and business hours</li>
                <li>Payment information (processed securely through Paystack)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                2. How We Use Your Information
              </h2>
              <p className="text-slate-700">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-slate-700 space-y-1">
                <li>Create and maintain your holiday hours page</li>
                <li>Send you magic links for editing your page</li>
                <li>Process payments and send receipts</li>
                <li>Provide customer support</li>
                <li>Improve our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                3. Data Storage and Security
              </h2>
              <p className="text-slate-700">
                Your data is stored securely using industry-standard encryption. We use
                Supabase (PostgreSQL) for data storage and implement row-level security
                policies to protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                4. Data Sharing
              </h2>
              <p className="text-slate-700">
                We do not sell or share your personal information with third parties
                except as necessary to provide our services (e.g., payment processing
                through Paystack) or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                5. Your Rights (GDPR Compliance)
              </h2>
              <p className="text-slate-700">You have the right to:</p>
              <ul className="list-disc pl-6 text-slate-700 space-y-1">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                6. Cookies and Analytics
              </h2>
              <p className="text-slate-700">
                We use basic analytics to track page views and traffic sources to help
                you understand how customers find your page. We do not use third-party
                advertising cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                7. Contact Us
              </h2>
              <p className="text-slate-700">
                If you have questions about this Privacy Policy or want to exercise your
                rights, please contact us at:
              </p>
              <p className="text-slate-700">
                Email:{' '}
                <a
                  href="mailto:privacy@holidyhours.com"
                  className="text-blue-600 hover:underline"
                >
                  privacy@holidyhours.com
                </a>
              </p>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t">
            <Link
              href="/"
              className="text-blue-600 hover:underline font-medium"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
