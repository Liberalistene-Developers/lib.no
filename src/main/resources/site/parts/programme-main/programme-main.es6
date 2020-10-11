const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');
const React4xp = require('/lib/enonic/react4xp');

const utils = require('/lib/util');

const { getSections } = require('../../lib/programme');

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
    
    const sections = getSections({
      key,
    });

    const props = { title, description, sections, tags };

    return React4xp.render(component, props, request);
};
