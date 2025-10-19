import {type FC} from 'react';
import cx from 'classnames';

/**
 * Represents a local branch item
 */
interface BranchItem {
  /** Display name of the branch */
  name?: string;
  /** URL path to the branch page */
  path?: string;
  /** Alternative title for the branch */
  title?: string;
}

/**
 * Props for the LocalBranches component
 */
interface LocalBranchesProps {
  /** CSS class name for the heading container */
  headingClassName?: string;
  /** Array of branch items to display */
  items?: BranchItem[];
  /** Section title */
  title?: string;
}

/**
 * LocalBranches component displays a grid of links to local party branches.
 *
 * Shows a titled section with a responsive grid of branch links. The grid
 * displays 4 columns on desktop and 2 columns on mobile. Returns null if
 * no items are provided.
 *
 * @example
 * ```tsx
 * <LocalBranches
 *   title="Find Your Local Branch"
 *   headingClassName="custom-heading"
 *   items={[
 *     {name: 'Oslo', path: '/branches/oslo'},
 *     {name: 'Bergen', path: '/branches/bergen'}
 *   ]}
 * />
 * ```
 */
export const LocalBranches: FC<LocalBranchesProps> = ({
  headingClassName = '',
  items = [],
  title
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-[30px]">
      <div className={cx('heading', headingClassName)}><h2>{title}</h2></div>
      <div className="flex flex-row flex-wrap gap-x-[10px] gap-y-[5px] ml-[10px] items-center [&>*]:basis-[calc(25%-7.5px)] [&>*]:items-center [&>*>a]:underline mobile:gap-y-[10px] mobile:[&>*]:basis-[calc(50%-7.5px)]">
        {items && items.map(({name, path, title: itemTitle}) => (
          <div key={itemTitle || name}><a href={path} title={name}>{name}</a></div>
        ))}
      </div>
    </div>
  );
};
