import { extractList } from './helpers'

export const buildQueryOrderSearch = () => `
query(
    $first: Int,
    $offset: Int,
    $sort: String,
    $query: String
) {
  guillotine {
    query(
        contentTypes: ["lib.no:order"],
        query: $query,
        first: $first,
        offset: $offset,
        sort: $sort
    ) {
      ... on lib_no_Order {
        id: _id
        url: pageUrl
        nameOrder: displayName
        createdTime
        data {
          paymethod
          status
          total: amount
          phone
          email
          name: membername
          address
          zip
          city
          invoicetext
          order_lines {
            ... on lib_no_Product {
              _id
              name: displayName
              data {
                price
                invoicetext
              }
            }
          }
        }
      }
    }
  }
}
`

const getAt = (invoicetext, index) => {
  const invoiceText = [].concat(invoicetext)

  if (index < invoiceText.length) {
    return invoiceText[index]
  }

  return undefined
}

const map = () => ({
  id,
  nameOrder,
  createdTime,
  url,
  data: {
    paymethod,
    status,
    total,
    phone,
    email,
    name,
    address,
    zip,
    city,
    invoicetext,
    order_lines: orderLines
  } = {}
}) => ({
  id,
  nameOrder,
  createdDate: createdTime.replace(/\.\d+(Z?)$/, '$1'),
  url,
  phone,
  email,
  name,
  address,
  zip,
  city,
  status,
  paymethod,
  orderlineText: getAt(invoicetext, 0),
  orderLines: []
    .concat(orderLines)
    .map(({
      id: productId,
      url: productUrl,
      displayName: productName,
      data: {
        invoicetext: productInvoiceText,
        price
      }
    }, index) => ({
      id: productId,
      name: productName,
      url: productUrl,
      invoiceText: getAt(invoicetext, index) || productInvoiceText,
      price
    })),
  total
})

export const extractOrdersList = extractList(map)

export default {
  buildQueryOrderSearch,
  extractOrdersList
}
