import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Image from '../shared/Image';
import PersonListItem from '../shared/PersonListItem';


export const BoardPresentation = ({
  title,
  imagesize,
  imagetype,
  board,
  boardTitle,
}) => (
  <div className="board-presentation-wrapper">
    <div className="board-presentation-title">
      <h2 title={title}>{title}</h2>
    </div>
    
    { board && board.length > 0 ? (
      <div className="board-presentation-content">      
        {board.slice(0, 1).map(({ itemId, image, role, name }) => (
          <div key={itemId} className="leader">
            <Image image={image} className={cx(imagesize, 'leader-image')} imageClassName={(imagetype && 'round') || ''} />
            <div className="leader-name">
              {name}
            </div>
            <div className="leader-role">
              {role}
            </div>
          </div>
        ))}
        
        <div className="members">
          <div className="members-title">
            {boardTitle}
          </div>
          { board.map(({ itemId, image, role, name }) => (
            <div key={itemId} className="member-item">
              <span className="role">{role}</span><span className="name">{name}</span>
            </div>
          ))}
        </div>            
      </div>
    )
    : null
    }
  </div>
);

BoardPresentation.propTypes = {
  imagesize: PropTypes.string,
  imagetype: PropTypes.string,
};

BoardPresentation.defaultProps = {
  imagetype: 'round',
  imagesize: 'medium',
};

export default (props) => <BoardPresentation {...props} />;