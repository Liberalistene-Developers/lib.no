import cx from 'classnames';

import {LBCandidate} from '@common/Candidate/LBCandidate';

interface CandidateItem {
  title?: string;
  name?: string;
  image?: {
    url?: string;
  };
  phone?: string;
  position?: string;
  email?: string;
  [key: string]: unknown;
}

export interface CandidateBlockProps {
  items?: CandidateItem[];
  headingClassName?: string;
  title?: string;
}

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
