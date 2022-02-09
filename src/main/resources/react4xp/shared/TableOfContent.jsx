
import PropTypes from 'prop-types'

import slugify from 'slugify'

const createLink = (title) => `#${slugify(title)}`

const ContentLink = ({ title, parentTitle, className }) => (
  <a href={createLink(`${parentTitle} ${title}`.trim())} title={title}>{title}</a>
)

ContentLink.propTypes = {
  title: PropTypes.string,
  parentTitle: PropTypes.string,
  className: PropTypes.string
}

const Section = ({ title, parentTitle = '', description, parts = [], tags }) => {
  const displayParts = parts.filter(({ type }) => type === 'lib.no:programme-part')

  return (
    <li className="content-section">
      <ContentLink title={title} parentTitle={parentTitle} className="section-link" />
      { displayParts && displayParts.length > 0
        ? (
        <ul className="content-section-parts">
          { displayParts.map(({ key, title: partTitle }) => (
            <li key={key} className="content-section-part">
              <ContentLink title={partTitle} parentTitle={title} className="part-link" />
            </li>
          ))}
        </ul>
          )
        : null }
    </li>
  )
}

Section.propTypes = {
  title: PropTypes.string,
  parentTitle: PropTypes.string,
  description: PropTypes.string,
  parts: PropTypes.array,
  tags: PropTypes.array
}

export const TableOfContent = ({ title, sections }) => (
  <ul className="table-of-content">
    { sections && sections.map(({ key, ...props }) =>
      <Section key={ key } { ...props } parentTitle={title} />
    )}
  </ul>
)

TableOfContent.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string
}

TableOfContent.defaultProps = {
  sections: [],
  title: ''
}

export default (props) => <TableOfContent { ...props } /> // eslint-disable-line react/display-name
