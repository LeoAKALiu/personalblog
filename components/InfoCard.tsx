/**
 * Reusable information card with icon, title, and description.
 * Used for services, capabilities, and other card-like sections.
 */
interface InfoCardProps {
  /** Icon element (e.g. lucide-react component) */
  icon: React.ReactNode;
  /** Card title */
  title: string;
  /** Short description (1-2 sentences) */
  description: string;
}

export function InfoCard({ icon, title, description }: InfoCardProps): React.ReactElement {
  return (
    <div className="group p-5 sm:p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:-translate-y-0.5 transition-all duration-200 shadow-sm min-h-[44px]">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <h4 className="text-base sm:text-lg font-bold text-card-foreground mb-2">
            {title}
          </h4>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
