
import React, { useState } from 'react';
import { GenerationConfig, AspectRatio, ImageStyle } from '../types';
import { ASPECT_RATIOS, IMAGE_STYLES } from '../constants';

interface GeneratorFormProps {
  onGenerate: (config: GenerationConfig) => void;
  isGenerating: boolean;
  error: string | null;
}

const IconMap: Record<string, React.ReactNode> = {
  palette: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-7"/><circle cx="7.5" cy="7.5" r="4.5"/><path d="m11.5 11.5 7 7"/><path d="M17 14.5a2.5 2.5 0 0 0 5 0c0-1.5-1.5-2.5-2.5-2.5s-2.5 1-2.5 2.5z"/></svg>,
  camera: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
  film: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M17 3v18"/><path d="M3 7h4"/><path d="M3 12h4"/><path d="M3 17h4"/><path d="M17 17h4"/><path d="M17 12h4"/><path d="M17 7h4"/></svg>,
  user: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  sparkles: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
  package: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>,
  zap: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  brush: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.21 0 4-1.79 4-4.02 0-1.66-1.35-3.02-3-3.02z"/></svg>,
};

const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate, isGenerating, error }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ImageStyle>('Ultra-Realistic');
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('1:1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    onGenerate({ prompt, style: selectedStyle, aspectRatio: selectedRatio });
  };

  return (
    <div className="glass-card rounded-[2rem] p-8 md:p-12 border border-white/10">
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
              Description
            </label>
            <span className="text-[10px] font-mono text-zinc-600 uppercase">
              {prompt.length}/1000
            </span>
          </div>
          <div className="relative group">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What do you want to create?"
              className="w-full h-36 p-6 input-premium rounded-2xl outline-none text-lg text-zinc-100 placeholder-zinc-800 leading-relaxed font-normal resize-none"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Style Presets */}
          <div className="space-y-5">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-1">
              Visual Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2.5">
              {IMAGE_STYLES.map((style) => (
                <button
                  key={style.value}
                  type="button"
                  onClick={() => setSelectedStyle(style.value)}
                  className={`flex flex-col items-center justify-center gap-3 py-4 rounded-xl border transition-all duration-200 ${
                    selectedStyle === style.value
                      ? 'border-blue-500/50 bg-blue-500/10 text-blue-400'
                      : 'border-white/5 bg-white/[0.02] text-zinc-500 hover:border-white/10'
                  }`}
                >
                  <span className={`${selectedStyle === style.value ? 'text-blue-400' : 'text-zinc-700'}`}>
                    {IconMap[style.iconName]}
                  </span>
                  <span className="text-[8px] font-black uppercase tracking-wider">{style.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio Buttons */}
          <div className="space-y-5">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-1">
              Aspect Ratio
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {ASPECT_RATIOS.map((ratio) => (
                <button
                  key={ratio.value}
                  type="button"
                  onClick={() => setSelectedRatio(ratio.value)}
                  className={`flex items-center justify-center py-4 px-4 rounded-xl border transition-all duration-200 text-[10px] font-bold tracking-tight uppercase ${
                    selectedRatio === ratio.value
                      ? 'border-violet-500/50 bg-violet-500/10 text-violet-300'
                      : 'border-white/5 bg-white/[0.02] text-zinc-600 hover:border-white/10'
                  }`}
                >
                  {ratio.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="p-5 bg-red-500/5 border border-red-500/10 rounded-2xl text-red-400 text-xs flex items-center gap-4 animate-in fade-in slide-in-from-top-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span className="font-semibold">{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className={`w-full py-5 rounded-2xl flex items-center justify-center gap-4 text-sm font-black text-white tracking-[0.2em] uppercase transition-all glow-button group/btn ${
            isGenerating 
              ? 'bg-zinc-900 text-zinc-700 cursor-not-allowed border border-zinc-800 opacity-50' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 border border-white/10'
          }`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5 text-zinc-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <span>Generate Image</span>
              <svg className="transition-transform group-hover/btn:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default GeneratorForm;
