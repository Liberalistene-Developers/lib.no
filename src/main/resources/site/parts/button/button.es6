const React4xp = require('/lib/enonic/react4xp');
const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');

const { imageUrl } = require('../shared/image');
const { processHtml } = require('../shared/html');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const {
      _path: key,
    } = content;

    const {
      config: {
        buttonText: title,
        urlSelector: {
          _selected: urlType,
          intern: {
            url: urlKey,
          } = {},
          extern: {
            externUrl,
            target: externTarget,
          } = {},
        } = {},
      } = {},
    } = component;

    const createUrl = () => {
      if (urlType === 'intern') {
        const {
          _path: urlPath,
        } = urlKey ? contentLib.get({ key: urlKey }) : {};

        return [
          urlPath ? portal.pageUrl({ path: urlPath, }) : '',
        ];
      }

      return [
        externUrl,
        externTarget,
      ];
    };

    const  [url, target] = createUrl();

    const props = {
      title,
      url,
      target,
      className: 'medium-margin'
    };

    log.info(JSON.stringify(props, null, 4));

    return React4xp.render('Button', props, request, { clientRender: true });
};
