import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TheChief.quest - Chief of Staff Careers | UK, Europe & Middle East",
  description: "The authority on Chief of Staff careers. Find roles, salaries, and expert guidance across UK, Europe & Middle East. Join 50,000+ professionals advancing their careers.",
  keywords: "chief of staff, executive assistant, CoS jobs, chief of staff salary, chief of staff recruitment",
  authors: [{ name: "TheChief.quest" }],
  openGraph: {
    title: "TheChief.quest - Chief of Staff Careers",
    description: "The authority on Chief of Staff careers across UK, Europe & Middle East",
    url: "https://thechief.quest",
    siteName: "TheChief.quest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheChief.quest - Chief of Staff Careers",
    description: "The authority on Chief of Staff careers across UK, Europe & Middle East",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
