import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {pageUrl} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';
import {imageUrl} from '/react4xp/utils/image';
import {processHtml} from '/react4xp/utils/html';
import {mapPerson} from '/react4xp/utils/board';

/**
 * Configuration for the event part.
 */
interface EventConfig {
  /** Header background color */
  headerColor?: string;
  /** Header image position/alignment */
  headerPosition?: string;
  /** Whether to display ingress text over the header image */
  ingressInImage?: boolean;
  /** Whether to display title over the header image */
  titleInImage?: boolean;
  /** Custom label for information section */
  informationLabel?: string;
  /** Custom label for more information section */
  moreInformationLabel?: string;
  /** Custom label for location section */
  locationLabel?: string;
  /** Custom label for contact section */
  contactLabel?: string;
  /** Custom label for place/venue */
  placeLabel?: string;
  /** Custom label for agenda section */
  agendaLabel?: string;
  /** Custom label for date */
  dateLabel?: string;
  /** Custom label for time */
  timeLabel?: string;
}

/**
 * Event content data structure.
 */
interface EventData {
  /** Event start date/time */
  from?: string;
  /** Event end date/time */
  to?: string;
  /** Full event description (HTML) */
  description?: string;
  /** Event header image ID */
  image?: string;
  /** Short event description/summary (HTML) */
  ingress?: string;
  /** Event tags/categories */
  tags?: string;
  /** Map coordinates in "lat,lng" format */
  map_geopoint?: string;
  /** Event schedule with topics and speakers */
  schedule?: Array<{
    /** Schedule section name */
    name: string;
    /** Schedule section description */
    description: string;
    /** Schedule date */
    date: string;
    /** Topics/sessions in this schedule section */
    topics?: Array<{
      /** Topic/session title */
      topic: string;
      /** Speaker(s) person content ID(s) */
      speaker?: string | string[];
      /** Start time (HH:MM format) */
      start?: string;
      /** Duration (HH:MM format) */
      duration?: string;
      /** Topic description (HTML) */
      topic_description?: string;
      /** Post-event report/summary (HTML) */
      topic_report?: string;
    }>;
  }>;
  /** Event organizer(s) person content ID(s) */
  organizerSelector?: string | string[];
  /** Event speaker(s) person content ID(s) */
  speakers?: string | string[];
}

/**
 * Person content data structure.
 */
interface PersonData {
  /** Person's profile image ID */
  image?: string;
}

/**
 * Processor for event component.
 *
 * Fetches comprehensive event data including:
 * - Basic event info (title, dates, description, images)
 * - Speakers and organizers (with profile data)
 * - Schedule with topics, speakers, and timing
 * - Map location coordinates
 * - Custom labels for UI elements
 *
 * The processor handles complex schedule structures with multiple topics per day,
 * including speaker information and duration formatting. Duration is formatted
 * as "X timer Y min" in Norwegian (e.g., "2 timer 30 min").
 *
 * @param component - The React4xp component configuration
 * @param content - The current content item (event)
 * @returns Props object for Event component with full event data
 *
 * @example
 * ```ts
 * // Returns:
 * {
 *   from: "2024-06-15T10:00:00Z",
 *   to: "2024-06-15T16:00:00Z",
 *   title: "Annual Conference 2024",
 *   description: "<p>Join us for...</p>",
 *   image: "https://example.com/_/image/abc123:full",
 *   ingress: "<p>A full day of...</p>",
 *   speakers: [{person: "John Doe", image: "..."}],
 *   organizers: [{person: "Jane Smith", image: "..."}],
 *   map: [59.9139, 10.7522],
 *   schedules: [{
 *     name: "Day 1",
 *     date: "2024-06-15",
 *     topics: [{
 *       title: "Opening keynote",
 *       start: "10:00",
 *       duration: "1 time 30 min",
 *       speakers: [...]
 *     }]
 *   }]
 * }
 * ```
 */
export const eventProcessor: ComponentProcessor<'lib.no:event'> = ({component, content}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as EventConfig;


  const data = content.data as EventData;
  const scheduleList = data.schedule ? [].concat(data.schedule) : [];
  const organizers = data.organizerSelector ? [].concat(data.organizerSelector) : [];
  const speakersList = data.speakers ? [].concat(data.speakers) : [];

  return {
    from: data.from,
    to: data.to,
    title: content.displayName,
    description: processHtml(data.description || ''),
    headerColor: config?.headerColor,
    headerPosition: config?.headerPosition,
    image: imageUrl(data.image, 'full'),
    ingress: processHtml(data.ingress || ''),
    ingressInImage: config?.ingressInImage,
    tags: data.tags,
    titleInImage: config?.titleInImage,
    informationLabel: config?.informationLabel,
    moreInformationLabel: config?.moreInformationLabel,
    locationLabel: config?.locationLabel,
    contactLabel: config?.contactLabel,
    placeLabel: config?.placeLabel,
    agendaLabel: config?.agendaLabel,
    dateLabel: config?.dateLabel,
    timeLabel: config?.timeLabel,
    editMode: false, // Will be set by React4xp v6
    speakers: speakersList.map(mapPerson),
    organizers: organizers.map(mapPerson),
    map: data.map_geopoint ? data.map_geopoint.split(',').map(parseFloat) : [],
    schedules: scheduleList.map(({name: scheduleTitle, description: scheduleDescription, date, topics: scheduleTopics = []}) => {
      const items = [].concat(scheduleTopics).map(({
        topic,
        speaker = [],
        start = '00:00',
        duration = '00:00',
        topic_description: topicDescription,
        topic_report: topicReport
      }) => {
        const speakers = [].concat(speaker);
        const [hours = '0', minutes = '0'] = duration.split(':');

        const createDuration = () => {
          const hoursNumber = parseInt(hours, 10);
          const minutesNumber = parseInt(minutes, 10);

          if (hoursNumber === 0) {
            return `${minutesNumber} min`;
          }

          const hoursString = hoursNumber === 1 ? `${hoursNumber} time` : `${hoursNumber} timer`;

          if (minutesNumber === 0) {
            return hoursString;
          }

          return `${hoursString} ${minutesNumber} min`;
        };

        return {
          title: topic,
          start: !start || start === '00:00' ? '' : start,
          duration: !duration || duration === '00:00' ? '' : createDuration(),
          description: processHtml(topicDescription || ''),
          report: processHtml(topicReport || ''),
          speakers: speakers.map((speakerID) => {
            const speakerContent = getContent({key: speakerID});
            if (!speakerContent) {
              return null;
            }

            const speakerData = speakerContent.data as PersonData;

            return {
              personID: speakerID,
              personUrl: pageUrl({path: speakerContent._path}),
              person: speakerContent.displayName,
              image: imageUrl(speakerData.image, 'square(40)')
            };
          }).filter(Boolean)
        };
      });

      return {
        name: scheduleTitle,
        descriptions: processHtml(scheduleDescription || ''),
        date,
        topics: items
      };
    })
  };
};
