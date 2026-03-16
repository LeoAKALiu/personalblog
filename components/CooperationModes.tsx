import React from "react";
import { resumeData } from "@/data/resume";
import { motion } from "framer-motion";

/**
 * Four cooperation mode cards in a 2×2 grid.
 * Lets visitors understand how to engage without pricing or sales language.
 */
export function CooperationModes(): React.ReactElement {
  return (
    <section
      id="cooperation"
      className="w-full py-8 md:py-12 px-4 border-t border-border/50"
    >
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            合作方式
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            如何与我合作
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resumeData.cooperationModes.map((mode, idx) => (
            <motion.div
              key={idx}
              className="p-5 rounded-xl glass-surface space-y-2 hover:shadow-lg hover:shadow-primary/15 transition-all border border-border/60"
              whileHover={{ y: -2 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-1.5">
                <span>{idx + 1}</span>
              </div>
              <h3 className="font-semibold text-foreground text-base">
                {mode.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {mode.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
