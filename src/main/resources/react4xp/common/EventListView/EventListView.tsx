import * as React from 'react';

import {Image, type ImageData} from '@common/Image/Image';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';
import {EventListItem} from '@common/EventListItem/EventListItem';
import {EventCard} from '@common/EventCard/EventCard';

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

interface EventListViewProps {
  children?: React.ReactNode;
  description?: string;
  displaytype?: string;
  image?: ImageData;
  shortDescription?: string;
  items?: EventItem[];
  title?: string;
  noIngress?: boolean;
}

export const EventListView: React.FC<EventListViewProps> = ({
  children,
  description,
  displaytype = 'grid',
  image,
  shortDescription,
  items = [],
  title,
  noIngress = false
}) => {
  return (
    <div className="events-list-wrapper">
      {title && (
        <div className="events-list-title">
          <h2 title={title}>{title}</h2>
        </div>
      )}

      <Image image={image} />

      {shortDescription && (
        <SafeHtml html={shortDescription} />
      )}

      {description && (
        <SafeHtml html={description} />
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
