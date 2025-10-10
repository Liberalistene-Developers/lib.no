import * as React from 'react';
import cx from 'classnames';

export interface ImageType {
  url?: string;
}


export interface ImageData extends ImageType {
  displayName?: string;
  alternativeText?: string;
}

interface ImageProps {
  className?: string;
  image?: ImageData | null;
  imageClassName?: string;
  url?: string;
  title?: string;
  onClick?: () => void;
}

/**
 * Primary Image holder for solution.
 */
export const Image: React.FC<ImageProps> = ({
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
      alt={image.alternativeText || image.displayName || title || (image.url && image.url.split('?')[0].split('/').pop())}
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
