import {type FC} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faMap } from '@fortawesome/free-solid-svg-icons';

interface LocationData {
  address?: string;
  url?: string;
  name?: string;
}

interface EventPlaceProps {
  location?: LocationData;
  locationLabel?: string;
}

/**
 * Primary Event Place holder for solution.
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
