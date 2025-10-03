import {imageUrl as portalImageUrl, attachmentUrl} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';

interface ImageData {
  url?: string;
  [key: string]: unknown;
}

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
