const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

const utils = require('/lib/util');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const {
      _path: key,
      displayName: title,
      data: {
        description = '',
        tags = '',
      } = {},
    } = content;

    log.info(JSON.stringify(content, null, 4));

    const props = { title, description, tags };

    return React4xp.render(component, props, request);
};
