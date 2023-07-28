import PropTypes from 'prop-types'

import Image from '../shared/Image'

export const Mission = ({
  description,
  image,
  title
}) => {
  return (
    <div className="mission">
      <div>
        <h3 title={title}><Image image={image} /> {title}</h3>

        { description && (
          <div dangerouslySetInnerHTML={{ __html: description }} className="description" />
        )}

      </div>
    </div>
  )
}

Mission.propTypes = {
  description: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  title: PropTypes.string
}

Mission.defaultProps = {
}

export default (props) => <Mission {...props} />// eslint-disable-line react/display-name
