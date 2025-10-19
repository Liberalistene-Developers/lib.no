import {type FC, type ReactNode} from 'react';

import {Image, type ImageData} from '@common/Image/Image';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';
import {EventListItem} from '@common/EventListItem/EventListItem';
import {EventCard} from '@common/EventCard/EventCard';

/**
 * Individual event item data
 *
 * @property id - Unique identifier for the event
 * @property url - URL to the event page (legacy property)
 * @property to - URL to the event page (newer property, takes precedence over url)
 * @property title - Event title/name
 * @property image - Event image data with URL
 * @property text - Event description/short description
 * @property location - Location data (structure varies)
 * @property date - Event date string
 */
interface EventItem {
  id?: string;
  url?: string;
  title?: string;
  image?: {
    url?: string;
  };
  text?: string;
  location?: unknown;
  date?: string;
  to?: string;
}

/**
 * Props for the EventListView component
 *
 * @property children - Optional child elements (typically a "load more" button)
 * @property description - Full HTML description of the event list
 * @property displaytype - Display mode: 'grid' for card layout or 'list' for list layout
 * @property image - Header image for the event list
 * @property shortDescription - Short description/ingress displayed before description
 * @property items - Array of event items to display
 * @property title - Title/heading for the event list
 * @property noIngress - Whether to hide ingress text in event cards (only affects grid display)
 */
interface EventListViewProps {
  children?: ReactNode;
  description?: string;
  displaytype?: string;
  image?: ImageData;
  shortDescription?: string;
  items?: EventItem[];
  title?: string;
  noIngress?: boolean;
}

/**
 * Presentational component for rendering a list or grid of events.
 *
 * This component handles the visual presentation of events in two modes:
 * - Grid mode (default): Displays events as EventCard components in a grid layout
 * - List mode: Displays events as EventListItem components in a vertical list
 *
 * The component also renders a title, header image, descriptions, and any children
 * (typically used for "load more" buttons when used with dynamic loading).
 *
 * @example Grid display
 * ```tsx
 * <EventListView
 *   title="Upcoming Events"
 *   displaytype="grid"
 *   items={events}
 *   noIngress={false}
 * />
 * ```
 *
 * @example List display with load more button
 * ```tsx
 * <EventListView
 *   title="All Events"
 *   displaytype="list"
 *   items={events}
 * >
 *   <button>Load more</button>
 * </EventListView>
 * ```
 */
export const EventListView: FC<EventListViewProps> = ({
  children,
  description,
  displaytype = 'grid',
  image,
  shortDescription,
  items = [],
  title,
  noIngress = false
}) => {
  return (
    <div className="events-list-wrapper">
      {title && (
        <div className="events-list-title">
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
        <div className={`events-list ${displaytype}`}>
          {items.map(({id, url, title, image, text, location, date, to}) => {
            if (displaytype === 'list') {
              return (
                <EventListItem
                  key={id}
                  title={title}
                  text={text}
                  location={location}
                  date={date}
                  url={to || url}
                />
              );
            }
            return (
              <EventCard
                key={id}
                title={title}
                text={text}
                location={location}
                date={date}
                url={to || url}
                image={image}
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
