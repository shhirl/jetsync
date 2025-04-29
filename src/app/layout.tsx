import type {Metadata} from 'next';
import {GeistSans} from 'geist/font/sans';
// Removed GeistMono import as the package is not installed
// import {GeistMono} from 'geist/font/mono';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

export const metadata: Metadata = {
  title: 'JetLagEase',
  description: 'Personalized Jet Lag Recovery Assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Removed GeistMono variable class */}
      <body className={`${GeistSans.variable} font-sans antialiased`}>
        {children}
        <Toaster /> {/* Add Toaster component here */}
      </body>
    </html>
  );
}
