"use client";

import { useState } from "react";
import { ExternalLink, Maximize2, X, Play } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProjectProps {
  project: {
    title: string;
    category: string;
    description: string;
    tags: string[];
    demoUrl: string;
    type: string;
    challenge?: string;
    solution?: string;
    impact?: string;
  };
}

export function ProjectCard({ project }: ProjectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col h-full">
        {/* Card Header/Preview */}
        <div className="h-48 bg-muted relative flex items-center justify-center overflow-hidden shrink-0">
           {/* Placeholder Gradient if no image */}
           <div className="absolute inset-0 bg-gradient-to-br from-muted to-background/50" />
           <div className="relative z-10 text-muted-foreground group-hover:text-primary transition-colors">
             {project.type === 'iframe' ? <Play className="w-12 h-12" /> : <Maximize2 className="w-12 h-12" />}
           </div>
           
           {/* Overlay */}
           <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 backdrop-blur-[2px]">
             <button
               onClick={() => setIsOpen(true)}
               className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-medium transform scale-90 group-hover:scale-100 transition-transform shadow-lg"
             >
               View Case Study
             </button>
           </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-mono text-primary uppercase tracking-wider">{project.category}</span>
              <h3 className="text-xl font-bold text-card-foreground mt-1">{project.title}</h3>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
            {project.description}
          </p>

          {/* Impact Badge (New) */}
          {project.impact && (
            <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">Impact</p>
              <p className="text-sm text-foreground font-medium line-clamp-2">{project.impact}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground border border-border">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground border border-border">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <div className="relative w-full max-w-5xl bg-card rounded-2xl border border-border shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-xl font-bold text-card-foreground">{project.title}</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="aspect-video w-full bg-muted rounded-lg border border-border overflow-hidden flex items-center justify-center relative">
                    {project.type === 'iframe' && project.demoUrl ? (
                      <iframe 
                        src={project.demoUrl} 
                        className="w-full h-full" 
                        title={`${project.title} Demo`}
                        sandbox="allow-scripts allow-same-origin"
                      />
                    ) : (
                       <div className="text-center p-8">
                         <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
                           <Maximize2 className="w-8 h-8 text-muted-foreground" />
                         </div>
                         <p className="text-muted-foreground">Preview Image / Video Placeholder</p>
                       </div>
                    )}
                  </div>
                  
                  {/* STAR Structure Content */}
                  <div className="space-y-6">
                    {project.challenge && (
                      <div>
                        <h4 className="text-lg font-bold text-foreground mb-2">The Challenge</h4>
                        <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
                      </div>
                    )}
                    {project.solution && (
                      <div>
                        <h4 className="text-lg font-bold text-foreground mb-2">The Solution</h4>
                        <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
                      </div>
                    )}
                    {project.impact && (
                      <div>
                        <h4 className="text-lg font-bold text-foreground mb-2">The Impact</h4>
                         <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                            <p className="text-foreground font-medium leading-relaxed">{project.impact}</p>
                         </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                   <div>
                     <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">About</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                   </div>
                   
                   <div>
                     <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Technologies</h4>
                     <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                            {tag}
                          </span>
                        ))}
                     </div>
                   </div>

                   {project.demoUrl && (
                     <div className="pt-4">
                       <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                         Open Live Demo <ExternalLink className="w-4 h-4" />
                       </a>
                     </div>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ProjectCard({ project }: ProjectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-sm">
        {/* Card Header/Preview */}
        <div className="h-48 bg-muted relative flex items-center justify-center overflow-hidden">
           {/* Placeholder Gradient if no image */}
           <div className="absolute inset-0 bg-gradient-to-br from-muted to-background/50" />
           <div className="relative z-10 text-muted-foreground group-hover:text-primary transition-colors">
             {project.type === 'iframe' ? <Play className="w-12 h-12" /> : <Maximize2 className="w-12 h-12" />}
           </div>
           
           {/* Overlay */}
           <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 backdrop-blur-[2px]">
             <button
               onClick={() => setIsOpen(true)}
               className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-medium transform scale-90 group-hover:scale-100 transition-transform shadow-lg"
             >
               View Details
             </button>
           </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-mono text-primary uppercase tracking-wider">{project.category}</span>
              <h3 className="text-xl font-bold text-card-foreground mt-1">{project.title}</h3>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground border border-border">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <div className="relative w-full max-w-5xl bg-card rounded-2xl border border-border shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-xl font-bold text-card-foreground">{project.title}</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Content Area (Demo/Image) */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-video w-full bg-muted rounded-lg border border-border overflow-hidden flex items-center justify-center relative">
                    {project.type === 'iframe' && project.demoUrl ? (
                      <iframe 
                        src={project.demoUrl} 
                        className="w-full h-full" 
                        title={`${project.title} Demo`}
                        sandbox="allow-scripts allow-same-origin"
                      />
                    ) : (
                       <div className="text-center p-8">
                         <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
                           <Maximize2 className="w-8 h-8 text-muted-foreground" />
                         </div>
                         <p className="text-muted-foreground">Preview Image / Video Placeholder</p>
                         <p className="text-sm text-muted-foreground/80 mt-2">Replace with actual asset in implementation</p>
                       </div>
                    )}
                  </div>
                  {project.demoUrl && (
                     <div className="flex justify-end">
                       <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium">
                         Open in new tab <ExternalLink className="w-4 h-4" />
                       </a>
                     </div>
                  )}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                   <div>
                     <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">Description</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                   </div>
                   
                   <div>
                     <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Technologies</h4>
                     <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                            {tag}
                          </span>
                        ))}
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
