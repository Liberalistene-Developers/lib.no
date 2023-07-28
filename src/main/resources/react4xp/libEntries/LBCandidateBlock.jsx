import PropTypes from 'prop-types'

import cx from 'classnames'

import { LBCandidate } from './LBCandidate'

export const LBCandidateBlock = ({
  items,
  headingClassName,
  title
}) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className="localbranch-candidates">
      <div className={cx('heading', headingClassName)}><h2>{title}</h2></div>
      <div className="items">
        { items && items.map((item) => (<LBCandidate key={item.title} {...item} />))}
      </div>
    </div>
  )
}

LBCandidateBlock.propTypes = {
  headingClassName: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string
    }),
    phone: PropTypes.string,
    position: PropTypes.string
  })),
  title: PropTypes.string
}

LBCandidateBlock.defaultProps = {
  items: []
}

export default (props) => <LBCandidateBlock {...props} />// eslint-disable-line react/display-name
