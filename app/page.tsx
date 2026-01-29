import { resumeData } from "@/data/resume";
import Link from "next/link";
import { ArrowRight, Terminal, Brain, Building2 } from "lucide-react";
import RetroGrid from "@/components/magicui/retro-grid";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 overflow-hidden bg-background transition-colors duration-300">
      
      {/* Magic UI Background */}
      <RetroGrid />

      {/* Hero Section */}
      <div className="relative z-10 max-w-4xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary blur-3xl opacity-20 rounded-full"></div>
          <img
            src={resumeData.personalInfo.avatarUrl}
            alt={resumeData.personalInfo.name}
            className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-border shadow-2xl mx-auto object-cover bg-muted"
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {resumeData.personalInfo.name}
          </h1>
          <p className="text-xl md:text-2xl text-primary font-medium">
            {resumeData.personalInfo.title}
          </p>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Bridging the gap between <span className="text-foreground">Academic Research</span> and <span className="text-foreground">Industrial Application</span> in Intelligent Construction.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link
            href="/projects"
            className="group px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full font-semibold transition-all border border-border shadow-lg"
          >
            About Me
          </Link>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="relative z-10 max-w-6xl w-full mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {[
          {
            icon: Brain,
            title: "AI & Deep Learning",
            desc: "Expertise in Computer Vision, Segmentation, and Object Detection algorithms.",
          },
          {
            icon: Building2,
            title: "Intelligent Construction",
            desc: "Pioneering safety and progress monitoring systems for modern construction sites.",
          },
          {
            icon: Terminal,
            title: "Product Development",
            desc: "Full-cycle experience from 0-to-1 product strategy to large-scale deployment.",
          },
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-card/80 backdrop-blur-md border border-border hover:border-primary/50 transition-colors shadow-xl">
            <item.icon className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold text-card-foreground mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
