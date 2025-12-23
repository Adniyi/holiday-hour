import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Clock,
  Share2,
  Smartphone,
  Zap,
  CheckCircle,
  DollarSign,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Clock className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-900">
              HolidyHours
            </span>
          </div>
          <Link href="/create">
            <Button size="sm" variant="outline">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Beautiful holiday hours pages for small businesses{" "}
            <span className="text-blue-600">in minutes</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Stop answering the same questions. Create a stunning, shareable page
            that shows your holiday hours at a glance. One price, no
            subscription.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/create">
              <Button size="lg" className="text-lg px-8 py-6">
                Create Your Page
                <Zap className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2 text-slate-600">
              <DollarSign className="h-5 w-5" />
              <span className="font-semibold">Only $9 for the season</span>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            7-day money-back guarantee • No subscription • GDPR compliant
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-2 hover:border-blue-500 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Fast Setup</CardTitle>
              <CardDescription>
                Create your page in under 3 minutes. No technical skills needed.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-500 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Share2 className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Easy Sharing</CardTitle>
              <CardDescription>
                Share via link, social media, or print. Perfect for storefronts.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-500 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Mobile First</CardTitle>
              <CardDescription>
                Looks perfect on any device. Your customers are on mobile.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-slate-600">
              All the features to communicate your holiday hours effectively
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Custom holiday hours for any day",
              "Pre-loaded major holidays",
              "Regular business hours display",
              "Share via link, Facebook, Twitter",
              "Download as image or PDF",
              "Easy editing with magic link",
              "View analytics and traffic sources",
              "Mobile-responsive design",
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <Card className="border-4 border-blue-600">
            <CardHeader>
              <CardTitle className="text-3xl">Seasonal Pass</CardTitle>
              <div className="text-5xl font-bold text-blue-600 my-4">$9</div>
              <CardDescription className="text-base">
                One-time payment for the entire holiday season
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-left mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Unlimited edits all season
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  All sharing features included
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Analytics dashboard
                </li>
              </ul>
              <Link href="/create">
                <Button size="lg" className="w-full">
                  Get Started Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to simplify your holiday hours?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join local businesses who are already saving time and reducing
            customer confusion this holiday season.
          </p>
          <Link href="/create">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Create Your Page Now
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
            <div className="mb-4 md:mb-0">
              <span className="font-semibold text-white">HolidyHours</span> ©{" "}
              {new Date().getFullYear()} • Making holiday hours simple
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
