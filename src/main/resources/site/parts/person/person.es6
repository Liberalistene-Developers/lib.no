const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

const { imageUrl } = require('../shared/image');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const {
      _path: key,
      displayName: title,
      data: {
        image,
        description = '',
        'short-description': shortDescription = '',
        tags = '',
      } = {},
    } = content;

    log.info(JSON.stringify(content, null, 4));

    const props = {
      title,
      imageUrl: imageUrl(image, 'block(192,256)'),
      description,
      shortDescription,
      tags,
    };

    return React4xp.render(component, props, request);
};
