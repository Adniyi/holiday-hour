'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle, RefreshCw, Home } from 'lucide-react';

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="pt-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Payment Failed
            </h1>

            <p className="text-lg text-slate-600 mb-8">
              We couldn't process your payment. This could be due to insufficient
              funds, an incorrect card number, or your card being declined.
            </p>

            <div className="bg-slate-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-slate-900 mb-3">What to try:</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Check that your card details are correct</li>
                <li>Ensure you have sufficient funds</li>
                <li>Try a different payment method</li>
                <li>Contact your bank if the issue persists</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link href="/create">
                <Button size="lg" className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Homepage
                </Button>
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t text-sm text-slate-600">
              <p className="mb-2">Need help?</p>
              <a
                href="mailto:support@holidyhours.com"
                className="text-blue-600 hover:underline"
              >
                Contact Support
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
