import * as React from 'react';

import {GridItem} from '../../common/GridItem';
import {Image} from '../../common/Image';
import {ListItem} from '../../common/ListItem';

interface PersonItem {
  itemID?: string;
  image?: {
    url?: string;
  };
  name?: string;
  shortDescription?: string;
  url?: string;
}

interface ImageType {
  url?: string;
}

interface PersonListProps {
  description?: string;
  displaytype?: string;
  className?: string;
  imagesize?: 'small' | 'medium' | 'large';
  imagetype?: boolean;
  image?: ImageType;
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
        <div dangerouslySetInnerHTML={{__html: shortDescription}} />
      )}

      {description && (
        <div dangerouslySetInnerHTML={{__html: description}} />
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
