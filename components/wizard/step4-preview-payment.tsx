'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft, CreditCard } from 'lucide-react';
import { Holiday } from '@/lib/api';
import { formatDate, getHolidayStatus, sortHolidaysByDate } from '@/lib/utils-holidays';
import { PAYMENT_AMOUNT } from '@/lib/constants';

interface Step4Props {
  businessName: string;
  email: string;
  phone?: string;
  address?: string;
  holidays: Holiday[];
  onBack: () => void;
  onPayment: () => Promise<void>;
}

export function Step4PreviewPayment({
  businessName,
  email,
  phone,
  address,
  holidays,
  onBack,
  onPayment,
}: Step4Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await onPayment();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  const sortedHolidays = sortHolidaysByDate(holidays);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Preview your page
        </h2>
        <p className="text-slate-600">
          Review your holiday hours page before proceeding to payment
        </p>
      </div>

      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {businessName}
            </h1>
            {address && <p className="text-slate-600">{address}</p>}
            {phone && <p className="text-slate-600">{phone}</p>}
            {email && (
              <p className="text-sm text-slate-500 mt-2">{email}</p>
            )}
          </div>

          <div className="border-t border-b py-6 space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Holiday Hours {new Date().getFullYear()}
            </h2>
            {sortedHolidays.map((holiday) => {
              const status = getHolidayStatus(holiday);
              return (
                <div
                  key={holiday.name}
                  className="flex justify-between items-start py-3 border-b last:border-0"
                >
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">
                      {holiday.name}
                    </div>
                    <div className="text-sm text-slate-500">
                      {formatDate(holiday.date)}
                    </div>
                    {holiday.notes && (
                      <div className="text-sm text-slate-600 mt-1 italic">
                        {holiday.notes}
                      </div>
                    )}
                  </div>
                  <div className={`text-right ${status.color} font-medium`}>
                    <div className="flex items-center space-x-1">
                      <span>{status.icon}</span>
                      <span>{status.text}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center text-sm text-slate-500">
            This is a preview. Your page will be shareable after payment.
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="bg-slate-50 rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-slate-900">Seasonal Pass</h3>
            <p className="text-sm text-slate-600">
              One-time payment for the entire season
            </p>
          </div>
          <div className="text-3xl font-bold text-blue-600">
            ${PAYMENT_AMOUNT}
          </div>
        </div>

        <ul className="text-sm text-slate-600 space-y-1">
          <li>✓ Shareable holiday hours page</li>
          <li>✓ Unlimited edits via magic link</li>
          <li>✓ Basic analytics dashboard</li>
          <li>✓ 7-day money-back guarantee</li>
        </ul>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Edit
          </Button>
          <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="flex-1"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay ${PAYMENT_AMOUNT}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
