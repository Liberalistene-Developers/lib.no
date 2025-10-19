import type { ImageData } from '/react4xp/common/types';

/**
 * Get alt text for an image with fallback chain
 * Client-safe utility function for React components
 */
export const getImageAlt = (image?: ImageData | null, fallback?: string): string => {
  if (!image) {
    return fallback || '';
  }

  return (
    image.alternativeText ||
    image.displayName ||
    fallback ||
    image.url?.split('?')[0].split('/').pop() ||
    ''
  );
};
