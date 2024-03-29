const React4xp = require('/lib/enonic/react4xp')
const portal = require('/lib/xp/portal')
const contentLib = require('/lib/xp/content')
const guillotine = require('/headless/guillotineApi')

const {
  buildQueryArticleList,
  extractArticleList
} = require('/headless/helpers/articleListRequests')
const { buildParentPathQuery } = require('/headless/helpers/helpers')

const { mapArticle } = require('/lib/shared/articles')

exports.get = function (request) {
  const { params: { debug = false } = {} } = request

  const component = portal.getComponent()

  const {
    config: {
      description,
      displaytype: {
        _selected: displaytype,
        gridlist: {
          titleCenter = false,
          imagesize = 'full',
          imagetype: imageround = false
        } = {},
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
      featured = [],
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

  switch (selection) {
    case 'manual':
      items.push(...[].concat(itemList.map(mapArticle)))
      break

    case 'query':
      if (queryroot) {
        const variables = {
          first: count,
          offset: 0,
          sort: sortExpression,
          parentPathQuery
        }

        const query = buildQueryArticleList()

        const result = guillotine.executeQuery(query, variables)
        const list = extractArticleList(result)

        if (debug) {
          log.info(JSON.stringify(list, null, 2))
        }

        if (list.length) {
          items.push(...list)
        }
      }
      break
  }

  const { _path: sitePath } = portal.getSite()

  const siteUrl = portal.pageUrl({
    path: sitePath
  })

  const _featured = [].concat(featured).reduce(
    (acc, { item, style, showDate = true }) => ({
      ...acc,
      [item]: { style, showDate }
    }),
    {}
  )

  if (debug) {
    log.info(JSON.stringify(_featured, null, 2))
  }

  const props = {
    title,
    displaytype,
    description,
    featured: _featured,
    shortDescription,
    titleCenter: displaytype === 'gridlist' && titleCenter,
    showImage: displaytype === 'list' && imageSelection === 'show',
    imageSize: displaytype === 'gridlist' ? imagesize : imageSize,
    imageType: (displaytype === 'gridlist' ? imageround : imageRound)
      ? 'round'
      : '',
    readMore,
    readMoreEnabled,
    loadMore,
    loadMoreEnabled,
    items,
    apiUrl: headless ? `${siteUrl.length > 8 ? siteUrl : ''}/api/headless` : '',
    parentPathQuery,
    count: selection === 'query' ? count : items.length,
    sortExpression,
    noIngress: !!hideIngress
  }

  if (debug) {
    log.info(JSON.stringify(props, null, 4))
  }

  return React4xp.render(
    request.mode === 'edit' ? 'ArticleListView' : 'ArticleList',
    props,
    request,
    { clientRender: request.mode !== 'edit' }
  )
}
