import React from 'react';
import PropTypes from 'prop-types';

import Image from '../shared/Image';

const TitleBlock = ({
  image = undefined,
  title = '',
  titleCenter = '',
  titleColor = '',
  imageClass = '',
}) => (
  <>
    <div className="title-block">
      <div className={ `title-block-title ${titleColor} ${titleCenter}`}>
        <h1>{ title }</h1>
      </div>
      { image && (
        <div className="title-block-image">
          <Image image={image} className={imageClass} />
        </div>      
      )}
    </div>
  </>
);

TitleBlock.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
  }),
  imageClass: PropTypes.string,
  /** H1 title */
  title: PropTypes.string,
  titleCenter: PropTypes.string,
  titleColor: PropTypes.string,
};

TitleBlock.defaultProps = {
  image: undefined,
  imageClass: '',
  title: '',
  titleCenter: '',
  titleColor: '',
};

export default TitleBlock;

export {
  TitleBlock,
};