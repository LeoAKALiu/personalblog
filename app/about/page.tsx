import { resumeData } from "@/data/resume";
import { GraduationCap, Briefcase, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
      {/* Bio Section */}
      <section className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">About Me</h1>
        <div className="prose prose-invert max-w-none text-muted-foreground">
          <p className="text-lg leading-relaxed">{resumeData.personalInfo.bio}</p>
        </div>
      </section>

      {/* Experience Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-8 h-8 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Professional Experience</h2>
        </div>
        
        <div className="space-y-12 border-l-2 border-border pl-8 ml-3">
          {resumeData.experience.map((exp, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-background border-4 border-primary group-hover:scale-110 transition-transform" />
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-xl font-bold text-card-foreground">{exp.role}</h3>
                  <span className="text-sm font-mono text-primary">{exp.dates}</span>
                </div>
                <h4 className="text-lg text-muted-foreground font-medium">{exp.company}</h4>
                <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground mt-4">
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
          <GraduationCap className="w-8 h-8 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Education</h2>
        </div>

        <div className="grid gap-6">
          {resumeData.education.map((edu, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between mb-2">
                <h3 className="text-lg font-bold text-card-foreground">{edu.school}</h3>
                <span className="text-sm font-mono text-primary">{edu.dates}</span>
              </div>
              <p className="text-muted-foreground font-medium">{edu.degree}</p>
              {edu.details && <p className="text-muted-foreground/80 mt-2 text-sm">{edu.details}</p>}
            </div>
          ))}
        </div>
      </section>

       {/* Honors Section */}
       <section className="space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-8 h-8 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Honors & Awards</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {resumeData.honors.map((honor, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-card/50 border border-border flex items-start gap-3">
              <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" />
              <p className="text-muted-foreground text-sm">{honor}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
