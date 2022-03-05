import PropTypes from 'prop-types'
import cx from 'classnames'

import ObjectInspector from 'react-object-inspector'

import { Button } from './Button'

const resolveIcon = (status, paymethod) => {
  const knownIcons = {
    new: 'fa-sticky-note',
    requested: {
      vipps: ['fa-pause-circle', 'green'],
      invoice: ['fa-exclamation-circle', 'red']
    }
  }

  const result = knownIcons[status]

  if (result) {
    return result[paymethod] || result
  }

  return 'fa-square-question'
}

const formateDate = (date) => {
  if (date) {
    try {
      const result = new Date(date)

      return result.toISOString()
    } catch (ex) {
      console.log(date)
      console.log(ex.stack)
      console.log(ex.message)
    }
  }

  return date
}

export const OrderInfoAdmin = ({
  createdDate,
  sentDate,
  customer,
  customer: {
    phone,
    email,
    name,
    address,
    zip,
    city
  } = {},
  events,
  orderLines,
  total,
  paymethod,
  status,
  texts: {
    addressLabel,
    cityLabel,
    createdDateLabel,
    customerHeader,
    customerNameLabel,
    deleteButtonLabel,
    refundButtonLabel,
    emailLabel,
    orderDetailHeader,
    orderHeader,
    orderLineAmountHeader,
    orderLineTextHeader,
    orderLineTotalFooter,
    phoneLabel,
    sentDateLabel,
    statusDateHeader,
    statusFromHeader,
    statusHeader,
    statusLabel,
    statusTextHeader,
    zipLabel
  } = {}
}) => (
  <div className={cx('order-info-admin', status)}>
    <section className="order-info-admin-section">
      <div className="buttons greybg">
        <Button title={deleteButtonLabel} disabled={status !== 'new'} />
        <Button title={refundButtonLabel} disabled={status !== 'reserved'} />
      </div>
    </section>
    <section className="order-info-admin-section">
      <h3>{orderDetailHeader} <i className={cx('fas', resolveIcon(status, paymethod))}></i></h3>
      <div className="detail greybg">
        <dl>
          <dt>{createdDateLabel}</dt>
          <dd>{formateDate(createdDate)}</dd>
          { paymethod === 'vipps' && (
            <>
              <dt>{sentDateLabel}</dt>
              <dd>{formateDate(sentDate)}</dd>
            </>
          )}
          <dt>{statusLabel}</dt>
          <dd>{status}</dd>
        </dl>

      </div>
    </section>
    { customer && (
      <section className="order-info-admin-section">
        <h3>{customerHeader}</h3>
        <div className="customer greybg">
          <dl>
            { phone && (
              <>
                <dt>{phoneLabel}</dt>
                <dd><a href={`tel:${phone}`}>{phone}</a></dd>
              </>
            )}
            { email && (
              <>
                <dt>{emailLabel}</dt>
                <dd><a href={`mailto:${email}`}>{email}</a></dd>
              </>
            )}
            <dt>{customerNameLabel}</dt>
            <dd>{name}</dd>
            <dt>{addressLabel}</dt>
            <dd>{address}</dd>
            <dt>{zipLabel}</dt>
            <dd>{zip}</dd>
            <dt>{cityLabel}</dt>
            <dd>{city}</dd>
          </dl>
        </div>
      </section>
    )}

    <section className="order-info-admin-section">
      <h2>{orderHeader}</h2>
      <div className="orderinfo-wrapper greybg">
        { ((orderLines && orderLines.length > 0) || null) && (
          <div className="orderinfo">
            <div className="bold">
              <div><span>{orderLineTextHeader}</span></div>
              <div><span>{orderLineAmountHeader}</span></div>
            </div>
            { orderLines.map(({ id, text, price }) => (
              <div key={id}>
                <div><span>{text}</span></div>
                <div><span>{price}</span></div>
              </div>
            ))}
            <div className="bold overline">
              <div><span>{orderLineTotalFooter}</span></div>
              <div><span>{total}</span></div>
            </div>
          </div>
        )}
      </div>
    </section>

    <section className="order-info-admin-section">
      <h2>{statusHeader}</h2>
      <div className="status-info-wrapper greybg">
        { ((events && events.length > 0) || null) && (
          <div className="status-info">
            <div className="bold underline">
              <div><span>{statusDateHeader}</span></div>
              <div><span>{statusTextHeader}</span></div>
              <div><span>{statusFromHeader}</span></div>
            </div>
            { events && events.map(({ id, date, text, from, path }) => (
              <div key={id} data-path={path}>
                <div><span>{formateDate(date)}</span></div>
                <div><ObjectInspector data={ JSON.parse(text) } name="event" initialExpandedPaths={['event', 'event.input', 'event.input.customer']} /></div>
                <div><span>{from}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  </div>
)

OrderInfoAdmin.propTypes = {
  createdDate: PropTypes.string,
  customer: PropTypes
    .shape({
      phone: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string,
      address: PropTypes.string,
      zip: PropTypes.string,
      city: PropTypes.string
    }),
  events: PropTypes
    .arrayOf(PropTypes
      .shape({
        createdDate: PropTypes.number,
        name: PropTypes.string,
        from: PropTypes.string
      })),
  paymethod: PropTypes.oneOf(['vipps', 'invoice']),
  orderLines: PropTypes
    .arrayOf(PropTypes
      .shape({
        id: PropTypes.string,
        url: PropTypes.string,
        textInvoice: PropTypes.string,
        price: PropTypes.number
      })),
  sentDate: PropTypes.string,
  status: PropTypes.string,
  texts: PropTypes
    .shape({
      addressLabel: PropTypes.string,
      cityLabel: PropTypes.string,
      createdDateLabel: PropTypes.string,
      customerHeader: PropTypes.string,
      customerNameLabel: PropTypes.string,
      emailLabel: PropTypes.string,
      orderDetailHeader: PropTypes.string,
      orderHeader: PropTypes.string,
      orderLineAmountHeader: PropTypes.string,
      orderLineTextHeader: PropTypes.string,
      orderLineTotalFooter: PropTypes.string,
      phoneLabel: PropTypes.string,
      sentDateLabel: PropTypes.string,
      statusHeader: PropTypes.string,
      statusLabel: PropTypes.string,
      zipLabel: PropTypes.string
    }),
  total: PropTypes.number
}

OrderInfoAdmin.defaultProps = {
  events: [],
  orderLines: [],
  texts: {
    addressLabel: 'Address',
    cityLabel: 'City',
    createdDateLabel: 'Created',
    customerHeader: 'Customer Info',
    customerNameLabel: 'Name',
    deleteButtonLabel: 'Delete invoice',
    emailLabel: 'E-mail',
    orderDetailHeader: 'Order Info',
    orderHeader: 'Order items',
    orderLineAmountHeader: 'Beløp',
    orderLineTextHeader: 'Medlemskap',
    orderLineTotalFooter: 'Totalt',
    phoneLabel: 'Phone',
    refundButtonLabel: 'Refund amount',
    sentDateLabel: 'Sent to VIPPS',
    statusDateHeader: 'Date',
    statusFromHeader: 'From',
    statusHeader: 'Events',
    statusLabel: 'Status',
    statusTextHeader: 'Event',
    zipLabel: 'Zip'
  },
  total: undefined
}

export default (props) => <OrderInfoAdmin {...props} />// eslint-disable-line react/display-name
