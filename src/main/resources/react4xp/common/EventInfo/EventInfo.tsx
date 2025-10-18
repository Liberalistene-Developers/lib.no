import {type FC} from 'react';
import { FAIconEdit } from '../FAIcon/FAIconEdit';

interface LocationData {
  address?: string;
  name?: string;
}

interface EventInfoProps {
  date?: string;
  location?: LocationData;
  locationType?: 'place' | 'virtual';
  locationLabel?: string;
}

/**
 * Primary Image holder for solution.
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
