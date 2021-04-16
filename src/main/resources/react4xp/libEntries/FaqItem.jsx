import React from 'react'
import PropTypes from 'prop-types'

import { Faq } from '../shared/Faq'

export const FaqItem = ({
  itemID,
  answer,
  question,
  expandable = false,
  expanded = true,
  anchorText
}) => (
  <div className="page-content">
    <div className="faq-list">
      <Faq
        itemID={itemID}
        answer={answer}
        question={question}
        expandable={expandable}
        expanded={expanded}
        anchorText={anchorText}
        Tag="h1"
      />
    </div>
  </div>
)

FaqItem.propTypes = {
  itemID: PropTypes.string,
  answer: PropTypes.string,
  question: PropTypes.string,
  anchorText: PropTypes.string,
  expandable: PropTypes.bool,
  expanded: PropTypes.bool
}

FaqItem.defaultProps = {
  expandable: false,
  expanded: true
}

const DefaultFaqItem = (props) => <FaqItem {...props} />
DefaultFaqItem.displayName = 'FaqItem'

export default DefaultFaqItem
