const portal = require('/lib/xp/portal')
const contentLib = require('/lib/xp/content')
const React4xp = require('/lib/enonic/react4xp')

exports.get = function (request) {
  const {
    params: {
      debug = false
    } = {}
  } = request

  const content = portal.getContent()
  // const component = portal.getComponent()

  /* const {
    config: {

    } = {}
  } = component || {} */

  const {
    _id: id,
    _path: orderPath,
    createdTime,
    displayName: title,
    data: {
      paymethod,
      status,
      amount: total,
      phone,
      email,
      membername: name,
      address,
      zip,
      city,
      invoicetext,
      sentDate,
      order_lines: orderLines,
      tags
    } = {}
  } = content || {}

  if (debug) {
    log.info(JSON.stringify(content, null, 4))
  }

  const invoiceTexts = (invoicetext && [].concat(invoicetext)) || []

  const children = contentLib.getChildren({
    key: id,
    start: 0,
    count: 20,
    sort: 'createdTime DESC'
  })

  const props = {
    id,
    path: portal
      .pageUrl({
        path: orderPath
      }),
    title,
    createdDate: createdTime.replace(/\.\d+(Z?)$/, '$1'),
    sentDate,
    paymethod,
    status,
    total,
    customer: {
      phone,
      email,
      name,
      address,
      zip,
      city
    },
    orderLines: []
      .concat(orderLines)
      .map((orderId) => contentLib.get({ key: orderId }))
      .map(({
        _id: orderId,
        _path: productPath,
        data: {
          price,
          invoicetext: text
        }
      }, index) => ({
        id: orderId,
        path: portal
          .pageUrl({
            path: productPath
          }),
        price,
        text: (invoiceTexts.length > index && invoiceTexts[index]) || text
      })),
    events: ((children && children.hits) || [])
      .map(({
        _id: eventId,
        _path: eventPath,
        createdTime: created,
        data: {
          originator,
          event
        }
      }) => ({
        id: eventId,
        date: created.replace(/\.\d+(Z?)$/, '$1'),
        path: portal
          .pageUrl({
            path: eventPath
          }),
        from: originator,
        text: event
      })),
    tags
  }

  if (debug) {
    log.info(JSON.stringify(props, null, 2))
  }

  return React4xp.render('OrderInfoAdmin', props, request, { clientRender: true })
}
