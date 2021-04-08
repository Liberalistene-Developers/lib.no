const portal = require('/lib/xp/portal');
const React4xp = require('/lib/enonic/react4xp');

const { imageUrl } = require('/lib/shared/image');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const {
      config: {
        headerColor: text,
        headerPosition: position,
        headerType: Tag,
        image: configImageKey,
        imageOverlay = '',
        ingress: configIngress,
        title: configTitle,
      } = {},
    } = component;

    const {
      data: {
        image: imageKey = '',
        ingress = '',
        title = '',
      } = {},
    } = content;

    log.info(JSON.stringify(content, null, 4));

    const props = {
      Tag,
      image: {
        ...imageUrl(configImageKey || imageKey, 'full'),
        url: portal.attachmentUrl({ id: configImageKey || imageKey }),
      },
      overlay: imageOverlay && `overlay ${imageOverlay}`,
      ingress: configIngress || ingress,
      position,
      text,
      title: configTitle || title,
    };

    log.info(JSON.stringify(props, null, 4));

    return React4xp.render('ImageBlock', props, request);
};
