const React4xp = require('/lib/enonic/react4xp')
const portal = require('/lib/xp/portal')
const contentLib = require('/lib/xp/content')

const { imageUrl } = require('/lib/shared/image')
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
      } = {},
      highlighted = false,
      preText = ''
    } = {}
  } = component || {}

  if (debug) {
    log.info(JSON.stringify(component, null, 2))
  }

  const items = []

  switch (selection) {
    case 'manual':
      items.push(...[].concat(itemList))
      break

    case 'query':
      if (queryroot) {
        const list = findItems('lib.no:candidate', queryroot, querysorting, count, 0)

        if (list.length) {
          items.push(...list)
        }
      }
      break
  }

  const props = {
    items: items.map((itemID) => {
      const {
        displayName: name,
        _path: candidatePath,
        data: {
          person: personID,
          image: imageKey,
          place,
          position,
          ingress,
          ...dataRest
        } = {}
      } = contentLib.get({ key: itemID }) || {}

      if (debug) {
        log.info(JSON.stringify(dataRest, null, 2))
      }

      const {
        data: {
          image: personImageKey,
          'short-description': shortDescription
        } = {}
      } = (personID && contentLib.get({ key: personID })) || {}

      return {
        name,
        image: imageUrl(imageKey || personImageKey, 'full'),
        place,
        position,
        ingress: ingress || shortDescription,
        url: portal
          .pageUrl({
            path: candidatePath
          })
      }
    }),
    highlighted,
    preText
  }

  if (debug) {
    log.info(JSON.stringify(props, null, 4))
  }

  return React4xp.render('CandidatePresentationList', props, request, { clientRender: request.mode !== 'edit' })
}
