const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');
const React4xp = require('/lib/enonic/react4xp');

const { imageUrl } = require('/lib/shared/image');
const { processHtml } = require('/lib/shared/html');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const {
      _path: key,
      displayName: title,
      data: {
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
      title,
      image: imageUrl(image),
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

        return {
          authorID,
          personUrl: portal
            .pageUrl({
              path: personPath,
            }),
          person,
          image: imageUrl(imageKey, 'block(96,128)')
        };
      }),
      ingress: processHtml(ingress),
      text: processHtml(text),
    };

    return React4xp.render(component, props, request);
};
