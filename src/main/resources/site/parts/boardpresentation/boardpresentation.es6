const React4xp = require('/lib/enonic/react4xp')
const portal = require('/lib/xp/portal')

const { mapGroup } = require('/lib/shared/board')
const { findItems } = require('/lib/shared/query')

exports.get = function (request) {
  const {
    params: {
      debug = false
    } = {}
  } = request

  const component = portal.getComponent()

  const {
    config: {
      boardname: boardTitle = '',
      imagesize = '',
      imagetype = false,
      showemail = 'no',
      itemsSet: {
        _selected: selection,
        manual: {
          items: itemList = []
        } = {},
        query: {
          queryroot,
          querysorting = 'normal',
          count = 10
        } = {}
      } = {}
    } = {}
  } = component || {} || {}

  const items = []

  if (debug) {
    log.info(JSON.stringify(component, null, 2))
  }

  switch (selection) {
    case 'manual':
      items.push(...[].concat(itemList))
      break

    case 'query':
      if (queryroot) {
        const list = findItems('lib.no:group', queryroot, querysorting, count, 0)

        if (list.length) {
          items.push(...list)
        }
      }
      break
  }

  const props = {
    boardTitle,
    imagesize,
    imagetype: !!imagetype,
    showemail,
    items: items
      .map(mapGroup)
  }

  if (debug) {
    log.info(JSON.stringify(props, null, 4))
  }

  return React4xp.render('BoardPresentationList', props, request)
}
