const taskLib = require('/lib/xp/task')
const contentLib = require('/lib/xp/content')

const second = 1000
const minute = 60 * second
const hour = 60 * minute
const day = 24 * hour

exports.run = function (params) {
  taskLib.progress({ info: 'Initializing task clean orders process' })

  const {
    key = '/liberalistene-hovedside',
    application: applicationKey = 'lib.no'
  } = params

  const aweekago = new Date() - (7 * day)
  const date = aweekago.toISOString()

  taskLib.progress({ info: 'Initializing task clean orders' })

  const config = (contentLib && contentLib.getSiteConfig({ key, applicationKey })) || {}

  const {
    ordersPath: ordersKey
  } = config

  if (ordersKey) {
    const { _path: parentPath } = contentLib.get({ key: ordersKey }) || {}
    const query = `_parentPath = '/content${parentPath}' AND data.status = 'new' AND range('createdTime', '', instant('${date}'))`

    if (parentPath) {
      taskLib.progress({ info: 'Clean orders: looking for orders ready for deletion' })

      const result = contentLib
        .query({
          start: 0,
          count: 100,
          query,
          contentTypes: [
            'lib.no:order'
          ],
          sort: 'createdTime'
        })

      if (result && result.count) {
        taskLib.progress({ info: `Clean orders: found ${result.count} order(s) ready for deletion` })

        const deleted = result.hits.map(({ _id }) => {
          const wasDeleted = contentLib.delete({ key: _id })

          if (wasDeleted) {
            taskLib.progress({ info: `Clean orders: deleted order with key ${_id}` })
          } else {
            taskLib.progress({ info: `Clean orders: could not delete order with key ${_id}` })
          }

          return wasDeleted
        })

        const total = deleted.filter((item) => item)

        taskLib.progress({ info: `Clean orders: ${total} of ${result.count} orders was deleted` })
      } else {
        taskLib.progress({ info: 'Clean orders: found no orders ready for deletion' })
      }
    }
  }

  taskLib.progress({ info: 'Task clean orders completed' })
}
