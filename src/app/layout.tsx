import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OTPModal } from "@/components/shared/OTPModal";
import { AIChatbot } from "@/components/chatbot/AIChatbot";
import { FirstVisitPopup } from "@/components/shared/FirstVisitPopup";

export const metadata: Metadata = {
  title: "MehndiWalaa — India's Premier Mehndi Artist Discovery & Booking Platform",
  description: "Find and book verified mehndi artists near you. Browse portfolios, compare prices, and book trusted henna artists for weddings, festivals, and special occasions across India.",
  keywords: ["mehndi artist", "henna artist", "bridal mehndi", "wedding mehndi", "mehndi booking", "mehndi near me", "Arabic mehndi", "Rajasthani mehndi"],
  openGraph: {
    title: "MehndiWalaa — Find & Book Verified Mehndi Artists",
    description: "India's #1 mehndi artist discovery platform. Verified artists, transparent pricing, trusted bookings.",
    type: "website",
    locale: "en_IN",
    siteName: "MehndiWalaa",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" />
        <meta name="theme-color" content="#4B0002" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased w-full overflow-x-hidden bg-cream-50">
        <AuthProvider>
          <div className="flex flex-col min-h-screen overflow-x-hidden w-full relative">
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </div>
          <OTPModal />
          <AIChatbot />
          <FirstVisitPopup />
        </AuthProvider>
      </body>
    </html>
  );
}
