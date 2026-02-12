"use client";

import { useState } from "react";
import { ExternalLink, Maximize2, X, Play, ImageIcon } from "lucide-react";
import { clsx } from "clsx";

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  tags: string[];
  demoUrl: string;
  type: string;
  challenge?: string;
  solution?: string;
  impact?: string;
}

type TabId = "challenge" | "solution" | "impact";

const TABS: { id: TabId; label: string }[] = [
  { id: "challenge", label: "解决问题" },
  { id: "solution", label: "方案" },
  { id: "impact", label: "效果" },
];

interface ProjectCardProps {
  project: ProjectItem;
}

/** Placeholder shown when no image/demo is available */
function ThumbnailPlaceholder({ type }: { type: string }) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-2 text-muted-foreground">
      {type === "iframe" ? (
        <Play className="w-10 h-10" />
      ) : type === "image" ? (
        <ImageIcon className="w-10 h-10" />
      ) : (
        <Maximize2 className="w-10 h-10" />
      )}
      <span className="text-xs">暂无预览</span>
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [activeTab, setActiveTab] = useState<TabId>("challenge");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasDemoImage = project.demoUrl && project.type === "image";
  const hasDemoIframe = project.demoUrl && project.type === "iframe";

  const tabContent =
    activeTab === "challenge"
      ? project.challenge
      : activeTab === "solution"
        ? project.solution
        : project.impact;

  return (
    <>
      <article className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-sm flex flex-col sm:flex-row min-h-[200px]">
        {/* Left: Thumbnail */}
        <div className="sm:w-56 md:w-64 shrink-0 h-44 sm:h-auto sm:min-h-[220px] bg-muted relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-background/50" />
          {hasDemoImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.demoUrl}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          ) : hasDemoIframe ? (
            <div className="relative z-10 text-muted-foreground group-hover:text-primary transition-colors">
              <Play className="w-12 h-12" />
            </div>
          ) : (
            <ThumbnailPlaceholder type={project.type} />
          )}
        </div>

        {/* Right: Title + Tabs + Content + Tags */}
        <div className="flex-1 flex flex-col p-5 md:p-6 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <span className="text-xs font-mono text-primary uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-card-foreground mt-0.5">
                {project.title}
              </h3>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-medium text-primary hover:underline flex items-center gap-1 shrink-0"
            >
              详情 <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-0.5 rounded-lg bg-muted/50 border border-border/50 mb-4">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={clsx(
                  "flex-1 min-w-0 py-2 px-3 rounded-md text-sm font-medium transition-colors",
                  activeTab === id
                    ? "bg-background text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 text-sm text-muted-foreground leading-relaxed min-h-[3.5rem]">
            {tabContent || (
              <span className="text-muted-foreground/70">暂无内容</span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Modal: full case study */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6">
          <div
            className="absolute inset-0 bg-background/80"
            onClick={() => setIsModalOpen(false)}
            aria-hidden
          />
          <div className="relative w-full sm:max-w-5xl bg-card rounded-t-2xl sm:rounded-2xl border border-border shadow-2xl flex flex-col max-h-screen sm:max-h-[90vh] overflow-hidden animate-in fade-in slide-in-from-bottom-4 sm:zoom-in duration-200">
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border">
              <h3 className="text-base sm:text-xl font-bold text-card-foreground truncate pr-2">
                {project.title}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted shrink-0"
                aria-label="关闭"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="aspect-video w-full bg-muted rounded-lg border border-border overflow-hidden flex items-center justify-center relative">
                    {hasDemoIframe ? (
                      <iframe
                        src={project.demoUrl}
                        className="w-full h-full"
                        title={`${project.title} Demo`}
                        sandbox="allow-scripts allow-same-origin"
                      />
                    ) : hasDemoImage ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={project.demoUrl}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <Maximize2 className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground text-sm">
                          预览占位
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-6">
                    {project.challenge && (
                      <div>
                        <h4 className="text-lg font-bold text-foreground mb-2">
                          解决问题
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.challenge}
                        </p>
                      </div>
                    )}
                    {project.solution && (
                      <div>
                        <h4 className="text-lg font-bold text-foreground mb-2">
                          方案
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    )}
                    {project.impact && (
                      <div>
                        <h4 className="text-lg font-bold text-foreground mb-2">
                          效果
                        </h4>
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                          <p className="text-foreground font-medium leading-relaxed">
                            {project.impact}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                      简介
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
                      技术标签
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      打开预览 <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
