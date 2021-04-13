const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');

const { processHtml } = require('./html');
const { imageUrl } = require('./image');

export const mapGroup = ((itemId) => {
  const {
    displayName: title,
    data: {
      'short-description': shortDescription = '',
      member = [],
    } = {},
  } = contentLib.get({ key: itemId });
  
  const members = [].concat(member);
  
  return {
    itemId,
    title,
    shortDescription: processHtml(shortDescription),
    board: members
      .map(mapBoard),
  };
});

export const mapBoard = ({
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
      email,
      'short-description': shortDescription,
    },
  } = contentLib.get({ key: personId });

  return {
    itemId: personId,
    name: person,
    email,
    role,
    shortDescription: processHtml(shortDescription),
    url: portal
      .pageUrl({
        path: personPath,
      }),
    image: imageUrl(imageKey, 'full')
  };
};