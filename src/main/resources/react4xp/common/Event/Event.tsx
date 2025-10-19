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

/**
 * Props for the Event component
 *
 * @property date - Event date string (e.g., "2024-01-15")
 * @property time - Event time string (e.g., "18:00")
 * @property headerColor - Color for the title when displayed in image
 * @property headerPosition - Position of title in image ('left' | 'center' | 'right')
 * @property title - Event title/name
 * @property titleInImage - Whether to display title overlaid on the image
 * @property description - Full HTML description of the event
 * @property location - Location object with address information
 * @property image - Image data for the event header
 * @property ingress - Short introductory text/summary
 * @property ingressInImage - Whether to display ingress overlaid on the image
 * @property informationLabel - Label for the information section
 * @property moreInformationLabel - Label for the contact information section
 * @property locationLabel - Label for the location section
 * @property contactLabel - Label text before contact email
 * @property placeLabel - Label for the place/venue display
 * @property agendaLabel - Label for the agenda/schedule section
 * @property dateLabel - Label text before the date
 * @property timeLabel - Label text before the time
 * @property email - Contact email for the event
 * @property schedules - Array of schedule items for the event agenda
 * @property map - Map coordinates [latitude, longitude] for the event location
 */
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

/**
 * Full event page component that displays comprehensive event information including
 * header image, description, agenda, location details, and interactive map.
 *
 * The component uses a two-column layout with the main content (description, contact,
 * agenda) on the left (2/3 width) and location information (map, place, time) on the
 * right (1/3 width).
 *
 * @example
 * ```tsx
 * <Event
 *   title="Annual Conference 2024"
 *   date="2024-03-15"
 *   time="09:00"
 *   location={{ address: "Oslo Congress Centre, Oslo" }}
 *   map={[59.9139, 10.7522]}
 *   ingress="Join us for our annual conference"
 *   description="<p>Full event description...</p>"
 *   email="contact@example.com"
 *   schedules={[
 *     { time: '09:00', title: 'Registration' },
 *     { time: '10:00', title: 'Opening Keynote' }
 *   ]}
 * />
 * ```
 */
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
