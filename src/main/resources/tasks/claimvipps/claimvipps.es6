const taskLib = require('/lib/xp/task')
const contentLib = require('/lib/xp/content')

exports.run = function (params) {
  taskLib.progress({ info: 'Initializing task claims process' })

  const {
    key = '/liberalistene-hovedside',
    application: applicationKey = 'lib.no'
  } = params

  const config = (contentLib && contentLib.getSiteConfig({ key, applicationKey })) || {}

  log.info(JSON.stringify(params, null, 4))
  log.info(JSON.stringify(config, null, 4))

  taskLib.progress({ info: 'Initializing task claims' })

  /*
  if (ordersPath) {
    taskLib.progress({ info: 'Task claims processing' })
  } else {
    taskLib.progress({ info: 'Status claims, missing ordersPath' })
  }
  */

  taskLib.progress({ info: 'Task claims completed' })
}
