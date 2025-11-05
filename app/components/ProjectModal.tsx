'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface WorkItem {
  id: string;
  title: string;
  category: string;
  image?: string;
  video?: string;
  description?: string;
}

interface ProjectModalProps {
  item: WorkItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ item, isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
        aria-label="Close"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Content */}
      <div
        className={`relative w-full h-full max-w-[95vw] mx-auto px-4 py-8 flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media Container - Full screen, larger */}
        <div className="relative w-full h-full flex items-center justify-center p-4">
          {item.video ? (
            <video
              src={item.video}
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain"
              controls
              autoPlay
              loop
              playsInline
            />
          ) : item.image ? (
            <div className="relative w-full h-full flex items-center justify-center" style={{ maxWidth: '90vw', maxHeight: '90vh' }}>
              <Image
                src={item.image}
                alt={item.title}
                width={2000}
                height={3000}
                className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain"
                sizes="90vw"
                priority
                quality={95}
                style={{ maxWidth: '90vw', maxHeight: '90vh', width: 'auto', height: 'auto' }}
              />
            </div>
          ) : null}
        </div>
      </div>

      {/* Background overlay for click-to-close */}
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
}

