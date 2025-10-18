import {type FC, type ReactNode} from 'react';
import cx from 'classnames';

import { ListItem } from '/react4xp/common/ListItem/ListItem';
import { AuthorLink } from '/react4xp/common/AuthorLink/AuthorLink';
import type { ItemData } from '/react4xp/common/types';

interface ArticleListItemProps {
  children?: ReactNode;
  childrenLast?: boolean;
  className?: string;
  showImage?: boolean;
  imageSize?: 'small' | 'medium' | 'large';
  imageType?: 'round' | '';
  item?: ItemData;
  showAuthors?: boolean;
  showDate?: boolean;
}

export const ArticleListItem: FC<ArticleListItemProps> = ({
  className,
  showImage = true,
  imageSize = 'medium',
  imageType,
  item = {},
  showAuthors = false,
  showDate = true
}) => {
  const { authors = [], datePublished } = item;

  return (
    <ListItem className={cx('article', className)} imageSize={imageSize} imageType={imageType} showImage={showImage} item={item} childrenLast={true}>
      <div className="article-creds">
        {showAuthors && authors && authors.length > 0 && (
          <ul className="authors">
            {authors.slice(0, 1).map(({ authorID, person, personUrl, image }) => (
              <AuthorLink key={authorID} author={person} url={personUrl} image={image} />
            ))}
          </ul>
        )}
        {datePublished && showDate && (
          <div className="article-date">
            {datePublished}
          </div>
        )}
      </div>
    </ListItem>
  );
};
