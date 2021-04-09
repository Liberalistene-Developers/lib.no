const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

const utils = require('/lib/util');

const { getParts } = require('/lib/shared/programme');

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
    
    const parts = getParts({
      key,
    });
    
    const props = { title, description, parts, tags };

    return React4xp.render('ProgrammeSection', props, request, { clientRender: true });
};
