const portal = require('/lib/xp/portal')
const contentLib = require('/lib/xp/content')
const React4xp = require('/lib/enonic/react4xp')

const { mapBoard } = require('/lib/shared/board')

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
      board,
      imagesize = '',
      imagetype = false,
      showemail = 'no',
      showDescriptions = false
    } = {}
  } = component || {} || {}

  const {
    data: {
      member = []
    } = {}
  } = board ? contentLib.get({ key: board }) || {} : {}

  if (debug) {
    log.info(JSON.stringify(content, null, 4))
  }

  const members = [].concat(member)

  const props = {
    imagesize,
    imagetype: !!imagetype,
    board: members
      .map(mapBoard),
    showemail,
    showDescriptions
  }

  return React4xp.render('Board', props, request)
}
