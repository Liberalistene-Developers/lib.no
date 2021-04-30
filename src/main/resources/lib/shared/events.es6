const portal = require('/lib/xp/portal')
const contentLib = require('/lib/xp/content')

const { processHtml } = require('./html')
const { imageUrl } = require('./image')

export const mapEvent = (itemId) => {
  const {
    displayName: title,
    _path: itemPath,
    data: {
      from: date,
      to,
      place: address,
      ingress: text = '',
      image: imageKey
    } = {}
  } = contentLib.get({ key: itemId })

  return {
    itemId,
    title,
    date,
    to,
    url: portal
      .pageUrl({
        path: itemPath
      }),
    location: {
      address
    },
    text: processHtml(text),
    image: imageUrl(imageKey, 'block(459,295)', 'rounded(3);')
  }
}
