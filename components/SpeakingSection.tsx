import React from "react";
import { speakingTalks, speakingStats } from "@/data/speaking";
import { SpeakingCard } from "@/components/SpeakingCard";

/**
 * Section "行业分享与受邀演讲": invited talks, training, and industry sharing.
 * Data-driven; style aligned with CooperationModes and existing sections.
 */
export function SpeakingSection(): React.ReactElement {
  return (
    <section
      id="speaking"
      className="w-full py-8 md:py-12 px-4 border-t border-border/50"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            受邀演讲
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            行业分享与受邀演讲
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            围绕城市体检、工程智能化与 AI 落地，面向企业、平台与行业组织开展技术分享与培训交流。
          </p>
          {/* replace with real numbers when available */}
          <p className="text-sm text-muted-foreground pt-1">
            受邀分享：{speakingStats.invitedCount} 场 · 企业培训：{speakingStats.trainingCount} 次
            · 覆盖单位：{speakingStats.organizationsCount} 家
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {speakingTalks.map((talk, idx) => (
            <SpeakingCard key={idx} talk={talk} />
          ))}
        </div>

        <p className="text-xs text-muted-foreground/90">
          部分交流材料与课件可按合作场景提供。
        </p>
      </div>
    </section>
  );
}
