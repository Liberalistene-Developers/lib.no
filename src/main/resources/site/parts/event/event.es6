const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');
const React4xp = require('/lib/enonic/react4xp');

const { imageUrl } = require('/lib/shared/image');
const { processHtml } = require('/lib/shared/html');

const utils = require('/lib/util');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const {
      config: {
        headerColor,
        headerPosition,
        ingressInImage,
        titleInImage,
        informationLabel = '',
        moreInformationLabel = '',
        locationLabel = '',
        contactLabel = '',
        placeLabel = '',
        agendaLabel = '',
        dateLabel = '',
        timeLabel = '',
      } = {},
    } = component;

    const {
      _path: key,
      displayName: title,
      data: {
        from = '',
        to = '',
        place = '',
        description = '',
        image: imageKey = '',
        ingress = '',
        tags = '',
        map_geopoint = '',
        schedule = [],
        organizerSelector = [],
        speakers = [],
      } = {},
    } = content;
    
    const scheduleList = [].concat(schedule);
    const organizers = [].concat(organizerSelector);
    const speakersList = [].concat(speakers);
    
    log.info(JSON.stringify(content, null, 4));

    const props = {
      title,
      description: processHtml(description),
      headerColor,
      headerPosition,
      image: imageKey && {
        ...imageUrl(imageKey, 'full'),
      },
      ingress: processHtml(ingress),
      ingressInImage,
      tags,
      titleInImage,
      informationLabel,
      moreInformationLabel,
      locationLabel,
      contactLabel,
      placeLabel,
      agendaLabel,
      dateLabel,
      timeLabel,
      map: map_geopoint.split(',').map(parseFloat),
      schedules: scheduleList
        .map(({
          name: scheduleTitle,
          description: scheduleDescription,
          date,
          topics: scheduleTopics = [],
        }) => {          
          const items = [].concat(scheduleTopics)
            .map(({
              topic,
              speaker = [],
              start = '00:00',
              duration = '00:00',
              topic_description,
              topic_report,
            }) => {
              const speakers = [].concat(speaker);
              const [hours = '0', minutes = '0'] = duration.split(':');
              
              const createDuration = () => {
                const hoursNumber = parseInt(hours, 10);
                const minutesNumber =  parseInt(minutes, 10);
                
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
                start: (!start || start === '00:00') ? '' : start,
                duration: (!duration || duration === '00:00') ? '' : createDuration(),
                description: processHtml(topic_description),
                report: processHtml(topic_report),
                speakers: speakers
                  .map((speakerID) => {
                    const {
                      displayName: person,
                      _path: personPath,
                      data: {
                        image: imageKey,
                      },
                      ...rest
                    } = contentLib.get({ key: speakerID });

                    log.info(JSON.stringify(rest, null, 4));

                    return {                      
                      personID: speakerID,
                      personUrl: portal
                        .pageUrl({
                          path: personPath,
                        }),
                      person,
                      image: imageUrl(imageKey, 'square(40)'),
                    };
                  }),
              };
            })
            
          return {
            name: scheduleTitle,
            descriptions: processHtml(scheduleDescription),
            date,
            topics: items,
          };
        }),
    };

    return React4xp.render('Event', props, request, { clientRender: true });
};
