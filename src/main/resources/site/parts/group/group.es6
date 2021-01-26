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
        'short-description': shortDescription = '',
        description = '',
        image = '',
        tags = '',
        member = [],
        address = '',
      } = {},
    } = content;

    log.info(JSON.stringify(content, null, 4));

    const members = [].concat(member);

    const props = {
      title,
      image: imageUrl(image, 'full'),
      headerColor,
      headerPosition,
      ingressInImage,
      titleInImage,
      shortDescription,
      description: processHtml(description),
      location: {
        address: address.replace('\n', ',').replace(/ /g, '+'),
      },
      board: members.map(({
        role: roleId,
        person: personId,
      }) => {
        const {
          displayName: role
        } = contentLib.get({ key: roleId });
        const {
          displayName: person,
          _path: personPath,
          data: {
            image: imageKey,
          },
        } = contentLib.get({ key: personId });

        log.info(JSON.stringify(role, null, 4));
        log.info(JSON.stringify(person, null, 4));

        return {
          role,
          person,
          personUrl: portal
            .pageUrl({
              path: personPath,
            }),
          image: imageUrl(imageKey, 'full')
        };
      }),
      tags,
    };

    return React4xp.render('Group', props, request);
};
