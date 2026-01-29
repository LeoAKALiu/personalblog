import { resumeData } from "@/data/resume";
import { XCircle, CheckCircle2, TrendingUp } from "lucide-react";

export function ValueProposition() {
  return (
    <section className="py-24 w-full bg-secondary/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">价值主张</h2>
          <p className="text-muted-foreground text-lg">直击现代建筑工程核心痛点</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {resumeData.valueProposition.map((item, idx) => (
            <div key={idx} className="bg-background rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-blue-500 to-green-500"></div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-red-500 font-semibold text-sm uppercase tracking-wider">
                    <XCircle className="w-4 h-4" />
                    客户痛点
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.pain}</h3>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-500 font-semibold text-sm uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    解决方案
                  </div>
                  <p className="text-foreground/80 font-medium">{item.solution}</p>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-green-600 font-bold text-lg">
                    <TrendingUp className="w-5 h-5" />
                    {item.roi}
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">{item.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
