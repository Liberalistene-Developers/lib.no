const React4xp = require('/lib/enonic/react4xp');
const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');

const { imageUrl } = require('../shared/image');
const { findItems } = require('../shared/query');

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
        items: oldItemList = [],
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

    const items = [].concat(oldItemList);

    log.info(JSON.stringify(content, null, 2));
    log.info(JSON.stringify(component, null, 2));
    
    switch (selection) {
      case 'manual':
        items.push(...[].concat(itemList));
        break;
        
      case 'query':
        if (queryroot) {
          const list = findItems('lib.no:article', queryroot, querysorting, count, 0);
          
          if (list.length) {
            items.push(...list);
          }        
        }  
        break;        
    }

    const props = {
      title,
      displaytype,
      description,
      shortDescription,
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

    return React4xp.render('ArticleList', props, request);
};
