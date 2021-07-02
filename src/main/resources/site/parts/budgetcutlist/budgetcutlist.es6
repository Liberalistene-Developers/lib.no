const React4xp = require('/lib/enonic/react4xp')
const portal = require('/lib/xp/portal')
const contentLib = require('/lib/xp/content')

const { findItems } = require('/lib/shared/query')
const { processHtml } = require('/lib/shared/html')

exports.get = function (request) {
  const {
    params: {
      debug = false
    } = {}
  } = request

  const component = portal.getComponent()

  const {
    config: {
      ingress = '',
      items: oldItemList = [],
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
      labelBudget = '',
      labelCut = '',
      labelNumberText = '',
      labelPercent = '',
      labelSumary = '',
      labelSumCut = '',
      labelTitle = '',
      title
    } = {}
  } = component || {}

  const items = [].concat(oldItemList)

  if (debug) {
    log.info(JSON.stringify(component, null, 2))
  }

  switch (selection) {
    case 'manual':
      items.push(...[].concat(itemList))
      break

    case 'query':
      if (queryroot) {
        const list = findItems('lib.no:budgetcut', queryroot, querysorting, count, 0)

        if (list.length) {
          items.push(...list)
        }
      }
      break
  }

  const props = {
    title,
    ingress,
    labelBudget,
    labelCut,
    labelNumberText,
    labelPercent,
    labelSumary,
    labelSumCut,
    labelTitle,
    className: 'grid',
    items: items.map((itemID) => {
      const {
        displayName: name,
        _path: itemPath,
        data: {
          description,
          budget,
          cut,
          percent,
          cuts = [],
          sumary
        } = {}
      } = contentLib.get({ key: itemID }) || {}

      return {
        itemID,
        itemPath,
        title: name,
        description: processHtml(description),
        budget,
        cut,
        percent,
        cuts: []
          .concat(cuts)
          .map(({ description: itemDescription, ...rest }) => ({
            ...rest,
            description: processHtml(itemDescription)
          })),
        sumary: processHtml(sumary)
      }
    })
  }

  if (debug) {
    log.info(JSON.stringify(props, null, 4))
  }

  return React4xp.render('BudgetCutList', props, request)
}
