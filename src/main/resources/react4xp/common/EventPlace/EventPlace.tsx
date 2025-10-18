import {type FC} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faMap } from '@fortawesome/free-solid-svg-icons';

/**
 * Location data for event place information
 *
 * @property address - Physical address for in-person events
 * @property url - URL for virtual/online events
 * @property name - Display name of the location or event venue
 */
interface LocationData {
  address?: string;
  url?: string;
  name?: string;
}

/**
 * Props for the EventPlace component
 *
 * @property location - Location data with address, URL, and/or name
 * @property locationLabel - Label text displayed before the location (e.g., "Sted:", "Place:")
 */
interface EventPlaceProps {
  location?: LocationData;
  locationLabel?: string;
}

/**
 * Event location component that displays venue or virtual meeting information.
 *
 * The component automatically determines if the event is physical (has address) or
 * virtual (no address) and displays the appropriate icon:
 * - Map icon for physical locations (links to Google Maps)
 * - Globe icon for virtual events (links to the URL)
 *
 * Address text is formatted by replacing newlines with commas for display.
 *
 * @example Physical location
 * ```tsx
 * <EventPlace
 *   location={{ address: "Oslo Rådhus\nRådhusplassen 1\n0037 Oslo", name: "Oslo City Hall" }}
 *   locationLabel="Sted:"
 * />
 * ```
 *
 * @example Virtual event
 * ```tsx
 * <EventPlace
 *   location={{ url: "https://zoom.us/meeting/123", name: "Zoom Meeting" }}
 *   locationLabel="Online:"
 * />
 * ```
 */
export const EventPlace: FC<EventPlaceProps> = ({
  location = { address: '', url: '', name: '' },
  locationLabel = 'Sted:'
}) => {
  const locationType = location.address ? 'place' : 'virtual';

  return (
    <div className="event-place">
      <FontAwesomeIcon icon={locationType === 'place' ? faMap : faGlobe} />  {locationLabel} <a href={locationType === 'place' ? `https://maps.google.com?q=${location.address}` : location.url} rel="noreferrer">{location.name || location.address?.replace(/\n/g, ', ') || location.url}</a>
    </div>
  );
};
