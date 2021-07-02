const portal = require('/lib/xp/portal')
const React4xp = require('/lib/enonic/react4xp')

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
      title = '',
      titleColor = '',
      text = ''
    } = {}
  } = component || {}

  if (debug) {
    log.info(JSON.stringify(content, null, 4))
  }

  const props = {
    title,
    titleColor,
    text: processHtml(text)
  }

  if (debug) {
    log.info(JSON.stringify(props, null, 4))
  }

  return React4xp.render('TextBlock', props, request, { clientRender: true })
}
