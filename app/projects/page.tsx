"use client";

import { useState } from "react";
import { resumeData } from "@/data/resume";
import { ProjectCard, type ProjectItem } from "@/components/ProjectCard";
import { Hammer } from "lucide-react";
import { clsx } from "clsx";

/** 场景类 tags — external-facing scenarios */
const SCENE_TAGS = [
  "城市体检",
  "既有建筑运维",
  "基础设施韧性诊断",
  "总承包数字化赋能",
];

/** 能力类 tags — internal capability types */
const CAPABILITY_TAGS = [
  "多源感知融合",
  "物理驱动AI",
  "垂直大模型系统",
  "数据资产闭环",
];

function filterByTags(projects: ProjectItem[], selectedTags: string[]) {
  if (selectedTags.length === 0) return projects;
  return projects.filter((p) =>
    p.tags.some((tag) => selectedTags.includes(tag))
  );
}

export default function ProjectsPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
          在线 Demo、产品与项目实践。通过下方标签筛选您关心的方向。
        </p>
      </div>

      {/* Tag filter bar — two categories */}
      <div className="space-y-4">
        {/* 场景类 */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            场景类
          </p>
          <div className="flex flex-wrap gap-2">
            {SCENE_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={clsx(
                  "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
                  selectedTags.includes(tag)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-primary/5 text-primary border-primary/30 hover:bg-primary/10"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 能力类 */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            能力类
          </p>
          <div className="flex flex-wrap gap-2">
            {CAPABILITY_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={clsx(
                  "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
                  selectedTags.includes(tag)
                    ? "bg-secondary text-secondary-foreground border-secondary"
                    : "bg-secondary/30 text-secondary-foreground border-border hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {selectedTags.length > 0 && (
          <button
            type="button"
            onClick={() => setSelectedTags([])}
            className="px-3 py-1.5 rounded-full text-sm font-medium border border-border bg-background text-muted-foreground hover:text-foreground hover:border-primary/50"
          >
            清除筛选 ({selectedTags.length})
          </button>
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
          filtered.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))
        )}
      </section>
    </div>
  );
}
