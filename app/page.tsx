import { resumeData } from "@/data/resume";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import RetroGrid from "@/components/magicui/retro-grid";
import { TrustBar } from "@/components/TrustBar";
import { ValueProposition } from "@/components/commercial/ValueProposition";
import { ClientResults } from "@/components/commercial/ClientResults";
import { ServicePackages } from "@/components/commercial/ServicePackages";
import { CapabilitiesMatrix } from "@/components/commercial/CapabilitiesMatrix";
import { ResourcesHub } from "@/components/commercial/ResourcesHub";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center min-h-screen overflow-hidden bg-background transition-colors duration-300">
      
      {/* Magic UI Background */}
      <RetroGrid />

      {/* Section 1: Hero - Expert Positioning */}
      <section className="relative z-10 w-full pt-20 pb-16 md:pt-32 md:pb-24 px-4 flex flex-col items-center text-center max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          接受咨询与产学研合作
        </div>

        <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground leading-tight">
          工程数字化 <br />
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            智能建造先锋
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-muted-foreground text-xl md:text-2xl font-light leading-relaxed">
          {resumeData.personalInfo.subTagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Link
            href="/contact"
            className="group px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-bold text-lg transition-all flex items-center gap-2 shadow-xl shadow-primary/20 hover:scale-105"
          >
            预约咨询
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/projects"
            className="px-8 py-4 bg-background hover:bg-accent text-foreground rounded-full font-bold text-lg transition-all border border-border hover:border-primary/50 shadow-lg flex items-center gap-2"
          >
            查看解决方案
            <ChevronRight className="w-4 h-4 opacity-50" />
          </Link>
        </div>
      </section>

      {/* Section 2: Trust Bar */}
      <TrustBar />

      {/* Section 3: Client Results (Trust Endorsement) */}
      <ClientResults />

      {/* Section 4: Value Proposition Canvas */}
      <ValueProposition />

      {/* Section 5: Capabilities Matrix (Tech Stack) */}
      <CapabilitiesMatrix />

      {/* Section 6: Service Packages (Engagement Models) */}
      <ServicePackages />

      {/* Section 7: Resources Hub (Lead Magnet) */}
      <ResourcesHub />

    </div>
  );
}
