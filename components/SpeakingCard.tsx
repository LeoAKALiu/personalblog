"use client";

import React from "react";
import { ExternalLink, Mic2 } from "lucide-react";
import NextImage from "next/image";
import type { SpeakingTalk } from "@/data/speaking";

interface SpeakingCardProps {
  talk: SpeakingTalk;
}

/**
 * Placeholder when no cover image is provided.
 */
function ImagePlaceholder(): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground bg-muted/60 min-h-[120px]">
      <Mic2 className="w-8 h-8" />
      <span className="text-xs">暂无封面</span>
    </div>
  );
}

/**
 * Single card for one speaking/talk entry in the "行业分享与受邀演讲" section.
 */
export function SpeakingCard({ talk }: SpeakingCardProps): React.ReactElement {
  const hasImage = !!talk.image;

  return (
    <article className="flex flex-col rounded-xl border border-border bg-card shadow-sm hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden min-h-[320px]">
      {/* Cover or placeholder */}
      <div className="shrink-0 w-full aspect-[16/10] bg-muted relative overflow-hidden">
        {hasImage ? (
          <NextImage
            src={talk.image!}
            alt={talk.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 sm:p-5 min-w-0">
        <h3 className="text-base font-semibold text-card-foreground mb-2 line-clamp-2">
          {talk.title}
        </h3>
        <dl className="space-y-1 text-sm text-muted-foreground flex-1">
          <div>
            <span className="font-medium text-foreground/90">主办单位：</span>
            {talk.organizer}
          </div>
          <div>
            <span className="font-medium text-foreground/90">主题：</span>
            {talk.topic}
          </div>
          <div>
            <span className="font-medium text-foreground/90">形式：</span>
            {talk.type}
          </div>
          <div>
            <span className="font-medium text-foreground/90">时间：</span>
            {talk.date}
          </div>
        </dl>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3 line-clamp-2">
          {talk.description}
        </p>
        {talk.url && (
          <a
            href={talk.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:underline min-h-[44px] sm:min-h-0 sm:mt-4"
          >
            查看详情
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>
        )}
      </div>
    </article>
  );
}
