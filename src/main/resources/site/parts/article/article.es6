const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');
const React4xp = require('/lib/enonic/react4xp');

const { imageUrl } = require('../shared/image');
const { processHtml } = require('../shared/html');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const {
      config: {
        headerColor,
        headerPosition,
        ingressInImage,
        titleInImage,
      } = {},
    } = component;

    const {
      _path: key,
      displayName: title,
      data: {
        date,
        description = '',
        ingress = '',
        text = '',
        image = '',
        tags = '',
        author = []
      } = {},
    } = content;

    const authors = [].concat(author);

    // log.info(JSON.stringify(content, null, 4));
    // log.info(JSON.stringify(author, null, 4))

    const props = {
      headerColor,
      headerPosition,
      ingressInImage,
      titleInImage,
      title,
      image: imageUrl(image, 'full'),
      description,
      tags,
      authors: authors.map((authorID) => {
        const {
          displayName: person,
          _path: personPath,
          data: {
            image: imageKey,
          },
          ...rest
        } = contentLib.get({ key: authorID });

        log.info(JSON.stringify(rest, null, 4));

        return {
          authorID,
          personUrl: portal
            .pageUrl({
              path: personPath,
            }),
          person,
          image: imageUrl(imageKey, 'square(40)'),
        };
      }),
      ingress: processHtml(ingress),
      text: processHtml(text),
    };

    return React4xp.render('Article', props, request);
};
