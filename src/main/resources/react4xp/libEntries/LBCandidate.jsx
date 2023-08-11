import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

import Image from '../shared/Image'

export const LBCandidate = ({
  email,
  image,
  name,
  phone,
  position
}) => {
  return (
    <div className="localbranch-candidate">
      <div className="image-holder">
        <Image image={image} imageClassName={'round'} />
      </div>

      <div className="information">
        <h3 title={name}>{name}</h3>
        <div className="position">{position}</div>
        <div>{((email || phone) && (<hr />)) || ' '}</div>
        <div className="email">{(email && (<>
            <div><FontAwesomeIcon icon={faEnvelope} /></div>
            <div><a href={`mailto:${email}`} title={email}>{email}</a></div>
          </>)) || null}&nbsp;</div>
        <div className="phone">{(phone && (
          <>
            <div><FontAwesomeIcon icon={faPhone} /></div>
            <div><a href={`tel:${phone}`} title={phone}>{phone}</a></div>
          </>
        )) || null}&nbsp;</div>

      </div>
    </div>
  )
}

LBCandidate.propTypes = {
  email: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  name: PropTypes.string,
  phone: PropTypes.string,
  position: PropTypes.string
}

LBCandidate.defaultProps = {
}

export default (props) => <LBCandidate {...props} />// eslint-disable-line react/display-name
