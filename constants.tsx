import { AspectRatio, ImageStyle } from './types';

export const ASPECT_RATIOS: { label: string; value: AspectRatio }[] = [
  { label: 'Square (1:1)', value: '1:1' },
  { label: 'Wide (16:9)', value: '16:9' },
  { label: 'Portrait (9:16)', value: '9:16' },
  { label: 'Standard (4:3)', value: '4:3' },
  { label: 'Photo (3:2)', value: '3:2' },
  { label: 'Social (4:5)', value: '4:5' },
];

export const IMAGE_STYLES: { label: string; value: ImageStyle; iconName: string }[] = [
  { label: 'Standard', value: 'None', iconName: 'palette' },
  { label: 'Realistic', value: 'Ultra-Realistic', iconName: 'camera' },
  { label: 'Cinematic', value: 'Cinematic', iconName: 'film' },
  { label: 'Portrait', value: 'Portrait', iconName: 'user' },
  { label: 'Fantasy', value: 'Fantasy', iconName: 'sparkles' },
  { label: 'Product', value: 'Product Photography', iconName: 'package' },
  { label: 'Anime', value: 'Anime', iconName: 'zap' },
  { label: 'Artistic', value: 'Artistic', iconName: 'brush' },
];

export const STYLE_PROMPTS: Record<ImageStyle, string> = {
  'Ultra-Realistic': 'Ultra-realistic photography, hyper-detailed, 8k resolution, photorealistic, sharp focus, natural lighting, shot on 35mm lens.',
  'Cinematic': 'Cinematic lighting, dramatic shadows, moody atmosphere, wide angle lens, Hollywood color grading, 8k resolution, highly detailed.',
  'Portrait': 'Close-up portrait photography, shallow depth of field, bokeh background, sharp eyes, detailed skin textures, soft lighting.',
  'Fantasy': 'Epic fantasy art style, magical atmosphere, intricate details, ethereal lighting, vibrant colors, dreamlike composition.',
  'Product Photography': 'Studio product photography, clean background, sharp focus, professional lighting, minimalist aesthetic, commercial quality.',
  'Anime': 'High-quality anime style, vibrant cel-shaded colors, clean lines, Japanese animation aesthetic, detailed background.',
  'Artistic': 'Fine art painting style, expressive brushwork, creative composition, unique color palette, artistic texture.',
  'None': '',
};