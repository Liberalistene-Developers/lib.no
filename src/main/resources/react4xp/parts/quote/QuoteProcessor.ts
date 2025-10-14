import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import {getContent as getPortalContent, pageUrl} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';
import {imageUrl} from '/react4xp/utils/image';
import {processHtml} from '/react4xp/utils/html';

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
    image: imageUrl(data.image),
    qoute: processHtml(data.qoute || ''),
    description: processHtml(data.description || ''),
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
        image: imageUrl(authorData.image, 'block(96,128)')
      };
    }).filter(Boolean)
  };
};
