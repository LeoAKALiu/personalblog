"use client";

import { useState } from "react";
import { ExternalLink, Maximize2, X, Github, Play } from "lucide-react";
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
    type: string; // 'iframe' | 'image' | 'video'
  };
}

export function ProjectCard({ project }: ProjectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1">
        {/* Card Header/Preview */}
        <div className="h-48 bg-slate-800 relative flex items-center justify-center overflow-hidden">
           {/* Placeholder Gradient if no image */}
           <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
           <div className="relative z-10 text-slate-600 group-hover:text-blue-500 transition-colors">
             {project.type === 'iframe' ? <Play className="w-12 h-12" /> : <Maximize2 className="w-12 h-12" />}
           </div>
           
           {/* Overlay */}
           <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
             <button
               onClick={() => setIsOpen(true)}
               className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium transform scale-90 group-hover:scale-100 transition-transform"
             >
               View Details
             </button>
           </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">{project.category}</span>
              <h3 className="text-xl font-bold text-slate-100 mt-1">{project.title}</h3>
            </div>
          </div>
          
          <p className="text-slate-400 text-sm line-clamp-3 mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <div className="relative w-full max-w-5xl bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <h3 className="text-xl font-bold text-slate-100">{project.title}</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Content Area (Demo/Image) */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-video w-full bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center relative">
                    {project.type === 'iframe' && project.demoUrl ? (
                      <iframe 
                        src={project.demoUrl} 
                        className="w-full h-full" 
                        title={`${project.title} Demo`}
                        sandbox="allow-scripts allow-same-origin"
                      />
                    ) : (
                       <div className="text-center p-8">
                         <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                           <Maximize2 className="w-8 h-8 text-slate-500" />
                         </div>
                         <p className="text-slate-400">Preview Image / Video Placeholder</p>
                         <p className="text-sm text-slate-600 mt-2">Replace with actual asset in implementation</p>
                       </div>
                    )}
                  </div>
                  {project.demoUrl && (
                     <div className="flex justify-end">
                       <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm">
                         Open in new tab <ExternalLink className="w-4 h-4" />
                       </a>
                     </div>
                  )}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                   <div>
                     <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wide mb-2">Description</h4>
                     <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
                   </div>
                   
                   <div>
                     <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wide mb-3">Technologies</h4>
                     <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
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
