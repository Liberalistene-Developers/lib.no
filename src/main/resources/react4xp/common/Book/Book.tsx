import {type FC} from 'react';

import {Image, type ImageData} from '@common/Image/Image';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';

/**
 * Represents a book author with their details.
 */
interface Author {
  /** Unique identifier for the author */
  authorID?: string;
  /** Author's display name */
  person?: string;
  /** URL to the author's profile or page */
  personUrl?: string;
  /** URL to the author's profile image */
  image?: string;
}

/**
 * Props for the Book component.
 */
interface BookProps {
  /** Book title */
  title?: string;
  /** Book cover image data */
  image?: ImageData;
  /** List of authors who wrote the book */
  authors?: Author[];
  /** Short introductory text about the book */
  ingress?: string;
  /** Full text content or description of the book */
  text?: string;
  /** Alternative description field (fallback for text) */
  description?: string;
  /** Topic tags associated with the book (currently unused in rendering) */
  tags?: string[];
}

/**
 * Book component for displaying book details including cover image, authors, and content.
 *
 * Displays a book with its title, cover image, list of authors with their profile links and images,
 * an introductory ingress, and the main text content or description.
 *
 * @example
 * ```tsx
 * <Book
 *   title="Liberal Manifesto"
 *   image={{url: '/books/manifesto.jpg', displayName: 'Cover'}}
 *   authors={[
 *     {authorID: '1', person: 'John Doe', personUrl: '/authors/john', image: '/authors/john.jpg'}
 *   ]}
 *   ingress="<p>An introduction to liberal thought</p>"
 *   text="<p>Full book content here...</p>"
 * />
 * ```
 *
 * @remarks
 * - The `text` prop takes precedence over `description` if both are provided
 * - Author images and links are optional
 * - HTML content in ingress and text is sanitized via SafeHtml component
 */
export const Book: FC<BookProps> = ({
  title = '',
  image,
  authors = [],
  ingress = '',
  text = '',
  description = ''
}) => (
  <div>
    <h1 title={title}>{title}</h1>

    {image && <Image image={image} />}

    {authors && authors.length > 0 && (
      <ul>
        {authors.map(({authorID, person, personUrl, image: authorImage}) => (
          <li key={authorID}>
            <div>
              <a href={personUrl}>
                {authorImage && (
                  <img src={authorImage} alt={person} />
                )}
                <span>{person}</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    )}

    {ingress && <SafeHtml html={ingress} />}
    {(text || description) && <SafeHtml html={text || description} />}
  </div>
);
