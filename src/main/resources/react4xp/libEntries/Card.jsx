import React from 'react';
import PropTypes from 'prop-types';

/**
 * Primary Image holder for solution.
 */
const Card = ({
  children,
  image,
  title,
  text,
}) => {
  return (
    <div className="card-holder">
      { image && (
        <div>
          <img src={image.url} alt={image.alternativeText} className="card-image" />
          {children}
        </div>
      )}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <div className="rich-text">
          {text}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    alternativeText: PropTypes.string,
  }),
};

Card.defaultProps = {
  image: null,
  text: '',
  title: '',  
};

export default Card;

export {
  Card,
};