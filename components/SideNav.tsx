"use client";

import { useEffect, useState, useCallback } from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

/** Section anchors for homepage scroll-spy */
const sectionLinks = [
  { id: "problems", label: "行业断层" },
  { id: "capabilities", label: "核心能力" },
  { id: "cooperation", label: "合作方式" },
  { id: "experience", label: "职业经历" },
  { id: "academic", label: "学术成果" },
];

/**
 * Sticky left sidebar for homepage section navigation with IntersectionObserver
 * scroll-spy. Hidden on mobile; visible as a narrow sidebar on md+ screens.
 */
export function SideNav(): React.ReactElement {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const timer = setTimeout(() => {
      sectionLinks.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          },
          { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
        );

        observer.observe(el);
        observers.push(observer);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const scrollToSection = useCallback((id: string): void => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <aside className="hidden md:flex flex-col sticky top-16 h-[calc(100vh-4rem)] w-36 lg:w-44 shrink-0 overflow-y-auto py-8 pl-2 pr-3">
      <nav className="flex flex-col gap-1">
        <p className="px-3 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          本页导航
        </p>
        {sectionLinks.map(({ id, label }) => {
          const isActive: boolean = activeSection === id;
          return (
            <motion.button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              className={clsx(
                "relative w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 overflow-hidden",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
              )}
              whileHover={{ x: 2 }}
            >
              {isActive && (
                <motion.span
                  layoutId="sidenav-indicator"
                  className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-gradient-to-b from-primary to-accent"
                  transition={{ type: "spring", stiffness: 360, damping: 30 }}
                />
              )}
              <span className="pl-2">{label}</span>
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
}
