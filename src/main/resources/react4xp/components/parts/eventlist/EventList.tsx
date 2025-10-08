import * as React from 'react';

import {buildQueryEventList, extractEventList} from '../../../../headless/helpers/eventListRequests';

import {EventListView} from './EventListView';
import {DynamicLoader} from '../../common/DynamicLoader';

interface EventItem {
  id?: string;
  [key: string]: unknown;
}

interface ImageType {
  url?: string;
}

interface EventListProps {
  description?: string;
  displaytype?: string;
  image?: ImageType;
  shortDescription?: string;
  items?: EventItem[];
  tags?: unknown[];
  title?: string;
  showImage?: boolean;
  imageType?: string;
  imageSize?: string;
  readMore?: string;
  readMoreEnabled?: boolean;
  loadMoreEnabled?: boolean;
  loadMore?: string;
  apiUrl?: string;
  count?: number;
  sortExpression?: string;
  parentPathQuery?: string;
  noIngress?: boolean;
  useLoader?: boolean;
}

export const EventList: React.FC<EventListProps> = ({
  description,
  displaytype,
  image,
  shortDescription,
  items = [],
  title,
  loadMoreEnabled = false,
  loadMore = 'Load more',
  apiUrl = '',
  count = 10,
  sortExpression = '',
  parentPathQuery = '',
  noIngress = false,
  useLoader = false
}) => {
  if (typeof window === 'undefined' || !useLoader) {
    return (
      <EventListView
        description={description}
        displaytype={displaytype}
        image={image}
        shortDescription={shortDescription}
        items={items}
        title={title}
        noIngress={noIngress}
      />
    );
  }

  return (
    <DynamicLoader
      apiUrl={apiUrl}
      buildQueryList={buildQueryEventList}
      count={count}
      extractList={extractEventList}
      items={items}
      loadMoreEnabled={loadMoreEnabled}
      loadMore={loadMore}
      parentPathQuery={parentPathQuery}
      sortExpression={sortExpression}
    >
      {({
        items: list,
        children: readMoreButton
      }: {
        items: EventItem[];
        children: React.ReactNode;
      }) => (
        <EventListView
          description={description}
          displaytype={displaytype}
          image={image}
          shortDescription={shortDescription}
          items={list}
          title={title}
          noIngress={noIngress}
        >
          {readMoreButton}
        </EventListView>
      )}
    </DynamicLoader>
  );
};
