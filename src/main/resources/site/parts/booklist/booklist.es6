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
        buyFromText,
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
          const list = findItems('lib.no:book', queryroot, querysorting, count, 0);
          
          if (list.length) {
            items.push(...list);
          }        
        }  
        break;        
    }
    
    const authorCache = {};

    const props = {
      title,
      displaytype,
      description,
      shortDescription,
      buyFromText,
      className: 'grid',
      items: items.map((itemID) => {
        const {
          displayName: name,
          _path: itemPath,
          data: {
            image: imageKey,
            'ingress': bookShortDescription = '',
            author: authorList,
            buy: buyFrom,
            ...dataRest
          },
          ...rest
        } = contentLib.get({ key: itemID });

        const buy = [].concat(buyFrom);        
        const authors = [].concat(authorList).slice(0, 1);
        const [author] = authors.map((authorId) => {
          if (!authorCache[authorId]) {
            const {
              displayName: authorName,
              _path: authorPath,
            } = contentLib.get({ key: authorId });
            
            authorCache[authorId] = {
              name: authorName,
              url: authorPath,
            };
          }
                    
          return authorCache[authorId];
        });

        log.info(JSON.stringify(rest, null, 4));
        log.info(JSON.stringify(dataRest, null, 4));

        return {
          itemID,
          url: portal
            .pageUrl({
              path: itemPath,
            }),
          author,
          title: name,
          text: bookShortDescription,
          image: imageUrl(imageKey, 'block(157,239)'),
          buy: buy.length ? buy[0] : null,
          buyFromText,
        };
      }),
    };

    log.info(JSON.stringify(props, null, 4));

    return React4xp.render('BookList', props, request);
};
