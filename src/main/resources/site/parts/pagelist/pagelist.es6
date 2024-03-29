const React4xp = require('/lib/enonic/react4xp')
const portal = require('/lib/xp/portal')
const contentLib = require('/lib/xp/content')

const { imageUrl } = require('/lib/shared/image')
const { processHtml } = require('/lib/shared/html')

exports.get = function (request) {
  const { params: { debug = false } = {} } = request

  const component = portal.getComponent()

  const {
    config: {
      items = [],
      hideIngress = false,
      displaytype: {
        _selected: displaytype,
        gridlist: {
          titleCenter = false,
          imagesize = 'full',
          imagetype: imageround = false
        },
        list: {
          image: {
            _selected: imageSelection = 'hide',
            show: {
              imagesize: imageSize = 'full',
              imagetype: imageRound = false
            } = {}
          } = {}
        } = {}
      } = {},
      title
    } = {}
  } = component || {}

  const itemsList = [].concat(items)

  if (debug) {
    log.info(JSON.stringify(component, null, 2))
  }

  const props = {
    title,
    displaytype,
    showImage: displaytype === 'list' && imageSelection === 'show',
    imageSize: displaytype === 'gridlist' ? imagesize : imageSize,
    titleCenter: displaytype === 'gridlist' && titleCenter,
    imageType: (displaytype === 'gridlist' ? imageround : imageRound)
      ? 'round'
      : '',
    items: itemsList.map(({ item: itemKey, image: imageKey, ingress }) => {
      const {
        displayName: itemName,
        _path: itemPath,
        data: {
          image: itemImageKey,
          ingress: itemIngress,
          'short-description': shortDescription
        } = {}
      } = contentLib.get({ key: itemKey }) || {}

      return {
        id: itemKey,
        name: itemName,
        url: portal.pageUrl({
          path: itemPath
        }),
        shortDescription: processHtml(
          ingress || itemIngress || shortDescription
        ),
        image: (imageKey || itemImageKey) && imageUrl(imageKey || itemImageKey)
      }
    }),
    noIngress: !!hideIngress
  }

  if (debug) {
    log.info(JSON.stringify(props, null, 4))
  }

  return React4xp.render('ArticleList', props, request, { clientRender: true })
}
