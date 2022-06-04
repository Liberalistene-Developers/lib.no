import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

import Image from '../shared/Image'

export const BoardPresentation = ({
  board,
  boardTitle,
  description,
  imagesize,
  imagetype,
  memberHighlighted,
  noHighlighting,
  reverseOrder,
  showEmail,
  title
}) => (
  <div className="board-presentation-wrapper">
    <div className="board-presentation-title">
      <h2 title={title}>{title}</h2>
    </div>

    { board && board.length > 0
      ? (
      <div className={cx('board-presentation-content', { reverse: reverseOrder })}>
        { !noHighlighting && (
          <div className="highlighted">
            {memberHighlighted !== 'no' && board.slice(0, 1).map(({ itemId, image, role, email, name }) => (
              <div key={itemId} className="leader">
                { memberHighlighted === 'yes' && (
                  <Image image={image} className={cx(imagesize, 'leader-image')} imageClassName={(imagetype && 'round') || ''} />
                )}

                <div className="leader-name">
                  {name}
                </div>
                <div className="leader-role">
                  {role}
                </div>
                { showEmail !== 'no' && email && (
                  <div className="leader-email">
                    <a href={`mailto:${email}`} rel="noreferrer">
                      {email}
                    </a>
                  </div>
                )}
              </div>
            ))}
            { description && (
              <div className="ingress rich-text" dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </div>
        )}

        <div className="members">
          <div className="members-inner">
            <div className="members-title">
              {boardTitle}
            </div>
            { board.map(({ itemId, role, name, email }) => (
              <div key={itemId} className="member-item">
                <span className="role">{role}</span><span className="name">{name}</span>
                { showEmail === 'all' && email && (
                  <div className="member-item-email">
                    <a href={`mailto:${email}`} rel="noreferrer">
                      {email}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
        )
      : null
    }
  </div>
)

BoardPresentation.propTypes = {
  board: PropTypes
    .arrayOf(PropTypes
      .shape({
        itemId: PropTypes.string,
        image: PropTypes.shape({
          url: PropTypes.string
        }),
        role: PropTypes.string,
        name: PropTypes.string
      })),
  boardTitle: PropTypes.string,
  description: PropTypes.string,
  imagesize: PropTypes.string,
  imagetype: PropTypes.string,
  memberHighlighted: PropTypes.oneOf(['no', 'yes', 'noimage']),
  noHighlighting: PropTypes.bool,
  reverseOrder: PropTypes.bool,
  showEmail: PropTypes.oneOf(['no', 'first', 'all']),
  title: PropTypes.string
}

BoardPresentation.defaultProps = {
  board: [],
  description: '',
  highlighting: true,
  imagetype: '',
  imagesize: 'medium',
  memberHighlighted: 'yes',
  noHighlighting: false,
  reverseOrder: false,
  showEmail: false
}

export default (props) => <BoardPresentation {...props} /> // eslint-disable-line react/display-name
