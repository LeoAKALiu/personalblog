import { resumeData } from "@/data/resume";
import Link from "next/link";
import { ArrowRight, Terminal, Brain, Building2 } from "lucide-react";
import RetroGrid from "@/components/magicui/retro-grid";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 overflow-hidden">
      
      {/* Magic UI Background */}
      <RetroGrid />

      {/* Hero Section */}
      <div className="relative z-10 max-w-4xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full"></div>
          <img
            src={resumeData.personalInfo.avatarUrl}
            alt={resumeData.personalInfo.name}
            className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-slate-800 shadow-2xl mx-auto object-cover bg-slate-800"
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            {resumeData.personalInfo.name}
          </h1>
          <p className="text-xl md:text-2xl text-blue-400 font-medium">
            {resumeData.personalInfo.title}
          </p>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg">
            Bridging the gap between <span className="text-slate-200">Academic Research</span> and <span className="text-slate-200">Industrial Application</span> in Intelligent Construction.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link
            href="/projects"
            className="group px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
          >
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-semibold transition-all border border-slate-700 shadow-lg"
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
          <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-blue-500/50 transition-colors shadow-xl">
            <item.icon className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-slate-100 mb-2">{item.title}</h3>
            <p className="text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
