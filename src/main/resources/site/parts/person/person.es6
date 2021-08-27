const portal = require('/lib/xp/portal')
const React4xp = require('/lib/enonic/react4xp')

const { imageUrl } = require('/lib/shared/image')
const { processHtml } = require('/lib/shared/html')

exports.get = function (request) {
  const {
    params: {
      debug = false
    } = {}
  } = request

  const content = portal.getContent()
  const component = portal.getComponent()

  const {
    config: {
      emailPrefix
    } = {}
  } = component || {} || {}

  const {
    displayName: title,
    data: {
      image,
      description = '',
      'short-description': shortDescription = '',
      email,
      tags: tag = ''
    } = {}
  } = content || {}

  const tags = tag ? [].concat(tag) : []

  if (debug) {
    log.info(JSON.stringify(content, null, 4))
  }

  const props = {
    title,
    image: imageUrl(image, 'block(192,256)'),
    description: processHtml(description),
    shortDescription,
    email,
    emailPrefix,
    tags
  }

  return React4xp.render(component, props, request)
}
