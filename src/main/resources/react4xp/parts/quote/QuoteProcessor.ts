import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import {pageUrl} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';
import {imageUrl} from '/react4xp/utils/image';
import {processHtml} from '/react4xp/utils/html';

/**
 * Quote content data structure from content type.
 */
interface QuoteData {
  /** Additional description or context for the quote (HTML) */
  description?: string;
  /** Quote text (HTML) - Note: Legacy field name 'qoute' in schema */
  qoute?: string; // Legacy field name in content type
  /** Image reference for quote visualization */
  image?: string;
  /** Tags for categorization */
  tags?: string;
  /** Content ID(s) of author person(s) - can be single or array */
  author?: string | string[];
}

/**
 * Person content data structure.
 */
interface PersonData {
  /** Person's profile image reference */
  image?: string;
}

/**
 * Processes quote content for the Quote component.
 *
 * Fetches quote data including quote text, description, image, and associated author
 * information. Handles legacy field naming ('qoute' -> 'quote') and retrieves author
 * details from person content references.
 *
 * Used for displaying political quotes, statements, or testimonials with attribution.
 *
 * **Data Flow:**
 * 1. Extracts quote content data
 * 2. Normalizes author field (handles both single ID and array)
 * 3. For each author:
 *    - Fetches person content by ID
 *    - Retrieves person data (name, image)
 *    - Generates profile page URL
 *    - Generates 96x128 block-sized profile image
 * 4. Returns Quote props with processed quote text and author details
 *
 * @param content - The quote content from Enonic XP
 * @returns Quote props including quote text, image, description, and authors array
 *
 * @example
 * ```ts
 * // Content data
 * {
 *   displayName: "Freedom of Choice",
 *   data: {
 *     qoute: "<p>Freedom is the foundation of prosperity</p>",
 *     description: "<p>From the 2024 campaign</p>",
 *     image: "quote-bg-123",
 *     tags: "freedom, prosperity",
 *     author: ["person1", "person2"]
 *   }
 * }
 *
 * // Returns:
 * {
 *   title: "Freedom of Choice",
 *   quote: "<p>Freedom is the foundation of prosperity</p>",
 *   description: "<p>From the 2024 campaign</p>",
 *   image: {...},
 *   tags: "freedom, prosperity",
 *   authors: [
 *     {
 *       authorID: "person1",
 *       personUrl: "/people/jane-smith",
 *       person: "Jane Smith",
 *       image: {...}
 *     },
 *     ...
 *   ]
 * }
 * ```
 *
 * @remarks
 * - Handles legacy field name: 'qoute' in content type -> 'quote' in props
 * - Authors array is normalized (handles both single string and array)
 * - Non-existent authors are filtered out
 * - Author images use 'block(96,128)' size for consistent display
 * - Both quote text and description are processed via processHtml for safe rendering
 * - Each author includes a link to their full profile page
 */
export const quoteProcessor: ComponentProcessor<'lib.no:quote'> = ({content}) => {
  const data = content.data as QuoteData;
  const authors = data.author ? [].concat(data.author) : [];

  return {
    title: content.displayName,
    image: imageUrl(data.image),
    quote: processHtml(data.qoute || ''), // Read from legacy 'qoute' field, output as correctly-spelled 'quote'
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
