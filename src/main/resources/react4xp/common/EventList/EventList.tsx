import {type FC} from 'react';

import {buildQueryEventList, extractEventList} from '@utils/guillotine/requests';

import {EventListView} from '/react4xp/common/EventListView/EventListView';
import {DynamicLoader} from '/react4xp/common/DynamicLoader/DynamicLoader';

import {type ImageData} from '/react4xp/common/Image/Image';

/**
 * Individual event item in the list
 *
 * @property id - Unique identifier for the event
 */
interface EventItem {
  id?: string;
  [key: string]: unknown;
}

/**
 * Props for the EventList component
 *
 * @property description - Full HTML description of the event list
 * @property displaytype - Display mode: 'grid' for card layout or 'list' for list layout
 * @property image - Header image for the event list
 * @property shortDescription - Short description/ingress for the list
 * @property items - Array of event items to display
 * @property title - Title/heading for the event list
 * @property showImage - Whether to show images in event cards
 * @property imageType - Type/style of image display
 * @property imageSize - Size of images to display
 * @property readMore - Text for "read more" button
 * @property readMoreEnabled - Whether to enable "read more" functionality
 * @property loadMoreEnabled - Whether to enable dynamic "load more" functionality
 * @property loadMore - Text for "load more" button
 * @property apiUrl - API endpoint URL for loading more events dynamically
 * @property count - Number of events to load per page
 * @property sortExpression - Sort expression for ordering events
 * @property parentPathQuery - Path query for filtering events by location in content tree
 * @property noIngress - Whether to hide ingress text in event cards
 * @property useLoader - Whether to use dynamic loading (true) or static rendering (false)
 */
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

/**
 * Smart event list component that handles both static and dynamic event loading.
 *
 * This component supports two modes:
 * 1. Static mode (useLoader=false): Renders all events immediately from the items prop
 * 2. Dynamic mode (useLoader=true): Uses DynamicLoader to fetch events via Guillotine API
 *    with "load more" functionality
 *
 * The component delegates rendering to EventListView, which handles the actual display
 * of events in either grid or list format.
 *
 * @example Static event list
 * ```tsx
 * <EventList
 *   title="Upcoming Events"
 *   displaytype="grid"
 *   items={[
 *     { id: '1', title: 'Event 1', date: '2024-03-15', ... },
 *     { id: '2', title: 'Event 2', date: '2024-03-20', ... }
 *   ]}
 *   useLoader={false}
 * />
 * ```
 *
 * @example Dynamic event list with load more
 * ```tsx
 * <EventList
 *   title="All Events"
 *   displaytype="list"
 *   apiUrl="/api/guillotine"
 *   count={10}
 *   loadMoreEnabled={true}
 *   loadMore="Load more events"
 *   sortExpression="publish.from DESC"
 *   useLoader={true}
 * />
 * ```
 */
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
