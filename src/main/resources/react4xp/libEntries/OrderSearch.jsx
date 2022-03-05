import {
  useState
} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Select from 'react-select'

import { LibInput } from '../shared/Input'

const priceFormat = (price) => {
  const value = price
    .toLocaleString('nb-NO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

  return `${value}`
}

const open = (path) => {
  window.location = path
}

const payMethodOptions = [{ value: 'vipps', label: 'VIPPS' }, { value: 'invoice', label: 'Invoice' }]
const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'requested', label: 'Requested (VIPPS)' },
  { value: 'rejected', label: 'Rejected (VIPPS)' },
  { value: 'failed', label: 'Reserve failed (VIPPS' },
  { value: 'reserved', label: 'Reserved (VIPPS)' },
  { value: 'claimed', label: 'Claimed (VIPPS)' },
  { value: 'aborted', label: 'Customer aborted (VIPPS)' },
  { value: 'nosale', label: 'No funds customer (VIPPS)' },
  { value: 'sale', label: 'Money received (VIPPS)' },
  { value: 'invoice', label: 'Invoice' },
  { value: 'member', label: 'Pushed to membersystem' }
]

export const OrderSearch = ({
  className,
  count,
  dateFrom,
  dateTo,
  searchPath: url,
  title,
  shortDescription,
  description,
  items,
  sortExpression,
  buildQueryOrderSearch,
  extractOrdersList,
  doGuillotineRequest,
  parentPathQuery,
  messages: {
    infoLoading,
    infoSending
  },
  texts: {
    invoiceAmountLabel,
    invoiceAttributesLabel,
    invoiceDetailsLabel,
    moreButtonLabel,
    moreButtonTitleLabel,
    resultHeaderAmountLabel,
    resultHeaderCustomerNameLabel,
    resultHeaderDateLabel,
    resultHeaderInvoiceTextLabel,
    resultHeaderStatusLabel,
    searchButtonLabel,
    searchButtonTitleLabel
  }
}) => {
  const [nextOffset, setNextOffset] = useState(count)
  const [list, setList] = useState(items.map((item) => ({ ...item, latest: true })))
  const [loading, setLoading] = useState(false)
  const [payMethod, setPayMethod] = useState([])
  const [status, setStatus] = useState([])
  const [more, setMore] = useState(items.length === count)
  const [query, setQuery] = useState(parentPathQuery)
  const [message, setMessage] = useState('')

  const updateItems = (oldItems, offset, clear) => (data) => {
    if (data.length > 0) {
      setNextOffset(offset + data.length)

      setList([
        ...oldItems.map((item) => ({ ...item, latest: false })),
        ...data.map((item) => ({ ...item, latest: true }))
      ])

      setMore(data.length === count)
    } else {
      if (clear) {
        setList([])
      }
      setMore(false)
    }

    setLoading(false)
    setMessage('')
  }

  const fetchItems = (loadingMessage, offset, array, queryString, clear) => {
    setMessage(loadingMessage)
    setLoading(true)

    if (doGuillotineRequest) {
      doGuillotineRequest({
        url,

        query: buildQueryOrderSearch && buildQueryOrderSearch(),

        variables: {
          first: count,
          offset,
          sort: sortExpression,
          query: queryString
        },

        extractDataFunc: extractOrdersList,

        handleDataFunc: updateItems(array, offset, clear)
      })
    } else {
      setTimeout(() => {
        setLoading(false)
        setMessage('')
      }, 5000)
    }
  }

  const readMoreClick = (event) => {
    event.preventDefault()

    fetchItems(infoLoading, nextOffset, list, query, false)
  }

  const submitHandler = (event) => {
    event.preventDefault()

    const {
      phone,
      email,
      freeText,
      name,
      address,
      zip,
      city,
      from,
      to,
      total
    } = event.target

    let queryString = parentPathQuery

    if (freeText && freeText.value) {
      queryString = `${queryString} AND fulltext('data.*', '${freeText.value}', 'AND')`
    }

    if (phone && phone.value) {
      queryString = `${queryString} AND data.phone = '${phone.value}'`
    }

    if (email && email.value) {
      queryString = `${queryString} AND data.email = '${email.value}'`
    }

    if (name && name.value) {
      queryString = `${queryString} AND data.membername LIKE '*${name.value}*'`
    }

    if (address && address.value) {
      queryString = `${queryString} AND data.address LIKE '*${address.value}'*`
    }

    if (zip && zip.value) {
      queryString = `${queryString} AND data.zip = '${zip.value}'`
    }

    if (city && city.value) {
      queryString = `${queryString} AND data.city = '${city.value}'`
    }

    if (total && total.value) {
      queryString = `${queryString} AND data.amount = ${total.value}`
    }

    if ((from && from.value) || (to && to.value)) {
      const localFrom = from && from.value ? `instant('${from.value}T00:00:00Z')` : '\'\''
      const localTo = to && to.value ? `instant('${to.value}T23:59:59Z')` : '\'\''

      queryString = `${queryString} AND range('createdTime', ${localFrom}, ${localTo})`
    }

    if (payMethod) {
      const array = [].concat(payMethod)

      if (array.length === 1) {
        queryString = `${queryString} AND data.paymethod = '${array[0].value}'`
      } else {
        const values = array.map((item) => `'${item.value}'`).join(', ')

        if (values) {
          queryString = `${queryString} AND data.paymethod IN (${values})`
        }
      }
    }

    if (status) {
      const array = [].concat(status)

      if (array.length === 1) {
        queryString = `${queryString} AND data.status = '${array[0].value}'`
      } else {
        const values = array.map((item) => `'${item.value}'`).join(', ')

        if (values) {
          queryString = `${queryString} AND data.status IN (${values})`
        }
      }
    }

    setQuery(queryString)

    fetchItems(infoSending, 0, [], queryString, true)
  }

  return (
    <div className={cx('order-search-wrapper', className)}>
      { title && (
        <h2 title={title}>{title}</h2>
      )}

      { shortDescription && (
        <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
      )}

      { description && (
        <div dangerouslySetInnerHTML={{ __html: description }} />
      )}

      <form className="order-search-form" onSubmit={submitHandler} disabled={loading}>
        <section className="order-search-section">
          <div className="bgrey rows">
            <div className="container-memberinfo section">
              <fieldset>
                <legend><h4>{invoiceDetailsLabel}</h4></legend>
                <LibInput type="text" name="freeText" label="Free text" disabled={loading} />
                <LibInput type="text" name="phone" label="Telefon" disabled={loading} />
                <LibInput type="email" name="email" label="E-post" disabled={loading} />
                <LibInput type="text" name="name" label="Fullt navn" disabled={loading} />
                <LibInput type="text" name="address" label="Adresse" disabled={loading} />
                <LibInput type="text" name="zip" label="Postnummer" disabled={loading} />
                <LibInput type="text" name="city" label="Poststed" disabled={loading} />
              </fieldset>
            </div>
            <div className="container-order section">
                <fieldset>
                  {invoiceAttributesLabel && (
                    <legend><h4>{invoiceAttributesLabel}</h4></legend>
                  )}
                  <Select options={payMethodOptions} name="paymethod" className="react-dropdown-select" classNamePrefix="react-dropdown-select" isClearable values={payMethod} placeholder="Pay method" onChange={(values) => setPayMethod(values)} disabled={loading} />
                  <Select options={statusOptions} name="status"className="react-dropdown-select" classNamePrefix="react-dropdown-select" values={status} isMulti placeholder="Status" onChange={(values) => setStatus(values)} disabled={loading} />
                  <LibInput type="date" name="from" label="Since date" disabled={loading} defaultValue={dateFrom && dateFrom.substring(0, 10)} />
                  <LibInput type="date" name="to" label="Until date" disabled={loading} defaultValue={dateTo && dateTo.substring(0, 10)} />
                  <LibInput type="number" name="total" label={invoiceAmountLabel} disabled={loading} />
                </fieldset>
            </div>
          </div>

          <div className="container-buttons section">
            <button type="submit" role="button" className="libButton" title={searchButtonTitleLabel} disabled={loading}>
              {searchButtonLabel}
            </button>

            { more && (
              <button role="button" className="libButton" title={moreButtonTitleLabel} disabled={loading} onClick={readMoreClick}>
                {moreButtonLabel}
              </button>
            )}

            { message && (
              <div className="order-search-message info">
                { message }
              </div>
            )}
          </div>
        </section>
      </form>

      <section className="order-search-section">
        { ((list && list.length) || null) && (
          <div className="order-search-result">
            <div className="bold header">
              <div className="small">
                <span>{resultHeaderDateLabel}</span>
              </div>
              <div>
                <span>{resultHeaderInvoiceTextLabel}</span>
              </div>
              <div>
                <span>{resultHeaderCustomerNameLabel}</span>
              </div>
              <div className="small">
                <span>{resultHeaderAmountLabel}</span>
              </div>
              <div className="small">
                <span>{resultHeaderStatusLabel}</span>
              </div>
            </div>

            { list
              .map(({
                id,
                createdDate,
                url: path,
                name,
                status,
                orderlineText,
                total,
                latest = false
              }) => (
                    <div key={id} className={cx('order-search-result-item', { latest })} onClick={() => open(path)}>
                      <div className="small" title={createdDate}>
                        {createdDate}
                      </div>
                      <div title={orderlineText}>
                        <span>{orderlineText}</span>
                      </div>
                      <div title={name}>
                        { name && (
                          <span>{name}</span>
                        )}
                      </div>
                      <div className="small">
                        { total && (
                          <span>{priceFormat(total)}</span>
                        )}
                      </div>
                      <div className="small">
                        <span>{status}</span>
                      </div>
                    </div>
              ))}
          </div>
        )}
      </section>
    </div>
  )
}

