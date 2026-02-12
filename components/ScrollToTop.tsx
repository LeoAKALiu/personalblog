"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Floating back-to-top button.
 * Appears after scrolling 400px, positioned bottom-left to avoid
 * conflicting with ContactFAB on bottom-right.
 */
export function ScrollToTop(): React.ReactElement {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    function onScroll(): void {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      onClick={handleClick}
      aria-label="返回顶部"
      className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-muted/80 border border-border text-foreground shadow-lg hover:bg-accent hover:scale-105 flex items-center justify-center transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
