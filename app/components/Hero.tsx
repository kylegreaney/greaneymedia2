'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import DecryptedText from './DecryptedText';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const parallax = scrolled * 0.5;
        heroRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Hero Image - centered, maintains aspect ratio, not stretched */}
      <div ref={heroRef} className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src="/portfolio/modeling/A15B777C-9A08-49E9-9858-A5E60291B557_1_105_c.jpeg"
            alt="Cover"
            fill
            priority
            className="object-contain"
            quality={95}
            sizes="100vw"
          />
        </div>
      </div>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.4),transparent_70%)]"></div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6 relative">
          <DecryptedText
            text="Kyle Greaney"
            animateOn="view"
            sequential
            revealDirection="start"
            speed={80}
            className="text-white drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_20px_rgba(0,0,0,0.9)]"
          />
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-light mb-4 drop-shadow-lg">
          <DecryptedText
            text="Design • Film • Modeling"
            animateOn="view"
            speed={70}
            className=""
          />
        </p>
        <p className="text-sm md:text-base text-white/70 font-light mb-8 tracking-widest uppercase">
          <DecryptedText
            text="Nashville-based"
            animateOn="view"
            sequential
            speed={60}
            className=""
          />
        </p>
        
        {/* Decorative line element */}
        <div className="w-32 h-px bg-white/30 mx-auto mb-8"></div>
        
        <div className="mt-12">
          <a 
            href="#work" 
            className="text-white/90 hover:text-white transition-colors duration-300 text-lg font-light"
          >
            View Work
          </a>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#modeling"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white transition-all duration-300 rounded-lg backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-105 text-lg font-light"
            >
              Modeling
            </a>
            <a
              href="#film"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white transition-all duration-300 rounded-lg backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-105 text-lg font-light"
            >
              Film
            </a>
            <a
              href="#design"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white transition-all duration-300 rounded-lg backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-105 text-lg font-light"
            >
              Design
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

