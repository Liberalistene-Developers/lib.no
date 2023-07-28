const React4xp = require('/lib/enonic/react4xp')
const portal = require('/lib/xp/portal')
const contentLib = require('/lib/xp/content')
const guillotine = require('/headless/guillotineApi')

const {
  buildQueryEventList,
  extractEventList
} = require('/headless/helpers/eventListRequests')
const { buildParentPathQuery } = require('/headless/helpers/helpers')

const { mapEvent } = require('/lib/shared/events')

exports.get = function (request) {
  const { params: { debug = false } = {} } = request

  const component = portal.getComponent()

  const {
    config: {
      description,
      displaytype: {
        _selected: displaytype,
        list: {
          image: {
            _selected: imageSelection = 'hide',
            show: {
              imagesize: imageSize = 'full',
              imagetype: imageRound = false
            } = {}
          } = {}
        } = {}
      } = {},
      itemsSet: {
        _selected: selection,
        manual: { items: itemList = [] } = {},
        query: { queryroot, querysorting = 'normal', count = 10 } = {}
      } = {},
      hideIngress = false,
      shortDescription,
      title,
      readMore = '',
      readMoreEnabled = false,
      loadMore = '',
      loadMoreEnabled = false
    } = {}
  } = component || {}

  const items = []

  if (debug) {
    log.info(JSON.stringify(component, null, 2))
  }

  const headless = selection === 'query'
  const { _path: queryPath } =
    headless && queryroot ? contentLib.get({ key: queryroot }) || {} : {}

  const parentPathQuery =
    headless && queryPath && buildParentPathQuery(queryPath)

  const createSort = () => {
    switch (querysorting) {
      case 'asc':
        return 'data.date ASC'

      case 'desc':
        return 'data.date DESC'

      default:
        return ''
    }
  }

  const sortExpression = createSort()
  const useLoader = selection !== 'manual'

  switch (selection) {
    case 'manual':
      items.push(...[].concat(itemList.map(mapEvent)))
      break

    case 'query':
      if (queryroot) {
        const variables = {
          first: count,
          offset: 0,
          sort: sortExpression,
          parentPathQuery
        }

        const query = buildQueryEventList()

        const result = guillotine.executeQuery(query, variables)
        const list = extractEventList(result)

        if (debug) {
          log.info(JSON.stringify(list, null, 2))
        }

        if (list.length) {
          items.push(...list)
        }
      }
      break
  }

  const { _path: sitePath } = portal.getSite() || {}

  const siteUrl = portal.pageUrl({
    path: sitePath
  })

  const props = {
    title,
    displaytype,
    description,
    shortDescription,
    showImage: displaytype === 'list' && imageSelection === 'show',
    imageSize,
    imageType: imageRound ? 'round' : '',
    readMore,
    readMoreEnabled,
    loadMore,
    loadMoreEnabled,
    items,
    apiUrl: headless ? `${siteUrl}/api/headless` : '',
    parentPathQuery,
    count: selection === 'query' ? count : items.length,
    sortExpression,
    noIngress: !!hideIngress,
    useLoader
  }

  if (debug) {
    log.info(JSON.stringify(request))
    log.info(JSON.stringify(props, null, 4))
    log.info(
      '**************************************************************************************'
    )
    log.info(
      '**************************************************************************************'
    )
    log.info(
      '**************************************************************************************'
    )
  }

  return React4xp.render(
    request.mode === 'edit' ? 'EventListView' : 'EventList',
    props,
    request,
    { clientRender: request.mode !== 'edit' }
  )
}
