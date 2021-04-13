import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { BoardPresentation } from './BoardPresentation';

export const BoardPresentationList = ({
  imagesize,
  imagetype,
  items,
  boardTitle,
  showemail,
}) => (
  <div className="board-presentation-list">
    { items && items.length > 0 ? items.map(({
      itemId,
      title,
      board,
    }) => (
      <BoardPresentation
        key={itemId}
        imagesize={imagesize}
        imagetype={imagetype}
        title={title}
        boardTitle={boardTitle}
        board={board}
        showemail={showemail}
      />        
    ))
    : null
    }
    
  </div>
);


export default (props) => <BoardPresentationList {...props} />;