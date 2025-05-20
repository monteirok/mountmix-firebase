import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
// import { Analytics } from "@genkit-ai/next/plugin"; // Removed due to module not found error

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rockies Libations | Craft Cocktail Catering',
  description: 'Premium craft-cocktail catering service in Canmore, AB, inspired by the Canadian Rockies.',
  keywords: ['cocktail catering', 'Canmore', 'Alberta', 'mixology', 'events', 'Canadian Rockies'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <Analytics /> */} {/* Removed due to module not found error */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
