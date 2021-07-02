const portal = require('/lib/xp/portal')
const React4xp = require('/lib/enonic/react4xp')

const { imageUrl } = require('/lib/shared/image')

exports.get = function (request) {
  const {
    params: {
      debug = false
    } = {}
  } = request

  const component = portal.getComponent()

  const {
    config: {
      image: imageKey = '',
      effect: effectKey = '',
      title = ''
    } = {}
  } = component || {}

  const props = {
    image: imageUrl(imageKey, 'full'),
    title,
    effect: imageUrl(effectKey, 'full')
  }

  if (debug) {
    log.info(JSON.stringify(props, null, 4))
  }

  return React4xp.render('FancyHeader', props, request)
}
