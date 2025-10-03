import * as React from 'react';
import cx from 'classnames';

import {PersonListItem} from '../../shared/PersonListItem';

interface CandidateItem {
  itemId?: string;
  name?: string;
  image?: {
    url?: string;
    alternativeText?: string;
  };
  role?: string;
  shortDescription?: string;
}

interface CandidateListProps {
  imagesize?: string;
  imagetype?: boolean;
  items?: CandidateItem[];
  showRole?: boolean;
  className?: string;
}

export const CandidateList: React.FC<CandidateListProps> = ({
  imagesize = '',
  imagetype = true,
  items = [],
  showRole = true,
  className = ''
}) => {
  return (
    <div className={cx('candidate-list', 'list', className)}>
      {items && items.map((item) => (
        <PersonListItem
          imageSize={imagesize as 'small' | 'medium' | 'large'}
          imageType={(imagetype && 'round') || ''}
          key={item.itemId}
          item={item}
          showRole={showRole}
        />
      ))}
    </div>
  );
};
