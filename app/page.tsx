import { resumeData } from "@/data/resume";
import Link from "next/link";
import { ArrowRight, Brain, Terminal, Activity, ChevronRight, Lightbulb } from "lucide-react";
import RetroGrid from "@/components/magicui/retro-grid";
import { TrustBar } from "@/components/TrustBar";
import { TechRadar } from "@/components/TechRadar";

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
          Available for Consulting & Research Collaboration
        </div>

        <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground leading-tight">
          Empowering Construction with <br />
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Data Intelligence & AI
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-muted-foreground text-xl md:text-2xl font-light leading-relaxed">
          {resumeData.personalInfo.subTagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Link
            href="/projects"
            className="group px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-bold text-lg transition-all flex items-center gap-2 shadow-xl shadow-primary/20 hover:scale-105"
          >
            Explore Solutions
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 bg-background hover:bg-accent text-foreground rounded-full font-bold text-lg transition-all border border-border hover:border-primary/50 shadow-lg flex items-center gap-2"
          >
            Book a Consultation
            <ChevronRight className="w-4 h-4 opacity-50" />
          </Link>
        </div>
      </section>

      {/* Section 2: Trust Bar */}
      <TrustBar />

      {/* Section 3: Value Proposition (Tech Radar + Services) */}
      <section className="relative z-10 w-full py-24 px-4 bg-gradient-to-b from-transparent to-muted/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Bridging the Gap Between <br/>
              <span className="text-primary">Research & Reality</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Most AI solutions fail in the harsh environment of construction sites. 
              My dual background as a <strong>Ph.D. Researcher</strong> and <strong>Enterprise CIO</strong> ensures solutions are not just theoretically sound, but battle-tested for industrial deployment.
            </p>
            
            <div className="grid gap-6">
              {resumeData.services.map((service, idx) => {
                 const icons = { Lightbulb, Terminal, Brain };
                 // @ts-ignore
                 const Icon = icons[service.icon] || Activity;
                 
                 return (
                   <div key={idx} className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                     <div className="mt-1">
                       <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                         <Icon className="w-5 h-5" />
                       </div>
                     </div>
                     <div>
                       <h3 className="font-bold text-foreground text-lg">{service.title}</h3>
                       <p className="text-muted-foreground text-sm leading-relaxed mt-1">{service.desc}</p>
                     </div>
                   </div>
                 )
              })}
            </div>
          </div>

          {/* Right: Visualization */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
             <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-30"></div>
             <TechRadar />
          </div>

        </div>
      </section>
    </div>
  );
}

