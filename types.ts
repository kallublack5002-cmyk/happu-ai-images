
export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:2' | '4:5';

export type ImageStyle = 
  | 'Ultra-Realistic'
  | 'Cinematic'
  | 'Portrait'
  | 'Fantasy'
  | 'Product Photography'
  | 'Anime'
  | 'Artistic'
  | 'None';

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  originalPrompt: string;
  style: ImageStyle;
  aspectRatio: AspectRatio;
  timestamp: number;
}

export interface GenerationConfig {
  prompt: string;
  style: ImageStyle;
  aspectRatio: AspectRatio;
}
