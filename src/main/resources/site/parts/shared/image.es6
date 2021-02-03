const portal = require('/lib/xp/portal');
const contentLib = require('/lib/xp/content');

export const imageUrl = (id, scale = 'block(256,192)') => id
  ? {
      ...contentLib.get({ key: id }),
      url: portal.imageUrl({
        id,
        filter: 'rounded(5);sharpen()',
        scale,
      }),
    }
  : null;
