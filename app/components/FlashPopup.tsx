'use client';

import { useState, useEffect, useRef } from 'react';

interface FlashPopupProps {
  isOpen: boolean;
  onClose: () => void;
  imagePath: string;
  initialPosition?: { x: number; y: number };
  closeOnBackdropClick?: boolean;
  zIndex?: number;
}

export default function FlashPopup({ isOpen, onClose, imagePath, initialPosition, closeOnBackdropClick = false, zIndex = 60 }: FlashPopupProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && initialPosition) {
      setPosition(initialPosition);
    } else if (isOpen) {
      // Position slightly offset from center so both can be visible
      const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 - 350 : 250;
      const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 - 250 : 250;
      setPosition({ x: centerX, y: centerY });
    }
  }, [isOpen, initialPosition]);

  useEffect(() => {
    if (!isOpen) return;
    
    // Reset animation when popup opens
    setIsAnimating(true);
    
    // Create a repeating flash/fade effect
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 2000); // Flash every 2 seconds

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
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
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20"
      style={{ zIndex }}
      onClick={closeOnBackdropClick ? onClose : undefined}
    >
      <div
        ref={popupRef}
        className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] shadow-[inset_1px_1px_0_#000,inset_-1px_-1px_0_#fff] w-[90vw] max-w-[600px] h-[70vh] max-h-[500px] flex flex-col absolute"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar - Draggable */}
        <div 
          className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between h-6 text-xs font-bold cursor-move"
          onMouseDown={handleMouseDown}
        >
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 bg-white/20 border border-white/40 flex items-center justify-center text-[10px]">
              📷
            </span>
            GREANEY.flash
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

        {/* Content Area with Image */}
        <div className="flex-1 bg-white p-4 overflow-auto border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white flex items-center justify-center relative">
          <div className={`relative w-full h-full flex items-center justify-center transition-opacity duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-70'}`}>
            <img
              src={imagePath}
              alt="GREANEY Flash"
              className="max-w-full max-h-full object-contain"
              style={{ width: 'auto', height: 'auto' }}
              onError={(e) => {
                // Try URL encoded version if direct path fails
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('%20')) {
                  target.src = imagePath.replace(/ /g, '%20');
                }
              }}
            />
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-[#c0c0c0] border-t border-[#808080] px-2 py-0.5 text-xs h-5 flex items-center">
          Playing...
        </div>
      </div>
    </div>
  );
}

