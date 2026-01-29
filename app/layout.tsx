import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <footer className="bg-muted/50 border-t border-border py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Liu Bo. All rights reserved.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}