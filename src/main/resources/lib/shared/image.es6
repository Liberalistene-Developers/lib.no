const portal = require('/lib/xp/portal')
const contentLib = require('/lib/xp/content')

export const imageUrl = (id, scale = 'block(256,192)', rounded = '') => id
  ? {
      ...(contentLib.get({ key: id }) || {}),
      url: scale !== 'full'
        ? portal.imageUrl({
          id,
          filter: `${rounded}sharpen();`,
          scale
        })
        : portal.attachmentUrl({ id })
    }
  : null
