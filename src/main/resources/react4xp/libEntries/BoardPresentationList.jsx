import React from 'react'
import PropTypes from 'prop-types'

import { BoardPresentation } from './BoardPresentation'

export const BoardPresentationList = ({
  imagesize,
  imagetype,
  items,
  boardTitle,
  showemail
}) => (
  <div className="board-presentation-list">
    { items && items.length > 0
      ? items.map(({
        itemId,
        title,
        board
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
)

BoardPresentationList.propTypes = {
  boardTitle: PropTypes.string,
  imagesize: PropTypes.bool,
  imagetype: PropTypes.string,
  items: PropTypes
    .arrayOf(PropTypes
      .shape({
        itemId: PropTypes.string
      })),
  showemail: PropTypes.bool
}

BoardPresentationList.defaultProps = {
  items: [],
  showemail: false
}

export default (props) => <BoardPresentationList {...props} /> // eslint-disable-line react/display-name
