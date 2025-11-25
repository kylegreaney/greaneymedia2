'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
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

const isYoutubeUrl = (url?: string) => {
  if (!url) return false;
  return url.includes('youtube.com') || url.includes('youtu.be');
};

const getYoutubeEmbedUrl = (url: string) => {
  if (url.includes('embed')) {
    return url.includes('autoplay')
      ? url
      : `${url}${url.includes('?') ? '&' : '?'}autoplay=1&mute=1&rel=0&modestbranding=1`;
  }
  let videoId = '';
  if (url.includes('watch?v=')) {
    videoId = url.split('watch?v=')[1]?.split('&')[0] ?? '';
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0] ?? '';
  }
  const base = videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  return `${base}${base.includes('?') ? '&' : '?'}autoplay=1&mute=1&rel=0&modestbranding=1`;
};

export default function WorkSection({ title, category, items }: WorkSectionProps) {
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="w-full h-full bg-white">
        <div 
          ref={containerRef}
          className={`gap-4 p-4 ${category === 'film' && items.length === 1 ? 'flex flex-col' : 'columns-1 md:columns-2 lg:columns-3'}`}
          style={{ columnGap: '1rem' }}
        >
            {items.map((item) => {
              const youtubeVideo = isYoutubeUrl(item.video);
              const wrapperClasses = youtubeVideo && category === 'film'
                ? 'relative w-full pb-[56.25%] md:h-[75vh] md:pb-0'
                : youtubeVideo
                  ? 'relative w-full pb-[56.25%]'
                  : 'relative w-full';

              return (
                <div
                  key={item.id}
                  className={`group relative break-inside-avoid mb-4 overflow-hidden cursor-pointer bg-black rounded-sm ${category === 'film' && items.length === 1 ? 'w-full md:min-h-[75vh]' : ''}`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative w-full h-full">
                    {item.video ? (
                      <div className={wrapperClasses}>
                        {youtubeVideo ? (
                          <iframe
                            src={getYoutubeEmbedUrl(item.video)}
                            className="absolute inset-0 w-full h-full rounded-sm"
                            title={item.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                            loading="lazy"
                          />
                        ) : (
                          <video
                            src={item.video}
                            className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                            muted
                            loop
                            playsInline
                            autoPlay
                          />
                        )}
                        {!youtubeVideo && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : item.image ? (
                      <div className="relative w-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={800}
                          height={1200}
                          className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
        </div>

        {items.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-zinc-300 rounded-lg">
            <p className="text-zinc-500 mb-4">No {title.toLowerCase()} items yet</p>
            <p className="text-sm text-zinc-400">
              Add your {title.toLowerCase()} work to the{' '}
              <code className="bg-zinc-100 px-2 py-1 rounded text-xs">app/page.tsx</code> file
            </p>
          </div>
        )}
      </div>

    <ProjectModal
      item={selectedItem}
      isOpen={selectedItem !== null}
      onClose={() => setSelectedItem(null)}
    />
    </>
  );
}

