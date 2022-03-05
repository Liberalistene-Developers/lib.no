const portal = require('/lib/xp/portal')
const contentLib = require('/lib/xp/content')
const React4xp = require('/lib/enonic/react4xp')

const guillotine = require('/headless/guillotineApi')
const { imageUrl } = require('/lib/shared/image')
const { processHtml } = require('/lib/shared/html')
const { buildParentPathQuery } = require('/headless/helpers/helpers')
const { buildQueryMemberList, extractMemberList } = require('/headless/helpers/memberListRequests')

const { mapMembership } = require('/lib/shared/memberships')

exports.get = (request) => {
  const {
    params: {
      debug = false
    } = {}
  } = request

  const component = portal.getComponent()

  const {
    config: {
      ingress: shortDescription,
      description,
      image = '',
      itemsSet: {
        _selected: selection,
        manual: {
          items: itemList = []
        } = {},
        query: {
          queryroot,
          count = 10
        } = {}
      } = {},
      title
    } = {}
  } = component || {}

  const items = []

  // log.info(JSON.stringify(content, null, 4));
  // log.info(JSON.stringify(author, null, 4))

  const headless = selection === 'query'
  const {
    _path: queryPath
  } = headless && queryroot ? contentLib.get({ key: queryroot }) || {} : {}

  const parentPathQuery = headless && queryPath && buildParentPathQuery(queryPath)

  const sortExpression = ''

  switch (selection) {
    case 'manual':
      items.push(...[].concat(itemList.map(mapMembership)))
      break

    case 'query':
      if (queryroot) {
        const variables = {
          first: count,
          offset: 0,
          sort: sortExpression,
          parentPathQuery: `${parentPathQuery} AND data.active = 'true'`
        }

        const query = buildQueryMemberList()

        const result = guillotine.executeQuery(query, variables)
        const list = extractMemberList(result)

        if (debug) {
          log.info(JSON.stringify(list, null, 2))
        }

        if (list.length) {
          items.push(...list)
        }
      }
      break
  }

  const servicePath = '/_/service/lib.no/membership/orders'

  const props = {
    title,
    shortDescription,
    description: processHtml(description),
    image: imageUrl(image, 'full'),
    servicePath,
    items
  }

  return React4xp.render('Membership', props, request)
}
