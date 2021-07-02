const portal = require('/lib/xp/portal')
const React4xp = require('/lib/enonic/react4xp')

exports.get = function (request) {
  const {
    params: {
      debug = false
    } = {}
  } = request

  const content = portal.getContent()
  const component = portal.getComponent()

  const {
    displayName: title,
    data: {
      description = '',
      short_description: shortDescription = '',
      tags = ''
    } = {}
  } = content || {}

  if (debug) {
    log.info(JSON.stringify(content, null, 4))
  }

  const props = { title, shortDescription, description, tags }

  return React4xp.render(component, props, request)
}
