const httpClient = require('/lib/http-client')
/*
const contentLib = require('/lib/xp/content')

const {
  key = '/liberalistene-hovedside',
  application: applicationKey = 'lib.no'

} = params

const config = (contentLib && contentLib.getSiteConfig({ key, applicationKey })) || {}
*/
const { SystemInfo } = require('./system')

const basePath = (method, integration = '') => `ecomm/v2/${integration}payments${method}`
const createPath = (orderId, method, integration = '') => basePath(`/${orderId}/${method}`, integration)

export const create = (config) => {
  const {
    vippsclientid,
    vippssecret,
    vippssubscriptionkey,
    vippsMerchantNumber: merchantSerialNumber,
    vippsProduction = false
  } = config

  const defaultHeaders = {
    client_id: vippsclientid,
    client_secret: vippssecret,
    'Ocp-Apim-Subscription-Key': vippssubscriptionkey,
    'Merchant-Serial-Number': merchantSerialNumber,
    ...SystemInfo
  }

  const vippsService = `https://api${vippsProduction ? '' : 'test'}.vipps.no'`

  let accessToken
  let error

  const createPaymentActionsRequest = (transactionText = undefined, amount = undefined) => ({
    merchantInfo: {
      merchantSerialNumber
    },
    ...((transactionText || amount)
      ? {
          transaction: {
            amount,
            transactionText
          }
        }
      : {}
    )
  })

  const createInitiatePaymentCommand = ({
    mobileNumber,
    callBackPrefix,
    consentRemovalPrefix,
    fallback,
    isApp = true,
    shippingDetailsPrefix,
    amount,
    orderId,
    transactionText
  }) => ({
    customerInfo: {
      mobileNumber
    },
    merchantInfo: {
      callBackPrefix,
      consentRemovalPrefix,
      fallback,
      isApp,
      merchantSerialNumber,
      shippingDetailsPrefix
    },
    transaction: {
      amount,
      orderId,
      transactionText
    }
  })

  const send = ({
    method,
    headers,
    body = '',
    url
  }) => {
    const response = httpClient
      .request({
        url: `${vippsService}${url}`,
        method,
        headers: {
        // 'Authorization': 'Bearer ' + token,
          ...defaultHeaders,
          ...headers
        },
        body
      })

    return response
  }

  const post = (parameters) => send({
    ...parameters,
    method: 'POST'
  })

  const get = (parameters) => send({
    ...parameters,
    method: 'GET'
  })

  const put = (parameters) => send({
    ...parameters,
    method: 'PUT'
  })

  const authorized = (method, { headers, ...parameters }) => method({
    headers: {
      ...headers,
      Authorization: (accessToken && accessToken.token) || undefined,
      'Content-Type': 'application/json'
    },
    ...parameters
  })

  const accesstoken = (parameters) => {
    const response = post({
      url: '/accesstoken/get',
      ...parameters
    })

    if (response.status === 200) {
      const {
        access_token: token,
        expires_on: expiresOn
      } = JSON.parse(response.body)

      accessToken = {
        token,
        expires: new Date(expiresOn)
      }

      return true
    }

    error = JSON.parse(response.body)

    return false
  }

  const initiate = (parameters) => authorized(
    post,
    {
      url: basePath(),
      ...parameters
    })

  const authorize = ({
    orderId,
    ...parameters
  }) => authorized(
    put,
    {
      url: createPath(orderId, 'authorize'),
      ...parameters
    })

  const cancel = ({
    orderId,
    ...parameters
  }) => authorized(
    put,
    {
      url: createPath(orderId, 'cancel'),
      ...parameters
    })

  const capture = ({
    orderId,
    ...parameters
  }) => authorized(
    post,
    {
      url: createPath(orderId, 'capture'),
      ...parameters
    })

  const details = ({
    orderId,
    ...parameters
  }) => authorized(
    get,
    {
      url: createPath(orderId, 'details'),
      ...parameters
    })

  const approve = ({
    orderId,
    ...parameters
  }) => authorized(
    post, {
      url: createPath(orderId, 'approve', 'integration-test'),
      ...parameters
    })

  const failure = () => error

  return {
    accesstoken,
    ...(!vippsProduction ? { approve } : {}),
    authorize,
    capture,
    cancel,
    details,
    initiate,
    failure,
    createPaymentActionsRequest,
    createInitiatePaymentCommand
  }
}
