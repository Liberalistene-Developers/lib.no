import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import {getContent as getPortalContent, pageUrl} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';

interface QuoteData {
  description?: string;
  qoute?: string;
  image?: string;
  tags?: string;
  author?: string | string[];
}

interface PersonData {
  image?: string;
}

export const quoteProcessor: ComponentProcessor<'lib.no:quote'> = () => {
  const content = getPortalContent();
  if (!content) {
    return {};
  }

  const data = content.data as QuoteData;
  const authors = data.author ? [].concat(data.author) : [];

  return {
    title: content.displayName,
    // TODO: Add back when /lib/shared/image is migrated
    // image: imageUrl(data.image),
    image: data.image, // Temporarily unprocessed
    // TODO: Add back when /lib/shared/html is migrated
    // qoute: processHtml(data.qoute || ''),
    // description: processHtml(data.description || ''),
    qoute: data.qoute || '', // Temporarily unprocessed
    description: data.description || '', // Temporarily unprocessed
    tags: data.tags,
    authors: authors.map((authorID) => {
      const authorContent = getContent({key: authorID});
      if (!authorContent) {
        return null;
      }

      const authorData = authorContent.data as PersonData;

      return {
        authorID,
        personUrl: pageUrl({path: authorContent._path}),
        person: authorContent.displayName,
        // TODO: Add back when /lib/shared/image is migrated
        // image: imageUrl(authorData.image, 'block(96,128)')
        image: authorData.image // Temporarily unprocessed
      };
    }).filter(Boolean)
  };
};
