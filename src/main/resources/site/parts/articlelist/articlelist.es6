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
        displaytype: {
          _selected: displaytype,
          list: {
            image: {
              _selected: imageSelection = 'hide',
              show: {
                imagesize: imageSize = 'small',
                imagetype: imageRound = false,
              } = {},
            } = {},
          } = {},
        } = {},
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
        readMore = '',
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
      showImage: displaytype === 'list' && imageSelection === 'show',
      imageSize,
      imageType: imageRound ? 'round' : '',
      readMore,
      items: items.map((itemID) => {
        const {
          displayName: name,
          _path: itemPath,
          data: {
            date: datePublished,
            image: imageKey,
            ingress: articleShortDescription = '',
            author = [],
            ...dataRest
          },
          ...rest
        } = contentLib.get({ key: itemID });
        
        const authors = [].concat(author)
          .map((authorID) => {
            const {
              displayName: person,
              _path: personPath,
              data: {
                image: personImageKey,
              },
              ...authorRest
            } = contentLib.get({ key: authorID });

            log.info(JSON.stringify(authorRest, null, 4));

            return {
              authorID,
              personUrl: portal
                .pageUrl({
                  path: personPath,
                }),
              person,
              image: imageUrl(personImageKey, 'square(40)'),
            };
          });

        log.info(JSON.stringify(rest, null, 4));
        log.info(JSON.stringify(dataRest, null, 4));

        return {
          itemID,
          url: portal
            .pageUrl({
              path: itemPath,
            }),
          name,
          authors,
          datePublished,
          shortDescription: articleShortDescription,
          image: imageUrl(imageKey, displaytype === 'list' ? 'square(256)' : 'block(459,295)', 'rounded(3);'),
        };
      }),
    };

    log.info(JSON.stringify(props, null, 4));

    return React4xp.render('ArticleList', props, request, { clientRender: true });
};
