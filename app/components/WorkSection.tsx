'use client';

import Image from 'next/image';
import { useState } from 'react';
import ProjectModal from './ProjectModal';

interface WorkItem {
  id: string;
  title: string;
  category: string;
  image?: string;
  video?: string;
  description?: string;
}

interface WorkSectionProps {
  title: string;
  category: 'design' | 'film' | 'modeling';
  items: WorkItem[];
}

export default function WorkSection({ title, category, items }: WorkSectionProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);

  return (
    <>
      <section id={category} className="py-24 px-6 bg-zinc-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Artistic corner accents for section */}
          <div className="absolute top-8 left-4 w-16 h-16 border-l border-t border-white/10"></div>
          <div className="absolute top-8 right-4 w-16 h-16 border-r border-t border-white/10"></div>
          
          <div className="text-center mb-16">
            {/* Artistic section header */}
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-6xl font-light text-white mb-4 tracking-tight animate-fade-in relative">
                {title}
                {/* Decorative underline - layered */}
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-white/40"></span>
                <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white/20"></span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="group relative aspect-square overflow-hidden cursor-pointer rounded-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setSelectedItem(item)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
              <div className="absolute inset-0 bg-black">
                {item.video ? (
                  <video
                    src={item.video}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                ) : item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : null}
                {item.video && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              
              <div 
                className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
                  hoveredItem === item.id ? 'opacity-60' : 'opacity-40'
                }`}
              ></div>
              
              {/* Removed title overlay - only show subtle hover effect */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-zinc-700 rounded-lg">
            <p className="text-zinc-400 mb-4">No {title.toLowerCase()} items yet</p>
            <p className="text-sm text-zinc-500">
              Add your {title.toLowerCase()} work to the{' '}
              <code className="bg-zinc-800 px-2 py-1 rounded text-xs text-zinc-300">app/page.tsx</code> file
            </p>
          </div>
        )}
      </div>
    </section>

    <ProjectModal
      item={selectedItem}
      isOpen={selectedItem !== null}
      onClose={() => setSelectedItem(null)}
    />
    </>
  );
}

