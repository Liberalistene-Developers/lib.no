import React from 'react';
import PropTypes from 'prop-types';

import { ImageBlock } from './ImageBlock';
import Image from '../shared/Image';
import PersonListItem from '../shared/PersonListItem';

const Group = ({
  imageType,
  headerColor,
  headerPosition,
  ingressInImage,
  title,
  titleInImage,
  image,
  informationLabel,
  shortDescription,
  description,
  board,
  tags,
}) => (
  <div className="group">
    { image && (
      <ImageBlock
        title={titleInImage && title}
        image={image}
        ingress={ingressInImage && shortDescription} text={headerColor}
        position={headerPosition}
      />
    )}
    
    { (!titleInImage || !image) && title && (
      <h1>{title}</h1>
    )}
    
    { (!ingressInImage || !image) && shortDescription && (
      <div className="rich-text" dangerouslySetInnerHTML={{ __html: shortDescription }} />
    )}

    { description && (
      <div className="info">
        { informationLabel && (
          <h2>{informationLabel}</h2>
        )}
        
        <div
          className="group-content"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    )}

    { board && board.length > 0 ? (
        <div className="board">
          <div className="leader">
            {board.slice(0, 1).map((item) => (
              <PersonListItem item={item} imageType={imageType} />
            ))}
          </div>
          { board.length > 1 && (
            <div className="members">
            { board.slice(1).map((item) => (
              <PersonListItem item={item} imageType={imageType}/>
            ))}
            </div>            
          )}
        </div>
      )
      : null
    }

  </div>
);

Group.propTypes = {
  description: PropTypes.string,
  ingressInImage: PropTypes.bool,
  title: PropTypes.string,
  titleInImage: PropTypes.bool,
};

Group.defaultProps = {
  description: '',
  ingressInImage: true,
  title : '',
  titleInImage: true,
  imageType: 'round',
};

export default Group;

export {
  Group,
};