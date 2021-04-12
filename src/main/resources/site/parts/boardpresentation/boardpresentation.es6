const React4xp = require('/lib/enonic/react4xp');
const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');
const guillotine = require('/headless/guillotineApi');

const { mapGroup } = require('/lib/shared/board');
const { findItems } = require('/lib/shared/query');

const { buildQueryArticleList, extractArticleList } = require('/headless/helpers/articleListRequests');
const { buildParentPathQuery } = require('/headless/helpers/helpers');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const {
      _path: key,
    } = content;

    const {
      config: {
        boardname: boardTitle = '',
        imagesize = '',
        imagetype = false,
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
      } = {},
    } = component;

    const items = [];

    log.info(JSON.stringify(content, null, 2));
    log.info(JSON.stringify(component, null, 2));

    switch (selection) {
      case 'manual':
        items.push(...[].concat(itemList));
        break;
        
      case 'query':
        if (queryroot) {
          const list = findItems('lib.no:group', queryroot, querysorting, count, 0);
          
          if (list.length) {
            items.push(...list);
          }        
        }  
        break;
    }
          
    const props = {
      boardTitle,
      imagesize,
      imagetype,
      items: items
        .map(mapGroup),
    };

    log.info(JSON.stringify(props, null, 4));

    return React4xp.render('BoardPresentationList', props, request);
};
