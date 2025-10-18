import type {FC} from 'react';
import cx from 'classnames';

import type { ImageData } from '../types';
import { getImageAlt } from '@utils/image.client';

// Re-export types for backward compatibility
export type { ImageData, ImageType } from '../types';

interface ImageProps {
  className?: string;
  image?: ImageData | null;
  imageClassName?: string;
  url?: string;
  title?: string;
}

/**
 * Primary Image holder for solution.
 */
export const Image: FC<ImageProps> = ({
  className = '',
  image = null,
  imageClassName = '',
  url = '',
  title
}) => {
  if (!image) {
    return null;
  }

  const picture = (
    <img
      src={image.url}
      alt={getImageAlt(image, title)}
      className={imageClassName}
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
