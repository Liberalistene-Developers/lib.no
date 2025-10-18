import {type FC} from 'react';

import { Card } from '/react4xp/common/Card/Card';
import { EventInfo } from '/react4xp/common/EventInfo/EventInfo';
import type { ImageData, LocationData } from '/react4xp/common/types';

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
