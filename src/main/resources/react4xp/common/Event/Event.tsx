import {ImageBlock} from '@common/ImageBlock/ImageBlock';
import {Schedules, type ScheduleType} from '@common/Schedule/Schedule';
import {EventPlace} from '@common/EventPlace/EventPlace';
import {EventTime} from '@common/EventTime/EventTime';
import {MapLoader} from '@common/MapLoader/MapLoader';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';
import type {ImageData} from '@common/types';

interface LocationType {
  address?: string;
}

export interface EventProps {
  date?: string;
  time?: string;
  headerColor?: string;
  headerPosition?: string;
  title?: string;
  titleInImage?: boolean;
  description?: string;
  location?: LocationType;
  image?: ImageData;
  ingress?: string;
  ingressInImage?: boolean;
  informationLabel?: string;
  moreInformationLabel?: string;
  locationLabel?: string;
  contactLabel?: string;
  placeLabel?: string;
  agendaLabel?: string;
  dateLabel?: string;
  timeLabel?: string;
  email?: string;
  schedules?: ScheduleType[];
  map?: number[];
}

export const Event = ({
  date,
  time,
  headerColor,
  headerPosition,
  title = '',
  titleInImage,
  description = '',
  location,
  image,
  ingress = '',
  ingressInImage,
  informationLabel,
  moreInformationLabel,
  locationLabel,
  contactLabel,
  placeLabel,
  agendaLabel = '',
  dateLabel,
  timeLabel,
  email,
  schedules = [],
  map = []
}: EventProps) => (
  <div className="[&_.leaflet-container]:h-[500px] [&_.leaflet-container]:w-full">
    <ImageBlock
      title={titleInImage && title ? [{title, titleColor: headerColor}] : []}
      image={image}
      ingress={(ingressInImage && ingress) || ''}
      position={headerPosition as 'left' | 'center' | 'right'}
    />

    {!titleInImage && title && (
      <h1>{title}</h1>
    )}

    {!ingressInImage && ingress && (
      <SafeHtml html={ingress} />
    )}

    <div className="flex justify-between pt-10 w-full [&_h2]:text-[38px] [&_h2]:leading-[46px] [&_h2]:mb-5">
      <div className="w-2/3">
        {description && (
          <div className="mb-10">
            {informationLabel && (
              <h2 id={informationLabel}>{informationLabel}</h2>
            )}
            <SafeHtml html={description} className="max-w-[964px]" />
          </div>
        )}
        {email && (
          <div className="mb-10">
            {moreInformationLabel && (
              <h2 id={moreInformationLabel}>{moreInformationLabel}</h2>
            )}
            <div className="rich-text">
              {contactLabel} <a href={`mailto:${email}?subject=${title}`} rel="noreferrer">{email}</a>
            </div>
          </div>
        )}

        {schedules && schedules.length > 0
          ? (
            <div>
              {agendaLabel && (
                <h2 id={agendaLabel}>{agendaLabel}</h2>
              )}
              <Schedules schedules={schedules} />
            </div>
          )
          : null}
      </div>
      {((map && map.length === 2) || (location && location.address)) && (
        <div className="w-1/3 [&_.map-container]:mb-10 [&_.event-place]:mb-10 [&_.event-place]:text-secondary-500 [&_.event-place]:text-[25px] [&_.event-place]:font-semibold [&_.event-place]:leading-[30px] [&_.event-time]:text-secondary-500 [&_.event-time]:text-[25px] [&_.event-time]:font-semibold [&_.event-time]:leading-[30px]">
          {locationLabel && (
            <h2 id={locationLabel}>{locationLabel}</h2>
          )}

          <MapLoader position={map as number[]} address={location && location.address} />

          {location && (
            <EventPlace location={location} locationLabel={placeLabel} />
          )}

          {(date || time) && (
            <EventTime date={date} dateLabel={dateLabel} time={time} timeLabel={timeLabel} />
          )}
        </div>
      )}
    </div>
  </div>
);
