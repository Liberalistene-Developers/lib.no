import * as React from 'react';

import {PersonListItem} from '../../shared/PersonListItem';

interface BoardMember {
  itemId?: string;
  image?: {
    url?: string;
  };
  role?: string;
  name?: string;
}

interface BoardProps {
  imagesize?: string;
  imagetype?: string;
  board?: BoardMember[];
  showemail?: string;
  showDescriptions?: boolean;
}

export const Board: React.FC<BoardProps> = ({
  imagesize = 'medium',
  imagetype = 'round',
  board = [],
  showemail = 'no',
  showDescriptions = false
}) => (
  <div>
    {board && board.length > 0
      ? (
        <div className="[&_.list-item.person]:w-1/2 [&_.list-item.person_img]:object-cover [&_.list-item.person_img]:w-[180px] [&_.list-item.person_img]:h-[180px] max-[834px]:[&_.list-item.person_.medium>img.round]:w-[160px] max-[834px]:[&_.list-item.person_.medium>img.round]:h-[160px] mobile:[&_.list-item.person]:w-full">
          <div className="flex justify-center items-center mobile:mb-10">
            {board.slice(0, 1).map((item) => (
              <PersonListItem
                key={item.itemId}
                item={item}
                imageSize={imagesize as 'small' | 'medium' | 'large'}
                imageType={(imagetype && 'round') || ''}
                showEmail={showemail !== 'no'}
                showDescriptions={showDescriptions}
              />
            ))}
          </div>
          {board.length > 1 && (
            <div className="flex flex-wrap justify-end items-center mobile:mt-10 mobile:flex-col mobile:gap-y-10 mobile:justify-center">
              {board.slice(1).map((item) => (
                <PersonListItem
                  key={item.itemId}
                  item={item}
                  imageSize={imagesize as 'small' | 'medium' | 'large'}
                  imageType={(imagetype && 'round') || ''}
                  showEmail={showemail === 'all'}
                  showDescriptions={showDescriptions}
                />
              ))}
            </div>
          )}
        </div>
      )
      : null
    }
  </div>
);
