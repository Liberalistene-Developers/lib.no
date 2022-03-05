const portal = require('/lib/xp/portal')
const contentLib = require('/lib/xp/content')

const { processHtml } = require('./html')
const { imageUrl } = require('./image')

export const mapArticle = (itemId) => {
  const {
    displayName: name,
    _path: itemPath,
    data: {
      date: datePublished,
      ingress: shortDescription = '',
      image: imageKey
    } = {}
  } = contentLib.get({ key: itemId }) || {}

  return {
    itemId,
    name,
    url: itemPath && portal
      .pageUrl({
        path: itemPath
      }),
    datePublished,
    shortDescription: processHtml(shortDescription),
    image: imageUrl(imageKey, 'block(459,295)')
  }
}
