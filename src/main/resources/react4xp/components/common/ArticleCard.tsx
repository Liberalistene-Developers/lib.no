import * as React from 'react';
import { GridItem } from './GridItem';
import { AuthorLink } from './AuthorLink';

interface ImageData {
  url?: string;
}

interface AuthorData {
  authorID?: string;
  person?: string;
  personUrl?: string;
  image?: ImageData;
}

export interface ItemData {
  image?: ImageData;
  authors?: AuthorData[];
  name?: string;
  shortDescription?: string;
  url?: string;
  datePublished?: string;
}

export interface ArticleCardProps {
  children?: React.ReactNode;
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

export const ArticleCard: React.FC<ArticleCardProps> = ({
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
