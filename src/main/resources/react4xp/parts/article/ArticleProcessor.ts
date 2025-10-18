import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';
import {imageUrl} from '/react4xp/utils/image';
import {processHtml} from '/react4xp/utils/html';

/**
 * Article part configuration from article.xml schema.
 */
interface ArticleConfig {
  /** Header background color */
  headerColor?: string;
  /** Header text alignment position */
  headerPosition?: string;
  /** Whether to display ingress inside the header image */
  ingressInImage?: boolean;
  /** Whether to display title inside the header image */
  titleInImage?: boolean;
}

/**
 * Article content data structure from article content type.
 */
interface ArticleData {
  /** Publication date */
  date?: string;
  /** Article description/summary */
  description?: string;
  /** Article ingress/lead paragraph (HTML) */
  ingress?: string;
  /** Article body text (HTML) */
  text?: string;
  /** Article header image reference */
  image?: string;
  /** Comma-separated tags */
  tags?: string;
  /** Author content ID(s) - single ID or array of IDs */
  author?: string | string[];
}

/**
 * Processes article content and configuration for the Article component.
 *
 * Fetches and transforms article data including:
 * - Article content (title, dates, text, images)
 * - Author information with profile links and images
 * - Display configuration from part settings
 * - HTML content processing for safe rendering
 *
 * **Data Flow:**
 * 1. Extracts article configuration from part component
 * 2. Retrieves article data from content
 * 3. Fetches author information for each author ID
 * 4. Generates author profile URLs and images
 * 5. Processes HTML content (ingress and body text)
 * 6. Returns complete Article props
 *
 * @param component - The article part component from Enonic XP
 * @param content - The article content node from Enonic XP
 * @returns Article props including title, authors, dates, images, and processed HTML
 *
 * @remarks
 * - Author IDs are normalized to an array (handles both single ID and array of IDs)
 * - Non-existent authors are filtered out
 * - HTML content is processed via processHtml for safe rendering
 * - Images are generated with specific sizes: full for article image, square(40) for author images
 */
export const articleProcessor: ComponentProcessor<'lib.no:article'> = ({component, content}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as ArticleConfig;


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
