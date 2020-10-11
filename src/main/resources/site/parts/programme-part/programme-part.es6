const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');
const React4xp = require('/lib/enonic/react4xp');

// const utils = require('/lib/util');
const { getConclusions } = require('../../lib/programme');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();
    const children = contentLib.getChildren({
      key: content._path,
    });

    const {
      _path: key,
      displayName: title,
      data: {
        description = '',
        tags = '',
      } = {},
    } = content;
    const {
      config: {
        conclusionTitle = '',
      } = {},
    } = component;
    
    const conclusions = getConclusions({
      key,
    })
    
    const props = { title, description, conclusionTitle, conclusions, tags };

    return React4xp.render(component, props, request);
};
