
import Navbar from "./Navbar";
import GeneratorForm from "./GeneratorForm";
import ImageGallery from "./ImageGallery";
import Footer from "./Footer";
import { GeneratedImage, GenerationConfig } from './types';
import { generateAIImage } from './services/geminiService';

const App: React.FC = () => {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleGenerate = async (config: GenerationConfig) => {
    setIsGenerating(true);
    setError(null);
    try {
      const newImage = await generateAIImage(config);
      setImages(prev => [newImage, ...prev]);
    } catch (err: any) {
      setError(err.message || "Engine encountered an unexpected interruption.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-zinc-100">
      <Navbar 
        isDarkMode={true} 
        toggleTheme={() => {}} 
      />
      
      <main className="flex-grow container mx-auto px-6 max-w-6xl pt-24 pb-32">
        {/* Balanced Hero Section */}
        <header className="mb-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Neural Engine v3.0
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Transform imagination <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-500">into high-end visuals.</span>
          </h1>
          
          <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            A minimal, professional interface for cinematic AI generation. <br className="hidden md:block" />
            Designed for clarity, speed, and creative precision.
          </p>
        </header>

        {/* Workspace Section */}
        <section className="max-w-5xl mx-auto mb-28 relative z-20">
          <div className="relative">
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-violet-600/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <GeneratorForm 
              onGenerate={handleGenerate} 
              isGenerating={isGenerating} 
              error={error}
            />
          </div>
        </section>

        {/* Results Gallery */}
        <section id="gallery" className="pt-20 border-t border-zinc-900/50 relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight mb-1">Library</h2>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Workspace Assets</p>
            </div>
            
            <div className="hidden sm:flex items-center gap-4">
               <div className="h-10 px-5 flex items-center bg-zinc-900/40 backdrop-blur border border-zinc-800 rounded-xl text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                 Count: {images.length}
               </div>
            </div>
          </div>
          
          {images.length > 0 ? (
            <ImageGallery images={images} onDelete={handleDeleteImage} />
          ) : (
            <div className="text-center py-32 rounded-[2rem] border border-zinc-900/40 bg-zinc-900/5 backdrop-blur-sm">
              <div className="w-16 h-16 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6 text-zinc-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              </div>
              <h3 className="text-zinc-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">No Active Generations</h3>
              <p className="text-zinc-700 text-sm max-w-xs mx-auto">Assets will appear here once the generation engine is triggered.</p>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
