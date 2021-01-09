import React from 'react';
import PropTypes from 'prop-types';

/**
 * Primary Image holder for solution.
 */
const Image = ({
  className,
  image,
  imageClassName,
}) => {
  if (!image) {
    return null;
  }
  
  return (
    <div className={className}>
      <img src={image.url} alt={image.alternativeText} className={imageClassName} />
    </div>
  );
};

Image.propTypes = {
  /**
   * Class of image holder.
   */
  className: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
  
  /**
   * the image
   */
  image: PropTypes.shape({
   url: PropTypes.string,
   alternativeText: PropTypes.string,
  }),
  
  /**
   * Class of the image.
   */
  imageClassName: PropTypes.string,
  
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Image.defaultProps = {
  className: '',
  image: null,
  imageClassName: '',
  onClick: undefined,
};

export default Image;

export {
  Image,
};