import * as React from 'react';

import {Image, ImageType} from '/react4xp/common/Image/Image';
import {ArticleListItem} from '/react4xp/common/ArticleListItem/ArticleListItem';
import {ArticleCard, type ItemData} from '/react4xp/common/ArticleCard/ArticleCard';

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
  children?: React.ReactNode;
  featured?: FeaturedConfig;
  description?: string;
  displaytype?: string;
  image?: ImageType;
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

export const ArticleListView: React.FC<ArticleListViewProps> = ({
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
        <div dangerouslySetInnerHTML={{__html: shortDescription}} />
      )}

      {description && (
        <div dangerouslySetInnerHTML={{__html: description}} />
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
