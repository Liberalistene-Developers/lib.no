import {type FC} from 'react';
import { ListItem } from '../ListItem/ListItem';
import { EventInfo } from '../EventInfo/EventInfo';

interface LocationData {
  address?: string;
  name?: string;
}

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
 * Primary Image holder for solution.
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
