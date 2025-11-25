'use client';

import { useState, useRef, useEffect, useCallback, type PointerEvent as ReactPointerEvent } from 'react';

interface WindowsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  size?: 'small' | 'large' | 'mini';
  closeOnBackdropClick?: boolean;
  zIndex?: number;
}

export default function WindowsPopup({ 
  isOpen, 
  onClose, 
  title = 'About Me', 
  children, 
  initialPosition,
  size = 'small',
  closeOnBackdropClick = true,
  zIndex = 50
}: WindowsPopupProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateIsMobile = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth < 768);
    };
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  const getBaseDimensions = useCallback(() => {
    switch (size) {
      case 'large':
        return { width: 1200, height: 800 };
      case 'mini':
        return { width: 320, height: 420 };
      default:
        return { width: 600, height: 500 };
    }
  }, [size]);

  const clampPosition = useCallback((x: number, y: number) => {
    if (typeof window === 'undefined') {
      return { x, y };
    }
    const popup = popupRef.current;
    const margin = isMobile ? 8 : 16;
    const base = getBaseDimensions();
    const width = popup?.offsetWidth ?? (isMobile ? window.innerWidth - margin * 2 : base.width);
    const height = popup?.offsetHeight ?? (isMobile ? window.innerHeight - margin * 2 : base.height);
    const maxX = Math.max(margin, window.innerWidth - width - margin);
    const maxY = Math.max(margin, window.innerHeight - height - margin);
    return {
      x: Math.min(Math.max(margin, x), maxX),
      y: Math.min(Math.max(margin, y), maxY),
    };
  }, [isMobile, getBaseDimensions]);

  useEffect(() => {
    if (isOpen && initialPosition) {
      setPosition(initialPosition);
    } else if (isOpen) {
      // Center the popup, or offset if another popup might be open
      if (typeof window === 'undefined') return;
      const base = getBaseDimensions();
      const width = isMobile ? window.innerWidth - 16 : base.width;
      const height = isMobile ? window.innerHeight - 32 : base.height;
      const centerX = window.innerWidth / 2 - width / 2;
      const centerY = window.innerHeight / 2 - height / 2;
      setPosition(clampPosition(centerX, centerY));
    }
  }, [isOpen, initialPosition, size, clampPosition, isMobile, getBaseDimensions]);

  const handlePointerDown = (e: ReactPointerEvent) => {
    if (popupRef.current) {
      const rect = popupRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        setPosition(clampPosition(e.clientX - dragOffset.x, e.clientY - dragOffset.y));
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointercancel', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isDragging, dragOffset, clampPosition]);

  useEffect(() => {
    if (isOpen) {
      setPosition((prev) => clampPosition(prev.x, prev.y));
    }
  }, [isMobile, size, isOpen, clampPosition]);

  if (!isOpen) return null;

  const overlayClasses = closeOnBackdropClick
    ? 'bg-black/20 pointer-events-auto'
    : 'bg-transparent pointer-events-none';

  const desktopSizeClasses = (() => {
    switch (size) {
      case 'large':
        return 'w-[95vw] max-w-[1200px] h-[90vh] max-h-[800px]';
      case 'mini':
        return 'w-[320px] h-auto';
      default:
        return 'w-[90vw] max-w-[600px] h-[70vh] max-h-[500px]';
    }
  })();

  const mobileSizeClasses = (() => {
    switch (size) {
      case 'large':
        return 'w-[calc(100vw-1rem)] max-w-none h-[calc(100vh-4rem)] max-h-none';
      case 'mini':
        return 'w-[80vw] max-w-[320px] h-auto';
      default:
        return 'w-[calc(100vw-1rem)] max-w-none h-[75vh] max-h-none';
    }
  })();

  const appliedSizeClasses = isMobile ? mobileSizeClasses : desktopSizeClasses;

  return (
    <div
      className={`fixed inset-0 ${overlayClasses}`}
      style={{ zIndex }}
      onClick={closeOnBackdropClick ? onClose : undefined}
    >
      <div 
        ref={popupRef}
        className={`bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] shadow-[inset_1px_1px_0_#000,inset_-1px_-1px_0_#fff] ${appliedSizeClasses} flex flex-col absolute pointer-events-auto`}
        style={{ left: `${position.x}px`, top: `${position.y}px`, touchAction: 'none' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar - Draggable */}
        <div 
          className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between h-6 text-xs font-bold cursor-move"
          onPointerDown={handlePointerDown}
        >
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 bg-white/20 border border-white/40 flex items-center justify-center text-[10px]">
              ?
            </span>
            {title}
          </span>
          <button
            onClick={onClose}
            className="w-5 h-5 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0] active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white flex items-center justify-center text-black font-bold text-xs leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Menu Bar */}
        <div className="bg-[#c0c0c0] border-b border-[#808080] px-1 text-xs h-5 flex items-center">
          <button className="px-2 hover:bg-[#000080] hover:text-white">File</button>
          <button className="px-2 hover:bg-[#000080] hover:text-white">Edit</button>
          <button className="px-2 hover:bg-[#000080] hover:text-white">View</button>
          <button className="px-2 hover:bg-[#000080] hover:text-white">Help</button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white p-4 overflow-auto border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white">
          {children}
        </div>

        {/* Status Bar */}
        <div className="bg-[#c0c0c0] border-t border-[#808080] px-2 py-0.5 text-xs h-5 flex items-center">
          Ready
        </div>
      </div>
    </div>
  );
}

