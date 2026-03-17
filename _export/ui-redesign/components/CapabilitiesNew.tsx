"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { resumeData } from "@/data/resume";

/**
 * Three-layer capability section:
 *   Layer 1 — three main capability areas (large titles)
 *   Layer 2 — 3-4 result-expression module chips per area
 *   Layer 3 — collapsible tech stack ("技术工具箱"), hidden by default
 */
export function CapabilitiesNew(): React.ReactElement {
  const [techOpen, setTechOpen] = useState<boolean>(false);

  return (
    <section
      id="capabilities"
      className="w-full py-8 md:py-12 px-4 border-t border-border/50 bg-secondary/5"
    >
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Section header */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            核心能力
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            三个主要能力方向
          </h2>
        </div>

        {/* Layer 1 + Layer 2: capability blocks */}
        <div className="space-y-8">
          {resumeData.capabilities3Layer.map((cap, idx) => (
            <div
              key={idx}
              className="space-y-4 pb-8 border-b border-border/50 last:border-0 last:pb-0"
            >
              {/* L1: main title */}
              <div className="flex items-start gap-4">
                <span className="mt-1 text-xs font-mono font-semibold text-primary/60 w-5 shrink-0">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                  {cap.title}
                </h3>
              </div>

              {/* L2: result-expression module chips */}
              <div className="pl-9 flex flex-wrap gap-2">
                {cap.modules.map((mod, mIdx) => (
                  <span
                    key={mIdx}
                    className="px-3 py-1.5 text-sm rounded-lg border border-border bg-background text-foreground/80"
                  >
                    {mod}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Layer 3: collapsible tech stack */}
        <div className="border border-border rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setTechOpen(!techOpen)}
            className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
          >
            <span>技术工具箱</span>
            {techOpen ? (
              <ChevronUp className="w-4 h-4 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 shrink-0" />
            )}
          </button>

          {techOpen && (
            <div className="px-5 pb-5 pt-1 border-t border-border bg-muted/10">
              <div className="space-y-4">
                {resumeData.capabilities3Layer.map((cap, idx) => (
                  <div key={idx} className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {cap.title}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cap.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 text-xs font-mono rounded-md bg-secondary text-secondary-foreground border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
