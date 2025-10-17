import * as React from 'react';

import {BoardPresentation} from '/react4xp/common/BoardPresentation/BoardPresentation';

interface BoardMember {
  itemId?: string;
  image?: {
    url?: string;
  };
  role?: string;
  name?: string;
  email?: string;
}

interface BoardItem {
  itemId?: string;
  title?: string;
  board?: BoardMember[];
}

interface BoardPresentationListProps {
  boardTitle?: string;
  imagesize?: boolean;
  imagetype?: string;
  items?: BoardItem[];
  memberHighlighted?: 'no' | 'yes' | 'noimage';
  noHighlighting?: boolean;
  reverseOrder?: boolean;
  showEmail?: 'no' | 'first' | 'all';
}

export const BoardPresentationList: React.FC<BoardPresentationListProps> = ({
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
