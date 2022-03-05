const React4xp = require('/lib/enonic/react4xp')
const portal = require('/lib/xp/portal')
const contentLib = require('/lib/xp/content')
const guillotine = require('/headless/guillotineApi')

const {
  buildQueryOrderSearch,
  extractOrdersList
} = require('/headless/helpers/orderSearchRequests')

const { buildParentPathQuery } = require('/headless/helpers/helpers')

const minute = 60 * 1000
const hour = 60 * minute
const day = 24 * hour
const week = 7 * day

exports.get = function (request) {
  const {
    params: {
      debug = false
    } = {}
  } = request

  const component = portal.getComponent()

  const {
    config: {
      ordersPath: ordersKey,
      querysorting = 'desc',
      count
    } = {}
  } = component || {}

  if (debug) {
    log.info(JSON.stringify(component, null, 2))
  }

  const date = new Date().getTime()
  const since = new Date(date - week)

  const { _path: ordersPath } = (ordersKey && contentLib.get({ key: ordersKey })) || {}
  const parentPathQuery = buildParentPathQuery(ordersPath)

  const createSort = () => {
    switch (querysorting) {
      case 'asc':
        return 'createdTime ASC'

      case 'desc':
        return 'createdTime DESC'

      default:
        return ''
    }
  }

  const dateString = since.toISOString().substring(0, 10)

  const sortExpression = createSort()

  const variables = {
    first: count,
    offset: 0,
    sort: sortExpression,
    query: `${parentPathQuery} AND range('createdTime', instant('${dateString}T00:00:00Z'), '')`
  }

  log.info(JSON.stringify(variables, null, 2))

  const query = buildQueryOrderSearch()

  const result = ordersKey && guillotine.executeQuery(query, variables)
  const items = (ordersKey && extractOrdersList(result)) || []

  log.info(JSON.stringify(result, null, 0))
  log.info(JSON.stringify(items, null, 2))

  const {
    _path: sitePath
  } = portal.getSite()

  const siteUrl = portal
    .pageUrl({
      path: sitePath
    })

  const props = {
    items,
    searchPath: ordersKey && `${siteUrl.length > 8 ? siteUrl : ''}/api/headless`,
    parentPathQuery,
    count,
    dateFrom: dateString,
    sortExpression
  }

  log.info(JSON.stringify(props, null, 4))

  return React4xp.render('OrderSearchWrapper', props, request, { clientRender: true })
}