OrderSearch.propTypes = {
  count: PropTypes.number.isRequired,
  className: PropTypes.string,
  description: PropTypes.string,
  shortDescription: PropTypes.string,
  searchPath: PropTypes.string,
  dateFrom: PropTypes.string,
  dateTo: PropTypes.string,
  items: PropTypes
    .arrayOf(PropTypes
      .shape({
        name: PropTypes.string,
        createdDate: PropTypes.string,
        modifiedDate: PropTypes.string,
        path: PropTypes.string,
        status: PropTypes.string,
        paymethod: PropTypes.string,
        total: PropTypes.number
      })),

  parentPathQuery: PropTypes.string,
  sortExpression: PropTypes.string,

  buildQueryOrderSearch: PropTypes.func,
  extractOrdersList: PropTypes.func,
  doGuillotineRequest: PropTypes.func,

  title: PropTypes.string,

  messages: PropTypes.shape({
    infoLoading: PropTypes.string,
    infoSending: PropTypes.string
  }),

  texts: PropTypes
    .shape({
      invoiceAmountLabel: PropTypes.string,
      invoiceAttributesLabel: PropTypes.string,
      invoiceDetailsLabel: PropTypes.string,
      moreButtonLabel: PropTypes.string,
      moreButtonTitleLabel: PropTypes.string,
      resultHeaderAmountLabel: PropTypes.string,
      resultHeaderCustomerNameLabel: PropTypes.string,
      resultHeaderDateLabel: PropTypes.string,
      resultHeaderInvoiceTextLabel: PropTypes.string,
      resultHeaderStatusLabel: PropTypes.string,
      searchButtonLabel: PropTypes.string,
      searchButtonTitleLabel: PropTypes.string
    })
}

OrderSearch.defaultProps = {
  dateFrom: '',
  dateTo: '',
  className: '',
  items: [],
  sortExpression: '',
  messages: {
    infoLoading: 'Vent litt. Vi laster flere ordre...',
    infoSending: 'Vent litt. Vi søker opp ordre med de kriteriene...'
  },
  texts: {
    invoiceAmountLabel: 'Beløp',
    invoiceAttributesLabel: 'Bestillingsinformasjon',
    invoiceDetailsLabel: 'Bestillerinformasjon',
    moreButtonLabel: 'Hent flere ordre',
    moreButtonTitleLabel: 'Henter flere ordre',
    resultHeaderAmountLabel: 'Beløp',
    resultHeaderCustomerNameLabel: 'Kundenavn',
    resultHeaderDateLabel: 'Dato',
    resultHeaderInvoiceTextLabel: 'Medlemskap',
    resultHeaderStatusLabel: 'Status',
    searchButtonLabel: 'Search',
    searchButtonTitleLabel: 'Search orders'
  }
}

export default (props) => <OrderSearch {...props} /> // eslint-disable-line react/display-name
