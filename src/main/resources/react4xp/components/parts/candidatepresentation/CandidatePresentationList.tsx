import * as React from 'react';

import {CandidatePresentationItem} from '../../shared/CandidatePresentationItem';

interface CandidateItem {
  itemID?: string;
  [key: string]: unknown;
}

interface CandidatePresentationListProps {
  items?: CandidateItem[];
  highlighted?: boolean;
  preText?: string;
}

export const CandidatePresentationList: React.FC<CandidatePresentationListProps> = ({
  items = [],
  highlighted = true,
  preText = ''
}) => (
  <div className="flex flex-row flex-wrap w-full gap-y-[15px] gap-x-[15px] justify-between mobile:flex-col">
    {items.slice(0, highlighted ? 1 : 0).map((item) => (
      <CandidatePresentationItem key={item.itemID} {...item} className="main" preText={preText} />
    ))}
    {items.slice(highlighted ? 1 : 0).map((item) => (
      <CandidatePresentationItem key={item.itemID} {...item} />
    ))}
  </div>
);
