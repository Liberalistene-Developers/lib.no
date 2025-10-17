import { FC, ReactNode } from 'react';

import { Image } from '/react4xp/common/Image/Image';
import { SafeHtml } from '/react4xp/common/SafeHtml/SafeHtml';
import { ArticleListItem } from '/react4xp/common/ArticleListItem/ArticleListItem';
import { ArticleCard } from '/react4xp/common/ArticleCard/ArticleCard';
import type { ImageData, ItemData } from '/react4xp/common/types';

interface ArticleItem {
  id?: string;
}

interface FeaturedConfig {
  [key: string]: {
    style?: string;
    showDate?: boolean;
  } | boolean;
}

interface ArticleListViewProps {
  children?: ReactNode;
  featured?: FeaturedConfig;
  description?: string;
  displaytype?: string;
  image?: ImageData;
  shortDescription?: string;
  items?: ArticleItem[];
  title?: string;
  readMore?: string;
  readMoreEnabled?: boolean;
  showImage?: boolean;
  imageType?: string;
  imageSize?: string;
  titleCenter?: boolean;
  noIngress?: boolean;
}

export const ArticleListView: FC<ArticleListViewProps> = ({
  children,
  featured = {},
  description,
  displaytype = 'grid',
  image,
  shortDescription,
  items,
  title,
  readMore = '',
  readMoreEnabled = false,
  showImage,
  imageType,
  imageSize,
  titleCenter = false,
  noIngress = false
}) => {
  const Item = displaytype === 'list' ? ArticleListItem : ArticleCard;

  return (
    <div className="article-list-holder">
      {title && (
        <div className="article-list-title">
          <h2 title={title}>{title}</h2>
        </div>
      )}

      <Image image={image} />

      {shortDescription && (
        <SafeHtml html={shortDescription} />
      )}

      {description && (
        <SafeHtml html={description} />
      )}

      {items && items.length > 0 && (
        <div className={`article-list ${displaytype}`}>
          {items.map((item, index) => {
            const featuredItem = featured && featured[`${index + 1}`];
            const presentation = typeof featuredItem === 'object' ? featuredItem : false;
            const direction = (presentation && typeof presentation === 'object' && presentation.style) || '';
            const showDate = (presentation && typeof presentation === 'object' && presentation.showDate) || false;

            return (
              <Item
                key={item.id}
                item={item as ItemData}
                presentation={presentation as boolean}
                direction={direction as '' | 'left' | 'right'}
                showDate={showDate}
                titleCenter={titleCenter}
                showImage={showImage}
                imageSize={imageSize as 'small' | 'medium' | 'large'}
                imageType={imageType as '' | 'round'}
                className="article"
                readMore={readMore}
                readMoreEnabled={readMoreEnabled}
                noIngress={noIngress}
              />
            );
          })}
        </div>
      )}
      {children}
    </div>
  );
};
