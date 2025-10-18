import {type FC} from 'react';

import {ImageBlock} from '/react4xp/common/ImageBlock/ImageBlock';
import {AuthorLink} from '/react4xp/common/AuthorLink/AuthorLink';
import {SafeHtml} from '/react4xp/common/SafeHtml/SafeHtml';
import type {ImageData} from '/react4xp/common/types';

/**
 * Author data for article byline
 */
interface Author {
  /** Unique author identifier */
  authorID?: string;
  /** Author name */
  person?: string;
  /** URL to author profile page */
  personUrl?: string;
  /** Author profile image */
  image?: {
    url?: string;
  };
}

/**
 * Props for the Article component
 */
interface ArticleProps {
  /** Header/title color (CSS color value) */
  headerColor?: string;
  /** Header text alignment: 'left', 'center', or 'right' */
  headerPosition?: string;
  /** Article title */
  title?: string;
  /** If true, displays title overlaid on image. If false, displays below image */
  titleInImage?: boolean;
  /** Article hero image */
  image?: ImageData;
  /** Article authors for byline */
  authors?: Author[];
  /** Article summary/lead paragraph */
  ingress?: string;
  /** If true, displays ingress overlaid on image. If false, displays in content area */
  ingressInImage?: boolean;
  /** Article main content (HTML) */
  text?: string;
  /** Article tags/categories */
  tags?: string[] | string;
  /** Publication date string (formatted) */
  datePublished?: string;
  /** Article meta description */
  description?: string;
}

/**
 * Full article display component
 *
 * Renders a complete article page with hero image, title, authors, publication date,
 * ingress, and main content. Supports flexible positioning of title and ingress either
 * overlaid on the image or below it.
 *
 * **Layout structure:**
 * 1. ImageBlock with optional title/ingress overlay
 * 2. Title (if not in image)
 * 3. Author byline and publication date
 * 4. Ingress (if not in image)
 * 5. Main content
 *
 * **Features:**
 * - Flexible title positioning (in image or below)
 * - Flexible ingress positioning (in image or in content)
 * - Author links with profile images
 * - Safe HTML rendering for content
 * - Responsive styling with mobile breakpoints
 * - Customizable header color and position
 *
 * @example
 * ```tsx
 * // Article with title and ingress in image
 * <Article
 *   title="Article Title"
 *   titleInImage={true}
 *   image={heroImage}
 *   ingress="<p>Article summary...</p>"
 *   ingressInImage={true}
 *   text="<p>Main content...</p>"
 *   authors={[{authorID: '1', person: 'John Doe', personUrl: '/authors/john'}]}
 *   datePublished="January 15, 2025"
 *   headerPosition="center"
 *   headerColor="#ffffff"
 * />
 *
 * // Article with title and ingress below image
 * <Article
 *   title="Article Title"
 *   titleInImage={false}
 *   image={heroImage}
 *   ingress="<p>Article summary...</p>"
 *   ingressInImage={false}
 *   text="<p>Main content...</p>"
 *   authors={authorList}
 *   datePublished="January 15, 2025"
 * />
 * ```
 */
export const Article: FC<ArticleProps> = ({
  headerColor,
  headerPosition,
  title = '',
  titleInImage = true,
  image,
  authors,
  ingress,
  ingressInImage = true,
  text,
  datePublished
}) => (
  <div className="w-full [&_figure]:m-0 [&_figure_img]:max-w-full">
    <ImageBlock
      title={(titleInImage && title && [{title, titleColor: headerColor}]) || []}
      image={image}
      ingress={(ingressInImage && ingress) || ''}
      position={headerPosition as 'left' | 'center' | 'right'}
    />

    <div className="flex items-center justify-center mt-10 mb-10 mobile:mt-5 mobile:mb-5">
      {!titleInImage && title && (
        <h1>{title}</h1>
      )}
    </div>

    <div className="flex items-center justify-between max-w-[600px] mx-auto mb-5 [&_ul.authors]:list-none [&_ul.authors]:m-0 [&_ul.authors]:p-0 [&_ul.authors_a]:flex [&_ul.authors_a]:flex-row [&_ul.authors_a]:items-center [&_ul.authors_a]:justify-center [&_ul.authors_a]:gap-x-[10px] [&_ul.authors_a_img]:w-[30px] [&_ul.authors_a_img]:-mb-[5px] [&_ul.authors_a_img]:mr-[5px]">
      {authors && authors.length > 0 && (
        <ul className="authors">
          {authors.map(({authorID, person, personUrl, image}) => (
            <AuthorLink key={authorID} author={person} url={personUrl} image={image} />
          ))}
        </ul>
      )}
      <div className="h-full self-center ml-auto flex items-center">
        {datePublished}
      </div>
    </div>

    <div className="page-content">
      {!ingressInImage && ingress && (
        <SafeHtml html={ingress} className="font-bold" />
      )}

      {text && (
        <SafeHtml html={text} />
      )}
    </div>
  </div>
);
