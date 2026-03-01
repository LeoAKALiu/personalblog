"use client";

import { useMemo, useState } from "react";
import { resumeData } from "@/data/resume";
import { ProjectCard, type ProjectItem } from "@/components/ProjectCard";
import { Hammer, Tag } from "lucide-react";
import { clsx } from "clsx";

function filterByTags(projects: ProjectItem[], selectedTags: string[]) {
  if (selectedTags.length === 0) return projects;
  return projects.filter((p) =>
    p.tags.some((tag) => selectedTags.includes(tag))
  );
}

export default function ProjectsPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    resumeData.projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const allProjects = resumeData.projects as ProjectItem[];
  const filtered = filterByTags(allProjects, selectedTags);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
          <Hammer className="w-8 h-8 text-primary" />
          解决方案
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          在线 Demo、产品与项目实践、科研与算法成果。通过下方标签筛选您关心的方向。
        </p>
      </div>

      {/* Tag filter bar */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Tag className="w-4 h-4 text-primary" />
          按标签筛选
        </div>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={clsx(
                "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
                selectedTags.includes(tag)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary/50 text-secondary-foreground border-border hover:border-primary/50 hover:text-foreground"
              )}
            >
              {tag}
            </button>
          ))}
          {selectedTags.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedTags([])}
              className="px-3 py-1.5 rounded-full text-sm font-medium border border-border bg-background text-muted-foreground hover:text-foreground hover:border-primary/50"
            >
              清除筛选
            </button>
          )}
        </div>
        {selectedTags.length > 0 && (
          <p className="text-xs text-muted-foreground">
            已选 {selectedTags.length} 个标签，显示包含任一标签的条目
          </p>
        )}
      </div>

      {/* Unified project list */}
      <section className="space-y-6">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground py-8">
            {selectedTags.length > 0
              ? "当前筛选条件下暂无匹配条目"
              : "暂无项目"}
          </p>
        ) : (
          filtered.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))
        )}
      </section>
    </div>
  );
}
