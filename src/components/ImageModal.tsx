import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Info } from 'lucide-react';
import { StepHotspot } from '../types';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  title: string;
  hotspots?: StepHotspot[];
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
  hotspots = [],
}) => {
  const [zoom, setZoom] = useState(1);
  const [activeHotspot, setActiveHotspot] = useState<StepHotspot | null>(null);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.3, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.3, 0.7));
  const handleResetZoom = () => {
    setZoom(1);
    setActiveHotspot(null);
  };

  return (
    <div
      id="image-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="image-modal-container"
        className="relative w-full max-w-5xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {title} - High-Resolution Scientific Diagram
            </h3>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              id="modal-zoom-out-btn"
              onClick={handleZoomOut}
              className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-2 py-1 bg-stone-200 dark:bg-stone-800 rounded text-stone-700 dark:text-stone-300">
              {Math.round(zoom * 100)}%
            </span>
            <button
              id="modal-zoom-in-btn"
              onClick={handleZoomIn}
              className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              id="modal-reset-zoom-btn"
              onClick={handleResetZoom}
              className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
              title="Reset Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="h-4 w-px bg-stone-300 dark:bg-stone-700 mx-1" />
            <button
              id="modal-close-btn"
              onClick={onClose}
              className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Canvas */}
        <div className="relative flex-1 overflow-auto bg-stone-950 flex items-center justify-center p-6 min-h-[420px]">
          <div
            className="relative transition-transform duration-200 origin-center"
            style={{ transform: `scale(${zoom})` }}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-xl"
            />

            {/* Hotspots */}
            {hotspots.map((spot) => (
              <button
                key={spot.id}
                id={`hotspot-${spot.id}`}
                onClick={() => setActiveHotspot(spot)}
                className={`absolute w-7 h-7 -ml-3.5 -mt-3.5 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-lg ring-4 ${
                  activeHotspot?.id === spot.id
                    ? 'bg-amber-400 text-stone-950 ring-amber-400/50 scale-125 animate-bounce'
                    : 'bg-indigo-600 text-white ring-indigo-500/40 hover:scale-110 hover:bg-indigo-500'
                }`}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                title={spot.label}
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        </div>

        {/* Hotspot details banner */}
        {activeHotspot ? (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border-t border-amber-200 dark:border-amber-900/50 flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Hotspot Detail
              </span>
              <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base">
                {activeHotspot.label}
              </h4>
              <p className="text-sm text-stone-700 dark:text-stone-300">
                {activeHotspot.description}
              </p>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="px-6 py-3 bg-stone-100 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span>💡 Tip: Click on the interactive pinpoint markers to explore specific molecular machines.</span>
            <span>Use zoom controls to inspect cellular details.</span>
          </div>
        )}
      </div>
    </div>
  );
};
