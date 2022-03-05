import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Image from '../shared/Image'

import { LibInput } from '../shared/Input'

export const defaultHandleResponseErrorFunc = (response) => {
  if (!(response.status < 300)) {
    throw Error(`Guillotine API response:\n\n${response.status} - ${response.statusText}.\n\nAPI url: ${response.url}\n\nInspect the request and/or the server log.`)
  }

  return response
}

export const defaultErrorFunc = (error) => {
  console.error(error)

  return Promise.resolve(error)
}

const priceFormat = (price) => {
  const value = price
    .toLocaleString('nb-NO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

  return `NOK ${value}`
}

const MembershipRadio = ({
  disabled,
  item: {
    id,
    name,
    shortDescription,
    invoiceText,
    price,
    className
  } = {},
  onChange
}) => (
  <div className={cx('membership-item', className)}>
    <input type="radio" id={id} name="membership" value={id} data-price={price} data-invoicetext={invoiceText} onChange={onChange} disabled={disabled} />
    <label htmlFor={id}>
      <h3>{ name }</h3>
      <p>{ shortDescription }</p>
      { price && (
        <p>{ priceFormat(price) }</p>
      )}

    </label>
  </div>
)

MembershipRadio.propTypes = {
  disabled: PropTypes.bool,
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    shortDescription: PropTypes.string,
    invoiceText: PropTypes.string,
    price: PropTypes.number,
    className: PropTypes.string
  }),
  onChange: PropTypes.func
}

MembershipRadio.defaultProps = {
  disabled: false,
  item: undefined,
  onChange: undefined
}

