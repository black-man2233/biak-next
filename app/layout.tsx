import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BIAK — Brønderslev International Apostolsk Kirke",
  description:
    "Experience a living Christian fellowship committed to expressing God's power and love. Join us every Sunday at 10:30 AM.",
  keywords: ["church", "BIAK", "Brønderslev", "Christian", "apostolic", "kirke"],
  openGraph: {
    title: "BIAK — Brønderslev International Apostolsk Kirke",
    description: "To Reveal God's Love & Demonstrate His Power",
    url: "https://biak.dk",
    siteName: "BIAK Church",
    locale: "da_DK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="da" className="scroll-smooth">
      <body className={`${inter.variable} antialiased bg-slate-950 text-white`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
