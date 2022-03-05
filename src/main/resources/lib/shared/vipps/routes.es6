const portalLib = require('/lib/xp/portal')
const contextLib = require('/lib/xp/context')
const router = require('/lib/router')()

const {
  addProductOrder,
  createOrder,
  updatePaymentOrder
} = require('./logic')

const CORS_HEADERS = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, DELETE, POST, OPTIONS',
  'Access-Control-Allow-Origin': '*'
}

const contentType = 'application/json'

const context = {
  repository: 'com.enonic.cms.default',
  principals: [
    'role:system.admin'
  ]
}

// This API endpoint on the merchant side allows Vipps to send consent removal requests to the merchant.
router.route('DELETE', '/v2/consents/{userId}', (req) => {
  return {
    body: {
      time: new Date()
    },
    contentType
  }
})

// This API call allows Vipps to send the transaction details.
router.route('POST', '/v2/payments/{orderId}', (req) => {
  const {
    body
  } = req

  const {
    orderId,
    transactionInfo,
    ...rest
  } = JSON.parse(body || '{}')

  if (orderId) {
    const callBack = () => {
      const result = updatePaymentOrder({
        data: {
          orderId,
          transactionInfo,
          ...rest
        }
      })

      if (!result) {
        return {
          status: 404,
          body: {
            Error: {
              message: `Unknown orderId: ${orderId}`
            }
          },
          contentType
        }
      }

      return {
        body: {
          Info: {
            message: 'Success'
          }
        },
        contentType
      }
    }

    const result = contextLib
      .run(context, callBack)

    log.info(result)

    return result
  }

  return {
    status: 400,
    body: {
      Error: {
        message: 'Missing data'
      }
    },
    contentType
  }
})

// Creates a new order for us.
router.route('POST', '/orders', () => {
  const callBack = () => {
    const order = createOrder()

    return {
      body: order,
      contentType
    }
  }

  const result = contextLib
    .run(context, callBack)

  return result
})

// Creates a new order for us.
router.route('PUT', '/orders/{orderId}', (req) => {
  const callBack = () => {
    const {
      orderId
    } = req.pathParams

    log.info(`${orderId}`)
    log.info(JSON.stringify(req.pathParams, null, 2))

    const data = JSON.parse(req.body)

    const result = addProductOrder({ orderId, ...data })

    return {
      body: result,
      contentType
    }
  }

  const result = contextLib
    .run(context, callBack)

  return result
})

// This API endpoint on the merchant side allows Vipps to get the shipping cost and method based on the provided address and product details.
router.route('POST', '/v2/payments/{orderId}/shippingDetails', (req) => {
  return {
    body: {
      time: new Date(),
      hello: 'to you'
    },
    contentType: 'application/json'
  }
})

router.filter(function (req, next) {
  // Log info.
  log.info('Entered ' + req.path)

  // Execute next and return.
  return next(req)
})

// Dispatch all requests to the router.
export const handler = (req) => {
  const result = portalLib.getSite()

  log.info('Current site name = %s', result && JSON.stringify(result, null, 2))

  log.info('Entered all: ' + req.path)

  return router.dispatch(req)
}

export const options = () => ({
  contentType: 'application/json',
  headers: CORS_HEADERS
})
