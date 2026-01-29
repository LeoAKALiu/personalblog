import { resumeData } from "@/data/resume";

export function ClientResults() {
  return (
    <section className="py-20 w-full border-y border-border/50 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {resumeData.clientResults.map((result, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-3 p-4">
              <div className="h-12 flex items-center justify-center font-bold text-xl text-muted-foreground opacity-50 mb-2">
                {result.logo}
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
                {result.stat}
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {result.client}
              </div>
              <p className="text-xs text-muted-foreground/80 max-w-[150px]">
                {result.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
