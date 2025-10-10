import * as React from 'react';
import type {ComponentProps} from '@enonic/react-components';

import {buildQueryArticleList, extractArticleList} from '../../../headless/helpers/articleListRequests';

import {ArticleListView} from './ArticleListView';
import {DynamicLoader} from '/react4xp/common/DynamicLoader/DynamicLoader';

import type {ImageType} from '/react4xp/common/Image/Image';

interface ArticleItem {
  id?: string;
  [key: string]: unknown;
}

interface FeaturedConfig {
  [key: string]: {
    style?: string;
    showDate?: boolean;
  } | boolean;
}

interface ArticleListData {
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

export const ArticleListPart = ({data}: ComponentProps) => {
  const {
    featured = {},
    description,
    displaytype,
    image,
    shortDescription,
    items = [],
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
  } = data as ArticleListData;
  if (typeof window === 'undefined') {
    return (
      <ArticleListView
        featured={featured}
        description={description}
        displaytype={displaytype}
        image={image}
        shortDescription={shortDescription}
        items={items}
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
