import {type FC, type ReactNode} from 'react';
import cx from 'classnames';

import { Image } from '/react4xp/common/Image/Image';
import { SafeHtml } from '/react4xp/common/SafeHtml/SafeHtml';
import type { ItemData } from '/react4xp/common/types';

interface ListItemProps {
  children?: ReactNode;
  childrenLast?: boolean;
  className?: string;
  imageSize?: 'small' | 'medium' | 'large';
  imageType?: 'round' | '';
  showImage?: boolean;
  showDescriptions?: boolean;
  item?: ItemData;
  fields?: Record<string, unknown>;
}

/**
 * ListItem component displays an item in a vertical list layout.
 *
 * Renders a flexible list item with an optional image, title, and description.
 * The component supports customizable image sizing and styling (including rounded images),
 * and allows for children to be rendered either before or after the description.
 *
 * Commonly used for displaying people, candidates, board members, and other
 * content in vertical list layouts.
 *
 * @example
 * ```tsx
 * <ListItem
 *   item={{
 *     name: "Jane Smith",
 *     shortDescription: "<p>Board member and policy advisor</p>",
 *     url: "/people/jane-smith",
 *     image: { src: "/jane.jpg", alt: "Jane Smith" }
 *   }}
 *   imageSize="medium"
 *   imageType="round"
 *   showImage={true}
 *   showDescriptions={true}
 * >
 *   <button>Contact</button>
 * </ListItem>
 * ```
 */
export const ListItem: FC<ListItemProps> = ({
  children,
  childrenLast = false,
  className,
  imageSize = 'medium',
  imageType,
  showImage = true,
  showDescriptions = true,
  item = {}
}) => {
  const { image, name, shortDescription, url } = item;

  return (
    <div className={cx('list-item', className)}>
      {showImage && (
        <Image image={image} className={imageSize} imageClassName={imageType} />
      )}

      {name && (
        <div className="flex flex-col justify-center w-full mobile:items-center">
          <div className="text-primary-700 font-bold text-[24px] leading-[29px] mb-[5px]">
            <a href={url} title={name}>{name}</a>
          </div>
          {childrenLast === false && children}
          {showDescriptions && shortDescription && (
            <SafeHtml html={shortDescription} />
          )}
          {childrenLast && children}
        </div>
      )}
    </div>
  );
};
