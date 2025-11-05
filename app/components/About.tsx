'use client';

import { useEffect, useRef } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.fade-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 fade-on-scroll">
          <h2 className="text-5xl md:text-6xl font-light text-white mb-4 tracking-tight">
            About
          </h2>
          <div className="w-24 h-0.5 bg-white/30 mx-auto"></div>
        </div>

        <div className="prose prose-lg max-w-none text-center fade-on-scroll">
          <p className="text-lg text-zinc-300 leading-relaxed mb-6">
            Welcome to my creative portfolio. I'm passionate about bringing ideas to life 
            through design, film, and modeling. Each project represents a unique exploration 
            of visual storytelling and artistic expression.
          </p>
          <p className="text-lg text-zinc-300 leading-relaxed">
            Whether I'm crafting a brand identity, directing a short film, or collaborating 
            on a photoshoot, my goal is always to create work that is both visually striking 
            and deeply meaningful.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center fade-on-scroll">
          <div className="p-6 rounded-lg bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-light mb-4 text-white">Design</div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Visual communication through typography, color, and composition
            </p>
          </div>
          <div className="p-6 rounded-lg bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-light mb-4 text-white">Film</div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Cinematic storytelling that captures emotion and narrative
            </p>
          </div>
          <div className="p-6 rounded-lg bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-light mb-4 text-white">Modeling</div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Collaborative artistic expression through photography and movement
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

