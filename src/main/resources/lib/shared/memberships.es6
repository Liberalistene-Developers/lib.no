const portal = require('/lib/xp/portal')
const contentLib = require('/lib/xp/content')

const { processHtml } = require('./html')
const { imageUrl } = require('./image')

export const mapMembership = (itemId) => {
  const {
    displayName: name,
    _path: itemPath,
    data: {
      active,
      ingress: shortDescription = '',
      image: imageKey
    } = {}
  } = contentLib.get({ key: itemId }) || {}

  return {
    itemId,
    name,
    active,
    url: itemPath && portal
      .pageUrl({
        path: itemPath
      }),
    shortDescription: processHtml(shortDescription),
    image: imageUrl(imageKey, 'block(459,295)')
  }
}
