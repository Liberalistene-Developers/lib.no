import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getContent as getPortalContent, pageUrl} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';

interface EventConfig {
  headerColor?: string;
  headerPosition?: string;
  ingressInImage?: boolean;
  titleInImage?: boolean;
  informationLabel?: string;
  moreInformationLabel?: string;
  locationLabel?: string;
  contactLabel?: string;
  placeLabel?: string;
  agendaLabel?: string;
  dateLabel?: string;
  timeLabel?: string;
}

interface EventData {
  from?: string;
  to?: string;
  description?: string;
  image?: string;
  ingress?: string;
  tags?: string;
  map_geopoint?: string;
  schedule?: Array<{
    name: string;
    description: string;
    date: string;
    topics?: Array<{
      topic: string;
      speaker?: string | string[];
      start?: string;
      duration?: string;
      topic_description?: string;
      topic_report?: string;
    }>;
  }>;
  organizerSelector?: string | string[];
  speakers?: string | string[];
}

interface PersonData {
  image?: string;
}

export const eventProcessor: ComponentProcessor<'lib.no:event'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as EventConfig;

  const content = getPortalContent();
  if (!content) {
    return {};
  }

  const data = content.data as EventData;
  const scheduleList = data.schedule ? [].concat(data.schedule) : [];
  const organizers = data.organizerSelector ? [].concat(data.organizerSelector) : [];
  const speakersList = data.speakers ? [].concat(data.speakers) : [];

  return {
    from: data.from,
    to: data.to,
    title: content.displayName,
    // TODO: Add back when /lib/shared/html is migrated
    // description: processHtml(data.description || ''),
    description: data.description || '', // Temporarily unprocessed
    headerColor: config?.headerColor,
    headerPosition: config?.headerPosition,
    image: data.image && {
      // TODO: Add back when /lib/shared/image is migrated
      // ...imageUrl(data.image, 'full')
    },
    // TODO: Add back when /lib/shared/html is migrated
    // ingress: processHtml(data.ingress || ''),
    ingress: data.ingress || '', // Temporarily unprocessed
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
    // TODO: Add back when /lib/shared/board is migrated
    // speakers: speakersList.map(mapPerson),
    // organizers: organizers.map(mapPerson),
    speakers: speakersList, // Temporarily unprocessed
    organizers, // Temporarily unprocessed
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
          // TODO: Add back when /lib/shared/html is migrated
          // description: processHtml(topicDescription || ''),
          // report: processHtml(topicReport || ''),
          description: topicDescription || '', // Temporarily unprocessed
          report: topicReport || '', // Temporarily unprocessed
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
              // TODO: Add back when /lib/shared/image is migrated
              // image: imageUrl(speakerData.image, 'square(40)')
              image: speakerData.image // Temporarily unprocessed
            };
          }).filter(Boolean)
        };
      });

      return {
        name: scheduleTitle,
        // TODO: Add back when /lib/shared/html is migrated
        // descriptions: processHtml(scheduleDescription || ''),
        descriptions: scheduleDescription || '', // Temporarily unprocessed
        date,
        topics: items
      };
    })
  };
};
