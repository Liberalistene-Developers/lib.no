const React4xp = require('/lib/enonic/react4xp')
const portal = require('/lib/xp/portal')
const contentLib = require('/lib/xp/content')
const guillotine = require('/headless/guillotineApi')

const { buildQueryArticleList, extractArticleList } = require('/headless/helpers/articleListRequests')
const { buildParentPathQuery } = require('/headless/helpers/helpers')

exports.get = function (request) {
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
              imagesize: imageSize = 'small',
              imagetype: imageRound = false
            } = {}
          } = {}
        } = {}
      } = {},
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
      shortDescription,
      title,
      readMore = '',
      readMoreEnabled = false,
      loadMore = '',
      loadMoreEnabled = false,
      noingress = false
    } = {}
  } = component

  const items = []

  log.info(JSON.stringify(component, null, 2))

  const headless = selection === 'query'
  const {
    _path: queryPath
  } = headless && queryroot ? contentLib.get({ key: queryroot }) : {}

  const parentPathQuery = headless && queryPath && buildParentPathQuery(queryPath)

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
      items.push(...[].concat(itemList))
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

        log.info(JSON.stringify(list, null, 2))

        if (list.length) {
          items.push(...list)
        }
      }
      break
  }

  const {
    _path: sitePath
  } = portal.getSite()

  const siteUrl = portal
    .pageUrl({
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
    count,
    sortExpression,
    noIngress: !!noingress
  }

  log.info(JSON.stringify(props, null, 4))

  return React4xp.render('ArticleList', props, request, { clientRender: true })
}
