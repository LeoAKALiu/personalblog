import { resumeData } from "@/data/resume";
import { GraduationCap, Briefcase, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
      {/* Bio Section */}
      <section className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white">About Me</h1>
        <div className="prose prose-invert max-w-none text-slate-300">
          <p className="text-lg leading-relaxed">{resumeData.personalInfo.bio}</p>
        </div>
      </section>

      {/* Experience Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-8 h-8 text-blue-500" />
          <h2 className="text-2xl font-bold text-white">Professional Experience</h2>
        </div>
        
        <div className="space-y-12 border-l-2 border-slate-800 pl-8 ml-3">
          {resumeData.experience.map((exp, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slate-900 border-4 border-blue-500 group-hover:scale-110 transition-transform" />
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                  <span className="text-sm font-mono text-blue-400">{exp.dates}</span>
                </div>
                <h4 className="text-lg text-slate-300 font-medium">{exp.company}</h4>
                <ul className="list-disc list-outside ml-5 space-y-2 text-slate-400 mt-4">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="w-8 h-8 text-blue-500" />
          <h2 className="text-2xl font-bold text-white">Education</h2>
        </div>

        <div className="grid gap-6">
          {resumeData.education.map((edu, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex flex-col sm:flex-row justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-100">{edu.school}</h3>
                <span className="text-sm font-mono text-blue-400">{edu.dates}</span>
              </div>
              <p className="text-slate-300 font-medium">{edu.degree}</p>
              {edu.details && <p className="text-slate-400 mt-2 text-sm">{edu.details}</p>}
            </div>
          ))}
        </div>
      </section>

       {/* Honors Section */}
       <section className="space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-8 h-8 text-blue-500" />
          <h2 className="text-2xl font-bold text-white">Honors & Awards</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {resumeData.honors.map((honor, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 flex items-start gap-3">
              <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
              <p className="text-slate-300 text-sm">{honor}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
