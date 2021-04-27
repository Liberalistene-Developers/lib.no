import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

import Image from '../shared/Image'

export const BoardPresentation = ({
  title,
  imagesize,
  imagetype,
  board,
  boardTitle,
  showEmail
}) => (
  <div className="board-presentation-wrapper">
    <div className="board-presentation-title">
      <h2 title={title}>{title}</h2>
    </div>

    { board && board.length > 0
      ? (
      <div className="board-presentation-content">
        {board.slice(0, 1).map(({ itemId, image, role, email, name }) => (
          <div key={itemId} className="leader">
            <Image image={image} className={cx(imagesize, 'leader-image')} imageClassName={(imagetype && 'round') || ''} />
            <div className="leader-name">
              {name}
            </div>
            <div className="leader-role">
              {role}
            </div>
            { showEmail !== 'no' && email && (
              <div className="leader-email">
                <a href={`mailto:${email}`}>
                  {email}
                </a>
              </div>
            )}
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
)

BoardPresentation.propTypes = {
  board: PropTypes.arrayOf({
    itemId: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string
    }),
    role: PropTypes.string,
    name: PropTypes.string
  }),
  boardTitle: PropTypes.string,
  imagesize: PropTypes.bool,
  imagetype: PropTypes.string,
  showEmail: PropTypes.bool,
  title: PropTypes.string
}

BoardPresentation.defaultProps = {
  board: [],
  imagetype: true,
  imagesize: 'medium',
  showEmail: false
}

export default (props) => <BoardPresentation {...props} /> // eslint-disable-line react/display-name
