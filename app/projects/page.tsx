import { resumeData } from "@/data/resume";
import { ProjectCard } from "@/components/ProjectCard";
import { Hammer } from "lucide-react";

export default function ProjectsPage() {
  const categories = Array.from(new Set(resumeData.projects.map(p => p.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
          <Hammer className="w-8 h-8 text-primary" />
          Projects & Portfolio
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          A collection of my work in intelligent construction systems, computer vision algorithms, and commercial products.
        </p>
      </div>

      <div className="space-y-16">
        {categories.map((category) => (
          <section key={category} className="space-y-6">
            <h2 className="text-2xl font-bold text-card-foreground border-b border-border pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumeData.projects
                .filter((p) => p.category === category)
                .map((project, idx) => (
                  <ProjectCard key={idx} project={project} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
