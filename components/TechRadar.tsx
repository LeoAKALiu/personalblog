"use client";

import { motion } from "framer-motion";

export function TechRadar() {
  const circles = [
    { label: "Core AI", color: "border-blue-500", size: "w-32 h-32", z: 30, content: ["Segmentation", "Detection", "LLM"] },
    { label: "System", color: "border-indigo-500/60", size: "w-64 h-64", z: 20, content: ["Edge Compute", "ROS", "Digital Twin"] },
    { label: "Scenario", color: "border-slate-500/30", size: "w-96 h-96", z: 10, content: ["Safety", "Health", "Progress"] },
  ];

  return (
    <div className="relative flex items-center justify-center w-[500px] h-[500px] overflow-hidden">
      {/* Center Point */}
      <div className="absolute z-50 w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] animate-pulse" />

      {circles.map((circle, idx) => (
        <div
          key={idx}
          className={`absolute flex items-center justify-center rounded-full border ${circle.color} ${circle.size} bg-transparent backdrop-blur-[1px]`}
          style={{ zIndex: circle.z }}
        >
          {/* Label at top of ring */}
          <span className="absolute -top-3 px-2 bg-background/80 text-xs font-mono font-bold text-foreground border border-border rounded-full">
            {circle.label}
          </span>

          {/* Orbiting Elements */}
          <motion.div
            className="absolute w-full h-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20 + idx * 10, repeat: Infinity, ease: "linear" }}
          >
            {circle.content.map((item, itemIdx) => {
               // Calculate position on circle
               const angle = (itemIdx / circle.content.length) * 360;
               return (
                 <div
                   key={itemIdx}
                   className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                   style={{ transform: `rotate(${angle}deg) translateY(-50%)` }} // Simple distribution hack
                 >
                    {/* Counter-rotate text so it stays upright? No, let's just place dots for now or styled badges */}
                 </div>
               );
            })}
             {/* Simpler Approach: Just placing orbiting dots for visual effect */}
             <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full shadow-lg -translate-x-1/2 -translate-y-1/2" />
          </motion.div>
        </div>
      ))}

      {/* Scanning Radar Line */}
      <motion.div
        className="absolute w-1/2 h-1 bg-gradient-to-r from-transparent to-primary/50 origin-left"
        style={{ top: "50%", left: "50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Decorative content overlay (static for readability) */}
      <div className="absolute inset-0 pointer-events-none">
          {/* Manually placed text for the "radar" look */}
          <div className="absolute top-[40%] left-[55%] text-xs font-mono text-primary/80">LLM & RAG</div>
          <div className="absolute bottom-[40%] right-[55%] text-xs font-mono text-primary/80">YOLO/SegFormer</div>
          
          <div className="absolute top-[20%] right-[20%] text-xs font-mono text-foreground/60">Edge Box</div>
          <div className="absolute bottom-[20%] left-[20%] text-xs font-mono text-foreground/60">ROS 2</div>
          
          <div className="absolute top-[10%] left-[50%] text-xs font-mono text-muted-foreground">- Safety -</div>
          <div className="absolute bottom-[10%] left-[50%] text-xs font-mono text-muted-foreground">- Progress -</div>
      </div>
    </div>
  );
}
