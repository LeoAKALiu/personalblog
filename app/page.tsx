"use client";

import { resumeData } from "@/data/resume";
import {
  ArrowRight,
  MessageCircle,
  Brain,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Lightbulb,
  Terminal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { CapabilitiesMatrix } from "@/components/commercial/CapabilitiesMatrix";
import { InfoCard } from "@/components/InfoCard";
import { CardList, type CardItem } from "@/components/CardList";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useState } from "react";

/** Map service icon names to lucide components */
const serviceIconMap: Record<string, React.ReactNode> = {
  Lightbulb: <Lightbulb className="w-6 h-6" />,
  Terminal: <Terminal className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
};

/** Convert structured publications to CardItem format */
function publicationsToCardItems(): CardItem[] {
  return resumeData.structuredPublications.map((pub) => ({
    title: pub.title,
    year: pub.year,
    type: "论文" as const,
    summary: pub.authors,
    venue: pub.venue,
    metrics: pub.metrics,
    link: pub.link,
  }));
}

/** Convert structured patents to CardItem format */
function patentsToCardItems(): CardItem[] {
  return resumeData.structuredPatents.map((pat) => ({
    title: pat.title,
    year: pat.year,
    type: "专利" as const,
    patentType: pat.patentType,
    summary: pat.inventors,
    number: pat.number,
    link: pat.link,
  }));
}

/** Combined academic output (papers + patents) sorted by year descending */
function combinedAcademicItems(): CardItem[] {
  const items = [
    ...publicationsToCardItems(),
    ...patentsToCardItems(),
  ];
  items.sort((a, b) => Number(b.year) - Number(a.year));
  return items;
}

/** Expandable experience item - shows first 2 items, rest toggleable */
function ExperienceItem({
  exp,
}: {
  exp: (typeof resumeData.experience)[number];
}): React.ReactElement {
  const [expanded, setExpanded] = useState<boolean>(false);
  const showToggle = exp.description.length > 2;
  const visibleItems = expanded ? exp.description : exp.description.slice(0, 2);

  return (
    <div className="relative group">
      <div className="absolute -left-[33px] sm:-left-[41px] top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-background border-4 border-primary group-hover:scale-110 transition-transform" />
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-lg sm:text-xl font-bold text-card-foreground">
            {exp.role}
          </h3>
          <span className="text-sm font-mono text-primary">{exp.dates}</span>
        </div>
        <h4 className="text-base sm:text-lg text-muted-foreground font-medium">
          {exp.company}
        </h4>
        <ul className="list-disc list-outside ml-5 space-y-1.5 text-sm sm:text-base text-muted-foreground mt-3">
          {visibleItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        {showToggle && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-sm text-primary hover:underline mt-2 min-h-[44px]"
          >
            {expanded ? (
              <>
                收起 <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                展开更多 ({exp.description.length - 2} 项){" "}
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Home(): React.ReactElement {
  /** Open ContactFAB by dispatching a custom event */
  function openContact(): void {
    window.dispatchEvent(new CustomEvent("open-contact-fab"));
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-background transition-colors duration-300">
      {/* ─── Section 1: Hero ─── */}
      <FadeInOnScroll>
        <section
          id="hero"
          className="relative z-10 w-full pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-32 md:pb-24 px-4 flex flex-col items-center text-center max-w-5xl mx-auto space-y-6 sm:space-y-8"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            接受咨询与产学研合作
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tight text-foreground leading-tight">
            工程数字化 <br />
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              智能建造先锋
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-muted-foreground text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
            {resumeData.personalInfo.subTagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a
              href="#academic"
              className="group px-6 py-3 sm:px-8 sm:py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-bold text-base sm:text-lg transition-all flex items-center gap-2 shadow-xl shadow-primary/20 hover:shadow-2xl hover:scale-105 active:scale-95 min-h-[48px] min-w-[160px] justify-center"
            >
              查看代表性案例
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={openContact}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-background hover:bg-primary text-primary hover:text-primary-foreground rounded-full font-bold text-base sm:text-lg transition-all border-2 border-primary shadow-lg flex items-center gap-2 hover:shadow-2xl hover:scale-105 active:scale-95 min-h-[48px] min-w-[160px] justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              预约沟通
            </button>
          </div>
        </section>
      </FadeInOnScroll>

      {/* ─── Section 2: About ─── */}
      <FadeInOnScroll>
        <section
          id="about"
          className="w-full py-12 md:py-20 px-4 border-t border-border/50 bg-secondary/5"
        >
          <div className="max-w-5xl mx-auto space-y-10 md:space-y-12">
            {/* Bio */}
            <div className="space-y-4 text-center max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                关于我
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {resumeData.personalInfo.bio}
              </p>
            </div>

            {/* Education - summarized */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 justify-center">
                <GraduationCap className="w-7 h-7 text-primary" />
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  教育背景
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {resumeData.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm text-center"
                  >
                    <h4 className="text-base font-bold text-card-foreground">
                      {edu.school}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {edu.degree}
                    </p>
                    <span className="text-xs font-mono text-primary mt-2 block">
                      {edu.dates}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Honors */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 justify-center">
                <Award className="w-7 h-7 text-primary" />
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  荣誉奖项
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {resumeData.honors.map((honor, idx) => (
                  <FadeInOnScroll key={idx} delay={idx * 80}>
                    <div className="p-3 sm:p-4 rounded-lg bg-card/50 border border-border flex items-start gap-3 min-h-[44px]">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                      <p className="text-muted-foreground text-sm">{honor}</p>
                    </div>
                  </FadeInOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* ─── Section 3: Services (InfoCards) ─── */}
      <FadeInOnScroll>
        <section
          id="services"
          className="w-full py-12 md:py-20 px-4 border-t border-border/50"
        >
          <div className="max-w-5xl mx-auto space-y-8 md:space-y-10">
            <div className="flex items-center gap-3 justify-center">
              <Brain className="w-7 h-7 text-primary" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                专业领域
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {resumeData.services.map((service, idx) => (
                <FadeInOnScroll key={idx} delay={idx * 120}>
                  <InfoCard
                    icon={serviceIconMap[service.icon] || <Brain className="w-6 h-6" />}
                    title={service.title}
                    description={service.desc}
                  />
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* ─── Section 4: Experience Timeline ─── */}
      <FadeInOnScroll>
        <section
          id="experience"
          className="w-full py-12 md:py-20 px-4 border-t border-border/50 bg-secondary/5"
        >
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
            <div className="flex items-center gap-3 justify-center">
              <Briefcase className="w-7 h-7 text-primary" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                职业经历
              </h2>
            </div>

            <div className="space-y-10 sm:space-y-12 border-l-2 border-border pl-6 ml-2 sm:pl-8 sm:ml-3">
              {resumeData.experience.map((exp, idx) => (
                <FadeInOnScroll key={idx} delay={idx * 150}>
                  <ExperienceItem exp={exp} />
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* ─── Section 5: Academic Output (论文与专利合并，可滑动列表) ─── */}
      <FadeInOnScroll>
        <section
          id="academic"
          className="w-full py-12 md:py-20 px-4 border-t border-border/50"
        >
          <div className="max-w-4xl mx-auto">
            <CardList
              items={combinedAcademicItems()}
              icon={<FileText className="w-7 h-7 text-primary" />}
              sectionTitle="论文与专利"
              scrollable
            />
          </div>
        </section>
      </FadeInOnScroll>

      {/* ─── Section 6: Capabilities Matrix ─── */}
      <div id="capabilities">
        <CapabilitiesMatrix />
      </div>

      {/* Back to top */}
      <ScrollToTop />
    </div>
  );
}
