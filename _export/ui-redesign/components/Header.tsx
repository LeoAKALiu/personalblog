"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ModeToggle } from "@/components/mode-toggle";
import { LogoMark } from "@/components/LogoMark";

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Page-level navigation items */
const pageLinks = [
  { name: "首页", href: "/" },
  { name: "解决方案", href: "/projects" },
];

/** Section anchors shown only on the home page — must match IDs in app/page.tsx */
const sectionLinks = [
  { id: "problems", label: "行业断层" },
  { id: "capabilities", label: "核心能力" },
  { id: "cooperation", label: "合作方式" },
  { id: "experience", label: "职业经历" },
  { id: "academic", label: "学术成果" },
];

/**
 * Site header with page navigation, section scroll-spy (home page only),
 * dark mode toggle, and responsive hamburger menu.
 */
export function Header(): React.ReactElement {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // IntersectionObserver scroll-spy for sections (home page only)
  useEffect(() => {
    if (!isHome) return;

    const observers: IntersectionObserver[] = [];

    // Small delay to let the DOM render section elements
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
  }, [isHome]);

  /** Smooth scroll to a section and close mobile menu */
  const scrollToSection = useCallback(
    (id: string): void => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    []
  );

  return (
    <header className="fixed w-full z-50 transition-all duration-300">
      {/* Primary nav bar */}
      <nav className="bg-background/95 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo mark */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <LogoMark className="h-9 w-9 text-foreground transition-opacity group-hover:opacity-80" />
            </Link>

            {/* Desktop page links */}
            <div className="hidden md:flex items-center space-x-4">
              {pageLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 min-h-[44px] flex items-center",
                    pathname === item.href
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pl-2 border-l border-border ml-2">
                <ModeToggle />
              </div>
            </div>

            {/* Mobile controls */}
            <div className="-mr-2 flex items-center gap-2 md:hidden">
              <ModeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none min-h-[44px] min-w-[44px]"
                aria-label="打开菜单"
              >
                {mobileOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Page links */}
            {pageLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-3 py-3 rounded-md text-base font-medium min-h-[44px]",
                  pathname === item.href
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Section anchors (home page only) */}
            {isHome && (
              <>
                <div className="border-t border-border my-2" />
                <p className="px-3 py-1 text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                  页面导航
                </p>
                {sectionLinks.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={cn(
                      "block w-full text-left px-3 py-3 rounded-md text-base font-medium min-h-[44px]",
                      activeSection === id
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
