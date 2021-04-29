import React from 'react'
import PropTypes from 'prop-types'

import slugify from 'slugify'

import { ProgrammePart } from './ProgrammePart'

const Conclusion = ({ title: conclusion }) => (
  <div className="conclusions">
    <ul>
      <li>
        { conclusion }
      </li>
    </ul>
  </div>
)

Conclusion.propTypes = {
  title: PropTypes.string
}

const Title = ({ title, parentTitle }) => {
  const id = parentTitle && slugify(`${parentTitle} ${title}`.trim())

  if (id) {
    return (
      <h2 id={id} title={title}>{title}</h2>
    )
  }

  return (
    <h1 title={title}>{title}</h1>
  )
}

Title.propTypes = {
  title: PropTypes.string,
  parentTitle: PropTypes.string
}

let lastElement = ''

export const ProgrammeSection = ({ anchor, title, conclusionTitle = '', parentTitle = '', description, parts = [], tags }) => (
  <div className={ parentTitle ? '' : 'page-content'}>
    <div className="programme-section">
      <div className="programme-section-title">
        <Title title={title} parentTitle={parentTitle} />
      </div>

      { description && (
        <div className="programme-section-description" dangerouslySetInnerHTML={{ __html: description }} />
      )}

      { parts && parts.length > 0
        ? (
        <div className="programme-sections-parts">
          { parts.map(({ key, type, ...props }) => {
            if (type === 'lib.no:programme-part') {
              lastElement = type

              return (
                <ProgrammePart key={ key } { ...props } parentTitle={title} anchor={anchor} />
              )
            }

            if (lastElement !== type) {
              lastElement = type

              return (
                <>
                  { conclusionTitle && (
                    <div className="conclusions">
                      <div className="title">{ conclusionTitle }</div>
                    </div>
                  )}
                  <Conclusion key={ key } { ...props } />
                </>
              )
            }

            return (
              <Conclusion key={ key } { ...props } />
            )
          })}
        </div>
          )
        : null }

    </div>
  </div>
)

ProgrammeSection.propTypes = {
  /**
   * Add anchor to title.
   */
  anchor: PropTypes.bool,
  conclusionTitle: PropTypes.string,
  description: PropTypes.string,
  parts: PropTypes.array,
  title: PropTypes.string,
  parentTitle: PropTypes.string,
  tags: PropTypes.array
}

ProgrammeSection.defaultProps = {
  anchor: false,
  conclusionTitle: '',
  description: '',
  parts: [],
  tags: []
}

export default (props) => <ProgrammeSection {...props} /> // eslint-disable-line react/display-name
