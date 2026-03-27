import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { BottomNav } from "@/components/BottomNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AuraFinance | Sovereign Wealth Tracking",
  description: "High-performance, premium personal budget tracking for the elite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-background text-foreground min-h-screen`}>
        <div className="flex h-full min-h-screen">
          <Sidebar />
          <main className="flex-1 w-full md:pl-64 overflow-x-hidden min-h-screen">
            <div className="max-w-[1600px] mx-auto p-6 md:p-12">
              {children}
            </div>
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
