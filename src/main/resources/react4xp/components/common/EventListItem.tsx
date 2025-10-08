import * as React from 'react';
import { ListItem } from './ListItem';
import { EventInfo } from './EventInfo';

interface LocationData {
  address?: string;
  name?: string;
}

interface EventListItemProps {
  children?: React.ReactNode;
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
export const EventListItem: React.FC<EventListItemProps> = ({
  children,
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
