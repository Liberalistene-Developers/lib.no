import React from 'react'
import PropTypes from 'prop-types'

import { BudgetCut } from './BudgetCut'

const titleAsID = (title) => title.toLowerCase().replace(/ /g, '-')

export const BudgetCutItem = ({
  budget,
  checked = false,
  cut,
  cuts = [],
  description = '',
  percent = '',
  sumary = '',
  title = '',
  labelSumCut,
  labelBudget,
  labelTitle,
  labelPercent,
  labelCut,
  labelNumberText
}) => (
  <div className="budget-cut-holder">
    <div className="budget-cut-item">
      <input type="checkbox" id={ `checkbox-${titleAsID(title)}` } defaultChecked={checked} />
      <div className="budget-cut-title">
        <h3 title={title} role="button">
          <label htmlFor={`checkbox-${titleAsID(title)}`}>
            {title}

            <i className="fas fa-eye open"></i>
            <i className="fas fa-eye-slash closed"></i>
          </label>
        </h3>
      </div>

      <BudgetCut
        budget={budget}
        cut={cut}
        cuts={cuts}
        description={description}
        percent={percent}
        sumary={sumary}
        title={title}
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

BudgetCutItem.propTypes = {
  budget: PropTypes.number,
  checked: PropTypes.bool,
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

BudgetCutItem.defaultProps = {
  checked: false
}

export default (props) => <BudgetCutItem {...props} /> // eslint-disable-line react/display-name
