import React from 'react';
import PropTypes from 'prop-types';

import { ImageBlock } from './ImageBlock';

const Group = ({
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
        <ul>
          { board.map(({ role, person, personUrl, image }) => (
            <li>
              <a href={personUrl}>
                { image && (
                  <img src={image} />
                )}
                <span>
                  {role}
                </span>
                <span>
                  {person}
                </span>
              </a>
            </li>
          ))}
        </ul>
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
};

export default Group;

export {
  Group,
};