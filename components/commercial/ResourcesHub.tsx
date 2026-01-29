import { resumeData } from "@/data/resume";
import { FileText, Video, Calculator, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function ResourcesHub() {
  const icons = { FileText, Video, Calculator };

  return (
    <section className="py-24 w-full bg-background border-t border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">资源中心</h2>
            <p className="text-muted-foreground text-lg">加速企业数字化转型的工具与洞察</p>
          </div>
          <Link href="#" className="text-primary font-bold flex items-center gap-2 hover:underline">
            查看所有资源 <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resumeData.resources.map((resource, idx) => {
             const Icon = icons[resource.icon as keyof typeof icons] || FileText;

             return (
               <div key={idx} className="group flex flex-col p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer">
                 <div className="mb-6 w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                   <Icon className="w-6 h-6" />
                 </div>
                 
                 <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{resource.title}</h3>
                 <div className="mt-auto pt-4 flex items-center justify-between text-sm text-muted-foreground">
                   <span className="bg-secondary px-2 py-1 rounded text-xs font-medium uppercase tracking-wider">{resource.type}</span>
                   <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                     获取 <ArrowUpRight className="w-3 h-3" />
                   </span>
                 </div>
               </div>
             )
          })}
        </div>
      </div>
    </section>
  );
}
