import * as React from 'react';

import {GridItem} from '@common/GridItem/GridItem';
import {Image, type ImageData} from '@common/Image/Image';
import {ListItem} from '@common/ListItem/ListItem';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';

interface PersonItem {
  itemID?: string;
  image?: ImageData;
  name?: string;
  shortDescription?: string;
  url?: string;
}


interface PersonListProps {
  description?: string;
  displaytype?: string;
  className?: string;
  imagesize?: 'small' | 'medium' | 'large';
  imagetype?: boolean;
  image?: ImageData;
  items?: PersonItem[];
  shortDescription?: string;
  showImage?: boolean;
  title?: string;
}

export const PersonList: React.FC<PersonListProps> = ({
  description,
  displaytype = 'grid',
  imagesize,
  imagetype,
  image,
  shortDescription,
  items = [],
  title
}) => {
  const Item = displaytype === 'list' ? ListItem : GridItem;

  return (
    <div>
      {title && (
        <h2 title={title}>{title}</h2>
      )}

      <Image image={image} />

      {shortDescription && (
        <SafeHtml html={shortDescription} />
      )}

      {description && (
        <SafeHtml html={description} />
      )}

      {items && items.length > 0 && (
        <div className={displaytype === 'list' ? 'flex flex-col' : 'flex flex-row'}>
          {items.map((item) => (
            <Item
              key={item.itemID}
              item={item}
              imageSize={imagesize}
              imageType={(imagetype && 'round') || ''}
            />
          ))}
        </div>
      )}
    </div>
  );
};
