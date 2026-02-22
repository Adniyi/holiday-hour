import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HolidyHours - Beautiful Holiday Hours Pages for Small Businesses",
  description:
    "Create stunning, shareable holiday hours pages in minutes. Perfect for local retailers, restaurants, and service businesses. One-time $9 seasonal payment.",
  openGraph: {
    title: "HolidyHours - Holiday Hours Made Simple",
    description:
      "Create beautiful holiday hours pages for your business in minutes",
    images: [
      {
        url: "./image/holiday-hour.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HolidyHours - Holiday Hours Made Simple",
    description:
      "Create beautiful holiday hours pages for your business in minutes",
    images: [
      {
        url: "./image/holiday-hour.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
