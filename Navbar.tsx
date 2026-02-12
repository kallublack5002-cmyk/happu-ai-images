
import React from 'react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-zinc-950/40 backdrop-blur-3xl border-b border-white/[0.04]">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10 border border-white/10">
            <span className="text-white font-black text-lg">H</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white">
              Happu<span className="text-blue-500">.</span>
            </span>
            <span className="text-[8px] font-black tracking-[0.2em] uppercase text-zinc-600 -mt-1">Core Engine</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <a href="#gallery" className="text-[10px] font-black text-zinc-500 hover:text-white transition-all uppercase tracking-[0.2em]">
            Vault
          </a>
          <div className="flex items-center gap-3">
             <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
             </div>
             <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest hidden xs:block">System Online</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
