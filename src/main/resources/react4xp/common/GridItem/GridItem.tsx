import {type FC, type ReactNode} from 'react';
import cx from 'classnames';

import { Image } from '/react4xp/common/Image/Image';
import { SafeHtml } from '/react4xp/common/SafeHtml/SafeHtml';
import type { GridItemData } from '/react4xp/common/types';

interface GridItemProps {
  children?: ReactNode;
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

/**
 * GridItem component displays an item in a grid layout with an image and text content.
 *
 * Renders a flexible grid item with an image, title, description, and optional "read more" link.
 * Supports various image sizes (small, medium, large), image shapes (round), and content
 * positioning (left, right, centered title). Can optionally render children for additional content.
 *
 * Used in various grid-based layouts throughout the site for displaying people, articles,
 * events, and other content types.
 *
 * @example
 * ```tsx
 * <GridItem
 *   item={{
 *     name: "John Doe",
 *     shortDescription: "Political activist and speaker",
 *     url: "/people/john-doe",
 *     image: { src: "/john.jpg", alt: "John Doe" }
 *   }}
 *   imageSize="medium"
 *   imageType="round"
 *   titleCenter={true}
 *   readMore="Read more"
 *   readMoreEnabled={true}
 * />
 * ```
 */
export const GridItem: FC<GridItemProps> = ({
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
              <SafeHtml html={shortDescription} className="as-span" />
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
