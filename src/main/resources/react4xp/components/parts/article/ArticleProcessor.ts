import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getContent as getPortalContent} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';

interface ArticleConfig {
  headerColor?: string;
  headerPosition?: string;
  ingressInImage?: boolean;
  titleInImage?: boolean;
}

interface ArticleData {
  date?: string;
  description?: string;
  ingress?: string;
  text?: string;
  image?: string;
  tags?: string;
  author?: string | string[];
}

export const articleProcessor: ComponentProcessor<'lib.no:article'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as ArticleConfig;

  const content = getPortalContent();
  if (!content) {
    return {};
  }

  const data = content.data as ArticleData;
  const authors = [].concat(data.author || []);

  return {
    headerColor: config?.headerColor,
    headerPosition: config?.headerPosition,
    ingressInImage: !!config?.ingressInImage,
    titleInImage: !!config?.titleInImage,
    title: content.displayName,
    datePublished: data.date,
    // TODO: Add back when /lib/shared/image is migrated
    // image: imageUrl(data.image, 'full'),
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
        // image: imageUrl(authorData.image as string, 'square(40)')
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
