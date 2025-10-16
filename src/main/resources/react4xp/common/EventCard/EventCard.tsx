import { FC } from 'react';

import { Card } from '../Card/Card';
import { EventInfo } from '../EventInfo/EventInfo';
import type { ImageData, LocationData } from '../types';

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
 * Event card component for displaying event information
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
