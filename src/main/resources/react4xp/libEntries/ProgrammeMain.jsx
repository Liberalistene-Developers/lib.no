import React from 'react'
import PropTypes from 'prop-types'

import slugify from 'slugify'

import { ProgrammeSection } from './ProgrammeSection'

import { TableOfContent } from '../shared/TableOfContent'

export const ProgrammeMain = ({ title, sections, tags, tableOfContent = false }) => (
  <div className="page-content">
    <div className="programme-main">
      <div className="programme-main-title">
        <h1 title={title} id={slugify(title)}>{title}</h1>
      </div>

      { tableOfContent
        ? (
        <div className="programme-main-table-of-content">
          <TableOfContent title={title} sections={sections} />
        </div>
          )
        : null}

      { sections && sections.length > 0
        ? (
        <div className="programme-main-sections">
          { sections.map(({ key, ...props }) =>
            <ProgrammeSection key={ key } { ...props } parentTitle={title} anchor={true}/>
          )}
        </div>
          )
        : null
      }
    </div>
  </div>
)

ProgrammeMain.propTypes = {
  tableOfContent: PropTypes.bool,
  sections: PropTypes.array,
  title: PropTypes.string,
  tags: PropTypes.array
}

ProgrammeMain.defaultProps = {
  tableOfContent: false,
  sections: [],
  title: '',
  tags: []
}

export default (props) => <ProgrammeMain { ...props } /> // eslint-disable-line react/display-name
