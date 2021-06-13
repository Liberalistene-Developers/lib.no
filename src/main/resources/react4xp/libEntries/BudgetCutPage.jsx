import React from 'react'
import PropTypes from 'prop-types'

import { BudgetCut } from './BudgetCut'

export const BudgetCutPage = ({
  title,
  budget,
  cut,
  cuts = [],
  description = '',
  percent = '',
  sumary = '',
  labelSumCut,
  labelBudget,
  labelTitle,
  labelPercent,
  labelCut,
  labelNumberText
}) => (
  <div className="budget-cut-holder">
    <div className="budget-cut-item">
      <div className="budget-cut-title">
        <h1 title={title}>{title}</h1>
      </div>

      <BudgetCut
        title={title}
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
    </div>
  </div>
)

BudgetCutPage.propTypes = {
  budget: PropTypes.number,
  cut: PropTypes.string,
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
  labelBudget: PropTypes.string,
  labelCut: PropTypes.string,
  labelNumberText: PropTypes.string,
  labelPercent: PropTypes.string,
  labelSumCut: PropTypes.string,
  labelTitle: PropTypes.string,
  percent: PropTypes.number,
  sumary: PropTypes.string,
  title: PropTypes.string
}

export default (props) => <BudgetCutPage {...props} /> // eslint-disable-line react/display-name
