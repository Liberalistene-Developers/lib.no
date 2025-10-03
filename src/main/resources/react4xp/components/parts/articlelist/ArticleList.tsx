import * as React from 'react';

import {buildQueryArticleList, extractArticleList} from '../../../../headless/helpers/articleListRequests';

import {ArticleListView} from './ArticleListView';
import {DynamicLoader} from '../../shared/DynamicLoader';

interface ArticleItem {
  id?: string;
  [key: string]: unknown;
}

interface ImageType {
  url?: string;
}

interface FeaturedConfig {
  [key: string]: {
    style?: string;
    showDate?: boolean;
  } | boolean;
}

interface ArticleListProps {
  featured?: FeaturedConfig;
  description?: string;
  displaytype?: string;
  image?: ImageType;
  shortDescription?: string;
  items?: ArticleItem[];
  tags?: unknown[];
  title?: string;
  showImage?: boolean;
  imageType?: string;
  imageSize?: string;
  titleCenter?: boolean;
  readMore?: string;
  readMoreEnabled?: boolean;
  loadMoreEnabled?: boolean;
  loadMore?: string;
  apiUrl?: string;
  count?: number;
  sortExpression?: string;
  parentPathQuery?: string;
  noIngress?: boolean;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  featured = {},
  description,
  displaytype,
  image,
  shortDescription,
  items = [],
  tags = [],
  title,
  showImage,
  imageType,
  imageSize,
  titleCenter = false,
  readMore = '',
  readMoreEnabled = false,
  loadMoreEnabled = false,
  loadMore = 'Load more',
  apiUrl = '',
  count = 10,
  sortExpression = '',
  parentPathQuery = '',
  noIngress = false
}) => {
  if (typeof window === 'undefined') {
    return (
      <ArticleListView
        featured={featured}
        description={description}
        displaytype={displaytype}
        image={image}
        shortDescription={shortDescription}
        items={items}
        tags={tags}
        title={title}
        showImage={showImage}
        imageSize={imageSize}
        imageType={imageType}
        titleCenter={titleCenter}
        readMore={readMore}
        readMoreEnabled={readMoreEnabled}
        noIngress={noIngress}
      />
    );
  }

  return (
    <DynamicLoader
      apiUrl={apiUrl}
      buildQueryList={buildQueryArticleList}
      count={count}
      extractList={extractArticleList}
      items={items}
      loadMoreEnabled={loadMoreEnabled}
      loadMore={loadMore}
      parentPathQuery={parentPathQuery}
      sortExpression={sortExpression}
    >
      {({
        items: list,
        children: itemsContent
      }: {
        items: ArticleItem[];
        children: React.ReactNode;
      }) => (
        <ArticleListView
          featured={featured}
          description={description}
          displaytype={displaytype}
          image={image}
          shortDescription={shortDescription}
          items={list}
          tags={tags}
          title={title}
          showImage={showImage}
          imageSize={imageSize}
          imageType={imageType}
          titleCenter={titleCenter}
          readMore={readMore}
          readMoreEnabled={readMoreEnabled}
          noIngress={noIngress}
        >
          {itemsContent}
        </ArticleListView>
      )}
    </DynamicLoader>
  );
};
