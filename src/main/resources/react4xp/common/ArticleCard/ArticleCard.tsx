import {type FC, type ReactNode} from 'react';

import { GridItem } from '/react4xp/common/GridItem/GridItem';
import { AuthorLink } from '/react4xp/common/AuthorLink/AuthorLink';
import type { ItemData } from '/react4xp/common/types';

// Re-export ItemData for backward compatibility
export type { ItemData } from '/react4xp/common/types';

export interface ArticleCardProps {
  children?: ReactNode;
  childrenLast?: boolean;
  className?: string;
  direction?: 'left' | 'right' | '' | undefined;
  imageSize?: 'small' | 'medium' | 'large' | 'full';
  imageType?: 'round' | '';
  item?: ItemData;
  noIngress?: boolean;
  presentation?: boolean;
  readMore?: string;
  readMoreEnabled?: boolean;
  showAuthors?: boolean;
  showDate?: boolean;
  showImage?: boolean;
  titleCenter?: boolean;
}

export const ArticleCard: FC<ArticleCardProps> = ({
  className,
  direction = '',
  imageSize = 'full',
  imageType,
  item = {},
  noIngress = false,
  presentation = false,
  readMore,
  readMoreEnabled,
  showAuthors = true,
  showDate = true,
  titleCenter = false
}) => {
  const { authors = [], datePublished } = item;

  return (
    <GridItem
      className={className}
      imageSize={imageSize === 'full' ? '' : imageSize}
      imageType={imageType}
      presentation={presentation}
      direction={direction}
      titleCenter={titleCenter}
      showImage
      item={item}
      noIngress={noIngress}
      childrenLast={true}
      readMore={readMore}
      readMoreEnabled={readMoreEnabled}>
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
    </GridItem>
  );
};
