const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');
const React4xp = require('/lib/enonic/react4xp');

const { imageUrl } = require('/lib/shared/image');
const { processHtml } = require('/lib/shared/html');

exports.get = function(request) {
    const content = portal.getContent();
    const component = portal.getComponent();

    const {
      config: {
        board,
        imagesize,
        imagetype,
      } = {},
    } = component;

    const {
      data: {
        member = [],
      } = {},
    } = board ? contentLib.get({ key: board }) : {};

    log.info(JSON.stringify(content, null, 4));

    const members = [].concat(member);

    const props = {
      imagesize,
      imagetype,
      board: members
        .map(({
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
              'short-description': boardShortDescription,
            },
          } = contentLib.get({ key: personId });

          log.info(JSON.stringify(role, null, 4));
          log.info(JSON.stringify(person, null, 4));

          return {
            name: person,
            role,
            shortDescription: boardShortDescription,
            url: portal
              .pageUrl({
                path: personPath,
              }),
            image: imageUrl(imageKey, 'full')
          };
        }),
    };

    return React4xp.render('Board', props, request);
};
