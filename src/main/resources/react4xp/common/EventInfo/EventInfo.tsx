import {type FC} from 'react';
import { FAIconEdit } from '/react4xp/common/FAIcon/FAIconEdit';

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
 * Props for the EventInfo component
 *
 * @property date - Event date string to display
 * @property location - Location data with address and/or name
 * @property locationType - Type of location: 'place' for physical location or 'virtual' for online events
 * @property locationLabel - Label text displayed before the location (e.g., "Sted:", "Place:")
 */
interface EventInfoProps {
  date?: string;
  location?: LocationData;
  locationType?: 'place' | 'virtual';
  locationLabel?: string;
}

/**
 * Event metadata component that displays location and date information in a compact format.
 *
 * This component shows an icon-based metadata row with the event's location (with a link)
 * and date/time. The location icon changes based on whether it's a physical place (map icon)
 * or virtual event (globe icon). Used as a child component in EventCard and EventListItem.
 *
 * @example
 * ```tsx
 * <EventInfo
 *   date="15. mars 2024, 18:00"
 *   location={{ address: "Oslo City Hall", name: "Oslo Rådhus" }}
 *   locationType="place"
 *   locationLabel="Sted:"
 * />
 * ```
 *
 * @example Virtual event
 * ```tsx
 * <EventInfo
 *   date="20. april 2024, 10:00"
 *   location={{ address: "https://zoom.us/meeting/123", name: "Zoom Meeting" }}
 *   locationType="virtual"
 *   locationLabel="Online:"
 * />
 * ```
 */
export const EventInfo: FC<EventInfoProps> = ({
  date = '',
  location = { address: '', name: '' },
  locationType = 'place',
  locationLabel = 'Sted:'
}) => (
  <div className="text-secondary-500 flex flex-row font-semibold text-[14px] justify-between leading-[17px] mb-[10px] mx-[15px] w-full [&_a]:text-secondary-500">
    <div className="max-w-[60%] overflow-hidden text-ellipsis whitespace-nowrap">
      <FAIconEdit iconType={locationType === 'place' ? 'fa-map' : 'fa-globe'} />
      &nbsp;{locationLabel} <a
        href={locationType === 'place' ? `https://maps.google.com?q=${location.address}` : location.address}
        title={location.address}
        rel="noreferrer"
      >
        {location.name || location.address}
      </a>
    </div>
    <div className="max-w-[40%] overflow-hidden text-ellipsis whitespace-nowrap" title={date}>
      <FAIconEdit iconType={'fa-clock'} /> <time dateTime={date}>{date}</time>
    </div>
  </div>
);
