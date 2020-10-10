const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');
const React4xp = require('/lib/enonic/react4xp');

const utils = require('/lib/util');

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
    
    const parts = children && children.count && children
      .hits
      .filter(({ type }) => 'lib.no:programme-part')
      .map(({
        _id: partKey,        
        _path: key, 
        displayName: partTitle,
        data: {
          description: partDescription,
          tags = [],
        } = {},
        page: {
          regions: {
            main: {
              components = [],
            } = {},
          } = {},
        } = {},        
      }) => {
        const partChildren = contentLib.getChildren({
          key,
        });
        
        const [{
          config: {
            conclusionTitle = '',
          } = {},
        } = {}] = (components && components.filter(({ descriptor }) => descriptor === 'lib.no:programme-part')) || {};
        
        const conclusions = partChildren && partChildren.count && partChildren
          .hits
          .filter(({ type }) => type === 'lib.no:programme-conclusion')
          .map(({ _id: key, displayName: conclusion }) => ({ key, conclusion, }));
        
        return {
          key: partKey,
          title: partTitle,
          description: partDescription,
          conclusionTitle,
          conclusions,
          tags,
        };
      });

    const props = { title, description, parts, tags };

    return React4xp.render(component, props, request);
};
