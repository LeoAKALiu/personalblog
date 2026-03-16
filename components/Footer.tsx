/**
 * Site footer with copyright and ICP registration.
 * Extracted from layout.tsx for independent reuse.
 */
export function Footer(): React.ReactElement {
  return (
    <footer className="bg-muted/50 border-t border-border/60 py-8 mt-auto safe-bottom relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground space-y-2">
        <p>&copy; {new Date().getFullYear()} Liu Bo. All rights reserved.</p>
        <p className="text-sm">
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            沪ICP备2026005282号-1
          </a>
        </p>
      </div>
    </footer>
  );
}
