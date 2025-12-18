'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Clock,
  Loader2,
  Save,
  Eye,
  TrendingUp,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { api, Business, Page, Analytics, Holiday } from '@/lib/api';
import { formatDate } from '@/lib/utils-holidays';
import { toast } from 'sonner';

export default function DashboardPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [page, setPage] = useState<Page | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    loadData();
  }, [params.id, token]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!token) {
        setError('Authentication token required. Please use the magic link sent to your email.');
        return;
      }

      const [businessData, pageData] = await Promise.all([
        api.businesses.get(params.id),
        api.pages.getByBusinessId(params.id),
      ]);

      setBusiness(businessData);
      setPage(pageData);
      setHolidays(pageData.holidays || []);

      try {
        const analyticsData = await api.analytics.get(pageData.id);
        setAnalytics(analyticsData);
      } catch (err) {
        console.log('Analytics not available');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!page || !token) return;

    try {
      setSaving(true);
      await api.pages.update(
        page.id,
        {
          holidays,
        },
        token
      );
      toast.success('Changes saved successfully!');
      await loadData();
    } catch (err) {
      toast.error('Failed to save changes');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleHolidayChange = (
    name: string,
    field: keyof Holiday,
    value: string
  ) => {
    setHolidays(
      holidays.map((h) => (h.name === name ? { ...h, [field]: value } : h))
    );
  };

  const handleStatusChange = (name: string, status: Holiday['status']) => {
    setHolidays(
      holidays.map((h) =>
        h.name === name
          ? {
              ...h,
              status,
              open_time: status === 'special' ? h.open_time || '09:00' : undefined,
              close_time: status === 'special' ? h.close_time || '17:00' : undefined,
            }
          : h
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="max-w-md">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="mt-4 text-center">
            <Link href="/">
              <Button>Go to Homepage</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const pageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/b/${params.id}`;

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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {business?.name} Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <a
                href={pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center space-x-1"
              >
                <span>View Public Page</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Total Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">
                  {analytics?.views || 0}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Holidays Configured
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">
                  {holidays.length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Payment Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">
                  {business?.payment_status === 'paid' ? (
                    <span className="text-green-600">Paid</span>
                  ) : (
                    <span className="text-yellow-600">Pending</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Edit Holiday Hours</CardTitle>
              <CardDescription>
                Update your holiday hours and click save to publish changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {holidays.map((holiday) => (
                  <div key={holiday.name} className="border rounded-lg p-4 space-y-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">{holiday.name}</h3>
                      <p className="text-sm text-slate-500">{formatDate(holiday.date)}</p>
                    </div>

                    <RadioGroup
                      value={holiday.status}
                      onValueChange={(value) =>
                        handleStatusChange(holiday.name, value as Holiday['status'])
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="closed"
                          id={`${holiday.name}-closed`}
                        />
                        <Label
                          htmlFor={`${holiday.name}-closed`}
                          className="font-normal"
                        >
                          Closed all day
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="special"
                          id={`${holiday.name}-special`}
                        />
                        <Label
                          htmlFor={`${holiday.name}-special`}
                          className="font-normal"
                        >
                          Special hours
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="normal"
                          id={`${holiday.name}-normal`}
                        />
                        <Label
                          htmlFor={`${holiday.name}-normal`}
                          className="font-normal"
                        >
                          Normal hours
                        </Label>
                      </div>
                    </RadioGroup>

                    {holiday.status === 'special' && (
                      <div className="grid grid-cols-2 gap-4 pl-6">
                        <div>
                          <Label htmlFor={`${holiday.name}-open`}>Open Time</Label>
                          <Input
                            id={`${holiday.name}-open`}
                            type="time"
                            value={holiday.open_time || ''}
                            onChange={(e) =>
                              handleHolidayChange(
                                holiday.name,
                                'open_time',
                                e.target.value
                              )
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`${holiday.name}-close`}>Close Time</Label>
                          <Input
                            id={`${holiday.name}-close`}
                            type="time"
                            value={holiday.close_time || ''}
                            onChange={(e) =>
                              handleHolidayChange(
                                holiday.name,
                                'close_time',
                                e.target.value
                              )
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor={`${holiday.name}-notes`}>Notes (optional)</Label>
                      <Textarea
                        id={`${holiday.name}-notes`}
                        value={holiday.notes || ''}
                        onChange={(e) =>
                          handleHolidayChange(holiday.name, 'notes', e.target.value)
                        }
                        placeholder="e.g., Limited menu available"
                        rows={2}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t flex justify-end">
                <Button onClick={handleSave} disabled={saving} size="lg">
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
