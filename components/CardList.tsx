import { ExternalLink } from "lucide-react";

/**
 * A single card item in the academic output list.
 */
export interface CardItem {
  /** Main title of the publication/patent/project */
  title: string;
  /** Year of publication or filing */
  year: string;
  /** Type classification */
  type: "论文" | "专利" | "落地项目";
  /** Brief summary or full citation */
  summary: string;
  /** Optional external link */
  link?: string;
  /** Journal or conference name (publications) */
  venue?: string;
  /** Patent number (patents) */
  number?: string;
  /** Impact factor / JCR info (publications) */
  metrics?: string;
}

interface CardListProps {
  /** Array of card items to display */
  items: CardItem[];
  /** Optional icon to show in the section header */
  icon?: React.ReactNode;
  /** Section heading text */
  sectionTitle: string;
}

/** Badge color mapping by type */
function typeBadgeClass(type: CardItem["type"]): string {
  switch (type) {
    case "论文":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "专利":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    case "落地项目":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
  }
}

/**
 * Reusable card list component for academic output (publications, patents, projects).
 * Each card displays type badge, year, title, summary, venue/number, and optional link.
 */
export function CardList({
  items,
  icon,
  sectionTitle,
}: CardListProps): React.ReactElement {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 justify-center">
        {icon}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
          {sectionTitle}
        </h2>
      </div>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 bg-card border border-border rounded-xl hover:border-border/80 transition-colors shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`px-2 py-0.5 text-xs font-semibold rounded-md ${typeBadgeClass(item.type)}`}
              >
                {item.type}
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                {item.year}
              </span>
              {item.metrics && (
                <span className="text-xs text-primary font-medium">
                  {item.metrics}
                </span>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-bold text-foreground mb-1 break-words">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed break-words">
              {item.summary}
            </p>
            {(item.venue || item.number) && (
              <p className="text-xs text-muted-foreground/70 mt-1 break-words">
                {item.venue || item.number}
              </p>
            )}
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-xs text-primary hover:underline min-h-[44px] sm:min-h-0"
              >
                查看全文 <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
