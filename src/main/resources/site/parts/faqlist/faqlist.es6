const portal = require('/lib/xp/portal')
const contentLib = require('/lib/xp/content')
const React4xp = require('/lib/enonic/react4xp')

const { processHtml } = require('/lib/shared/html')
const { findItems } = require('/lib/shared/query')

exports.get = function (request) {
  const content = portal.getContent()
  const component = portal.getComponent()

  const {
    config: {
      anchorText,
      expandable,
      expanded,
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
  } = component

  const items = []

  log.debug(JSON.stringify(content, null, 2))
  log.debug(JSON.stringify(component, null, 2))

  switch (selection) {
    case 'manual':
      items.push(...[].concat(itemList))
      break

    case 'query':
      if (queryroot) {
        const list = findItems('lib.no:faq', queryroot, querysorting, count, 0)

        if (list.length) {
          items.push(...list)
        }
      }
      break
  }

  const props = {
    anchorText,
    expandable,
    expanded,
    items: items.map((itemID) => {
      const {
        displayName: question,
        _path: itemPath,
        data: {
          answer,
          ...dataRest
        },
        ...rest
      } = contentLib.get({ key: itemID })

      log.info(JSON.stringify(rest, null, 4))
      log.info(JSON.stringify(dataRest, null, 4))

      return {
        itemID,
        url: portal
          .pageUrl({
            path: itemPath
          }),
        question,
        answer: processHtml(answer)
      }
    })
  }

  return React4xp.render('FaqList', props, request, { clientRender: true })
}
