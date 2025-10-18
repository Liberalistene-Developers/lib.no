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
