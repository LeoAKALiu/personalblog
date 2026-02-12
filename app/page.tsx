import { resumeData } from "@/data/resume";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Brain,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Lightbulb,
} from "lucide-react";
import { CapabilitiesMatrix } from "@/components/commercial/CapabilitiesMatrix";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background transition-colors duration-300">
      {/* ─── Section 1: Hero ─── */}
      <section className="relative z-10 w-full pt-20 pb-16 md:pt-32 md:pb-24 px-4 flex flex-col items-center text-center max-w-5xl mx-auto space-y-8">
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
            href="/projects"
            className="group px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-bold text-lg transition-all flex items-center gap-2 shadow-xl shadow-primary/20 hover:scale-105"
          >
            查看解决方案
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#academic"
            className="px-8 py-4 bg-background hover:bg-accent text-foreground rounded-full font-bold text-lg transition-all border border-border hover:border-primary/50 shadow-lg flex items-center gap-2"
          >
            学术成果
            <ChevronRight className="w-4 h-4 opacity-50" />
          </a>
        </div>
      </section>

      {/* ─── Section 2: Bio & Services ─── */}
      <section className="w-full py-20 px-4 border-t border-border/50 bg-secondary/5">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Bio */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">关于我</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {resumeData.personalInfo.bio}
            </p>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 justify-center">
              <Brain className="w-7 h-7 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">专业领域</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {resumeData.services.map((service, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors shadow-sm"
                >
                  <h4 className="text-lg font-bold text-card-foreground mb-3">
                    {service.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 justify-center">
              <GraduationCap className="w-7 h-7 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">教育背景</h3>
            </div>
            <div className="grid gap-6">
              {resumeData.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row justify-between mb-2">
                    <h4 className="text-lg font-bold text-card-foreground">
                      {edu.school}
                    </h4>
                    <span className="text-sm font-mono text-primary">{edu.dates}</span>
                  </div>
                  <p className="text-muted-foreground font-medium">{edu.degree}</p>
                  {edu.details && (
                    <p className="text-muted-foreground/80 mt-2 text-sm">{edu.details}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Honors */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 justify-center">
              <Award className="w-7 h-7 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">荣誉奖项</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {resumeData.honors.map((honor, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-card/50 border border-border flex items-start gap-3"
                >
                  <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" />
                  <p className="text-muted-foreground text-sm">{honor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Experience Timeline ─── */}
      <section className="w-full py-20 px-4 border-t border-border/50">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex items-center gap-3 justify-center">
            <Briefcase className="w-7 h-7 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              职业经历
            </h2>
          </div>

          <div className="space-y-12 border-l-2 border-border pl-8 ml-3">
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-background border-4 border-primary group-hover:scale-110 transition-transform" />
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-xl font-bold text-card-foreground">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-mono text-primary">{exp.dates}</span>
                  </div>
                  <h4 className="text-lg text-muted-foreground font-medium">
                    {exp.company}
                  </h4>
                  <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground mt-4">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 4: Academic Output ─── */}
      <section
        id="academic"
        className="w-full py-20 px-4 border-t border-border/50 bg-secondary/5"
      >
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Publications */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 justify-center">
              <FileText className="w-7 h-7 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                代表性论文
              </h2>
            </div>
            <div className="space-y-4">
              {resumeData.publications.map((pub, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-card border border-border rounded-xl hover:border-border/80 transition-colors shadow-sm"
                >
                  <p className="text-muted-foreground leading-relaxed font-serif text-base">
                    {pub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Patents */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 justify-center">
              <Lightbulb className="w-7 h-7 text-yellow-500" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                发明专利
              </h2>
            </div>
            <div className="space-y-4">
              {resumeData.patents.map((patent, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-card/50 border border-border rounded-xl hover:bg-card transition-colors shadow-sm"
                >
                  <p className="text-muted-foreground font-mono text-xs mb-2">
                    专利 {idx + 1}
                  </p>
                  <p className="text-foreground text-sm">{patent}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 5: Capabilities Matrix ─── */}
      <CapabilitiesMatrix />
    </div>
  );
}
