const taskLib = require('/lib/xp/task')
const contentLib = require('/lib/xp/content')
const httpClient = require('/lib/http-client')

exports.run = function (params) {
  taskLib.progress({ info: 'Initializing task status check' })

  const {
    key = '/liberalistene-hovedside',
    application: applicationKey = 'lib.no',
    vippsService = 'https://apitest.vipps.no'
  } = params

  const config = (contentLib && contentLib.getSiteConfig({ key, applicationKey })) || {}

  const {
    vippsclientid,
    vippssecret,
    vippssubscriptionkey,
    vippsMerchantNumber,
    ordersPath: ordersKey
  } = config

  const vipps = vippsclientid && vippssecret && vippssubscriptionkey && vippsMerchantNumber

  const defaultHeaders = {
    client_id: vippsclientid,
    client_secret: vippssecret,
    'Ocp-Apim-Subscription-Key': vippssubscriptionkey,
    'Merchant-Serial-Number': vippsMerchantNumber,
    'Vipps-System-Name': 'Enonic XP',
    'Vipps-System-Version': '7.8.2',
    'Vipps-System-Plugin-Name': 'Liberalistene VIPPS XP Plugin',
    'Vipps-System-Plugin-Version': '1.1.0'
  }

  log.info(JSON.stringify(params, null, 4))
  log.info(JSON.stringify(config, null, 4))
  log.info(JSON.stringify(defaultHeaders, null, 4))

  if (vipps && ordersKey) {
    taskLib.progress({ info: 'Task status check completed' })

    const { _path: parentPath } = contentLib.get({ key: ordersKey }) || {}
    const query = `_parentPath = '/content${parentPath}' AND data.status = 'requested' AND data.paymethod = 'vipps'`

    if (parentPath) {
      const result = contentLib
        .query({
          start: 0,
          count: 100,
          query,
          contentTypes: [
            'lib.no:order'
          ],
          sort: 'modifiedTime DESC'
        })

      log.info(JSON.stringify({ parentPath, query }, null, 4))
      log.info(JSON.stringify(result, null, 4))

      if (result && result.count) {
        const response = httpClient
          .request({
            url: `${vippsService}/accesstoken/get`,
            method: 'POST',
            headers: {
              // 'Authorization': 'Bearer ' + token,
              ...defaultHeaders
            },
            body: ''
          })

        log.info(JSON.stringify(response, null, 4))
      }
    }
  } else {
    taskLib.progress({ info: 'Status check, missing ordersPath' })
  }

  taskLib.progress({ info: 'Task status check completed' })
}
