import { get as getContent } from '/lib/xp/content';
import { attachmentUrl, imageUrl as portalImageUrl } from '/lib/xp/portal';

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
