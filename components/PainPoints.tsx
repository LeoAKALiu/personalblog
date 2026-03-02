import React from "react";
import { resumeData } from "@/data/resume";

/**
 * Three-column problem-driven card grid for the homepage.
 * Presents the three industry断层 that the site owner resolves.
 */
export function PainPoints(): React.ReactElement {
  return (
    <section
      id="problems"
      className="w-full py-8 md:py-12 px-4 border-t border-border/50"
    >
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            行业背景
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            行业正在面临什么断层？
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {resumeData.painPoints.map((point, idx) => (
            <div
              key={idx}
              className="space-y-3 p-5 rounded-xl border border-border bg-card"
            >
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-semibold text-foreground text-base">
                {point.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
