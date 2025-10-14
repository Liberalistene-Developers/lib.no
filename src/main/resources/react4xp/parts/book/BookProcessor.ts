import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import {getContent as getPortalContent} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';
import {imageUrl} from '/react4xp/utils/image';
import {processHtml} from '/react4xp/utils/html';

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
    image: imageUrl(data.image),
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
        image: imageUrl(authorData.image as string, 'block(96,128)')
      };
    }).filter(Boolean),
    ingress: processHtml(data.ingress || ''),
    text: processHtml(data.text || '')
  };
};
