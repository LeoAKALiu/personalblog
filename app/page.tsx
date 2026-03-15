"use client";

import { resumeData } from "@/data/resume";
import {
  ArrowRight,
  MessageCircle,
  Briefcase,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { CardList, type CardItem } from "@/components/CardList";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SideNav } from "@/components/SideNav";
import { PainPoints } from "@/components/PainPoints";
import { CapabilitiesNew } from "@/components/CapabilitiesNew";
import { CooperationModes } from "@/components/CooperationModes";
import { SpeakingSection } from "@/components/SpeakingSection";
import { useState } from "react";
import React from "react";

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

/** Combined academic output sorted by year descending */
function combinedAcademicItems(): CardItem[] {
  const items = [...publicationsToCardItems(), ...patentsToCardItems()];
  items.sort((a, b) => Number(b.year) - Number(a.year));
  return items;
}

/** Expandable experience item */
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
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <h3 className="text-lg sm:text-xl font-bold text-card-foreground">
            {exp.role}
          </h3>
          <span className="text-sm font-mono text-primary shrink-0">
            {exp.dates}
          </span>
        </div>
        <h4 className="text-base text-muted-foreground font-medium">
          {exp.company}
        </h4>
        <ul className="list-disc list-outside ml-5 space-y-1.5 text-sm text-muted-foreground mt-2">
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
  function openContact(): void {
    window.dispatchEvent(new CustomEvent("open-contact-fab"));
  }

  return (
    <div className="flex min-h-screen bg-background transition-colors duration-300">
      {/* Left sidebar section nav (desktop only) */}
      <SideNav />

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col items-center">

        {/* Section 1: Hero */}
        <section
          id="hero"
          className="w-full pt-10 pb-10 md:pt-16 md:pb-14 px-4 border-b border-border/50"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              接受咨询与产学研合作
            </div>

            {/* H1 */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-snug">
              {resumeData.personalInfo.tagline}
            </h1>

            {/* Subtitle */}
            <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
              {resumeData.personalInfo.subTagline}
            </p>

            {/* Three-line summary */}
            <div className="space-y-2 border-l-2 border-primary/30 pl-4">
              {[
                "传统检测难以产生可决策的数据",
                "AI 模型在工程场景落地率低",
                "物理机理与数据模型尚未有效融合",
              ].map((line, i) => (
                <p key={i} className="text-sm text-muted-foreground">
                  {line}
                </p>
              ))}
            </div>

            {/* Highlight credentials */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {resumeData.personalInfo.highlightCredentials?.map((label, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="/projects"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95 min-h-[44px] shadow-lg shadow-primary/20"
              >
                查看代表性案例
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <button
                onClick={openContact}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95 min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                预约沟通
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Pain Points */}
        <FadeInOnScroll>
          <PainPoints />
        </FadeInOnScroll>

        {/* Section 3: Capabilities */}
        <FadeInOnScroll>
          <CapabilitiesNew />
        </FadeInOnScroll>

        {/* Section 4: Cooperation Modes */}
        <FadeInOnScroll>
          <CooperationModes />
        </FadeInOnScroll>

        {/* Section 5: Speaking / Invited Talks */}
        <FadeInOnScroll>
          <SpeakingSection />
        </FadeInOnScroll>

        {/* Section 6: Experience Timeline */}
        <FadeInOnScroll>
          <section
            id="experience"
            className="w-full py-8 md:py-12 px-4 border-t border-border/50 bg-secondary/5"
          >
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  工作经历
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  职业经历
                </h2>
              </div>

              <div className="space-y-8 border-l-2 border-border pl-6 ml-2 sm:pl-8 sm:ml-3">
                {resumeData.experience.map((exp, idx) => (
                  <FadeInOnScroll key={idx} delay={idx * 100}>
                    <ExperienceItem exp={exp} />
                  </FadeInOnScroll>
                ))}
              </div>
            </div>
          </section>
        </FadeInOnScroll>

        {/* Section 6: Academic Output */}
        <FadeInOnScroll>
          <section
            id="academic"
            className="w-full py-8 md:py-12 px-4 border-t border-border/50"
          >
            <div className="max-w-2xl mx-auto">
              <div className="space-y-1 mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  学术产出
                </p>
              </div>
              <CardList
                items={combinedAcademicItems()}
                icon={<FileText className="w-5 h-5 text-primary" />}
                sectionTitle="论文与专利"
                scrollable
              />
              <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                <p>
                  更多成果请访问：
                  <a
                    href="https://scholar.google.com/citations?user=kpD5uBcAAAAJ&hl=zh-TW"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-1"
                  >
                    Google Scholar
                  </a>
                  <span className="mx-1">·</span>
                  <a
                    href="https://au.cnki.net/author/personalInfo/000043523348"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    中国知网
                  </a>
                </p>
              </div>
            </div>
          </section>
        </FadeInOnScroll>

        <ScrollToTop />
      </div>
    </div>
  );
}
