import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactFAB } from "@/components/ContactFAB";
import { resumeData } from "@/data/resume";

const SITE_URL: string = "https://liubo.xin";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${resumeData.personalInfo.name} | Digital Construction Intelligence Pioneer`,
    template: `%s | ${resumeData.personalInfo.name}`
  },
  description: resumeData.personalInfo.bio,
  alternates: {
    canonical: SITE_URL,
  },
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
    locale: "zh_CN",
    url: SITE_URL,
    title: `${resumeData.personalInfo.name} - ${resumeData.personalInfo.tagline}`,
    description: resumeData.personalInfo.subTagline,
    siteName: `${resumeData.personalInfo.name} Portfolio`,
    images: [
      {
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
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
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`font-sans bg-background text-foreground antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <ContactFAB />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}