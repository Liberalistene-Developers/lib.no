import React from 'react'
import PropTypes from 'prop-types'

import slugify from 'slugify'

const Title = ({ anchor, title, parentTitle }) => {
  const id = parentTitle && slugify(`${parentTitle} ${title}`.trim())

  if (anchor) {
    return (
      <h3 id={id}>{title}</h3>
    )
  }

  if (parentTitle) {
    return (
      <h2 id={id}>{title}</h2>
    )
  }

  return (
    <h1>{title}</h1>
  )
}

Title.propTypes = {
  anchor: PropTypes.string,
  title: PropTypes.string,
  parentTitle: PropTypes.string
}

export const ProgrammePart = ({ anchor, title, description, conclusionTitle, conclusions, parentTitle, tags }) => {
  return (
    <div className={ title ? '' : 'page-content'}>
      <div className="programme-part">
        <div className="programme-part-title">
          <Title anchor={anchor} parentTitle={parentTitle} title={title} />
        </div>

        { description && (
            <div className="programme-part-description" dangerouslySetInnerHTML={{ __html: description }} />
        )}

        { conclusions && conclusions.length > 0
          ? (
          <div className="conclusions">
            <div className="title">{ conclusionTitle }</div>
            <ul>
              { conclusions.map(({ key, conclusion }) => (
                <li key={key}>
                  { conclusion }
                </li>
              ))}
            </ul>
          </div>
            )
          : null }
      </div>
    </div>
  )
}

ProgrammePart.propTypes = {
  /**
   * Add anchor to title.
   */
  anchor: PropTypes.bool,
  description: PropTypes.string,
  conclusionTitle: PropTypes.string,
  conclusions: PropTypes.array,
  parentTitle: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.array
}

ProgrammePart.defaultProps = {
  anchor: false,
  description: '',
  conclusions: [],
  parentTitle: '',
  title: ''
}

export default (props) => <ProgrammePart {...props} /> // eslint-disable-line react/display-name
