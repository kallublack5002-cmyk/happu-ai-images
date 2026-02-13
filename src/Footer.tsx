import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 border-t border-zinc-900/50 bg-transparent">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-4 mb-6 select-none grayscale opacity-30 hover:opacity-80 transition-opacity duration-700">
          <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
            <span className="text-zinc-400 font-extrabold text-sm">H</span>
          </div>
          <span className="text-sm text-zinc-300 font-black uppercase tracking-[0.4em]">Happu AI © 2026</span>
        </div>
        <p className="text-[10px] text-zinc-700 font-medium tracking-[0.1em] uppercase max-w-xs leading-loose">
          Visual Rendering Core v3.0.1 <br/>
          Secure Encrypted Session Active
        </p>
      </div>
    </footer>
  );
};

export default Footer;
