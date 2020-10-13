const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');
const React4xp = require('/lib/enonic/react4xp');

const { imageUrl } = require('../shared/image');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const {
      _path: key,
      displayName: title,
      data: {
        'short-description': shortDescription = '',
        description = '',
        image = '',
        tags = '',
        member = [],
      } = {},
    } = content;

    log.info(JSON.stringify(content, null, 4));

    const members = member && member.role ? [member] : member;

    const props = {
      title,
      imageUrl: imageUrl(image),
      shortDescription,
      description,
      board: members.map(({
        role: roleId,
        person: personId,
      }) => {
        const {
          displayName: role
        } = contentLib.get({ key: roleId });
        const {
          displayName: person,
          data: {
            image: imageKey,
          },
        } = contentLib.get({ key: personId });

        log.info(JSON.stringify(role, null, 4));
        log.info(JSON.stringify(person, null, 4));

        return {
          role,
          person,
          image: imageUrl(imageKey, 'block(96,128)')
        };
      }),
      tags,
    };

    return React4xp.render(component, props, request);
};
