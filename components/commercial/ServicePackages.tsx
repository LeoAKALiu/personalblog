import { resumeData } from "@/data/resume";
import { Check, ArrowRight } from "lucide-react";

export function ServicePackages() {
  return (
    <section className="py-24 w-full bg-background" id="services">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">合作模式</h2>
          <p className="text-muted-foreground text-lg">从战略规划到快速技术验证的全方位服务</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resumeData.servicePackages.map((pkg, idx) => (
            <div key={idx} className={`relative flex flex-col p-8 rounded-3xl border ${idx === 1 ? 'border-primary shadow-2xl bg-primary/5' : 'border-border bg-card'} transition-all hover:scale-105 duration-300`}>
              {idx === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  最受欢迎
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                <div className="text-muted-foreground text-sm font-medium mb-4">{pkg.target}</div>
                <div className="text-2xl font-bold text-primary">{pkg.price}</div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {pkg.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-3 px-6 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 ${idx === 1 ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
                立即预约
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
