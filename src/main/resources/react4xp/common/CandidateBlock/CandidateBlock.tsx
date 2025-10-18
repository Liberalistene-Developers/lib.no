import cx from 'classnames';

import {LBCandidate} from '@common/Candidate/LBCandidate';

/**
 * Represents a candidate item in the block
 */
interface CandidateItem {
  /** Alternative title for the candidate */
  title?: string;
  /** Candidate's name */
  name?: string;
  /** Candidate's profile image */
  image?: {
    /** Image URL */
    url?: string;
  };
  /** Candidate's phone number */
  phone?: string;
  /** Candidate's position/role */
  position?: string;
  /** Candidate's email address */
  email?: string;
  /** Additional properties passed through to LBCandidate */
  [key: string]: unknown;
}

/**
 * Props for the CandidateBlock component
 */
export interface CandidateBlockProps {
  /** Array of candidate items to display */
  items?: CandidateItem[];
  /** CSS class name for the heading container */
  headingClassName?: string;
  /** Block title */
  title?: string;
}

/**
 * CandidateBlock component displays a list of local branch candidates.
 *
 * Renders a titled section containing multiple LBCandidate components in a grid.
 * Used on local branch pages to show all candidates for that branch.
 * Returns null if no items are provided.
 *
 * @example
 * ```tsx
 * <CandidateBlock
 *   title="Our Candidates"
 *   headingClassName="custom-heading"
 *   items={[
 *     {name: 'John Doe', position: 'Leader', email: 'john@example.com'},
 *     {name: 'Jane Smith', position: 'Deputy', phone: '+47 123 45 678'}
 *   ]}
 * />
 * ```
 */
export const CandidateBlock = ({
  items = [],
  headingClassName,
  title
}: CandidateBlockProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="localbranch-candidates">
      <div className={cx('heading', headingClassName)}><h2>{title}</h2></div>
      <div className="items">
        {items && items.map((item) => (<LBCandidate key={item.title || item.name} {...item} />))}
      </div>
    </div>
  );
};
