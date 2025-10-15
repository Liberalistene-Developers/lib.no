import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getContent as getPortalContent} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';
import {imageUrl} from '/react4xp/utils/image';
import {processHtml} from '/react4xp/utils/html';

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

  log.info(`[ArticleProcessor] Processing path: ${partComponent.path}`);

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
    image: imageUrl(data.image, 'full'),
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
        image: imageUrl(authorData.image as string, 'square(40)')
      };
    }).filter(Boolean),
    ingress: processHtml(data.ingress || ''),
    text: processHtml(data.text || '')
  };
};
