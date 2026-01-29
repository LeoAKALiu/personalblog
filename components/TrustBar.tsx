"use client";

import { resumeData } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

export function TrustBar() {
  return (
    <div className="w-full py-8 border-y border-border/50 bg-muted/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          Trusted by Industry Leaders
        </p>
        
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s]">
            {resumeData.trustedBy.map((org, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "mx-8 flex items-center gap-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
                )}
              >
                {/* 
                  Note: In a real implementation, we would use Next.js Image component here with org.logo 
                  For now, using styled text placeholders as requested by "minimal setup" constraint 
                */}
                <span className="text-xl font-bold font-serif text-foreground/80 whitespace-nowrap">
                  {org.logo}
                </span>
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background dark:from-background"></div>
        </div>
      </div>
    </div>
  );
}
