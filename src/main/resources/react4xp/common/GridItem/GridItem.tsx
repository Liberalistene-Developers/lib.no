import * as React from 'react';
import cx from 'classnames';
import { Image } from '../Image/Image';

interface ImageData {
  url?: string;
}

export interface GridItemData {
  image?: ImageData;
  name?: string;
  shortDescription?: string;
  url?: string;
}

interface GridItemProps {
  children?: React.ReactNode;
  childrenLast?: boolean;
  className?: string;
  direction?: 'right' | 'left' | '' | undefined;
  imageSize?: 'small' | 'medium' | 'large' | '';
  imageType?: 'round' | '';
  showImage?: boolean;
  item?: GridItemData;
  noIngress?: boolean;
  presentation?: boolean;
  readMore?: string;
  readMoreEnabled?: boolean;
  titleCenter?: boolean;
}

export const GridItem: React.FC<GridItemProps> = ({
  children,
  direction = '',
  imageSize = 'medium',
  imageType,
  item = {},
  noIngress = false,
  presentation = false,
  readMore = '',
  readMoreEnabled = false,
  titleCenter = false
}) => {
  const { image, name, shortDescription, url } = item;

  return (
    <div className={cx('grid-item', direction, { presentation })}>
      <Image image={image} className={imageSize} imageClassName={imageType} title={name} url={url} />

      {name && (
        <div className="grid-item-info">
          <div className={cx('grid-item-title', { center: titleCenter })}>
            <a href={url} title={name}>{name}</a>
          </div>
          {!noIngress && shortDescription && (
            <div className="grid-item-description">
              <div className="rich-text as-span" dangerouslySetInnerHTML={{ __html: shortDescription }} />
              {readMoreEnabled && readMore && (
                <a href={url} title={name} className="read-more">{readMore}</a>
              )}
            </div>
          )}
          {presentation && children}
        </div>
      )}
    </div>
  );
};
