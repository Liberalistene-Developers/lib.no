import React from 'react'
import PropTypes from 'prop-types'

import { Faq } from '../shared/Faq'

export const FaqList = ({
  items = [],
  expandable = false,
  expanded = true,
  anchorText
}) => {
  return (
    <div className="page-content">
      <div className="faq-list">
        { items && items.map(({ itemID, answer, question, url }) => (
          <Faq
            key={itemID}
            itemID={itemID}
            answer={answer}
            question={question}
            expandable={expandable}
            expanded={expanded}
            anchorText={anchorText}
            url={url}
            Tag="h3"
          />
        ))}
      </div>
    </div>
  )
}

FaqList.propTypes = {
  items: PropTypes.arrayOf({
    itemID: PropTypes.string,
    answer: PropTypes.string,
    question: PropTypes.string
  }),
  anchorText: PropTypes.string,
  expandable: PropTypes.bool,
  expanded: PropTypes.bool
}

FaqList.defaultProps = {
  expandable: false,
  expanded: true
}

export default (props) => <FaqList {...props} /> // eslint-disable-line react/display-name
