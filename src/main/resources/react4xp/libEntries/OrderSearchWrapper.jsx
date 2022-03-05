import 'weakmap-polyfill'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

import { buildQueryOrderSearch, extractOrdersList } from '../../headless/helpers/orderSearchRequests.es6'
import doGuillotineRequest from '../../headless/guillotineRequest.es6'

import { OrderSearch } from './OrderSearch'

if (document && !document.querySelectorAll) {
  document.head = {
    appendChild: () => {},
    insertBefore: () => {}
  }

  document.createTextNode = (text) => ({
    innerHTML: { text }
  })

  document.querySelector = () => null

  document.querySelectorAll = () => []

  document.createElement = (name) => ({
    name,

    dangerouslySetInnerHTML: {},

    style: {},

    innerHTML: {},

    appendChild: () => {},
    insertBefore: () => {},

    setAttribute: () => {}
  })
}

const cache = createCache({ key: 'enonic' })

const withCacheProvider = (children) => (
  <CacheProvider value={cache}>
    {children}
  </CacheProvider>
)

export default (props) => withCacheProvider( // eslint-disable-line react/display-name
  <OrderSearch
    {...props}
    doGuillotineRequest={doGuillotineRequest}
    buildQueryOrderSearch={buildQueryOrderSearch}
    extractOrdersList={extractOrdersList}
  />
)
