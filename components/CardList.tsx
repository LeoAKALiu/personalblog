import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Patent subtype for tag display (two colors).
 */
export type PatentType = "发明专利" | "实用新型专利";

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
  /** For patents: 发明专利 or 实用新型专利 (different tag color) */
  patentType?: PatentType;
  /** Brief summary or full citation */
  summary: string;
  /** Optional link (e.g. PDF on OSS) for 查看全文 */
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
  /** If true, wrap list in a scrollable container (max height) */
  scrollable?: boolean;
}

/** Badge color: paper, 发明专利, 实用新型专利, project */
function typeBadgeClass(item: CardItem): string {
  if (item.type === "论文")
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
  if (item.type === "专利" && item.patentType === "实用新型专利")
    return "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400";
  if (item.type === "专利")
    return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
  return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
}

function typeBadgeLabel(item: CardItem): string {
  if (item.type === "专利" && item.patentType) return item.patentType;
  return item.type;
}

/**
 * Reusable card list component for academic output (publications, patents, projects).
 * Each card displays type badge, year, title, summary, venue/number, and optional link.
 */
export function CardList({
  items,
  icon,
  sectionTitle,
  scrollable = false,
}: CardListProps): React.ReactElement {
  const listContent = (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          className="p-4 sm:p-5 bg-card/90 border border-border rounded-xl hover:border-primary/40 transition-all shadow-sm hover:shadow-lg hover:shadow-primary/10"
          whileHover={{ y: -2 }}
        >
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`px-2 py-0.5 text-xs font-semibold rounded-md ${typeBadgeClass(item)}`}
            >
              {typeBadgeLabel(item)}
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
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 justify-center">
        {icon}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
          {sectionTitle}
        </h2>
      </div>
      {scrollable ? (
        <div className="max-h-[min(70vh,32rem)] overflow-y-auto overflow-x-hidden rounded-xl border border-border pr-1">
          {listContent}
        </div>
      ) : (
        listContent
      )}
    </div>
  );
}
