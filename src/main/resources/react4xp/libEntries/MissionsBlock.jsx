import PropTypes from 'prop-types'

import { Mission } from './Mission'

export const MissionsBlock = ({
  items
}) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className="missions">
      { items && items.map((item) => (<Mission key={item.title} {...item} />))}
    </div>
  )
}

MissionsBlock.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string
    }),
    title: PropTypes.string
  }))
}

MissionsBlock.defaultProps = {
  items: []
}

export default (props) => <MissionsBlock {...props} />// eslint-disable-line react/display-name
