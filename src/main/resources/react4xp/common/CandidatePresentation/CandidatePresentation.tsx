import {type FC} from 'react';

import {CandidatePresentationItem} from '@common/CandidatePresentationItem/CandidatePresentationItem';

/**
 * Represents a candidate item in the presentation
 */
interface CandidateItem {
  /** Unique identifier for the candidate */
  itemID?: string;
  /** Additional properties passed through to CandidatePresentationItem */
  [key: string]: unknown;
}

/**
 * Props for the CandidatePresentation component
 */
interface CandidatePresentationProps {
  /** Array of candidate items to display */
  items?: CandidateItem[];
  /** Whether to highlight/enlarge the first candidate */
  highlighted?: boolean;
  /** Text prefix to display before the first candidate's name */
  preText?: string;
}

/**
 * CandidatePresentation component displays candidates in a presentation grid.
 *
 * Optionally highlights the first candidate with a larger layout and preText.
 * Remaining candidates are displayed in a standard grid format. Used for
 * showcasing candidate lists with emphasis on a featured candidate.
 *
 * @example
 * ```tsx
 * <CandidatePresentation
 *   items={candidates}
 *   highlighted={true}
 *   preText="Top candidate:"
 * />
 * ```
 */
export const CandidatePresentation: FC<CandidatePresentationProps> = ({
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
