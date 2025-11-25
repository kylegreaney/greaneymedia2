'use client';

import { useEffect, useState } from 'react';

interface PageLoaderProps {
  onLoadComplete?: () => void;
}

export default function PageLoader({ onLoadComplete }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate page load - you can adjust timing or use actual load events
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadComplete?.();
    }, 2500); // 2.5 second animation

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
      <div className="relative inline-block">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight greaney-loader">
          GREANEY.
        </h1>
      </div>
    </div>
  );
}

