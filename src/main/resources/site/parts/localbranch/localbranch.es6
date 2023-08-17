const portal = require('/lib/xp/portal')
const React4xp = require('/lib/enonic/react4xp')

const { imageUrl } = require('/lib/shared/image')

exports.get = function (request) {
  const { params: { debug = false } = {} } = request

  const content = portal.getContent()
  const component = portal.getComponent()

  const {
    config: {
      headerPosition: position = 'left',
      headerType: Tag = 'h1',
      imageOverlay = 'purple',
      ingressColor = 'light',
      localColor = 'yellow block',
      mobileSize: titleClassName = 'full',
      titleColor = 'light',
      title: titleTop = 'Liberalistene'
    } = {}
  } = component || {}

  const {
    displayName: title,
    data: { image: imageKey, ingress }
  } = content

  if (debug) {
    log.info(JSON.stringify(content, null, 4))
  }

  const image = imageKey && {
    ...imageUrl(imageKey, 'full'),
    url: portal.attachmentUrl({ id: imageKey })
  }

  const props = {
    Tag,
    image,
    overlay: imageOverlay && `overlay ${imageOverlay}`,
    ingress,
    ingressColor,
    position,
    title: [
      { title: titleTop, titleColor },
      { title, titleColor: localColor }
    ],
    titleClassName
  }

  if (debug) {
    log.info(JSON.stringify(props, null, 4))
  }

  return React4xp.render('ImageBlock', props, request)
}
