import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Liu Bo | Intelligent Construction & AI Expert",
  description: "Portfolio of Liu Bo, Ph.D. Candidate at Tongji University and former CIO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} Liu Bo. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}