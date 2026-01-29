import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { resumeData } from "@/data/resume";

export const metadata: Metadata = {
  metadataBase: new URL("https://liubo.tech"),
  title: {
    default: `${resumeData.personalInfo.name} | Digital Construction Intelligence Pioneer`,
    template: `%s | ${resumeData.personalInfo.name}`
  },
  description: resumeData.personalInfo.bio,
  keywords: [
    "Intelligent Construction", 
    "Computer Vision", 
    "AI in Construction", 
    "Digital Twin", 
    "Construction Safety", 
    "Liu Bo", 
    "Tongji University", 
    "CIO",
    "Smart Site",
    "Engineering Digital Transformation",
    "智能建造",
    "机器视觉",
    "智慧工地",
    "数字化转型",
    "工程数字化"
  ],
  authors: [{ name: resumeData.personalInfo.name }],
  creator: resumeData.personalInfo.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://liubo.tech",
    title: `${resumeData.personalInfo.name} - ${resumeData.personalInfo.tagline}`,
    description: resumeData.personalInfo.subTagline,
    siteName: `${resumeData.personalInfo.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${resumeData.personalInfo.name} - Intelligent Construction Expert`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${resumeData.personalInfo.name} - ${resumeData.personalInfo.tagline}`,
    description: resumeData.personalInfo.subTagline,
    images: ["/og-image.png"],
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
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans bg-background text-foreground antialiased min-h-screen flex flex-col`}>
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