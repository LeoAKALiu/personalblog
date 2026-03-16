 "use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleClick}
          aria-label="返回顶部"
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-muted/80 border border-border text-foreground shadow-lg flex items-center justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
