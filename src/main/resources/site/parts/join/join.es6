const React4xp = require('/lib/enonic/react4xp');
const contentLib = require('/lib/xp/content');
const portal = require('/lib/xp/portal');

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
        buttonText,
        url: urlKey,
        message,
        backMessage,
        image: imageKey,
        frontPlacement,
      } = {},
    } = component;
    
    const {
      _path: urlPath,
    } = contentLib.get({ key: urlKey });

    const props = {
      buttonText,
      url: portal
        .pageUrl({
          path: urlPath,
        }),
      message: processHtml(message),
      backMessage: processHtml(message),
      image: imageUrl(imageKey, 'square(200)'),
      className: 'medium-margin',
      frontPlacement,
    };

    log.info(JSON.stringify(props, null, 4));

    return React4xp.render('Join', props, request, { clientRender: true });
};
