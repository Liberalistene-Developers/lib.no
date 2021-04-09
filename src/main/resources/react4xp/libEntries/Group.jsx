import React from 'react';
import PropTypes from 'prop-types';

import { ImageBlock } from './ImageBlock';
import Image from '../shared/Image';
import PersonListItem from '../shared/PersonListItem';

export const Group = ({
  imagesize,
  imagetype,
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
  
    <div className="group-content">
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
            className="group-description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}

      { board && board.length > 0 ? (
          <div className="board">
            <div className="leader">
              {board.slice(0, 1).map((item) => (
                <PersonListItem
                  item={item}
                  imageSize={imagesize}
                  imageType={(imagetype && 'round') || ''}
                />
              ))}
            </div>
            { board.length > 1 && (
              <div className="members">
              { board.slice(1).map((item) => (
                <PersonListItem
                  item={item}
                  imageSize={imagesize}
                  imageType={(imagetype && 'round') || ''}
                />
              ))}
              </div>            
            )}
          </div>
        )
        : null
      }
    </div>
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
  imagetype: 'round',
  imagesize: 'medium',
};

export default (props) => <Group {...props} />;