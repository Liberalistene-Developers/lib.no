import {type FC} from 'react';

import { Card } from '/react4xp/common/Card/Card';
import { EventInfo } from '/react4xp/common/EventInfo/EventInfo';
import type { ImageData, LocationData } from '/react4xp/common/types';

/**
 * Props for the EventCard component
 *
 * @property date - Event date string to display
 * @property image - Image data for the card (null if no image)
 * @property location - Location data with address and/or name
 * @property locationType - Type of location: 'place' for physical location or 'virtual' for online events
 * @property locationLabel - Label text displayed before the location (e.g., "Sted:", "Place:")
 * @property noIngress - Whether to hide the ingress/description text in the card
 * @property title - Event title/name
 * @property text - Event description/ingress text
 * @property url - Link URL to the full event page
 */
interface EventCardProps {
  date?: string;
  image?: ImageData | null;
  location?: LocationData;
  locationType?: 'place' | 'virtual';
  locationLabel?: string;
  noIngress?: boolean;
  title?: string;
  text?: string;
  url?: string;
}

/**
 * Event card component for displaying event information in a compact card format.
 *
 * This component wraps a Card component and adds EventInfo to display event-specific
 * metadata (date, location) at the bottom of the card. It's commonly used in event
 * grids or lists to show multiple events.
 *
 * @example
 * ```tsx
 * <EventCard
 *   title="Community Meetup"
 *   text="Join us for networking and discussions"
 *   date="2024-03-20"
 *   location={{ address: "Café Central, Oslo", name: "Café Central" }}
 *   locationType="place"
 *   locationLabel="Sted:"
 *   url="/events/community-meetup"
 *   image={{ url: '/images/event.jpg', alt: 'Event photo' }}
 * />
 * ```
 */
export const EventCard: FC<EventCardProps> = ({
  date,
  image = null,
  location = { address: '' },
  locationType = 'place',
  locationLabel = 'Sted:',
  noIngress,
  title,
  text,
  url = ''
}) => {
  return (
    <Card image={image} title={title} text={text} noIngress={noIngress} url={url}>
      <EventInfo
        location={location}
        locationLabel={locationLabel}
        date={date}
        locationType={locationType}
      />
    </Card>
  );
};
