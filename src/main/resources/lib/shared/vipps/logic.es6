const contentLib = require('/lib/xp/content')

const {
  create
} = require('./api')

const orderLogic = (currentStatus, newStatus) => {
  const SystemStatus = {
    /* System sets new and moves it to requested */
    new: {
      requested: 'requested',
      invoice: 'invoice'
    },

    /* System sets requested and VIPPS moved it to the next status */
    requested: {
      RESERVED: 'reserved',
      RESERVE_FAILED: 'failed', // End station
      CANCELLED: 'aborted', // End station
      REJECTED: 'rejected'// End station
    },

    /* VIPPS sets reserved, and we move it to the next step */
    reserved: {
      claimed: 'claimed'
    },

    /* System sets claimed, VIPPS will then move it to the next step */
    claimed: {
      CANCELLED: 'aborted', // End station
      SALED_FAILED: 'nosale', // End station
      SALE: 'sale'
    },

    /* VIPPS sets sale, System will notify membersystem about the new member */
    sale: {
      member: 'member' // End station
    }
  }

  const status = SystemStatus[currentStatus]

  return (status && status[newStatus]) || undefined
}

export const addStatusUpdate = ({
  _path,
  data,
  displayName,
  originator
}) => {
  const result = contentLib
    .create({
      parentPath: _path,
      displayName,
      contentType: 'lib.no:orderevent',
      data: {
        originator,
        event: JSON.stringify(data)
      }
    })

  log.info(JSON.stringify(result, null, 2))

  return result
}

export const addProductOrder = ({
  orderId,
  product,
  paymethod,
  customer
}) => {
  const result = contentLib.get({ key: product })

  if (result) {
    const {
      data,
      data: {
        price,
        invoicetext: invoiceText,
        reference
      }
    } = result

    log.debug(JSON.stringify(data, null, 2))

    const updateOrder = (order) => {
      order.data.amount = price
      order.data.reference = reference
      order.data.order_lines = product
      order.data.invoicetext = invoiceText

      if (paymethod) {
        order.data.paymethod = paymethod

        if (paymethod === 'invoice') {
          const status = orderLogic(order.data.status, paymethod)

          if (status) {
            order.data.status = status
          }
        }
      }

      if (customer) {
        const {
          phone,
          email,
          name,
          address,
          zip,
          city
        } = customer

        order.data.email = email
        order.data.phone = phone
        order.data.membername = name
        order.data.address = address
        order.data.zip = zip
        order.data.city = city
      }

      log.debug('*** Log update to order ***')
      log.debug(JSON.stringify(order.data, null, 2))

      return order
    }

    const modifyResult = contentLib
      .modify({
        key: orderId,
        editor: updateOrder
      })

    if (modifyResult) {
      const {
        _path,
        modifiedTime
      } = modifyResult

      log.info(JSON.stringify(modifyResult, null, 2))

      const updateStatus = addStatusUpdate({
        _path,
        data: {
          input: {
            product,
            paymethod,
            invoiceText,
            price,
            reference,
            customer
          }
        },
        displayName: `Update order ${modifiedTime}`,
        originator: 'User'
      })

      log.info(JSON.stringify(updateStatus, null, 2))

      if (paymethod === 'vipps') {
        log.debug('Vipps should be called and return a callback url')
      }

      return {
        Info: 'Success',
        price,
        reference,
        invoiceText
      }
    }
  }

  return {
    Error: 'Produkt not found'
  }
}

export const createOrder = (
  {
    amount = 0,
    orderLines = undefined
  } = {}
) => {
  const siteKey = '/liberalistene-hovedside'
  const applicationKey = 'lib.no'

  const config = (contentLib && contentLib.getSiteConfig({ key: siteKey, applicationKey })) || {}

  log.info(JSON.stringify(config, null, 2))

  const {
    ordersPath: ordersKey
  } = config

  log.info(`Given key ${ordersKey}`)

  const {
    _path: parentPath
  } = contentLib.get({ key: ordersKey })

  const time = new Date().getTime()

  const result = contentLib
    .create({
      parentPath,
      displayName: `Ordre ${time}`,
      contentType: 'lib.no:order',
      data: {
        amount,
        order_lines: orderLines,
        reference: 'empty',
        status: 'new',
        tags: 'order'
      }
    })

  if (result) {
    const {
      _id
    } = result

    return {
      key: _id
    }
  }

  return {}
}

export const updatePaymentOrder = ({
  data: {
    orderId,
    transactionInfo
  }
}) => {
  const result = contentLib
    .get({ key: orderId })

  if (result) {
    const {
      _path,
      data: {
        status
      }
    } = result

    log.info(JSON.stringify(result, null, 2))

    const {
      status: orderStatus,
      transactionId
    } = transactionInfo

    const updateStatus = (displayName) => addStatusUpdate({
      _path,
      data: transactionInfo,
      displayName,
      originator: 'VIPPS'
    })

    const newStatus = orderLogic(status, orderStatus)

    if (newStatus) {
      const updateOrder = (order) => {
        order.data.status = newStatus

        return order
      }

      const modifyResult = contentLib
        .modify({
          key: orderId,
          editor: updateOrder
        })

      if (modifyResult) {
        const logResult = updateStatus(`Updated status to ${orderStatus}: ${transactionId}.`)

        if (logResult) {
          log.info('Added order event item.')
        } else {
          log.info('Failed add order event item.')
        }

        return {
          oldStatus: status,
          newStatus: newStatus
        }
      }

      log.info('Could not update status.')

      return {
        oldStatus: status,
        newStatus: status
      }
    }

    return {
      oldStatus: status,
      newStatus: status
    }
  }

  return false
}

export const createPayment = ({
  mobileNumber,
  authToken,
  orderId,
  callBackPrefix = 'https://liberalistene.org/api/vipps',
  consentRemovalPrefix,
  fallback = 'http://127.0.0.1:8080/api/vipps/kvittering',
  transactionText,
  amount,
  params = {}
}) => {
  const {
    key = '/liberalistene-hovedside',
    application: applicationKey = 'lib.no'
  } = params

  const config = (contentLib && contentLib.getSiteConfig({ key, applicationKey })) || {}

  const {
    accessToken,
    createInitiatePaymentCommand,
    initiate
  } = create(config)

  const accessTokenResult = accessToken()

  if (accessTokenResult) {
    const paymentBody = createInitiatePaymentCommand({
      amount,
      authToken,
      callBackPrefix,
      consentRemovalPrefix,
      fallback,
      mobileNumber,
      orderId,
      transactionText
    })

    const {
      body,
      status
    } = initiate({
      body: JSON.stringify(paymentBody)
    })

    if (status === 200) {
      const {
        url
      } = JSON.parse(body)

      return {
        status,
        url
      }
    }

    return {
      status,
      error: (body && JSON.parse(body)) || `Error reponse: ${status}.`
    }
  }

  return false
}
