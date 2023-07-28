const portal = require('/lib/xp/portal')
const React4xp = require('/lib/enonic/react4xp')

const { findChildren } = require('/lib/shared/query')

exports.get = function (request) {
  const { params: { debug = false } = {} } = request

  const content = portal.getContent()
  const component = portal.getComponent()

  const { config: { title, centerheading = false } = {} } = component || {}

  const { _path: key } = content

  log.info(JSON.stringify(content, null, 4))

  if (debug) {
    log.info(JSON.stringify(content, null, 4))
  }

  const mapper = ({ _id: id, _path: path, displayName: name }) => ({
    name,
    path: portal.pageUrl({ path }),
    id
  })

  const items = key
    ? findChildren({ key, count: 999 }, 'lib.no:localbranch')
    : []

  const props = {
    title,
    headingClassName: centerheading && 'center',
    items: (items ? [].concat(items) : []).map(mapper)
  }

  if (debug) {
    log.info(JSON.stringify(props, null, 4))
  }

  return React4xp.render('LocalBranchesBlock', props, request)
}
