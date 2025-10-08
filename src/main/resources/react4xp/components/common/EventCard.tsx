import * as React from 'react';
import { Card } from './Card';
import { EventInfo } from './EventInfo';

interface LocationData {
  address?: string;
  name?: string;
}

interface EventCardProps {
  date?: string;
  image?: {
    url?: string;
    displayName?: string;
    alternativeText?: string;
  } | null;
  location?: LocationData;
  locationType?: 'place' | 'virtual';
  locationLabel?: string;
  noIngress?: boolean;
  title?: string;
  text?: string;
  url?: string;
}

/**
 * Primary Image holder for solution.
 */
export const EventCard: React.FC<EventCardProps> = ({
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
