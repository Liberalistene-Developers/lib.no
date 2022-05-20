const portal = require('/lib/xp/portal')
const React4xp = require('/lib/enonic/react4xp')

const { imageUrl } = require('/lib/shared/image')

exports.get = function (request) {
  const { params: { debug = false } = {} } = request

  const content = portal.getContent()
  const component = portal.getComponent()

  const {
    config: {
      title: oldTitle,
      headerColor,
      titleSet: {
        _selected: selection = 'simple',
        simple: title = { title: oldTitle, titleColor: headerColor },
        fancy: { titles = [] } = {}
      } = {},
      headerPosition: position,
      headerType: Tag,
      image: imageKey,
      imageOverlay = '',
      ingress,
      ingressColor,
      mobileSize: titleClassName = 'full'
    } = {}
  } = component || {}

  const titleList = selection === 'simple' ? [title] : [].concat(titles)

  if (debug) {
    log.info(JSON.stringify(content, null, 4))
  }

  const props = {
    Tag,
    image: {
      ...imageUrl(imageKey, 'full'),
      url: portal.attachmentUrl({ id: imageKey })
    },
    overlay: imageOverlay && `overlay ${imageOverlay}`,
    ingress,
    ingressColor,
    position,
    title: titleList,
    titleClassName
  }

  if (debug) {
    log.info(JSON.stringify(props, null, 4))
  }

  return React4xp.render('ImageBlock', props, request)
}
