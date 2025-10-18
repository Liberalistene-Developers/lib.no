import {type FC} from 'react';

import {Image} from '@common/Image/Image';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';
import type {ImageData} from '@common/types';

/**
 * Represents a quote author
 */
interface QuoteAuthor {
  /** Unique identifier for the author */
  authorID: string;
  /** Author's name */
  person?: string;
  /** URL to the author's page */
  personUrl?: string;
  /** Author's profile image URL */
  image?: string;
}

/**
 * Props for the Quote component
 */
interface QuoteProps {
  /** Quote title */
  title?: string;
  /** Quote-related image */
  image?: ImageData;
  /** Array of quote authors */
  authors?: QuoteAuthor[];
  /** The quote text (HTML) */
  quote?: string;
  /** Legacy field for quote text - kept for backwards compatibility */
  qoute?: string;
  /** Additional description text (HTML) */
  description?: string;
}

/**
 * Quote component displays a quote with author information.
 *
 * Shows the quote title, optional image, author list with links and images,
 * the quote text, and additional description. Supports a legacy 'qoute' field
 * for backwards compatibility (typo in original implementation).
 *
 * @example
 * ```tsx
 * <Quote
 *   title="On Liberty"
 *   image={{url: '/images/quote.jpg', alternativeText: 'Quote image'}}
 *   authors={[
 *     {authorID: '1', person: 'John Stuart Mill', personUrl: '/authors/mill'}
 *   ]}
 *   quote="<p>The only freedom which deserves the name...</p>"
 *   description="<p>From On Liberty, 1859</p>"
 * />
 * ```
 */
export const Quote: FC<QuoteProps> = ({
  title = '',
  image,
  authors = [],
  quote = '',
  qoute = '', // Legacy support
  description = ''
}) => {
  // Use 'quote' if provided, otherwise fall back to legacy 'qoute'
  const quoteText = quote || qoute;

  return (
    <div>
      <h1 title={title}>{title}</h1>

      <Image image={image} />

      {authors && authors.length > 0 && (
        <ul>
          {authors.map(({authorID, person, personUrl, image: authorImage}) => (
            <li key={authorID}>
              <div>
                <a href={personUrl}>
                  {authorImage && (
                    <img src={authorImage} alt={person} />
                  )}
                  <span>
                    {person}
                  </span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
      {quoteText && (
        <SafeHtml html={quoteText} />
      )}
      {description && (
        <SafeHtml html={description} />
      )}
    </div>
  );
};
