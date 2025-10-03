import * as React from 'react';

import {Image} from '../../shared/Image';
import {EventListItem} from '../../shared/EventListItem';
import {EventCard} from '../../shared/EventCard';

interface EventItem {
  id?: string;
  url?: string;
  title?: string;
  image?: {
    url?: string;
  };
  text?: string;
  location?: unknown;
  date?: string;
  to?: string;
}

interface ImageType {
  url?: string;
}

interface EventListViewProps {
  children?: React.ReactNode;
  description?: string;
  displaytype?: string;
  image?: ImageType;
  shortDescription?: string;
  items?: EventItem[];
  tags?: unknown[];
  title?: string;
  showImage?: boolean;
  imageType?: string;
  imageSize?: string;
  readMore?: string;
  readMoreEnabled?: boolean;
  noIngress?: boolean;
}

export const EventListView: React.FC<EventListViewProps> = ({
  children,
  description,
  displaytype = 'grid',
  image,
  shortDescription,
  items = [],
  tags = [],
  title,
  showImage,
  imageType,
  imageSize,
  readMore = '',
  readMoreEnabled = false,
  noIngress = false
}) => {
  const Item = displaytype === 'list' ? EventListItem : EventCard;

  return (
    <div className="events-list-wrapper">
      {title && (
        <div className="events-list-title">
          <h2 title={title}>{title}</h2>
        </div>
      )}

      <Image image={image} />

      {shortDescription && (
        <div dangerouslySetInnerHTML={{__html: shortDescription}} />
      )}

      {description && (
        <div dangerouslySetInnerHTML={{__html: description}} />
      )}

      {items && items.length > 0 && (
        <div className={`events-list ${displaytype}`}>
          {items.map(({id, url, title, image, text, location, date, to}) => {
            if (displaytype === 'list') {
              return (
                <EventListItem
                  key={id}
                  title={title}
                  text={text}
                  location={location}
                  date={date}
                  url={to || url}
                />
              );
            }
            return (
              <EventCard
                key={id}
                title={title}
                text={text}
                location={location}
                date={date}
                url={to || url}
                image={image}
                noIngress={noIngress}
              />
            );
          })}
        </div>
      )}
      {children}
    </div>
  );
};
