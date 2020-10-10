const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');
const React4xp = require('/lib/enonic/react4xp');

// const utils = require('/lib/util');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();
    const children = contentLib.getChildren({
      key: content._path,
    });

    const {      
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
    
    const conclusions = children.count && children
      .hits
      .filter(({ type }) => type === 'lib.no:programme-conclusion')
      .map(({ _id: key, displayName: conclusion }) => ({ key, conclusion, }));
    
    const props = { title, description, conclusionTitle, conclusions, tags };

    return React4xp.render(component, props, request);
};
