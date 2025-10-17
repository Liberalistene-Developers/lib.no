import {type FC} from 'react';

import {buildQueryEventList, extractEventList} from '/react4xp/utils/guillotine/requests';

import {EventListView} from '../EventListView/EventListView';
import {DynamicLoader} from '../DynamicLoader/DynamicLoader';

import {type ImageData} from '../Image/Image';

interface EventItem {
  id?: string;
  [key: string]: unknown;
}

export interface EventListProps {
  description?: string;
  displaytype?: string;
  image?: ImageData;
  shortDescription?: string;
  items?: EventItem[];
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

export const EventList: FC<EventListProps> = ({
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
