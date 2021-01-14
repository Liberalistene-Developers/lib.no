const React4xp = require('/lib/enonic/react4xp');
const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');

const { imageUrl } = require('../shared/image');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const {
      _path: key,
    } = content;

    const {
      config: {
        description,
        displaytype,
        imagesize,
        imagetype,
        persons = [],
        shortDescription,
        title,
      } = {},
    } = component;

    const items = [].concat(persons);

    log.info(JSON.stringify(content, null, 4));
    log.info(JSON.stringify(component, null, 4));

    const props = {
      title,
      displaytype,
      description,
      shortDescription,
      imagesize,
      imagetype,
      items: items.map((itemID) => {
        const {
          displayName: name,
          _path: itemPath,
          data: {
            image: imageKey,
            'short-description': personShortDescription = '',
            ...dataRest
          },
          ...rest
        } = contentLib.get({ key: itemID });

        log.info(JSON.stringify(rest, null, 4));
        log.info(JSON.stringify(dataRest, null, 4));

        return {
          itemID,
          url: portal
            .pageUrl({
              path: itemPath,
            }),
          name,
          shortDescription: personShortDescription,
          image: imageUrl(imageKey, 'square(256)')
        };
      }),
    };

    log.info(JSON.stringify(props, null, 4));

    return React4xp.render('PersonList', props, request);
};
