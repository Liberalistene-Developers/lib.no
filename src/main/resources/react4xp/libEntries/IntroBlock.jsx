import PropTypes from 'prop-types'

import Image from '../shared/Image'

export const IntroBlock = ({
  caption,
  description,
  image,
  title
}) => {
  return (
    <div className="intro-block">
      <div>
        <Image image={image} />
        <span className="caption">{caption}</span>
      </div>

      <div>
        { title && (
          <h2 title={title}>{title}</h2>
        )}

        { description && (
          <div dangerouslySetInnerHTML={{ __html: description }} className="description" />
        )}
      </div>
    </div>
  )
}

IntroBlock.propTypes = {
  caption: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string
  }),
  title: PropTypes.string
}

IntroBlock.defaultProps = {
}

export default (props) => <IntroBlock {...props} />// eslint-disable-line react/display-name
