import {type FC} from 'react';
import cx from 'classnames';

import {PersonListItem} from '@common/PersonListItem/PersonListItem';

/**
 * Represents a candidate item in the list
 */
interface CandidateItem {
  /** Unique identifier for the candidate */
  itemId?: string;
  /** Candidate's name */
  name?: string;
  /** Candidate's profile image */
  image?: {
    /** Image URL */
    url?: string;
    /** Image alternative text for accessibility */
    alternativeText?: string;
  };
  /** Candidate's role/position */
  role?: string;
  /** Brief description of the candidate */
  shortDescription?: string;
}

/**
 * Props for the CandidateList component
 */
interface CandidateListProps {
  /** Size of candidate images - 'small', 'medium', or 'large' */
  imagesize?: string;
  /** Whether to use round image style */
  imagetype?: boolean;
  /** Array of candidates to display */
  items?: CandidateItem[];
  /** Whether to show candidate roles */
  showRole?: boolean;
  /** Additional CSS class names */
  className?: string;
}

/**
 * CandidateList component displays a list of candidates using PersonListItem.
 *
 * Renders candidates in a consistent list format with configurable image sizes,
 * styles, and role display. Uses the PersonListItem component internally to
 * maintain consistency across person-related listings.
 *
 * @example
 * ```tsx
 * <CandidateList
 *   items={candidates}
 *   imagesize="medium"
 *   imagetype={true}
 *   showRole={true}
 *   className="election-2024"
 * />
 * ```
 */
export const CandidateList: FC<CandidateListProps> = ({
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
