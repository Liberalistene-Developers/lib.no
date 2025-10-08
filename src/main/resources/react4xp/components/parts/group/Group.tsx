import * as React from 'react';

import {ImageBlock} from '../imageblock/ImageBlock';
import {PersonListItem} from '../../common/PersonListItem';

interface BoardMember {
  itemId?: string;
  image?: {
    url?: string;
  };
  role?: string;
  name?: string;
}

interface ImageType {
  url?: string;
}

interface GroupProps {
  imagesize?: string;
  imagetype?: boolean;
  headerColor?: string;
  headerPosition?: string;
  ingressInImage?: boolean;
  title?: string;
  titleInImage?: boolean;
  image?: ImageType;
  informationLabel?: string;
  shortDescription?: string;
  description?: string;
  board?: BoardMember[];
  tags?: unknown[];
}

export const Group: React.FC<GroupProps> = ({
  imagesize = 'medium',
  imagetype = true,
  headerColor,
  headerPosition,
  ingressInImage = true,
  title = '',
  titleInImage = true,
  image,
  informationLabel,
  shortDescription,
  description = '',
  board,
  tags
}) => (
  <div>
    {image && (
      <ImageBlock
        title={titleInImage && title ? [{title, titleColor: headerColor}] : []}
        image={image}
        ingress={(ingressInImage && shortDescription) || ''}
        position={headerPosition as 'left' | 'center' | 'right'}
      />
    )}

    <div className="max-w-[1200px] mx-auto pt-5 pb-5">
      {(!titleInImage || !image) && title && (
        <h1>{title}</h1>
      )}

      {(!ingressInImage || !image) && shortDescription && (
        <div className="rich-text" dangerouslySetInnerHTML={{__html: shortDescription}} />
      )}

      {description && (
        <div>
          {informationLabel && (
            <h2 className="mb-5">{informationLabel}</h2>
          )}

          <div
            className="flex pt-5"
            dangerouslySetInnerHTML={{__html: description}}
          />
        </div>
      )}

      {board && board.length > 0
        ? (
          <div>
            <div className="flex justify-center">
              {board.slice(0, 1).map((item) => (
                <PersonListItem
                  key={item.itemId}
                  item={item}
                  imageSize={imagesize as 'small' | 'medium' | 'large'}
                  imageType={(imagetype && 'round') || ''}
                />
              ))}
            </div>
            {board.length > 1 && (
              <div className="flex flex-wrap [&_.list-item.person]:w-1/2">
                {board.slice(1).map((item) => (
                  <PersonListItem
                    key={item.itemId}
                    item={item}
                    imageSize={imagesize as 'small' | 'medium' | 'large'}
                    imageType={(imagetype && 'round') || ''}
                  />
                ))}
              </div>
            )}
          </div>
        )
        : null
      }
    </div>
  </div>
);
