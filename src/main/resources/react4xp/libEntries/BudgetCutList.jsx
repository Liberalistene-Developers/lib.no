import React from 'react'
import PropTypes from 'prop-types'

import { BudgetCutItem } from './BudgetCutExpandable'

export const BudgetCutList = ({
  ingress,
  title,
  items = [],
  labelSumCut,
  labelBudget,
  labelTitle,
  labelPercent,
  labelCut,
  labelNumberText
}) => (
  <div className="budget-cut-list-holder">
    { title && (
      <div className="budget-cut-list-title">
        <h2 title={title}>{title}</h2>
      </div>
    )}

    { ingress && (
      <div className="page-content">
        <div className="ingress rich-text" dangerouslySetInnerHTML={{ __html: ingress }} />
      </div>
    )}

    { items && items.length > 0 && (
      <div className={'budget-cut-list'}>
        { items
          .map(({
            itemID,
            title: itemTitle,
            budget,
            cut,
            cuts,
            description,
            percent,
            sumary
          }) => (
          <BudgetCutItem
            key={itemID}
            title={itemTitle}
            budget={budget}
            cut={cut}
            cuts={cuts}
            description={description}
            percent={percent}
            sumary={sumary}
            labelSumCut={labelSumCut}
            labelBudget={labelBudget}
            labelTitle={labelTitle}
            labelPercent={labelPercent}
            labelCut={labelCut}
            labelNumberText={labelNumberText}
          />
          ))}
      </div>
    )}
  </div>
)

BudgetCutList.propTypes = {
  ingress: PropTypes.string,
  items: PropTypes
    .arrayOf(PropTypes
      .shape({
        title: PropTypes.string,
        budget: PropTypes.number,
        cut: PropTypes.number,
        cuts: PropTypes
          .arrayOf(PropTypes
            .shape({
              name: PropTypes.string,
              budget: PropTypes.number,
              cut: PropTypes.number,
              percent: PropTypes.number,
              description: PropTypes.string
            })),
        description: PropTypes.string,
        percent: PropTypes.number,
        sumary: PropTypes.string
      })),
  labelBudget: PropTypes.string,
  labelCut: PropTypes.string,
  labelNumberText: PropTypes.string,
  labelPercent: PropTypes.string,
  labelSumCut: PropTypes.string,
  labelTitle: PropTypes.string,
  title: PropTypes.string
}

export default (props) => <BudgetCutList {...props} /> // eslint-disable-line react/display-name
