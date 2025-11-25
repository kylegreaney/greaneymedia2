'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import WindowsPopup from './WindowsPopup';
import WorkSection from './WorkSection';
import Threads from './Threads';

interface WorkItem {
  id: string;
  title: string;
  category: string;
  image?: string;
  video?: string;
  description?: string;
}

interface HeroProps {
  modelingWork: WorkItem[];
  filmWork: WorkItem[];
  designWork: WorkItem[];
  isLoaded?: boolean;
}

export default function Hero({ modelingWork, filmWork, designWork, isLoaded = false }: HeroProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(true);
  const [openPopups, setOpenPopups] = useState<Record<string, boolean>>({});
  const [introPosition, setIntroPosition] = useState<{ x: number; y: number } | null>(null);
  const heroPortrait = useMemo(() => modelingWork[0]?.image ?? '/portfolio/modeling/A15B777C-9A08-49E9-9858-A5E60291B557_1_105_c.jpeg', [modelingWork]);

  useEffect(() => {
    const updatePosition = () => {
      if (typeof window === 'undefined') return;
      const padding = 24;
      const popupWidth = 320;
      const popupHeight = 360;
      setIntroPosition({
        x: window.innerWidth - popupWidth - padding,
        y: window.innerHeight - popupHeight - padding,
      });
    };
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const handleCategoryClick = (category: string) => {
    setOpenPopups(prev => ({ ...prev, [category]: true }));
  };

  const closeCategoryPopup = (category: string) => {
    setOpenPopups(prev => {
      const newPopups = { ...prev };
      delete newPopups[category];
      return newPopups;
    });
  };

  const getWorkItems = (category: string) => {
    switch (category) {
      case 'modeling':
        return modelingWork;
      case 'film':
        return filmWork;
      case 'design':
        return designWork;
      default:
        return [];
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'modeling':
        return 'Modeling';
      case 'film':
        return 'Film';
      case 'design':
        return 'Design';
      default:
        return '';
    }
  };

  return (
    <>
      <section 
        className="fixed inset-0 bg-white flex flex-col overflow-hidden"
      >
        {/* Threads Animation - Center */}
        <div className={`absolute inset-0 z-0 hero-fade-in ${isLoaded ? 'hero-visible' : ''}`}>
          <Threads
            color={[0, 0, 0]}
            amplitude={1}
            distance={0}
            enableMouseInteraction={true}
            pixelation={100000}
            className="w-full h-full"
          />
        </div>

        {/* Top Left - Name and Services */}
        <div className={`absolute top-8 left-8 z-10 hero-fade-in ${isLoaded ? 'hero-visible' : ''}`}>
          <h1 className="text-6xl md:text-8xl font-bold text-black mb-6 tracking-tight">
            GREANEY.
          </h1>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleCategoryClick('modeling')}
              className={`text-lg md:text-xl text-black font-normal text-left hover:underline transition-all cursor-pointer hero-fade-in-delay-1 ${isLoaded ? 'hero-visible' : ''}`}
            >
              Modeling
            </button>
            <button
              onClick={() => handleCategoryClick('design')}
              className={`text-lg md:text-xl text-black font-normal text-left hover:underline transition-all cursor-pointer hero-fade-in-delay-2 ${isLoaded ? 'hero-visible' : ''}`}
            >
              Design
            </button>
            <button
              onClick={() => handleCategoryClick('film')}
              className={`text-lg md:text-xl text-black font-normal text-left hover:underline transition-all cursor-pointer hero-fade-in-delay-3 ${isLoaded ? 'hero-visible' : ''}`}
            >
              Film
            </button>
          </div>
        </div>

        {/* Bottom Right - Folder Icons */}
        <div className={`absolute bottom-8 right-8 z-10 flex flex-col gap-4 items-end hero-fade-in-delay-4 ${isLoaded ? 'hero-visible' : ''}`}>
          {/* About Me Folder */}
          <button
            onClick={() => setIsPopupOpen(true)}
            className="flex flex-col items-center gap-1.5 group cursor-pointer"
            aria-label="About Me"
          >
            {/* Retro Folder Icon - White with black stroke, horizontal - smaller */}
            <div className="relative w-16 h-8">
              {/* Folder body */}
              <div className="absolute inset-0 bg-white border-2 border-black">
                {/* Folder tab - horizontal */}
                <div className="absolute -top-0.5 left-1.5 w-6 h-2 bg-white border-2 border-black border-b-0"></div>
                {/* Folder lines - horizontal layout */}
                <div className="absolute top-2 left-2 w-10 h-0.5 bg-black/30"></div>
                <div className="absolute top-3.5 left-2 w-8 h-0.5 bg-black/30"></div>
                <div className="absolute top-5 left-2 w-12 h-0.5 bg-black/30"></div>
              </div>
            </div>
            <span className="text-black text-xs font-normal group-hover:underline">about me</span>
          </button>
        </div>
      </section>

      {/* Always-open Intro Portrait */}
      <WindowsPopup
        isOpen={isIntroOpen}
        onClose={() => setIsIntroOpen(false)}
        title="GREANEY.jpg"
        size="mini"
        closeOnBackdropClick={false}
        zIndex={70}
        initialPosition={introPosition ?? undefined}
      >
        <div className="w-full rounded border border-zinc-200 overflow-hidden bg-white">
          <Image
            src={heroPortrait}
            alt="Portrait of Kyle Greaney"
            width={420}
            height={520}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </WindowsPopup>

      {/* Category Popups */}
      {(['modeling', 'film', 'design'] as const).map((category) => {
        const popupIndex = Object.keys(openPopups).indexOf(category);
        const isOpen = !!openPopups[category];
        return (
          <WindowsPopup
            key={category}
            isOpen={isOpen}
            onClose={() => closeCategoryPopup(category)}
            title={getCategoryTitle(category)}
            size="large"
            closeOnBackdropClick={false}
            zIndex={50 + (popupIndex >= 0 ? popupIndex : 0)}
            initialPosition={isOpen && popupIndex > 0 ? {
              x: typeof window !== 'undefined' ? window.innerWidth / 2 - 600 + (popupIndex * 50) : 300,
              y: typeof window !== 'undefined' ? window.innerHeight / 2 - 400 + (popupIndex * 50) : 250
            } : undefined}
          >
            <WorkSection
              title={getCategoryTitle(category)}
              category={category}
              items={getWorkItems(category)}
            />
          </WindowsPopup>
        );
      })}

      {/* Windows Popup - About Me */}
      <WindowsPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)}
        size="small"
        closeOnBackdropClick={false}
        zIndex={40}
      >
        <div className="text-black space-y-4">
          <h2 className="text-2xl font-bold mb-4">About Kyle Greaney</h2>
          <p className="leading-relaxed">
            Creative professional exploring the intersections of visual design, 
            cinematic storytelling, and artistic expression.
          </p>
          <p className="leading-relaxed">
            Based in Nashville, I work across multiple creative disciplines to bring 
            ideas to life through design, film, and modeling.
          </p>
          <div className="mt-6 space-y-2">
            <p><strong>Location:</strong> Nashville, TN</p>
            <p><strong>Email:</strong> kyle.greaney02@gmail.com</p>
            <p><strong>Phone:</strong> (918) 282-8820</p>
          </div>
        </div>
      </WindowsPopup>
    </>
  );
}
