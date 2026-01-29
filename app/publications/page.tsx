import { resumeData } from "@/data/resume";
import { BookOpen, FileText, Lightbulb } from "lucide-react";

export default function PublicationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-primary" />
          Academic Output
        </h1>
        <p className="text-muted-foreground text-lg">
          Research papers and patents contributing to the field of Intelligent Construction and Computer Vision.
        </p>
      </div>

      {/* Publications */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-card-foreground">Selected Publications</h2>
        </div>
        <div className="space-y-4">
          {resumeData.publications.map((pub, idx) => (
            <div 
              key={idx} 
              className="p-6 bg-card border border-border rounded-xl hover:border-border/80 transition-colors shadow-sm"
            >
              <p className="text-muted-foreground leading-relaxed font-serif text-lg">
                {pub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Patents */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-card-foreground">Patents</h2>
        </div>
        <div className="space-y-4">
          {resumeData.patents.map((patent, idx) => (
            <div 
              key={idx} 
              className="p-6 bg-card/50 border border-border rounded-xl hover:bg-card transition-colors shadow-sm"
            >
              <p className="text-muted-foreground font-mono text-sm mb-2">Patent {idx + 1}</p>
              <p className="text-foreground">
                {patent}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
