import React from 'react'
import PropTypes from 'prop-types'

import { BoardPresentation } from './BoardPresentation'

export const BoardPresentationList = ({
  boardTitle,
  imagesize,
  imagetype,
  items,
  memberHighlighted,
  noHighlighting,
  reverseOrder,
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
        noHighlighting={noHighlighting}
        imagesize={imagesize}
        imagetype={imagetype}
        memberHighlighted={memberHighlighted}
        title={title}
        boardTitle={boardTitle}
        board={board}
        reverseOrder={reverseOrder}
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
  memberHighlighted: PropTypes.oneOf(['no', 'yes', 'noimage']),
  noHighlighting: PropTypes.bool,
  reverseOrder: PropTypes.bool,
  showemail: PropTypes.oneOf(['no', 'first', 'all'])
}

BoardPresentationList.defaultProps = {
  items: [],
  noHighlighting: false,
  memberHighlighted: 'yes',
  reverseOrder: false,
  showemail: false
}

export default (props) => <BoardPresentationList {...props} /> // eslint-disable-line react/display-name
