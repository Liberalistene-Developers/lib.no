import * as React from 'react';
import cx from 'classnames';

interface BranchItem {
  name?: string;
  path?: string;
  title?: string;
}

interface LocalBranchesBlockProps {
  headingClassName?: string;
  items?: BranchItem[];
  title?: string;
}

export const LocalBranchesBlock: React.FC<LocalBranchesBlockProps> = ({
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
