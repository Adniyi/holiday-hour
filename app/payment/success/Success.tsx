"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Loader2, ExternalLink, Mail } from "lucide-react";
import { api } from "@/lib/api";

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

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

  const verifyPayment = useCallback(async () => {
    try {
      const result = await api.payment.verify(reference!);
      setBusinessId(result.business_id);
      setEmail(result.email);
    } catch (error) {
      console.error("Payment verification failed:", error);
    } finally {
      setLoading(false);
    }
  }, [reference]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="ml-3">Verifying payment...</p>
      </div>
    );
  }

  const pageUrl = businessId
    ? `${process.env.NEXT_PUBLIC_APP_URL}/b/${businessId}`
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="pt-8 text-center">
          <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-4" />

          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>

          {email && (
            <p className="mb-6">
              We've sent a magic link to <strong>{email}</strong>
            </p>
          )}

          {pageUrl && (
            <a href={pageUrl} target="_blank">
              <Button className="w-full mb-3">View Your Page</Button>
            </a>
          )}

          <Link href="/">
            <Button variant="outline" className="w-full">
              Back to Homepage
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
