import { resumeData } from "@/data/resume";
import { Shield, Activity, CheckCircle, Zap } from "lucide-react";

function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

export function CapabilitiesMatrix() {
  const icons = { Shield, Activity, CheckCircle };

  return (
    <section className="py-12 md:py-24 w-full bg-secondary/5">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">核心能力矩阵</h2>
          <p className="text-muted-foreground text-base sm:text-lg">经过实战验证的技术栈，交付可衡量的商业价值</p>
        </div>

        {/* Mobile: card stack layout */}
        <div className="md:hidden space-y-4">
          {resumeData.capabilitiesMatrix.map((item, idx) => {
            const Icon = icons[item.icon as keyof typeof icons] || Zap;
            return (
              <div key={idx} className="rounded-xl border border-border bg-background p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-foreground">{item.scene}</span>
                </div>
                <p className="text-sm font-mono text-foreground/80">{item.tech}</p>
                <div className="flex items-center gap-2 text-green-600 font-bold">
                  <TrendingUpIcon className="w-4 h-4" />
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: table layout */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
          <div className="grid grid-cols-12 bg-muted/50 p-4 font-semibold text-sm uppercase tracking-wider text-muted-foreground">
            <div className="col-span-3">应用场景</div>
            <div className="col-span-6">技术实现</div>
            <div className="col-span-3">商业价值</div>
          </div>

          <div className="divide-y divide-border">
            {resumeData.capabilitiesMatrix.map((item, idx) => {
              const Icon = icons[item.icon as keyof typeof icons] || Zap;
              
              return (
                <div key={idx} className="grid grid-cols-12 p-6 items-center hover:bg-muted/20 transition-colors">
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold">{item.scene}</span>
                  </div>
                  
                  <div className="col-span-6 text-base font-mono text-foreground/80">
                    {item.tech}
                  </div>
                  
                  <div className="col-span-3 flex items-center gap-2 text-green-600 font-bold">
                    <TrendingUpIcon className="w-4 h-4" />
                    {item.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
