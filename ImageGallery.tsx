import React, { useState, useEffect } from 'react';
import { GeneratedImage } from '../types';

interface ImageGalleryProps {
  images: GeneratedImage[];
  onDelete: (id: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onDelete }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Lock scroll and handle ESC key for accessibility
  useEffect(() => {
    if (previewUrl) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closePreview();
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [previewUrl]);

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closePreview = () => {
    setPreviewUrl(null);
    setIsZoomed(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="group relative bg-zinc-900/30 rounded-[2.5rem] overflow-hidden border border-zinc-800/40 transition-all duration-500 hover:border-zinc-700 hover:shadow-2xl hover:shadow-blue-500/5"
          >
            <div className="relative aspect-square overflow-hidden bg-black">
              <img 
                src={image.url} 
                alt={image.originalPrompt}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 cursor-pointer"
                onClick={() => setPreviewUrl(image.url)}
              />
              
              {/* Interaction Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1.5 bg-white/10 backdrop-blur-2xl text-white text-[9px] font-black rounded-xl uppercase tracking-widest border border-white/10 shadow-xl">
                    {image.style}
                  </span>
                  <span className="px-3 py-1.5 bg-zinc-950/40 backdrop-blur-2xl text-zinc-400 text-[9px] font-black rounded-xl uppercase tracking-widest border border-white/5 shadow-xl">
                    {image.aspectRatio}
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setPreviewUrl(image.url)}
                    className="flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xl text-white rounded-2xl border border-white/5 hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-2xl"
                    title="Fullscreen Preview"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                  </button>
                  <button 
                    onClick={() => downloadImage(image.url, `happu-export-${image.id}.png`)}
                    className="flex-grow flex items-center justify-center gap-3 py-4 bg-white text-black rounded-2xl font-black text-xs hover:bg-zinc-100 transition-all active:scale-[0.98] shadow-2xl"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Export PNG
                  </button>
                  <button 
                    onClick={() => onDelete(image.id)}
                    className="p-4 bg-zinc-950/80 backdrop-blur-xl text-zinc-500 border border-white/5 rounded-2xl hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all active:scale-[0.98] shadow-2xl"
                    title="Purge"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-sm font-bold text-zinc-200 line-clamp-1 mb-2 tracking-tight group-hover:text-white transition-colors">
                {image.originalPrompt}
              </h3>
              <div className="flex items-center gap-3 text-[9px] text-zinc-600 font-black uppercase tracking-[0.2em]">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>
                <span>Timestamp: {new Date(image.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* True Fullscreen Viewer Layer */}
      {previewUrl && (
        <div 
          className="fixed inset-0 z-[9999] flex flex-col bg-black transition-opacity duration-500 animate-in fade-in ease-out overflow-hidden"
          style={{ width: '100vw', height: '100vh' }}
        >
          {/* Main Content Area */}
          <div 
            className={`relative flex-grow w-full h-full flex items-center justify-center transition-all duration-300 select-none ${isZoomed ? 'overflow-auto cursor-zoom-out' : 'cursor-zoom-in'}`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <img 
              src={previewUrl} 
              alt="High Resolution Asset" 
              className={`max-w-full max-h-full object-contain transition-transform duration-700 ease-out select-none ${isZoomed ? 'scale-150 sm:scale-[2.5]' : 'scale-100'}`}
              style={{ pointerEvents: 'auto' }}
              onClick={(e) => {
                if (isZoomed) {
                  e.stopPropagation();
                  setIsZoomed(false);
                }
              }}
            />
          </div>

          {/* Bottom Center Navigation Controls */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[10000] flex flex-col items-center gap-6">
            <div className="flex gap-4 p-2 bg-zinc-900/60 backdrop-blur-2xl border border-white/5 rounded-[2rem] shadow-2xl">
              <button 
                onClick={closePreview}
                className="flex items-center gap-3 px-8 py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.25em] rounded-2xl hover:bg-zinc-100 transition-all active:scale-95 shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Back to Home
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  downloadImage(previewUrl, 'happu-asset-export.png');
                }}
                className="p-4 bg-zinc-800/80 text-white rounded-2xl hover:bg-zinc-700 transition-all active:scale-95 border border-white/5"
                title="Export"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </button>
            </div>
            
            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] opacity-40 animate-pulse">
              System: Isolated Render View
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;