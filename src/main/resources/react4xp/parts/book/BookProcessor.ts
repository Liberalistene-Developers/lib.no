import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';
import {imageUrl} from '/react4xp/utils/image';
import {processHtml} from '/react4xp/utils/html';

/**
 * Book content data structure from book content type.
 */
interface BookData {
  /** Book description/summary */
  description?: string;
  /** Book ingress/lead text (HTML) */
  ingress?: string;
  /** Book full text/content (HTML) */
  text?: string;
  /** Book cover image reference */
  image?: string;
  /** Comma-separated tags */
  tags?: string;
  /** Author content ID(s) - single ID or array of IDs */
  author?: string | string[];
}

/**
 * Processes book content for the Book component.
 *
 * Fetches and transforms book data including:
 * - Book content (title, description, text, cover image)
 * - Author information with profile links and images
 * - HTML content processing for safe rendering
 *
 * **Data Flow:**
 * 1. Retrieves book data from content
 * 2. Fetches author information for each author ID
 * 3. Generates author profile URLs and images
 * 4. Processes HTML content (ingress and text)
 * 5. Returns complete Book props
 *
 * @param content - The book content node from Enonic XP
 * @returns Book props including title, authors, cover image, and processed HTML
 *
 * @example
 * ```ts
 * // Book content
 * {
 *   displayName: "Liberal Economics 101",
 *   data: {
 *     description: "An introduction to liberal economic principles",
 *     author: ["author1", "author2"],
 *     image: "book-cover-123",
 *     ingress: "<p>Learn the fundamentals...</p>",
 *     text: "<p>Chapter 1: Free Markets...</p>",
 *     tags: "economics,liberalism,politics"
 *   }
 * }
 * // Returns: { title: "Liberal Economics 101", authors: [...], image: {...}, ... }
 * ```
 *
 * @remarks
 * - Author IDs are normalized to an array (handles both single ID and array)
 * - Non-existent authors are filtered out
 * - HTML content is processed via processHtml for safe rendering
 * - Author images are generated with block(96,128) size for book displays
 * - Cover image uses default size (no size parameter)
 */
export const bookProcessor: ComponentProcessor<'lib.no:book'> = ({content}) => {
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
