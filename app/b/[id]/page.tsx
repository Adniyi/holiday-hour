import { Metadata } from "next";
import Link from "next/link";
import { Clock, MapPin, Phone, Mail } from "lucide-react";
import { ShareButtons } from "@/components/share-buttons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@supabase/supabase-js";
import {
  formatDate,
  getHolidayStatus,
  sortHolidaysByDate,
} from "@/lib/utils-holidays";

async function getBusinessData(id: string) {
  // Initialize the client inside the async function
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (businessError || !business) {
    return null;
  }

  const { data: page, error: pageError } = await supabase
    .from("pages")
    .select("*")
    .eq("business_id", id)
    .maybeSingle();

  if (pageError || !page) {
    return null;
  }

  return { business, page };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // const data = await getBusinessData(params.id);
  const { id } = await params; // Unwrapping the promise
  const data = await getBusinessData(id);

  if (!data) {
    return {
      title: "Business Not Found - HolidyHours",
    };
  }

  return {
    title: `${data.business.name} - Holiday Hours | HolidyHours`,
    description: `View ${data.business.name}'s holiday hours and special schedules for the season.`,
  };
}

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // const data = await getBusinessData(params.id);
  const { id } = await params; // Unwrapping the promise
  const data = await getBusinessData(id);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Business Not Found
          </h1>
          <p className="text-slate-600 mb-6">
            The page you're looking for doesn't exist.
          </p>
          <Link href="/">
            <Button>Go to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { business, page } = data;
  const holidays = sortHolidaysByDate(page.holidays || []);
  const pageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/b/${business.id}`;
  const isPaid = business.payment_status === "paid";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 print:bg-white">
      <nav className="border-b bg-white/80 backdrop-blur-sm print:hidden">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Clock className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-900">
              HolidyHours
            </span>
          </Link>
          <ShareButtons url={pageUrl} businessName={business.name} />
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {!isPaid && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-6 print:hidden">
              <p className="text-yellow-800 font-medium text-center">
                Preview Mode - Complete payment to remove this notice and enable
                all features
              </p>
            </div>
          )}

          <Card className="shadow-lg">
            <CardContent className="pt-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                  {business.name}
                </h1>

                <div className="flex flex-col items-center space-y-2 text-slate-600">
                  {business.address && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{business.address}</span>
                    </div>
                  )}
                  {business.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <a
                        href={`tel:${business.phone}`}
                        className="hover:text-blue-600">
                        {business.phone}
                      </a>
                    </div>
                  )}
                  {business.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <a
                        href={`mailto:${business.email}`}
                        className="hover:text-blue-600">
                        {business.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-b py-6 space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  Holiday Hours {new Date().getFullYear()}
                </h2>

                {holidays.length === 0 ? (
                  <p className="text-center text-slate-500 py-8">
                    No holidays configured yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {holidays.map((holiday) => {
                      const status = getHolidayStatus(holiday);
                      return (
                        <div
                          key={holiday.name}
                          className="flex flex-col md:flex-row md:justify-between md:items-start py-4 border-b last:border-0">
                          <div className="flex-1 mb-2 md:mb-0">
                            <div className="font-semibold text-slate-900 text-lg">
                              {holiday.name}
                            </div>
                            <div className="text-slate-600">
                              {formatDate(holiday.date)}
                            </div>
                            {holiday.notes && (
                              <div className="text-sm text-slate-600 mt-2 italic">
                                {holiday.notes}
                              </div>
                            )}
                          </div>
                          <div
                            className={`text-right ${status.color} font-semibold text-lg`}>
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{status.icon}</span>
                              <span>{status.text}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="mt-8 text-center text-sm text-slate-500">
                <p>
                  Last updated: {new Date(page.updated_at).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center print:hidden">
            <p className="text-sm text-slate-600 mb-4">
              Want to create your own holiday hours page?
            </p>
            <Link href="/create">
              <Button>Create Your Page</Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="border-t bg-white py-6 print:hidden">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600">
          Powered by{" "}
          <Link
            href="/"
            className="text-blue-600 hover:underline font-semibold">
            HolidyHours
          </Link>
        </div>
      </footer>
    </div>
  );
}
