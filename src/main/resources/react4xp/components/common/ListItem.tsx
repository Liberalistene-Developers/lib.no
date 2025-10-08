import * as React from 'react';
import cx from 'classnames';
import { Image } from './Image';

interface ImageData {
  url?: string;
}

interface ItemData {
  image?: ImageData;
  name?: string;
  shortDescription?: string;
  url?: string;
}

interface ListItemProps {
  children?: React.ReactNode;
  childrenLast?: boolean;
  className?: string;
  imageSize?: 'small' | 'medium' | 'large';
  imageType?: 'round' | '';
  showImage?: boolean;
  showDescriptions?: boolean;
  item?: ItemData;
  fields?: Record<string, unknown>;
}

export const ListItem: React.FC<ListItemProps> = ({
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
            <div>
              <div className="rich-text" dangerouslySetInnerHTML={{ __html: shortDescription }} />
            </div>
          )}
          {childrenLast && children}
        </div>
      )}
    </div>
  );
};
