import {type FC} from 'react';

import {PersonListItem} from '@common/PersonListItem/PersonListItem';

/**
 * Represents a member of the board
 */
interface BoardMember {
  /** Unique identifier for the board member */
  itemId?: string;
  /** Board member's image data */
  image?: {
    /** Image URL */
    url?: string;
  };
  /** Board member's role/position */
  role?: string;
  /** Board member's name */
  name?: string;
}

/**
 * Props for the Board component
 */
interface BoardProps {
  /** Size of member images - 'small', 'medium', or 'large' */
  imagesize?: string;
  /** Image style type - 'round' for circular images */
  imagetype?: string;
  /** Array of board members to display */
  board?: BoardMember[];
  /** Email visibility setting - 'no', 'first', or 'all' */
  showemail?: string;
  /** Whether to show member descriptions */
  showDescriptions?: boolean;
}

/**
 * Board component displays an organization's board members in a special layout.
 *
 * The first board member is displayed prominently at the top, with remaining
 * members shown in a grid below. Used for displaying organizational leadership.
 *
 * @example
 * ```tsx
 * <Board
 *   board={boardMembers}
 *   imagesize="medium"
 *   imagetype="round"
 *   showemail="first"
 *   showDescriptions={true}
 * />
 * ```
 */
export const Board: FC<BoardProps> = ({
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
