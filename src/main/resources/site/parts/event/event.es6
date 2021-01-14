const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

const { imageUrl } = require('../shared/image');

const utils = require('/lib/util');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const {
      config: {
        headerColor,
        headerPosition,
      } = {},
    } = component;

    const {
      _path: key,
      displayName: title,
      data: {
        description = '',
        image: imageKey = '',
        ingress = '',
        tags = '',
        map_geopoint = '',
      } = {},
    } = content;

    log.info(JSON.stringify(content, null, 4));

    const props = {
      title,
      description,
      headerColor,
      headerPosition,
      image: imageKey && {
        ...imageUrl(imageKey, 'block(1296,424)'),
        url: portal.attachmentUrl({ id: imageKey }),
      },
      ingress,
      tags,
      map: map_geopoint.split(',').map(parseFloat),
    };

    return React4xp.render('Event', props, request, { clientRender: true });
};
