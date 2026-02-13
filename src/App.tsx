import React, { useState, useEffect } from "react";

import Navbar from "./Navbar";
import GeneratorForm from "./GeneratorForm";
import ImageGallery from "./ImageGallery";
import Footer from "./Footer";
import { GeneratedImage, GenerationConfig } from "./types";
import { generateAIImage } from "./services/geminiService";

const App: React.FC = () => {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleGenerate = async (config: GenerationConfig) => {
    setIsGenerating(true);
    setError(null);

    try {
      const newImage = await generateAIImage(config);
      setImages(prev => [newImage, ...prev]);
    } catch (err: any) {
      setError(
        err.message || "Engine encountered an unexpected interruption."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-zinc-100">

      <Navbar isDarkMode={true} toggleTheme={() => {}} />

      <main className="flex-grow container mx-auto px-6 max-w-6xl pt-24 pb-32">

        {/* Hero */}
        <header className="mb-20 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Transform imagination <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-500">
              into high-end visuals
            </span>
          </h1>

          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            Professional AI image generation workspace.
          </p>
        </header>

        {/* Generator */}
        <section className="max-w-5xl mx-auto mb-28">
          <GeneratorForm
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            error={error}
          />
        </section>

        {/* Gallery */}
        <section className="pt-20 border-t border-zinc-900/50">
          <h2 className="text-3xl font-bold mb-10">Library</h2>

          {images.length > 0 ? (
            <ImageGallery
              images={images}
              onDelete={handleDeleteImage}
            />
          ) : (
            <div className="text-center py-20 text-zinc-600">
              No images generated yet.
            </div>
          )}
        </section>

      </main>

      <Footer />

    </div>
  );
};

export default App;
