import React from 'react';
import PropTypes from 'prop-types';

import PersonListItem from '../shared/PersonListItem';

export const Board = ({
  imagesize,
  imagetype,
  board,
}) => (
  <div className="board-wrapper">
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
);

Board.propTypes = {
  imagesize: PropTypes.string,
  imagetype: PropTypes.string,
};

Board.defaultProps = {
  imagetype: 'round',
  imagesize: 'medium',
};

export default (props) => <Board {...props} />;