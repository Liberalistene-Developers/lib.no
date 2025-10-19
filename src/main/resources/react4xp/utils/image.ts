import { get as getContent } from '/lib/xp/content';
import { attachmentUrl, imageUrl as portalImageUrl } from '/lib/xp/portal';

import type { ImageData } from '/react4xp/common/types';

// Re-export ImageData for server-side code
export type { ImageData } from '/react4xp/common/types';

export type ImageMapper = (image: ImageData) => ImageData;

/**
 * Server-side image URL generator
 * This function uses Enonic XP server-side libraries and should only be used in processors
 */
export const imageUrl = (
  id?: string,
  scale: string = 'block(256,192)',
  rounded: string = ''
): ImageData | null => {
  if (!id) {
    return null;
  }

  const content = getContent({key: id}) || {};

  return {
    ...content,
    url:
      scale !== 'full'
        ? portalImageUrl({
            id,
            filter: `${rounded}sharpen();`,
            scale: scale as 'full'
          })
        : attachmentUrl({id})
  };
};
