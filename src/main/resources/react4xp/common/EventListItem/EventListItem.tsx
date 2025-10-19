import {type FC} from 'react';
import { ListItem } from '/react4xp/common/ListItem/ListItem';
import { EventInfo } from '/react4xp/common/EventInfo/EventInfo';

/**
 * Location data for event information
 *
 * @property address - Physical address or URL for the event location
 * @property name - Display name of the location
 */
interface LocationData {
  address?: string;
  name?: string;
}

/**
 * Props for the EventListItem component
 *
 * @property date - Event date string to display
 * @property location - Location data with address and/or name
 * @property locationType - Type of location: 'place' for physical location or 'virtual' for online events
 * @property locationLabel - Label text displayed before the location (e.g., "Sted:", "Place:")
 * @property title - Event title/name
 * @property text - Event description/short description
 * @property url - Link URL to the full event page
 */
interface EventListItemProps {
  date?: string;
  location?: LocationData;
  locationType?: 'place' | 'virtual';
  locationLabel?: string;
  title?: string;
  text?: string;
  url?: string;
}

/**
 * Event list item component for displaying events in a compact list format.
 *
 * This component wraps a ListItem component and adds EventInfo to display event-specific
 * metadata (date, location) below the title and description. Used when displaying events
 * in a vertical list layout (as opposed to a grid of cards).
 *
 * @example
 * ```tsx
 * <EventListItem
 *   title="Community Meetup"
 *   text="Join us for networking and discussions"
 *   date="20. mars 2024, 18:00"
 *   location={{ address: "Café Central, Oslo", name: "Café Central" }}
 *   locationType="place"
 *   locationLabel="Sted:"
 *   url="/events/community-meetup"
 * />
 * ```
 */
export const EventListItem: FC<EventListItemProps> = ({
  date,
  location = { address: '' },
  locationType = 'place',
  locationLabel = 'Sted:',
  title,
  text,
  url
}) => {
  const item = {
    name: title,
    shortDescription: text,
    url
  };

  return (
    <ListItem item={item}>
      <EventInfo
        location={location}
        locationLabel={locationLabel}
        date={date}
        locationType={locationType}
      />
    </ListItem>
  );
};
