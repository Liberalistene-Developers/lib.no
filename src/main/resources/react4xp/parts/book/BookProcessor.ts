import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import {getContent as getPortalContent} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';

interface BookData {
  description?: string;
  ingress?: string;
  text?: string;
  image?: string;
  tags?: string;
  author?: string | string[];
}

export const bookProcessor: ComponentProcessor<'lib.no:book'> = () => {
  const content = getPortalContent();
  if (!content) {
    return {};
  }

  const data = content.data as BookData;
  const authors = data.author ? [].concat(data.author) : [];

  return {
    title: content.displayName,
    // TODO: Add back when /lib/shared/image is migrated
    // image: imageUrl(data.image),
    image: data.image, // Temporarily unprocessed
    description: data.description,
    tags: data.tags,
    authors: authors.map((authorID) => {
      const authorContent = getContent({key: authorID});
      if (!authorContent) {
        return null;
      }

      const authorData = authorContent.data as Record<string, unknown>;

      return {
        authorID,
        personUrl: pageUrl({path: authorContent._path}),
        person: authorContent.displayName,
        // TODO: Add back when /lib/shared/image is migrated
        // image: imageUrl(authorData.image as string, 'block(96,128)')
        image: authorData.image // Temporarily unprocessed
      };
    }).filter(Boolean),
    // TODO: Add back when /lib/shared/html is migrated
    // ingress: processHtml(data.ingress || ''),
    // text: processHtml(data.text || '')
    ingress: data.ingress || '', // Temporarily unprocessed
    text: data.text || '' // Temporarily unprocessed
  };
};
