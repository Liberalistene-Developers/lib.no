const React4xp = require('/lib/enonic/react4xp');
const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');

const { imageUrl } = require('/lib/shared/image');
const { findItems } = require('/lib/shared/query');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const {
      _path: key,
    } = content;

    const {
      config: {
        itemsSet: {
          '_selected': selection,
          manual: {
            items: itemList = [],
          } = {},
          query: {
            queryroot,
            querysorting = 'normal',
            count = 10,            
          } = {},
        } = {},
        shortDescription,
        title,
      } = {},
    } = component;

    const items = [];

    switch (selection) {
      case 'manual':
        items.push(...[].concat(itemList));
        break;
        
      case 'query':
        if (queryroot) {
          const list = findItems('', queryroot, querysorting, count, 0);
          
          if (list.length) {
            items.push(...list);
          }        
        }  
        break;        
    }

    const props = {
      items: items.map((itemID) => {
        const {
          displayName: name,
          _path: itemPath,
          data: dataRest,
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
          title: name,
          current: key === itemPath,
        };
      }),
    };

    log.info(JSON.stringify(props, null, 4));

    return React4xp.render('Menu', props, request, { clientRender: true });
};
