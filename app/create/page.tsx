'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StepIndicator } from '@/components/wizard/step-indicator';
import { Step1BusinessInfo } from '@/components/wizard/step1-business-info';
import { Step2HolidaySelection } from '@/components/wizard/step2-holiday-selection';
import { Step3HoursConfig } from '@/components/wizard/step3-hours-config';
import { Step4PreviewPayment } from '@/components/wizard/step4-preview-payment';
import { api, Holiday } from '@/lib/api';
import { Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  { number: 1, title: 'Business Info' },
  { number: 2, title: 'Select Holidays' },
  { number: 3, title: 'Configure Hours' },
  { number: 4, title: 'Preview & Pay' },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  type: string;
  holidays: Holiday[];
}

export default function CreatePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    type: '',
    holidays: [],
  });

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== '' && formData.email.trim() !== '';
      case 2:
        return formData.holidays.length > 0;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePayment = async () => {
    try {
      const business = await api.businesses.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        address: formData.address || undefined,
        type: formData.type || undefined,
      });

      const page = await api.pages.create({
        business_id: business.id,
        holidays: formData.holidays,
        regular_hours: {},
      });

      await api.analytics.incrementView(page.id, 'direct');

      const paymentData = await api.payment.initiate(
        business.id,
        formData.email
      );

      if (paymentData.authorization_url) {
        window.location.href = paymentData.authorization_url;
      } else {
        throw new Error('Payment initialization failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Clock className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-900">
              HolidyHours
            </span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <StepIndicator currentStep={currentStep} steps={STEPS} />

          <Card>
            <CardContent className="pt-6">
              {currentStep === 1 && (
                <Step1BusinessInfo
                  data={{
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    type: formData.type,
                  }}
                  onChange={(data) =>
                    setFormData((prev) => ({ ...prev, ...data }))
                  }
                />
              )}

              {currentStep === 2 && (
                <Step2HolidaySelection
                  selectedHolidays={formData.holidays}
                  onChange={(holidays) =>
                    setFormData((prev) => ({ ...prev, holidays }))
                  }
                />
              )}

              {currentStep === 3 && (
                <Step3HoursConfig
                  holidays={formData.holidays}
                  onChange={(holidays) =>
                    setFormData((prev) => ({ ...prev, holidays }))
                  }
                />
              )}

              {currentStep === 4 && (
                <Step4PreviewPayment
                  businessName={formData.name}
                  email={formData.email}
                  phone={formData.phone}
                  address={formData.address}
                  holidays={formData.holidays}
                  onBack={handleBack}
                  onPayment={handlePayment}
                />
              )}

              {currentStep < 4 && (
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                  >
                    Back
                  </Button>
                  <Button onClick={handleNext} disabled={!canProceed()}>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="text-center mt-6 text-sm text-slate-500">
            <p>
              Questions? Need help? Email us at{' '}
              <a
                href="mailto:support@holidyhours.com"
                className="text-blue-600 hover:underline"
              >
                support@holidyhours.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
