const portal = require('/lib/xp/portal')
const React4xp = require('/lib/enonic/react4xp')

const { imageUrl } = require('/lib/shared/image')

exports.get = function (request) {
  const { params: { debug = false } = {} } = request

  const content = portal.getContent()

  const {
    data: {
      introimage: imageKey,
      introtitle: title,
      introdescription: description,
      introcaption: caption
    }
  } = content

  if (debug) {
    log.info(JSON.stringify(content, null, 4))
  }

  const image = imageKey && {
    ...imageUrl(imageKey, 'full'),
    url: portal.attachmentUrl({ id: imageKey })
  }

  const props = {
    caption,
    description,
    image,
    title
  }

  if (debug) {
    log.info(JSON.stringify(props, null, 4))
  }

  return React4xp.render('IntroBlock', props, request)
}
