const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');
const React4xp = require('/lib/enonic/react4xp');

const { processHtml } = require('../shared/html');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();
    const {
      _path: key,
    } = content;

    const {
      config: {
        expandable,
        expanded,
        items: itemList = [],
      } = {},
    } = component;

    const items = [].concat(itemList);

    log.info(JSON.stringify(content, null, 4));
    log.info(JSON.stringify(component, null, 4));

    const props = {
      expandable,
      expanded,
      items: items.map((itemID) => {
        const {
          displayName: question,
          _path: itemPath,
          data: {
            answer,
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
          question,
          answer: processHtml(answer),
        };
      }),
    }

    log.info(JSON.stringify(request, null, 2));

    return React4xp.render('FaqList', props, request, { clientRender: expandable });
};
