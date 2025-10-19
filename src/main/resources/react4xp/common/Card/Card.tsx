import {type FC, type ReactNode} from 'react';

import type {ImageData} from '/react4xp/common/types';
import { getImageAlt } from '@utils/image.client';
import { SafeHtml } from '/react4xp/common/SafeHtml/SafeHtml';

/**
 * Props for the Card component
 */
interface CardProps {
  /** Optional child elements rendered after the image */
  children?: ReactNode;
  /** Optional image displayed at the top of the card */
  image?: ImageData | null;
  /** If true, hides the text/ingress section */
  noIngress?: boolean;
  /** Card title (also used as link title and image alt fallback) */
  title?: string;
  /** Card text/ingress content (rendered as SafeHtml) */
  text?: string;
  /** URL for card and image links */
  url?: string;
}

/**
 * Card component for displaying content with optional image, title, and text
 *
 * A styled card container with rounded corners and shadow. Commonly used for article previews,
 * event listings, and content grids. Features automatic image linking and safe HTML rendering.
 *
 * **Layout:**
 * - Image (optional, full-width, rounded top corners)
 * - Children (optional, rendered after image)
 * - Title (linked, primary color)
 * - Text/Ingress (optional, rendered as SafeHtml)
 *
 * **Features:**
 * - Responsive shadow styling
 * - Automatic image and title linking
 * - Safe HTML rendering for text content
 * - Automatic alt text generation from image metadata
 * - Optional ingress suppression
 *
 * @example
 * ```tsx
 * // Basic card with image and text
 * <Card
 *   image={articleImage}
 *   title="Article Title"
 *   text="<p>Article summary...</p>"
 *   url="/articles/my-article"
 * />
 *
 * // Card without ingress
 * <Card
 *   image={eventImage}
 *   title="Event Name"
 *   url="/events/123"
 *   noIngress={true}
 * />
 *
 * // Card with custom children
 * <Card
 *   image={personImage}
 *   title="Person Name"
 *   url="/people/john-doe"
 * >
 *   <div className="badge">Featured</div>
 * </Card>
 * ```
 */
export const Card: FC<CardProps> = ({
  children,
  image = null,
  noIngress = false,
  title = '',
  text = '',
  url = ''
}) => {
  return (
    <div className="bg-white rounded-[3px] w-full shadow-[0px_1px_40px_3px_rgba(74,16,74,0.11)]">
      {image && (
        <div>
          <a href={url} title={title}>
            <img
              src={image.url}
              alt={getImageAlt(image, title)}
              className="rounded-t-[3px] w-full"
            />
          </a>
          {children}
        </div>
      )}
      <div className="p-[15px]">
        <h3 className="text-primary-700 text-[24px] leading-[29px] mb-[5px] -mt-5">
          <a href={url} title={title}>{title}</a>
        </h3>
        {!noIngress && text && (
          <SafeHtml html={text} />
        )}
      </div>
    </div>
  );
};