export const Membership = ({
  className,
  servicePath: url,
  title,
  shortDescription,
  description,
  image,
  items,
  messages: {
    errorMissingMembership,
    errorMissingPayment,
    errorVippPhoneRequired,
    infoOrderSuccess,
    infoSending,
    infoSendingVipps
  },
  texts: {
    headerMemberInput,
    headerPaymentInfo,
    headerMemberSelection,
    headerPaymentMethod
  }
}) => {
  const [orderKey, setOrderKey] = useState()
  const [{ price, invoiceText }, setOrderData] = useState({})
  const [payment, setPayment] = useState()
  const [errorMessage, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (!orderKey && url) {
      fetch(
        url,
        {
          method: 'POST',
          body: JSON.stringify({
          }),
          credentials: 'same-origin'
        }
      )
        .then(defaultHandleResponseErrorFunc)
        .then(response => response.json())
        .then(({ key }) => setOrderKey(key))
        .then(() => setLoading(false))
        .catch(defaultErrorFunc)
    } else {
      setLoading(false)
    }
  }, [orderKey, url])

  const submitHandler = (event) => {
    const phone = event.target.phone.value
    const email = event.target.email.value
    const name = event.target.name.value
    const address = event.target.address.value
    const zip = event.target.zip.value
    const city = event.target.city.value
    const paymethod = event.target.payment.value
    const product = event.target.membership.value

    const data = {
      customer: {
        phone,
        email,
        name,
        address,
        zip,
        city
      },
      paymethod,
      product
    }

    event.preventDefault()

    if (!product) {
      setError(errorMissingMembership)

      return false
    }

    if (!payment || !paymethod) {
      setError(errorMissingPayment)

      return false
    }

    if (payment === 'vipps') {
      if (!phone || phone.length !== 8) {
        setError(errorVippPhoneRequired)

        return false
      }
    }

    setSending(true)
    setSuccessMessage('')
    setError('')

    if (url && orderKey) {
      fetch(
        `${url}/${orderKey}`,
        {
          method: 'PUT',
          body: JSON.stringify(data),
          credentials: 'same-origin'
        }
      )
        .then(defaultHandleResponseErrorFunc)
        .then(response => response.json())
        .then(({ Info, Error, price, invoiceText, vippsUrl }) => {
          if (price && invoiceText) {
            setOrderData({
              price,
              invoiceText
            })
          }

          if (vippsUrl) {
            setSuccessMessage(infoOrderSuccess)
            // do Vipps stuff
          }
          setSending(false)

          if (Info === 'Success') {
            setSuccessMessage(infoOrderSuccess)
          }

          if (Error) {
            setError(Error)
          }

          return false
        })
    } else {
      console.log(data) // eslint-disable-line no-console
      setTimeout(() => {
        setSending(false)
        if (payment !== 'vipps') {
          setSuccessMessage(infoOrderSuccess)
        }
      }, 10000)
    }

    return false
  }

  const onChangeMembership = (event) => {
    if (event.currentTarget.checked) {
      if (url && orderKey) {
        fetch(
          `${url}/${orderKey}`,
          {
            method: 'PUT',
            body: JSON.stringify({
              product: event.currentTarget.value
            }),
            credentials: 'same-origin'
          }
        )
          .then(defaultHandleResponseErrorFunc)
          .then(response => response.json())
          .then(({ price, invoiceText }) => {
            setOrderData({
              price,
              invoiceText
            })

            return true
          })
      } else {
        const dataset = event.currentTarget.dataset

        setOrderData({
          price: parseInt(dataset.price, 10),
          invoiceText: dataset.invoicetext
        })
      }
    }
  }

  const onChangeInvoiceType = (event) => {
    setPayment(event.currentTarget.value)
  }

  return (
    <div className={cx('membership-list-holder', className)}>
      { title && (
        <h2 title={title}>{title}</h2>
      )}

      <Image image={image} />

      { shortDescription && (
        <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
      )}

      { description && (
        <div dangerouslySetInnerHTML={{ __html: description }} />
      )}

      { items && items.length > 0 && (
        <form className="membership-form" onSubmit={submitHandler} disabled={loading || sending}>
          <section className={cx('membership-list')}>
            <h3>{ headerMemberSelection }</h3>
            <div className="membership-list-container section">
              { items.map((item) => (
                <MembershipRadio key={item.id} item={item} onChange={onChangeMembership} disabled={loading || sending} />
              ))}
            </div>
          </section>
          <section className="membership-payment">
            <h3>{ headerPaymentMethod }</h3>
            <div className="membership-payment-container section">
              <div className="membership-payment-item">
                <input type="radio" id="vipps" name="payment" value="vipps" aria-label="Betal med VIPPS" onChange={onChangeInvoiceType} className="membership-payment-choice" disabled={loading || sending} />
                <label htmlFor="vipps" className="membership-payment-button">
                  <svg fill="none" height="40" viewBox="0 0 140 40" width="140" xmlns="http://www.w3.org/2000/svg"><path d="m0 8c0-2.80026 0-4.20039.544967-5.26995.479363-.94081 1.244273-1.70572 2.185083-2.185083 1.06956-.544967 2.46969-.544967 5.26995-.544967h124c2.8 0 4.2 0 5.27.544967.941.479363 1.706 1.244273 2.185 2.185083.545 1.06956.545 2.46969.545 5.26995v24c0 2.8003 0 4.2004-.545 5.27-.479.9408-1.244 1.7057-2.185 2.185-1.07.545-2.47.545-5.27.545h-124c-2.80026 0-4.20039 0-5.26995-.545-.94081-.4793-1.70572-1.2442-2.185083-2.185-.544967-1.0696-.544967-2.4697-.544967-5.27z" fill="#ff5b24"/><path clipRule="evenodd" d="m102 18.0884c-.72-2.7477-2.4686-3.8384-4.8553-3.8384-1.9336 0-4.3605 1.0907-4.3605 3.7172 0 1.6968 1.1723 3.0304 3.0852 3.374l1.8103.323c1.2344.2221 1.5842.6869 1.5842 1.3132 0 .7071-.7612 1.111-1.8926 1.111-1.4809 0-2.4067-.5252-2.5508-2.0001l-2.6124.4042c.4112 2.8483 2.9619 4.0204 5.2658 4.0204 2.1808 0 4.5051-1.2528 4.5051-3.778 0-1.7174-1.049-2.9696-3.0034-3.3337l-1.9951-.3633c-1.1111-.202-1.4812-.7475-1.4812-1.2727 0-.6668.7198-1.0907 1.7073-1.0907 1.255 0 2.1395.4239 2.1806 1.8179zm-58.075 4.3229 2.7149-7.8584h3.1884l-4.7314 11.6565h-2.3654l-4.7315-11.6563h3.1884zm16.6834-4.5249c0 .9292-.7406 1.5756-1.6047 1.5756-.864 0-1.6043-.6464-1.6043-1.5756 0-.9294.7403-1.5756 1.6043-1.5756.8641 0 1.6049.6462 1.6049 1.5756zm.4936 4.1213c-1.0699 1.3734-2.2013 2.3229-4.1967 2.323-2.036 0-3.6204-1.2121-4.8546-2.9897-.4939-.7275-1.255-.889-1.8105-.5051-.5142.3637-.6374 1.1314-.1645 1.7982 1.7073 2.5656 4.0729 4.0602 6.8294 4.0602 2.5305 0 4.5055-1.2119 6.0481-3.2322.5759-.7473.5553-1.515 0-1.9393-.5144-.4044-1.2755-.2624-1.8512.4849zm7.098-1.6568c0 2.384 1.3989 3.6367 2.9625 3.6367 1.4809 0 3.0034-1.1719 3.0034-3.6367 0-2.4244-1.5225-3.5959-2.9831-3.5959-1.5839 0-2.9828 1.1111-2.9828 3.5959zm0-4.1815v-1.5964h-2.9004v15.677h2.9004v-5.576c.9669 1.2932 2.2217 1.8389 3.6409 1.8389 2.6541 0 5.2459-2.0608 5.2459-6.3031 0-4.061-2.6948-5.9596-4.9989-5.9596-1.8309 0-3.0855.8281-3.8879 1.9192zm13.9275 4.1815c0 2.384 1.3987 3.6367 2.9623 3.6367 1.4809 0 3.0032-1.1719 3.0032-3.6367 0-2.4244-1.5223-3.5959-2.9828-3.5959-1.584 0-2.9829 1.1111-2.9829 3.5959zm0-4.1815v-1.5964h-.0002-2.9004v15.677h2.9004v-5.576c.967 1.2932 2.2217 1.8389 3.641 1.8389 2.6539 0 5.2459-2.0608 5.2459-6.3031 0-4.061-2.6948-5.9596-4.999-5.9596-1.8309 0-3.0854.8281-3.8877 1.9192z" fill="#fff" fillRule="evenodd"/></svg>
                </label>
              </div>
              <div className="membership-payment-item">
                <input type="radio" id="invoice" name="payment" value="invoice" onChange={onChangeInvoiceType} className="membership-payment-choice" disabled={loading || sending} />
                <label htmlFor="invoice" className="membership-payment-button membership-payment-invoice">
                  <span><i className="fas fa-file-invoice"></i> Faktura</span>
                </label>
              </div>
            </div>
          </section>
          { invoiceText && (
            <section className="membership-invoiceinfo">
              <h3>{ headerPaymentInfo }</h3>

              <div className="membership-invoiceinfo-container section">
                <div>
                  <span>
                    <strong>{invoiceText}</strong>
                  </span>
                </div>
                <div>
                  <span><strong>{priceFormat(price)}</strong></span>
                </div>
              </div>
            </section>
          )}
          <section className="membership-memberinfo">
            <h3>{headerMemberInput}</h3>
            <div className="membership-memberinfo-container section">
              <LibInput type="text" name="phone" label="Telefon" disabled={loading || sending} />
              <LibInput type="email" name="email" label="E-post" disabled={loading || sending} />
              <LibInput type="text" name="name" label="Fullt navn" required disabled={loading || sending} />
              <LibInput type="text" name="address" label="Adresse" disabled={loading || sending} />
              <LibInput type="text" name="zip" label="Postnummer" disabled={loading || sending} />
              <LibInput type="text" name="city" label="Poststed" disabled={loading || sending} />
            </div>
          </section>
          <section className="membership-buttonrow">
            { errorMessage && (
              <div className="membership-message membership-error">
                {errorMessage}
              </div>
            )}
            { successMessage && (
              <div className="membership-message membership-success">
                { successMessage }
              </div>
            )}
            { sending && (
              <div className="membership-message membership-sending">
                {payment === 'vipps' ? infoSendingVipps : infoSending}
              </div>
            )}
            { payment === 'vipps' && (
              <button type="submit" role="button" className="vippsButton" label="Betal med Vipps" disabled={loading || sending}>
                <svg fill="none" height="44" viewBox="0 0 210 44" width="210" xmlns="http://www.w3.org/2000/svg"><path d="m0 8c0-2.80026 0-4.20039.544967-5.26995.479363-.94081 1.244273-1.70572 2.185083-2.185083 1.06956-.544967 2.46969-.544967 5.26995-.544967h194c2.8 0 4.2 0 5.27.544967.941.479363 1.706 1.244273 2.185 2.185083.545 1.06956.545 2.46969.545 5.26995v28c0 2.8003 0 4.2004-.545 5.27-.479.9408-1.244 1.7057-2.185 2.185-1.07.545-2.47.545-5.27.545h-194c-2.80026 0-4.20039 0-5.26995-.545-.94081-.4793-1.70572-1.2442-2.185083-2.185-.544967-1.0696-.544967-2.4697-.544967-5.27z" fill="#ff5b24"/><g fill="#fff"><path d="m32.7131 28.25c2.7822 0 4.4805-1.4092 4.4805-3.7036 0-1.6983-1.2105-2.9629-2.9629-3.1255v-.1626c1.3098-.2078 2.3215-1.4182 2.3215-2.7913 0-2.0053-1.4905-3.2519-3.9656-3.2519h-5.447v13.0349zm-3.2429-11.2192h2.5473c1.4092 0 2.2312.6775 2.2312 1.8427 0 1.1924-.8762 1.8338-2.5293 1.8338h-2.2492zm0 9.4035v-4.0739h2.6196c1.7795 0 2.719.6955 2.719 2.0234 0 1.3369-.9124 2.0505-2.6287 2.0505zm16.2675-.8852c-.3252.7407-1.093 1.1562-2.2041 1.1562-1.4724 0-2.4209-1.0478-2.4751-2.719v-.1174h6.9014v-.7136c0-3.0984-1.6892-4.9683-4.5076-4.9683-2.8635 0-4.6431 1.9963-4.6431 5.167 0 3.1616 1.7525 5.0947 4.6612 5.0947 2.3305 0 3.9836-1.1201 4.3901-2.8996zm-2.2944-5.6187c1.3459 0 2.2312.9485 2.2763 2.448h-4.6521c.0994-1.4814 1.0388-2.448 2.3758-2.448zm7.2795-3.9746v2.4841h-1.5628v1.7434h1.5628v5.4471c0 1.906.9033 2.6648 3.1706 2.6648.4336 0 .8491-.0362 1.1743-.0994v-1.7163c-.271.0271-.4426.0452-.7588.0452-.9394 0-1.3549-.4427-1.3549-1.4273v-4.9141h2.1137v-1.7434h-2.1137v-2.4841zm9.1042 12.4568c1.2917 0 2.3757-.5601 2.9267-1.5176h.1536v1.355h2.1589v-6.7478c0-2.0867-1.4272-3.3152-3.9656-3.3152-2.3486 0-3.9836 1.1021-4.1643 2.8274h2.1138c.2078-.6775.9124-1.0478 1.9421-1.0478 1.2105 0 1.8609.551 1.8609 1.5356v.8491l-2.5474.1536c-2.4028.1355-3.7488 1.1743-3.7488 2.9448 0 1.8066 1.364 2.9629 3.2701 2.9629zm.6594-1.7253c-.9937 0-1.7073-.4969-1.7073-1.346 0-.822.5872-1.2827 1.8428-1.364l2.2312-.1536v.804c0 1.1743-1.0117 2.0596-2.3667 2.0596zm7.1711 1.5627h2.2402v-13.6943h-2.2402zm9.6088 0h2.2402v-6.0071c0-1.2285.822-2.1589 1.9331-2.1589 1.102 0 1.7886.6684 1.7886 1.7615v6.4045h2.177v-6.1697c0-1.1291.7678-1.9963 1.9331-1.9963 1.2014 0 1.8066.6413 1.8066 1.9241v6.2419h2.2312v-6.793c0-2.0505-1.1924-3.27-3.1706-3.27-1.3731 0-2.5113.7046-2.9991 1.7796h-.1535c-.4155-1.0931-1.364-1.7796-2.728-1.7796-1.3099 0-2.3216.6685-2.7461 1.7796h-.1536v-1.5899h-2.1589zm23.0067-2.7009c-.3256.7407-1.0935 1.1562-2.2045 1.1562-1.4725 0-2.4209-1.0478-2.4751-2.719v-.1174h6.9016v-.7136c0-3.0984-1.689-4.9683-4.5078-4.9683-2.8636 0-4.6431 1.9963-4.6431 5.167 0 3.1616 1.7524 5.0947 4.6611 5.0947 2.3308 0 3.9838-1.1201 4.3898-2.8996zm-2.2949-5.6187c1.346 0 2.2309.9485 2.2759 2.448h-4.6516c.0994-1.4814 1.0388-2.448 2.3757-2.448zm10.1429 8.4822c1.373 0 2.511-.6414 3.071-1.7253h.154v1.5627h2.168v-13.6943h-2.24v5.3928h-.154c-.524-1.084-1.644-1.7344-2.999-1.7344-2.493 0-4.065 1.9692-4.065 5.0947 0 3.1346 1.563 5.1038 4.065 5.1038zm.696-8.3286c1.535 0 2.484 1.2375 2.484 3.2339 0 2.0053-.94 3.2339-2.484 3.2339-1.536 0-2.466-1.2105-2.466-3.2339 0-2.0144.939-3.2339 2.466-3.2339z"/><path clipRule="evenodd" d="m184.75 20.0884c-.72-2.7477-2.469-3.8384-4.855-3.8384-1.934 0-4.361 1.0907-4.361 3.7172 0 1.6968 1.173 3.0304 3.085 3.374l1.811.323c1.234.2221 1.584.6869 1.584 1.3132 0 .7071-.761 1.111-1.893 1.111-1.481 0-2.406-.5252-2.551-2.0001l-2.612.4042c.411 2.8483 2.962 4.0204 5.266 4.0204 2.181 0 4.505-1.2528 4.505-3.778 0-1.7174-1.049-2.9696-3.003-3.3337l-1.996-.3633c-1.111-.202-1.481-.7475-1.481-1.2727 0-.6668.72-1.0907 1.708-1.0907 1.255 0 2.139.4239 2.18 1.8179zm-58.075 4.3229 2.715-7.8584h3.188l-4.731 11.6565h-2.366l-4.731-11.6563h3.188zm16.683-4.5249c0 .9292-.74 1.5756-1.604 1.5756s-1.605-.6464-1.605-1.5756c0-.9294.741-1.5756 1.605-1.5756s1.605.6462 1.605 1.5756zm.494 4.1213c-1.07 1.3734-2.201 2.3229-4.197 2.323-2.036 0-3.62-1.2121-4.854-2.9897-.494-.7275-1.255-.889-1.811-.5051-.514.3637-.637 1.1314-.164 1.7982 1.707 2.5656 4.073 4.0602 6.829 4.0602 2.531 0 4.506-1.2119 6.048-3.2322.576-.7473.556-1.515 0-1.9393-.514-.4044-1.275-.2624-1.851.4849zm7.098-1.6568c0 2.384 1.399 3.6367 2.962 3.6367 1.481 0 3.004-1.1719 3.004-3.6367 0-2.4244-1.523-3.5959-2.983-3.5959-1.584 0-2.983 1.1111-2.983 3.5959zm0-4.1815v-1.5964h-2.9v15.677h2.9v-5.576c.967 1.2932 2.222 1.8389 3.641 1.8389 2.654 0 5.246-2.0608 5.246-6.3031 0-4.061-2.695-5.9596-4.999-5.9596-1.831 0-3.086.8281-3.888 1.9192zm13.928 4.1815c0 2.384 1.398 3.6367 2.962 3.6367 1.481 0 3.003-1.1719 3.003-3.6367 0-2.4244-1.522-3.5959-2.983-3.5959-1.584 0-2.983 1.1111-2.983 3.5959zm0-4.1815v-1.5964h-.001-2.9v15.677h2.9v-5.576c.967 1.2932 2.222 1.8389 3.641 1.8389 2.654 0 5.246-2.0608 5.246-6.3031 0-4.061-2.695-5.9596-4.999-5.9596-1.831 0-3.085.8281-3.887 1.9192z" fillRule="evenodd"/></g></svg>
              </button>
            )}
            { payment === 'invoice' && (
              <button type="submit" role="button" className="libButton invoiceButton" label="Betal med faktura" disabled={loading || sending}>
                Bli medlem nå!
              </button>
            )}
          </section>
        </form>
      )}
    </div>
  )
}

