'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Loader2, ExternalLink, Mail } from 'lucide-react';
import { api } from '@/lib/api';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const [loading, setLoading] = useState(true);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (reference) {
      verifyPayment();
    } else {
      setLoading(false);
    }
  }, [reference]);

  const verifyPayment = async () => {
    try {
      const result = await api.payment.verify(reference!);
      setBusinessId(result.business_id);
      setEmail(result.email);
    } catch (error) {
      console.error('Payment verification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Verifying payment...</p>
        </div>
      </div>
    );
  }

  const pageUrl = businessId ? `${process.env.NEXT_PUBLIC_APP_URL}/b/${businessId}` : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="pt-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Payment Successful!
            </h1>

            <p className="text-lg text-slate-600 mb-8">
              Your holiday hours page is now live and ready to share.
            </p>

            {email && (
              <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
                <div className="flex items-start space-x-3">
                  <Mail className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      Check Your Email
                    </h3>
                    <p className="text-sm text-slate-600">
                      We've sent a magic link to <strong>{email}</strong> that you can
                      use to edit your page anytime. The link is valid for 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {pageUrl && (
                <a href={pageUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full">
                    View Your Page
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              )}
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full">
                  Back to Homepage
                </Button>
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t text-sm text-slate-600">
              <p className="mb-2">Need help or have questions?</p>
              <a
                href="mailto:support@holidyhours.com"
                className="text-blue-600 hover:underline"
              >
                support@holidyhours.com
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
