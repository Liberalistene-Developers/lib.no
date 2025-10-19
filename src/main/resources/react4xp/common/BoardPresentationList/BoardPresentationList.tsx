import {type FC} from 'react';

import {BoardPresentation} from '@common/BoardPresentation/BoardPresentation';

/**
 * Represents a member of a board
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
  /** Board member's email address */
  email?: string;
}

/**
 * Represents a board item with its members
 */
interface BoardItem {
  /** Unique identifier for the board */
  itemId?: string;
  /** Title of the board */
  title?: string;
  /** Array of board members */
  board?: BoardMember[];
}

/**
 * Props for the BoardPresentationList component
 */
interface BoardPresentationListProps {
  /** Title for the board members list */
  boardTitle?: string;
  /** Size of member images (note: typed as boolean but used as string) */
  imagesize?: boolean;
  /** Image style type - 'round' for circular images */
  imagetype?: string;
  /** Array of board items to display */
  items?: BoardItem[];
  /** Whether to highlight the first member - 'no', 'yes', or 'noimage' */
  memberHighlighted?: 'no' | 'yes' | 'noimage';
  /** If true, disables member highlighting */
  noHighlighting?: boolean;
  /** If true, reverses the layout order */
  reverseOrder?: boolean;
  /** Email visibility setting - 'no', 'first', or 'all' */
  showEmail?: 'no' | 'first' | 'all';
}

/**
 * BoardPresentationList component displays multiple boards in a vertical list.
 *
 * Renders a list of BoardPresentation components, each showing a different board
 * with its own set of members. Useful for displaying multiple organizational boards
 * or committees on the same page.
 *
 * @example
 * ```tsx
 * <BoardPresentationList
 *   items={[
 *     {itemId: '1', title: 'Executive Board', board: executiveMembers},
 *     {itemId: '2', title: 'Advisory Board', board: advisoryMembers}
 *   ]}
 *   memberHighlighted="yes"
 *   showEmail="first"
 * />
 * ```
 */
export const BoardPresentationList: FC<BoardPresentationListProps> = ({
  boardTitle,
  imagesize,
  imagetype,
  items = [],
  memberHighlighted = 'yes',
  noHighlighting = false,
  reverseOrder = false,
  showEmail = 'no'
}) => (
  <div className="flex flex-col gap-y-20">
    {items && items.length > 0
      ? items.map(({
        itemId,
        title,
        board
      }) => (
        <BoardPresentation
          key={itemId}
          noHighlighting={noHighlighting}
          imagesize={imagesize as unknown as string}
          imagetype={imagetype}
          memberHighlighted={memberHighlighted}
          title={title}
          boardTitle={boardTitle}
          board={board}
          reverseOrder={reverseOrder}
          showEmail={showEmail}
        />
      ))
      : null
    }
  </div>
);