Membership.propTypes = {
  description: PropTypes.string,
  className: PropTypes.string,
  servicePath: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.shape({
      url: PropTypes.string
    }),
    name: PropTypes.string,
    shortDescription: PropTypes.string,
    url: PropTypes.string,
    active: PropTypes.bool
  })),
  messages: PropTypes.shape({
    errorMissingMembership: PropTypes.string,
    errorMissingPayment: PropTypes.string,
    errorVippPhoneRequired: PropTypes.string,
    infoMember: PropTypes.string,
    infoOrderSuccess: PropTypes.string,
    infoSending: PropTypes.string,
    infoSendingVipps: PropTypes.string
  }),
  shortDescription: PropTypes.string,
  texts: PropTypes.shape({
    headerMemberSelection: PropTypes.string,
    headerPaymentInfo: PropTypes.string,
    headerPaymentMethod: PropTypes.string,
    headerMemberInput: PropTypes.string
  }),
  title: PropTypes.string
}

Membership.defaultProps = {
  className: '',
  image: undefined,
  items: [],
  messages: {
    errorMissingMembership: 'Du må velge hva slags medlemskap du ønsker.',
    errorMissingPayment: 'Du må velge betalingsmåte først.',
    errorVippPhoneRequired: 'VIPPS krever at du legger inn gyldig mobilnummer',
    infoOrderSuccess: 'Takk for at du ble medlem hos oss. Faktura vil snart komme i posten.',
    infoSending: 'Vent litt. Ordren behandles...',
    infoSendingVipps: 'Vent litt. Ordren behandles. Du vil straks bli sendt til Vipps for betaling...'
  },
  texts: {
    headerMemberSelection: 'Velg medlemsnivå',
    headerPaymentInfo: 'Å betale',
    headerPaymentMethod: 'Velg betalingsmetode',
    headerMemberInput: 'Informasjon om medlem'
  }
}

export default (props) => <Membership {...props} />// eslint-disable-line react/display-name
