import {type FC} from 'react';
import cx from 'classnames';

import type { ImageData } from '/react4xp/common/types';
import { getImageAlt } from '@utils/image.client';

// Re-export types for backward compatibility
export type { ImageData, ImageType } from '/react4xp/common/types';

/**
 * Props for the Image component
 */
interface ImageProps {
  /** CSS classes for the outer wrapper div */
  className?: string;
  /** Image data object containing url and metadata */
  image?: ImageData | null;
  /** CSS classes for the img element itself */
  imageClassName?: string;
  /** Optional URL to wrap image in a link */
  url?: string;
  /** Optional title for the link and alt text fallback */
  title?: string;
  /** Enable lazy loading (default: true). Set to false for above-the-fold images */
  lazy?: boolean;
}

/**
 * Image component for displaying images with optional link wrapper
 *
 * Renders an image with automatic alt text generation from image metadata or title.
 * Can optionally wrap the image in a link. Returns null if no image is provided.
 *
 * **Features:**
 * - Automatic alt text from image.alternativeText, image.displayName, or title prop
 * - Optional link wrapper
 * - Separate styling for wrapper and image element
 * - Lazy loading by default (can be disabled for above-the-fold images)
 * - Null-safe rendering
 *
 * **Performance:**
 * Images are lazy loaded by default using the native `loading="lazy"` attribute.
 * For critical above-the-fold images (headers, hero images), set `lazy={false}` to
 * load immediately and combine with image preloading in the HTML head.
 *
 * @example
 * ```tsx
 * // Basic image with lazy loading (default)
 * <Image image={articleImage} />
 *
 * // Critical header image (no lazy loading)
 * <Image image={heroImage} lazy={false} />
 *
 * // Image with custom styling
 * <Image
 *   image={profilePhoto}
 *   className="profile-wrapper"
 *   imageClassName="rounded-full w-32 h-32"
 * />
 *
 * // Image as link
 * <Image
 *   image={thumbnailImage}
 *   url="/article/full-story"
 *   title="Read full article"
 * />
 * ```
 */
export const Image: FC<ImageProps> = ({
  className = '',
  image = null,
  imageClassName = '',
  url = '',
  title,
  lazy = true
}) => {
  if (!image) {
    return null;
  }

  const picture = (
    <img
      src={image.url}
      alt={getImageAlt(image, title)}
      className={imageClassName}
      loading={lazy ? 'lazy' : 'eager'}
    />
  );

  const content = url
    ? (
      <a href={url} title={title}>
        {picture}
      </a>
    )
    : picture;

  return (
    <div className={cx(className, 'image', imageClassName)}>
      {content}
    </div>
  );
};
