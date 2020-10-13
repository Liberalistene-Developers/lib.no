const portal = require('/lib/xp/portal');

export const imageUrl = (id, scale = 'block(256,192)') => id
  ? portal.imageUrl({
    id,
    filter: 'rounded(5);sharpen()',
    scale,
  })
  : null;
