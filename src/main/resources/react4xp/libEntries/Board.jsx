import React from 'react'
import PropTypes from 'prop-types'

import PersonListItem from '../shared/PersonListItem'

export const Board = ({
  imagesize,
  imagetype,
  board,
  showemail
}) => (
  <div className="board-wrapper">
    { board && board.length > 0
      ? (
        <div className="board">
          <div className="leader list">
            {board.slice(0, 1).map((item) => (
              <PersonListItem
                key={item.itemId}
                item={item}
                imageSize={imagesize}
                imageType={(imagetype && 'round') || ''}
                showEmail={showemail !== 'no'}
              />
            ))}
          </div>
          { board.length > 1 && (
            <div className="members list">
            { board.slice(1).map((item) => (
              <PersonListItem
                key={item.itemId}
                item={item}
                imageSize={imagesize}
                imageType={(imagetype && 'round') || ''}
                showEmail={showemail === 'all'}
              />
            ))}
            </div>
          )}
        </div>
        )
      : null
    }
  </div>
)

Board.propTypes = {
  board: PropTypes.arrayOf({
    itemId: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string
    }),
    role: PropTypes.string,
    name: PropTypes.string
  }),
  imagesize: PropTypes.bool,
  imagetype: PropTypes.string,
  showemail: PropTypes.string
}

Board.defaultProps = {
  imagetype: true,
  imagesize: 'medium',
  showemail: 'no'
}

export default (props) => <Board {...props} /> // eslint-disable-line react/display-name
