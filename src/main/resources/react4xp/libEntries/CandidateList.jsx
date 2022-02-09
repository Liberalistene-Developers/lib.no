
import PropTypes from 'prop-types'
import cx from 'classnames'

import { PersonListItem } from '../shared/PersonListItem'

/**
 * Primary Image holder for solution.
 */
export const CandidateList = ({
  imagesize = '',
  imagetype = true,
  items = [],
  showRole,
  className
}) => {
  return (
    <div className={cx('candidate-list', 'list', className)}>
    { items && items.map((item) => (
      <PersonListItem
        imageSize={imagesize}
        imageType={(imagetype && 'round') || ''}
        key={item.itemId}
        item={item}
        showRole={showRole}
      />
    ))}
    </div>
  )
}

CandidateList.propTypes = {
  imagesize: PropTypes.string,
  imagetype: PropTypes.bool,
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string,
      alternativeText: PropTypes.string
    }),
    role: PropTypes.string,
    shortDescription: PropTypes.string
  })),
  showRole: PropTypes.bool
}

CandidateList.defaultProps = {
  className: '',
  items: [],
  showRole: true
}

export default (props) => <CandidateList {...props} /> // eslint-disable-line react/display-name
