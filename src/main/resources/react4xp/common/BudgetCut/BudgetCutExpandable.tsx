import {type FC} from 'react';

import {BudgetCut} from './BudgetCut';

interface CutItem {
  name?: string;
  budget?: number;
  cut?: number;
  percent?: number;
  description?: string;
}

const titleAsID = (title?: string): string => title?.toLowerCase().replace(/ /g, '-') || '';

interface BudgetCutItemProps {
  budget?: number;
  checked?: boolean;
  cut?: number;
  cuts?: CutItem[];
  description?: string;
  percent?: number;
  sumary?: string;
  title?: string;
  labelSumCut?: string;
  labelBudget?: string;
  labelTitle?: string;
  labelPercent?: string;
  labelCut?: string;
  labelNumberText?: string;
}

export const BudgetCutItem: FC<BudgetCutItemProps> = ({
  budget,
  checked = false,
  cut,
  cuts = [],
  description = '',
  percent,
  sumary = '',
  title = '',
  labelSumCut,
  labelTitle,
  labelPercent,
  labelCut,
  labelNumberText
}) => (
  <div className="budget-cut-holder">
    <div className="budget-cut-item">
      <input type="checkbox" id={`checkbox-${titleAsID(title)}`} defaultChecked={checked} />
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
        labelTitle={labelTitle}
        labelPercent={labelPercent}
        labelCut={labelCut}
        labelNumberText={labelNumberText}
      />
    </div>
  </div>
);
