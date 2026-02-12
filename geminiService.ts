
import { GoogleGenAI } from "@google/genai";
import { GenerationConfig, GeneratedImage } from "../types";
import { STYLE_PROMPTS } from "../constants.tsx";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateAIImage = async (config: GenerationConfig): Promise<GeneratedImage> => {
  const { prompt, style, aspectRatio } = config;
  
  // Construct the final prompt with style modifiers
  const styleModifier = STYLE_PROMPTS[style];
  const finalPrompt = `${prompt}. ${styleModifier}`.trim();

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: finalPrompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any, // Gemini supports "1:1", "16:9", etc.
        }
      }
    });

    let base64Data = '';
    
    // Find the image part in response candidates
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          base64Data = part.inlineData.data;
          break;
        }
      }
    }

    if (!base64Data) {
      throw new Error("No image data returned from the model.");
    }

    const imageUrl = `data:image/png;base64,${base64Data}`;

    return {
      id: Math.random().toString(36).substring(7),
      url: imageUrl,
      prompt: finalPrompt,
      originalPrompt: prompt,
      style,
      aspectRatio,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
