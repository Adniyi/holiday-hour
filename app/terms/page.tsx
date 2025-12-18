import Link from 'next/link';
import { Clock } from 'lucide-react';

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Terms of Service</h1>
          <p className="text-sm text-slate-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-slate-700">
                By accessing and using HolidyHours, you accept and agree to be bound by
                these Terms of Service. If you do not agree to these terms, please do
                not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                2. Service Description
              </h2>
              <p className="text-slate-700">
                HolidyHours provides a platform for small businesses to create and share
                holiday hours pages. We offer a one-time seasonal payment of $9 for
                access to our service during the holiday season.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                3. Payment and Refunds
              </h2>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Payment is processed securely through Paystack</li>
                <li>One-time payment of $9 is required to activate your page</li>
                <li>
                  7-day money-back guarantee: If you're not satisfied within 7 days of
                  purchase, contact us for a full refund
                </li>
                <li>
                  Refunds after 7 days will be considered on a case-by-case basis
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                4. User Responsibilities
              </h2>
              <p className="text-slate-700">You agree to:</p>
              <ul className="list-disc pl-6 text-slate-700 space-y-1">
                <li>Provide accurate business information</li>
                <li>Keep your contact email secure</li>
                <li>Not use the service for illegal or harmful purposes</li>
                <li>Not attempt to hack or compromise our systems</li>
                <li>Not resell or redistribute our service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                5. Content Ownership
              </h2>
              <p className="text-slate-700">
                You retain ownership of all content you create on HolidyHours. We have
                the right to display your public-facing holiday hours page as part of
                providing the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                6. Service Availability
              </h2>
              <p className="text-slate-700">
                We strive for 99.5% uptime but cannot guarantee uninterrupted service. We
                are not liable for any losses resulting from service interruptions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                7. Limitation of Liability
              </h2>
              <p className="text-slate-700">
                HolidyHours is provided "as is" without warranties. We are not liable
                for any indirect, incidental, or consequential damages arising from your
                use of the service. Our maximum liability is limited to the amount you
                paid for the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                8. Account Termination
              </h2>
              <p className="text-slate-700">
                We reserve the right to suspend or terminate accounts that violate these
                terms or engage in abusive behavior.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                9. Changes to Terms
              </h2>
              <p className="text-slate-700">
                We may update these terms from time to time. Continued use of the service
                after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                10. Contact Information
              </h2>
              <p className="text-slate-700">
                For questions about these Terms of Service:
              </p>
              <p className="text-slate-700">
                Email:{' '}
                <a
                  href="mailto:support@holidyhours.com"
                  className="text-blue-600 hover:underline"
                >
                  support@holidyhours.com
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
