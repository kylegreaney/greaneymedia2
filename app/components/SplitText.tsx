'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  splitBy?: 'chars' | 'words';
}

export default function SplitText({ 
  text, 
  delay = 0, 
  duration = 0.6,
  className = '',
  splitBy = 'chars'
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.children;
    const timeline = gsap.timeline({ delay: delay / 1000 });

    // Set initial state
    gsap.set(chars, {
      opacity: 0,
      y: 20,
    });

    // Animate in
    timeline.to(chars, {
      opacity: 1,
      y: 0,
      duration: duration,
      stagger: duration / chars.length,
      ease: 'power2.out',
    });

    return () => {
      timeline.kill();
    };
  }, [text, delay, duration]);

  const splitText = () => {
    if (splitBy === 'words') {
      return text.split(' ').map((word, i, arr) => (
        <span key={i} className="inline-block">
          {word}
          {i < arr.length - 1 && '\u00A0'}
        </span>
      ));
    } else {
      return text.split('').map((char, i) => (
        <span key={i} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }
  };

  return (
    <div ref={containerRef} className={className}>
      {splitText()}
    </div>
  );
}


