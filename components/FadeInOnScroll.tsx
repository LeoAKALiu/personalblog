"use client";

import { useRef, useEffect, useState } from "react";

/**
 * Wrapper component that fades children in when they scroll into view.
 * Uses IntersectionObserver for performance. Triggers only once.
 */
interface FadeInOnScrollProps {
  /** Content to reveal */
  children: React.ReactNode;
  /** Additional class names */
  className?: string;
  /** Delay in ms before starting the animation */
  delay?: number;
}

export function FadeInOnScroll({
  children,
  className = "",
  delay = 0,
}: FadeInOnScrollProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
