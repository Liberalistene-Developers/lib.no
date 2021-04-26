const portal = require('/lib/xp/portal')
const React4xp = require('/lib/enonic/react4xp')

const { imageUrl } = require('/lib/shared/image')

exports.get = function (request) {
  const content = portal.getContent()
  const component = portal.getComponent()

  const {
    config: {
      image: imageKey = '',
      headerPosition: position,
      imageOverlay = '',
      ingress,
      ingressColor,
      title: oldTitle,
      headerColor,
      titleSet: {
        _selected: selection = 'simple',
        simple: title = { title: oldTitle, titleColor: headerColor },
        fancy: {
          titles = []
        } = {}
      } = {}
    } = {}
  } = component

  log.info(JSON.stringify(content, null, 4))

  const titleList = selection === 'simple' ? [title] : [].concat(titles)

  const props = {
    Tag: 'h1',
    image: imageUrl(imageKey, 'full'),
    title: titleList,
    position,
    ingress,
    ingressColor,
    overlay: imageOverlay && `overlay ${imageOverlay}`
  }

  log.info(JSON.stringify(props, null, 4))

  return React4xp.render('ImageBlock', props, request, { clientRender: true })
}
