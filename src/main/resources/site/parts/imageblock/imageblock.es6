const portal = require('/lib/xp/portal')
const React4xp = require('/lib/enonic/react4xp')

const { imageUrl } = require('/lib/shared/image')

exports.get = function (request) {
  const content = portal.getContent()
  const component = portal.getComponent()

  const {
    config: {
      titleSet: {
        _selected: selection,
        simple: title,
        fancy: {
          titles = []
        }
      },
      headerPosition: position,
      headerType: Tag,
      image: imageKey,
      imageOverlay = '',
      ingress,
      ingressColor
    } = {}
  } = component

  const titleList = selection === 'simple' ? [title] : [].concat(titles)

  log.info(JSON.stringify(content, null, 4))

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
    title: titleList
  }

  log.info(JSON.stringify(props, null, 4))

  return React4xp.render('ImageBlock', props, request)
}
